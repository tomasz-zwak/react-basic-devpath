import { MakeGenerics, useMatch } from '@tanstack/react-location'
import classNames from 'classnames'
import Spinner from 'components/spinner'
import React from 'react'
import { useUser } from 'services/UserService/user.hooks'

type UserGenerics = MakeGenerics<{
  Params: {
    userId: string
  }
}>

const UserInfo = () => {
  const {
    params: { userId },
  } = useMatch<UserGenerics>()
  console.log(userId)

  const { data, isLoading, error } = useUser(parseInt(userId))

  if (isLoading) return <Spinner size="small" />

  if (!data || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  const { id, name, age, email } = data

  return (
    <div>
      <p>{name}</p>
      <ul>
        <li>{id}</li>
        <li>{email}</li>
        <li>{age}</li>
      </ul>
    </div>
  )
}

export default UserInfo
