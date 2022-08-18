import { User } from 'services/UserService/user.type'

export type UserCreateDto = Omit<User, 'id'>

export type UserUpdateDto = Pick<User, 'id'> & Partial<UserCreateDto>
