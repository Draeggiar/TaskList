export type Dictionary<TVal> = {
  [Key in string | number]: TVal
}

export const convertArrayToObject = (array: any[], key: string | number) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    }
  }, initialValue)
}
