export type Size =
  | 'very big'
  | 'big'
  | 'big medium'
  | 'medium'
  | 'medium little'
  | 'little'

export interface Dog {
  id: string
  dateAdded: Date
  name: string
  kennel: string
  birthDate: string
  breed: string
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
