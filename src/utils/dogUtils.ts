import { Dog, DogGroupField, DogSortField } from '../types/dogType'
import { SortOrder } from '../types/utilType'
import arrayUtils from './arrayUtils'

const dogSorter = (
  dogs: Dog[],
  sortField: DogSortField = DogSortField.Name,
  sortOrder: SortOrder = SortOrder.Ascending
) => {
  switch (sortField) {
    case DogSortField.CreateTime:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) =>
          arrayUtils.dateComparator(a.createTime, b.createTime)
        )
      } else {
        return dogs.sort((a, b) =>
          arrayUtils.dateComparator(b.createTime, a.createTime)
        )
      }
    case DogSortField.UpdateTime:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) =>
          arrayUtils.dateComparator(a.updateTime, b.updateTime)
        )
      } else {
        return dogs.sort((a, b) =>
          arrayUtils.dateComparator(b.updateTime, a.updateTime)
        )
      }
    case DogSortField.Name:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) =>
          arrayUtils.alphabeticComparator(a.name, b.name)
        )
      } else {
        return dogs.sort((a, b) =>
          arrayUtils.alphabeticComparator(b.name, a.name)
        )
      }
    case DogSortField.BirthDate:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) =>
          arrayUtils.dateComparator(a.birthDate, b.birthDate)
        )
      } else {
        return dogs.sort((a, b) =>
          arrayUtils.dateComparator(b.birthDate, a.birthDate)
        )
      }
    case DogSortField.Height:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) =>
          arrayUtils.numericComparator(a.height, b.height)
        )
      } else {
        return dogs.sort((a, b) =>
          arrayUtils.numericComparator(b.height, a.height)
        )
      }
    case DogSortField.Length:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) =>
          arrayUtils.numericComparator(a.length, b.length)
        )
      } else {
        return dogs.sort((a, b) =>
          arrayUtils.numericComparator(b.length, a.length)
        )
      }
    case DogSortField.Weight:
      if (sortOrder === SortOrder.Ascending) {
        return dogs.sort((a, b) =>
          arrayUtils.numericComparator(a.weight, b.weight)
        )
      } else {
        return dogs.sort((a, b) =>
          arrayUtils.numericComparator(b.weight, a.weight)
        )
      }
  }
}

const dogGrouper = (dogs: Dog[], groupField: DogGroupField) => {
  const sortedDogs = dogs.sort((a, b) =>
    arrayUtils.alphabeticComparator(a[groupField], b[groupField])
  )

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const groupedDogs = arrayUtils.groupBy(sortedDogs, groupField)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return groupedDogs
}

const dogFilterer = (dogs: Dog[], searchField: string) => {
  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().startsWith(searchField.toLowerCase())
  )

  return filteredDogs
}

export default { dogSorter, dogGrouper, dogFilterer }
