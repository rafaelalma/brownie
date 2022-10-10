export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean' || value instanceof Boolean
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const isArray = (list: unknown): list is Array<unknown> => {
  return list instanceof Array
}
