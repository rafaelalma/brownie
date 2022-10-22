import { Dog, DogSortField } from '../types/dogType'
import { SortOrder } from '../types/utilType'

const dateComparator = (a: Date | null, b: Date | null) => {
  if (!a || !b) {
    return 0
  }
  return new Date(a).getTime() - new Date(b).getTime()
}

const alphabeticComparator = (a: string, b: string) => {
  return a.toString().localeCompare(b.toString(), 'en', { numeric: true })
}

const numericComparator = (a: number | null, b: number | null) => {
  if (!a || !b) {
    return 0
  }
  return a - b
}

const dogSorter = (
  dogs: Dog[],
  sortField: DogSortField = DogSortField.Name,
  sortOrder: SortOrder = SortOrder.Ascending
) => {
  switch (sortField) {
    case DogSortField.CreateTime:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) => dateComparator(a.createTime, b.createTime))
      } else {
        return dogs.sort((a, b) => dateComparator(b.createTime, a.createTime))
      }
    case DogSortField.UpdateTime:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) => dateComparator(a.updateTime, b.updateTime))
      } else {
        return dogs.sort((a, b) => dateComparator(b.updateTime, a.updateTime))
      }
    case DogSortField.Name:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) => alphabeticComparator(a.name, b.name))
      } else {
        return dogs.sort((a, b) => alphabeticComparator(b.name, a.name))
      }
    case DogSortField.BirthDate:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) => dateComparator(a.birthDate, b.birthDate))
      } else {
        return dogs.sort((a, b) => dateComparator(b.birthDate, a.birthDate))
      }
    case DogSortField.Height:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) => numericComparator(a.height, b.height))
      } else {
        return dogs.sort((a, b) => numericComparator(b.height, a.height))
      }
    case DogSortField.Length:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) => numericComparator(a.length, b.length))
      } else {
        return dogs.sort((a, b) => numericComparator(b.length, a.length))
      }
    case DogSortField.Weight:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) => numericComparator(a.weight, b.weight))
      } else {
        return dogs.sort((a, b) => numericComparator(b.weight, a.weight))
      }
  }
}

export default { dogSorter }
