import { DogQuery, DogQueryFields, DogSortField } from '../types/dogType'
import { SortOrder } from '../types/utilType'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDogSortField = (param: any): param is DogSortField => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(DogSortField).includes(param)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSortOrder = (param: any): param is SortOrder => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(SortOrder).includes(param)
}

const parseSortField = (sortField: unknown): DogSortField | undefined => {
  if (!sortField || !isDogSortField(sortField)) {
    return undefined
  }
  return sortField
}

const parseSortOrder = (sortOrder: unknown): SortOrder | undefined => {
  if (!sortOrder || !isSortOrder(sortOrder)) {
    return undefined
  }
  return sortOrder
}

const validateDogQuery = ({
  sortField,
  sortOrder,
}: DogQueryFields): DogQuery => {
  const dogQuery: DogQuery = {
    sortField: parseSortField(sortField),
    sortOrder: parseSortOrder(sortOrder),
  }

  return dogQuery
}

export default validateDogQuery
