const dateComparator = (a: Date | null, b: Date | null) => {
  if (!a || !b) {
    return 0
  }
  return new Date(a).getTime() - new Date(b).getTime()
}

const alphabeticComparator = (a: string | null, b: string | null) => {
  if (!a || !b) {
    return 0
  }
  return a.toString().localeCompare(b.toString(), 'en', { numeric: true })
}

const numericComparator = (a: number | null, b: number | null) => {
  if (!a || !b) {
    return 0
  }
  return a - b
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupBy = (array: any[], field: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return array.reduce((result, currentValue) => {
    if (!result[currentValue[field]]) {
      result[currentValue[field]] = []
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    result[currentValue[field]].push(currentValue)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result
  }, {})
}

export default {
  dateComparator,
  alphabeticComparator,
  numericComparator,
  groupBy,
}
