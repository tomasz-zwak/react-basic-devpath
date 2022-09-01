/* eslint-disable max-lines */
import './Users.scss'

import { Link, Outlet } from '@tanstack/react-location'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { LinkButton } from 'components/LinkButton'
import LoadingIndicator from 'components/LoadingIndicator'
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
  const { data, isLoading, error, failureCount } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User>()

  const { mutate: deleteUser } = useUserDelete()

  const queryClient = useQueryClient()

  const handleReset = () => {
    setSelectedUser(undefined)
    queryClient.invalidateQueries(['users'])
  }

  if (isLoading)
    return (
      <>
        <p>{`Retries ${failureCount}`}</p>
        <Spinner size="small" />
      </>
    )

  if (!data || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  return (
    <>
      <Table
        data={data}
        loading={isLoading}
        columns={[
          {
            key: 'id',
            title: '',
            render: ({ id }) => (
              <button
                onClick={() =>
                  deleteUser(id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries(['users'])
                      handleReset()
                    },
                  })
                }
              >
                {`Delete - ${id}`}
              </button>
            ),
          },
          {
            key: 'name',
            title: 'Name',
            render: (user) => (
              <LinkButton onClick={() => setSelectedUser(user)}>
                <Link to={user.id}>{user.name}</Link>
              </LinkButton>
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
      <Flex style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <UserForm
          user={selectedUser}
          key={selectedUser?.id}
          onSuccess={handleReset}
        />
        <Outlet />
      </Flex>
    </>
  )
}

interface Props {
  user?: User
  onSuccess: () => void
  key: any
}

const UserForm: React.FC<Props> = ({ user, onSuccess }) => {
  const { mutate: createUser, isLoading: creating } = useUserCreate()
  const { mutate: updateUser, isLoading: updating } = useUserUpdate()

  const queryClient = useQueryClient()

  const formikRef = useRef<FormikProps<FormikValues>>(null)

  useEffect(() => {
    console.log('rendered', user)
  })

  const initialValues = user || { name: '', age: '', email: '', photos: [] }

  const handleSuccess = (userId?: User['id']) => {
    onSuccess()
    if (userId) queryClient.invalidateQueries(['user', userId])
    formikRef.current?.resetForm()
  }

  return (
    <React.Fragment>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Required'),
          age: Yup.number()
            .typeError('Must be a number')
            .min(1)
            .max(100)
            .required('Required'),
          email: Yup.string().email().required('Required'),
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
              onSuccess: () => handleSuccess(),
            })
          updateUser(
            { id: user.id, ...values },
            {
              onSuccess: () => handleSuccess(user.id),
            }
          )
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <Flex
                direction="column"
                style={{
                  border: '1px solid black',
                  margin: 5,
                  padding: 5,
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
    </React.Fragment>
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

export default Users
