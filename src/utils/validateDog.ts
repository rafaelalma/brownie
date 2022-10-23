import { isString, isBoolean, isNumber, isDate } from './typeCheck'
import { DogFields, NewDog, Sex, Size } from '../types/dogType'
import { INCORRECT_OR_MISSING_NAME_ERROR_MESSAGE } from '../constants/errorMessages'

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
    const typeError = new Error(INCORRECT_OR_MISSING_NAME_ERROR_MESSAGE)
    typeError.name = 'TypeError'
    throw typeError
  }

  return name
}

const parseKennel = (kennel: unknown): string | null => {
  if (!kennel || !isString(kennel)) {
    return null
  }

  return kennel
}

const parseBirthDate = (birthDate: unknown): Date | null => {
  if (!birthDate || !isString(birthDate) || !isDate(birthDate)) {
    return null
  }

  return new Date(birthDate)
}

const parseBreed = (breed: unknown): string | null => {
  if (!breed || !isString(breed)) {
    return null
  }

  return breed
}

const parseSex = (sex: unknown): Sex | null => {
  if (!sex || !isSex(sex)) {
    return null
  }
  return sex
}

const parseComments = (comments: unknown): string | null => {
  if (!comments || !isString(comments)) {
    return null
  }

  return comments
}

const parseIsSpayedOrNeutered = (
  isSpayedOrNeutered: unknown
): boolean | null => {
  if (!isSpayedOrNeutered || !isBoolean(isSpayedOrNeutered)) {
    return null
  }

  return isSpayedOrNeutered
}

const parseHeight = (height: unknown): number | null => {
  if (!height || !isNumber(height)) {
    return null
  }

  return height
}

const parseLength = (length: unknown): number | null => {
  if (!length || !isNumber(length)) {
    return null
  }

  return length
}

const parseWeight = (weight: unknown): number | null => {
  if (!weight || !isNumber(weight)) {
    return null
  }

  return weight
}

const parseIsCatFriendly = (isCatFriendly: unknown): boolean | null => {
  if (!isBoolean(isCatFriendly)) {
    return null
  }

  return isCatFriendly
}

const parseSize = (size: unknown): Size | null => {
  if (!size || !isSize(size)) {
    return null
  }
  return size
}

const parseYoutubeUrl = (youtubeUrl: unknown): string | null => {
  if (!youtubeUrl || !isString(youtubeUrl)) {
    return null
  }

  return youtubeUrl
}

const validateDog = ({
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

export default validateDog
