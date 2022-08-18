import { useQueryClient } from '@tanstack/react-query'
import Table from 'components/Table'
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik'
import { Flex } from 'layouts/Flex'
import React, { useEffect, useRef, useState } from 'react'
import { UserCreateDto } from 'services/UserService/user.dto'
import {
  useUserCreate,
  useUserDelete,
  useUsers,
  useUserUpdate,
} from 'services/UserService/user.hooks'
import { User } from 'services/UserService/user.type'
import * as Yup from 'yup'

const Users = () => {
  const { data, isLoading } = useUsers()

  const [selectedUser, setSelectedUser] = useState<User>()

  const { mutate: deleteUser } = useUserDelete()

  const queryCache = useQueryClient()

  const handleReset = () => {
    setSelectedUser(undefined)
  }

  if (!data) return null

  return (
    <>
      <Table
        data={data}
        loading={isLoading}
        columns={[
          {
            key: 'id',
            title: 'ID',
            render: ({ id }) => (
              <button
                onClick={() =>
                  deleteUser(id, {
                    onSuccess: () => queryCache.invalidateQueries(['users']),
                  })
                }
              >
                Delete
              </button>
            ),
          },
          {
            key: 'name',
            title: 'Name',
            render: (user) => (
              <button onClick={() => setSelectedUser(user)}>{user.name}</button>
            ),
          },
          { key: 'age', title: 'Age' },
          { key: 'email', title: 'Email' },
        ]}
      />
      <UserForm user={selectedUser} />
    </>
  )
}

interface Props {
  user?: User
}

const UserForm: React.FC<Props> = ({ user }) => {
  const { mutate: createUser } = useUserCreate()
  const { mutate: updateUser } = useUserUpdate()

  const queryCache = useQueryClient()

  const formikRef = useRef<FormikProps<FormikValues>>(null)

  useEffect(() => {
    if (user) formikRef.current?.setValues(user)
    if (!user) formikRef.current?.resetForm()
  }, [user])

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ ...user } || {}}
      validationSchema={Yup.object().shape({
        name: user
          ? Yup.string().optional()
          : Yup.string().required('Required'),
        age: user
          ? Yup.number().min(1).max(100).optional()
          : Yup.number().min(1).max(100).required('Required'),
        email: user
          ? Yup.string().email().optional()
          : Yup.string().email().required('Required'),
      })}
      onSubmit={(values) => {
        if (!user)
          return createUser(values as UserCreateDto, {
            onSuccess: () => {
              queryCache.invalidateQueries(['users'])
            },
          })
        updateUser(
          { id: user.id, ...values },
          {
            onSuccess: () => {
              queryCache.invalidateQueries(['users'])
            },
          }
        )
      }}
    >
      {({errors, touched }) => {
        return (
          <Form>
            <Flex
              style={{
                border: '1px solid black',
                margin: 5,
                padding: 5,
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: 'fit-content',
              }}
            >
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" />
              {errors.name && touched.name ? (
                <div>{errors.name.toString()}</div>
              ) : null}

              <label htmlFor="age">Age</label>
              <Field id="age" name="age" />
              {errors.age && touched.age ? (
                <div>{errors.age.toString()}</div>
              ) : null}

              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              {errors.email && touched.email ? (
                <div>{errors.email.toString()}</div>
              ) : null}

              <button type="submit">
                {user ? 'Update user' : 'Create user'}
              </button>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Users
