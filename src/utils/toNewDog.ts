import { DogFields, NewDog, Sex, Size } from '../types'

const getTypeError = (message: string) => {
  const typeError = new Error(message)
  typeError.name = 'TypeError'
  return typeError
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean' || value instanceof Boolean
}

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSex = (param: any): param is Sex => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Sex).includes(param)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSize = (param: any): param is Size => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Size).includes(param)
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw getTypeError('incorrect or missing name')
  }

  return name
}

const parseKennel = (kennel: unknown): string => {
  if (!kennel || !isString(kennel)) {
    throw getTypeError('incorrect or missing kennel')
  }

  return kennel
}

const parseBirthDate = (birthDate: unknown): Date => {
  if (!birthDate || !isString(birthDate) || !isDate(birthDate)) {
    throw getTypeError('incorrect or missing birthDate: ' + birthDate)
  }
  return new Date(birthDate)
}

const parseBreed = (breed: unknown): string => {
  if (!breed || !isString(breed)) {
    throw getTypeError('incorrect or missing breed')
  }

  return breed
}

const parseSex = (sex: unknown): Sex => {
  if (!sex || !isSex(sex)) {
    throw getTypeError('incorrect or missing sex: ' + sex)
  }
  return sex
}

const parseComments = (comments: unknown): string => {
  if (!comments || !isString(comments)) {
    throw getTypeError('incorrect or missing comments')
  }

  return comments
}

const parseIsSpayedOrNeutered = (isSpayedOrNeutered: unknown): boolean => {
  if (!isSpayedOrNeutered || !isBoolean(isSpayedOrNeutered)) {
    throw getTypeError('incorrect or missing isSpayedOrNeutered')
  }

  return isSpayedOrNeutered
}

const parseHeight = (height: unknown): number => {
  if (!height || !isNumber(height)) {
    throw getTypeError('incorrect or missing height')
  }

  return height
}

const parseLength = (length: unknown): number => {
  if (!length || !isNumber(length)) {
    throw getTypeError('incorrect or missing length')
  }

  return length
}

const parseWeight = (weight: unknown): number => {
  if (!weight || !isNumber(weight)) {
    throw getTypeError('incorrect or missing weight')
  }

  return weight
}

const parseIsCatFriendly = (isCatFriendly: unknown): boolean => {
  if (!isCatFriendly || !isBoolean(isCatFriendly)) {
    throw getTypeError('incorrect or missing isCatFriendly')
  }

  return isCatFriendly
}

const parseSize = (size: unknown): Size => {
  if (!size || !isSize(size)) {
    throw getTypeError('incorrect or missing size: ' + size)
  }
  return size
}

const parseYoutubeUrl = (youtubeUrl: unknown): string => {
  if (!youtubeUrl || !isString(youtubeUrl)) {
    throw getTypeError('incorrect or missing youtubeUrl')
  }

  return youtubeUrl
}

const toNewDog = ({
  name,
  kennel,
  birthDate,
  breed,
  sex,
  comments,
  isSpayedOrNeutered,
  height,
  length,
  weight,
  isCatFriendly,
  size,
  youtubeUrl,
}: DogFields): NewDog => {
  const newDog: NewDog = {
    name: parseName(name),
    kennel: parseKennel(kennel),
    birthDate: parseBirthDate(birthDate),
    breed: parseBreed(breed),
    sex: parseSex(sex),
    comments: parseComments(comments),
    isSpayedOrNeutered: parseIsSpayedOrNeutered(isSpayedOrNeutered),
    height: parseHeight(height),
    length: parseLength(length),
    weight: parseWeight(weight),
    isCatFriendly: parseIsCatFriendly(isCatFriendly),
    size: parseSize(size),
    youtubeUrl: parseYoutubeUrl(youtubeUrl),
  }

  return newDog
}

export default toNewDog
