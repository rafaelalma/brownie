export enum Role {
  Administrator = 4,
  Coordinator = 3,
  Veteran = 2,
  Volunteer = 1,
  User = 0,
}

export interface User {
  id: string
  createTime: Date
  updateTime: Date
  username: string
  password: string
  name: string | null
  phone: string | null
  email: string | null
  roles: Role[]
}

export type NewUser = Omit<User, 'id' | 'createTime' | 'updateTime'>

export type AddedUser = Omit<User, 'password'>

export type RequestUser = Pick<User, 'username' | 'roles'>

export type UserFields = {
  username: unknown
  password: unknown
  name: unknown
  phone: unknown
  email: unknown
  roles: unknown[]
}
