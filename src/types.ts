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
  dateAdded: Date
  name: string
  kennel: string
  birthDate: Date
  breed: string
  sex: Sex
  comments: string
  isSpayedOrNeutered: boolean
  height: number
  length: number
  weight: number
  isCatFriendly: boolean
  size: Size
  youtubeUrl: string
}

export type NewDog = Omit<Dog, 'id' | 'dateAdded'>

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
