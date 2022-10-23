import {
  DogGroupField,
  DogQuery,
  DogQueryFields,
  DogSortField,
} from '../types/dogType'
import { SortOrder } from '../types/utilType'
import { isString } from './typeCheck'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGroupField = (param: any): param is DogGroupField => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(DogGroupField).includes(param)
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

const parseGroupField = (groupField: unknown): DogGroupField | undefined => {
  if (!groupField || !isGroupField(groupField)) {
    return undefined
  }
  return groupField
}

const parseSearchField = (searchField: unknown): string => {
  if (!searchField || !isString(searchField)) {
    return ''
  }
  return searchField
}

const validateDogQuery = ({
  sortField,
  sortOrder,
  groupField,
  searchField,
}: DogQueryFields): DogQuery => {
  const dogQuery: DogQuery = {
    sortField: parseSortField(sortField),
    sortOrder: parseSortOrder(sortOrder),
    groupField: parseGroupField(groupField),
    searchField: parseSearchField(searchField),
  }

  return dogQuery
}

export default validateDogQuery
