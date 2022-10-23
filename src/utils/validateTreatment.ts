import { isString, isArray } from './typeCheck'
import { TreatmentFields, NewTreatment, Stage } from '../types/treatmentType'
import {
  INCORRECT_OR_MISSING_DOG_ID_ERROR_MESSAGE,
  INCORRECT_OR_MISSING_NAME_ERROR_MESSAGE,
  INCORRECT_OR_MISSING_STAGES_ERROR_MESSAGE,
} from '../constants/errorMessages'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStage = (param: any): param is Stage => {
  if (
    (typeof param.medication === 'string' || param.medication === null) &&
    (typeof param.description === 'string' || param.description === null)
  ) {
    return true
  } else {
    return false
  }
}
// TODO: validateStage

const isArrayOfStages = (params: unknown[]): params is Stage[] => {
  if (params.some((param) => !isStage(param))) {
    return false
  }

  return true
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    const typeError = new Error(INCORRECT_OR_MISSING_NAME_ERROR_MESSAGE)
    typeError.name = 'TypeError'
    throw typeError
  }

  return name
}

const parseStages = (stages: unknown): Stage[] => {
  if (
    !stages ||
    !isArray(stages) ||
    !(stages.length > 0) ||
    !isArrayOfStages(stages)
  ) {
    const typeError = new Error(INCORRECT_OR_MISSING_STAGES_ERROR_MESSAGE)
    typeError.name = 'TypeError'
    throw typeError
  }

  return stages
}

const parseDogId = (dogId: unknown): string => {
  if (!dogId || !isString(dogId)) {
    const typeError = new Error(INCORRECT_OR_MISSING_DOG_ID_ERROR_MESSAGE)
    typeError.name = 'TypeError'
    throw typeError
  }

  return dogId
}

const validateTreatment = ({
  name,
  stages,
  dogId,
}: TreatmentFields): NewTreatment => {
  const newTreatment: NewTreatment = {
    name: parseName(name),
    stages: parseStages(stages),
    dogId: parseDogId(dogId),
  }

  return newTreatment
}

export default validateTreatment
