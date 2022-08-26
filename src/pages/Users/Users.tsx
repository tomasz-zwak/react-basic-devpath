import './Users.scss'

import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import Spinner from 'components/spinner'
import Table from 'components/Table'
import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikProps,
  FormikValues,
  getIn,
} from 'formik'
import { Flex } from 'layouts/Flex'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const { data, isLoading, error } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User>()

  const { mutate: deleteUser } = useUserDelete()

  const queryClient = useQueryClient()

  const handleReset = () => {
    setSelectedUser(undefined)
  }

  if (isLoading) return <Spinner size="small" />

  if (!data || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  console.log(data)

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
                    onSuccess: () => queryClient.invalidateQueries(['users']),
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
          {
            key: 'photos',
            title: 'Photos',
            render: ({ photos }) =>
              photos && (
                <ol>
                  {photos.map(({ title, url }, index) => (
                    <li key={index}>
                      <a href={url}>{title}</a>
                    </li>
                  ))}
                </ol>
              ),
          },
        ]}
      />
      <UserForm user={selectedUser} onReset={handleReset} />
    </>
  )
}

interface Props {
  user?: User
  onReset: () => void
}

const UserForm: React.FC<Props> = ({ user, onReset }) => {
  const { mutate: createUser, isLoading: creating } = useUserCreate()
  const { mutate: updateUser, isLoading: updating } = useUserUpdate()

  const queryCache = useQueryClient()

  const formikRef = useRef<FormikProps<FormikValues>>(null)

  useEffect(() => {
    if (user) formikRef.current?.setValues(user)
    if (!user) formikRef.current?.resetForm()
  }, [user])

  const initialValues = { name: '', age: '', email: '', photos: [] }

  const handleSuccess = () => {
    queryCache.invalidateQueries(['users'])
    onReset()
    formikRef.current?.resetForm({
      values: initialValues,
    })
  }

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
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
          photos: Yup.array()
            .of(
              Yup.object().shape({
                title: Yup.string()
                  .min(3, 'Title must be at least 3 characters.')
                  .required('Required'),
                url: Yup.string().url('Must be an url').required('Required'),
              })
            )
            .optional(),
        })}
        onSubmit={(values) => {
          if (!user)
            return createUser(values as UserCreateDto, {
              onSuccess: handleSuccess,
            })
          updateUser(
            { id: user.id, ...values },
            {
              onSuccess: handleSuccess,
            }
          )
        }}
      >
        {({ values }) => {
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
                  color: 'gray',
                }}
              >
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" />
                <ErrorMessage name="name" />

                <label htmlFor="age">Age</label>
                <Field id="age" name="age" />
                <ErrorMessage name="age" />

                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="email" />
                <ErrorMessage name="email" />

                <FieldArray
                  name="photos"
                  render={(props) => (
                    <div>
                      <div style={{ color: 'initial' }}>Photos: </div>
                      {values.photos && values.photos.length > 0 ? (
                        values.photos.map((_, index) => (
                          <React.Fragment key={index}>
                            <hr />
                            <Flex
                              style={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: 'fit-content',
                                color: 'gray',
                              }}
                              key={index}
                            >
                              <label htmlFor={`photos.${index}.title`}>
                                Title
                              </label>
                              <Field name={`photos.${index}.title`} />
                              <ErrorMessage name={`photos.${index}.title`} />

                              <label htmlFor={`photos.${index}.url`}>URL</label>
                              <Field name={`photos.${index}.url`} />
                              <ErrorMessage name={`photos.${index}.url`} />

                              <div>
                                <button
                                  type="button"
                                  onClick={() => props.remove(index)}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    props.insert(index, { title: '', url: '' })
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </Flex>
                          </React.Fragment>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => props.push({ title: '', url: '' })}
                          style={{ marginTop: 5 }}
                        >
                          Add a photo
                        </button>
                      )}
                    </div>
                  )}
                />

                <button type="submit" style={{ marginTop: 5 }}>
                  {user ? 'Update user' : 'Create user'}
                </button>
              </Flex>
            </Form>
          )
        }}
      </Formik>
      <LoadingIndicator visible={creating || updating} />
    </>
  )
}

const ErrorMessage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name)
      const touch = getIn(form.touched, name)
      return touch && error ? (
        <small className="form--error">{error}</small>
      ) : null
    }}
  />
)

const LoadingIndicator = ({ visible }) => {
  if (!visible) return null
  return createPortal(
    <div style={{ position: 'fixed', top: 5, right: 5 }}>
      <Spinner size="small" />
    </div>,
    document.body
  )
}

export default Users
