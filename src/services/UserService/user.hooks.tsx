import { useMutation, useQuery } from '@tanstack/react-query'
import { UserCreateDto, UserUpdateDto } from 'services/UserService/user.dto'
import {
  user,
  userCreate,
  userDelete,
  users,
  userUpdate,
} from 'services/UserService/user.service'
import { User } from 'services/UserService/user.type'

const useUsers = (options?: { onSuccess?: (data: User[]) => void }) =>
  useQuery(['users'], () => users(), {
    retry: 2,
    onSuccess: options?.onSuccess,
  })

const useUser = (id: User['id']) => useQuery(['user', id], () => user(id))

const useUserCreate = () =>
  useMutation((userCreateDto: UserCreateDto) => userCreate(userCreateDto), {
    retry: 2,
  })

const useUserUpdate = () =>
  useMutation(({ id, ...userUpdateDto }: UserUpdateDto) =>
    userUpdate(id, userUpdateDto)
  )

const useUserDelete = () => useMutation((id: User['id']) => userDelete(id))

export { useUsers, useUser, useUserCreate, useUserUpdate, useUserDelete }
