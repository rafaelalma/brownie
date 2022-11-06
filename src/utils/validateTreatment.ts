import { isString, isArray } from './typeCheck'
import {
  TreatmentFields,
  NewTreatment,
  Part,
  // Step,
} from '../types/treatmentType'
import {
  INCORRECT_OR_MISSING_DOG_ID_ERROR_MESSAGE,
  INCORRECT_OR_MISSING_PARTS_ERROR_MESSAGE,
} from '../constants/errorMessages'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isStep = (param: any): param is Step => {
//   return true
// }

// const isArrayOfSteps = (params: unknown[]): params is Step[] => {
//   if (params.some((param) => !isStep(param))) {
//     return false
//   }

//   return true
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPart = (_param: any): _param is Part => {
  return true
}

const isArrayOfParts = (params: unknown[]): params is Part[] => {
  if (params.some((param) => !isPart(param))) {
    return false
  }

  return true
}

const parseParts = (parts: unknown): Part[] => {
  if (
    !parts ||
    !isArray(parts) ||
    !(parts.length > 0) ||
    !isArrayOfParts(parts)
  ) {
    const typeError = new Error(INCORRECT_OR_MISSING_PARTS_ERROR_MESSAGE)
    typeError.name = 'TypeError'
    throw typeError
  }

  return parts
}

const parseDogId = (dogId: unknown): string => {
  if (!dogId || !isString(dogId)) {
    const typeError = new Error(INCORRECT_OR_MISSING_DOG_ID_ERROR_MESSAGE)
    typeError.name = 'TypeError'
    throw typeError
  }

  return dogId
}

const validateTreatment = ({ parts, dogId }: TreatmentFields): NewTreatment => {
  const newTreatment: NewTreatment = {
    parts: parseParts(parts),
    dogId: parseDogId(dogId),
  }

  return newTreatment
}

export default validateTreatment
