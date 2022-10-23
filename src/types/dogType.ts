import { SortOrder } from './utilType'

export enum Size {
  VeryBig = 'very big',
  Big = 'big',
  BigMedium = 'big medium',
  Medium = 'medium',
  MediumLittle = 'medium little',
  Little = 'little',
}

export enum Sex {
  Male = 'male',
  Female = 'female',
}

export interface Dog {
  id: string
  createTime: Date
  updateTime: Date | null
  name: string
  kennel: string | null
  birthDate: string | null
  breed: string | null
  sex: Sex | null
  comments: string | null
  isSpayedOrNeutered: boolean | null
  height: number | null
  length: number | null
  weight: number | null
  isCatFriendly: boolean | null
  size: Size | null
  youtubeUrl: string | null
}

export type NewDog = Omit<Dog, 'id' | 'createTime' | 'updateTime'>

export type DogFields = {
  name: unknown
  kennel: unknown
  birthDate: unknown
  breed: unknown
  sex: unknown
  comments: unknown
  isSpayedOrNeutered: unknown
  height: unknown
  length: unknown
  weight: unknown
  isCatFriendly: unknown
  size: unknown
  youtubeUrl: unknown
}

export enum DogSortField {
  CreateTime = 'createTime',
  UpdateTime = 'updateTime',
  Name = 'name',
  BirthDate = 'birthDate',
  Height = 'height',
  Length = 'length',
  Weight = 'weight',
}

export enum DogGroupField {
  Kennel = 'kennel',
  Breed = 'breed',
}

export type DogQuery = {
  sortField?: DogSortField
  sortOrder?: SortOrder
  groupField?: DogGroupField
  searchField: string
}

export type DogQueryFields = {
  sortField: unknown
  sortOrder: unknown
  groupField: unknown
  searchField: unknown
}
