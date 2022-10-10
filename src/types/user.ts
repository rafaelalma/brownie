export enum Role {
  Administrator = 'administrator',
  Coordinator = 'coordinator',
  Veteran = 'veteran',
  Volunteer = 'volunteer',
  User = 'user',
}

export interface User {
  id: string
  username: string
  password: string
  name: string | null
  phone: string | null
  email: string | null
  roles: Role[]
}

export type NewUser = Omit<User, 'id'>

export type AddedUser = Omit<User, 'password'>

export type UserFields = {
  username: unknown
  password: unknown
  name: unknown
  phone: unknown
  email: unknown
  roles: unknown[]
}
