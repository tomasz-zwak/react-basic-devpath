import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UserCreateDto } from 'services/UserService/user.dto'
import { User } from 'services/UserService/user.type'

const client = axios.create({
  baseURL: 'http://localhost:4000',
  headers: { 'content-type': 'application/json' },
})

const request = async <T>(options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<T>) => response.data

  const onError = (error) => Promise.reject(error)

  return client(options).then(onSuccess).catch(onError)
}

export const user = (id: User['id']) =>
  request<User>({
    url: `/users/${id}`,
    method: 'GET',
  })

export const users = () =>
  request<User[]>({
    url: `/users`,
    method: 'GET',
  })

export const userCreate = (userCreateDto: UserCreateDto) =>
  request<User>({
    url: `/users`,
    method: 'POST',
    data: userCreateDto,
  })

export const userUpdate = (
  id: User['id'],
  userUpdateDto: Partial<UserCreateDto>
) =>
  request<User>({
    url: `/users/${id}`,
    method: 'PATCH',
    data: userUpdateDto,
  })

export const userDelete = (id: User['id']) =>
  request<User>({
    url: `/users/${id}`,
    method: 'DELETE',
  })
