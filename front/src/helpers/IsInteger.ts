export const IsInteger = (value: string | number) => {
  if (typeof value === 'string' && value.trim() !== '') {
    return Number.isInteger(Number(value.trim()))
  }
  return false
}
