import { convertArrayToObject } from '../../utils/Dictionary'

describe('convertArrayToObject', () => {
  it('should return empty object for empty array', () => {
    const array = []

    const result = convertArrayToObject([], 'id')

    expect(result).toEqual({})
  })

  it('should return correct dictionary for array of objects', () => {
    const array = [
      { id: 1, value: 'test1' },
      { id: 2, value: 'test2' },
    ]

    const result = convertArrayToObject(array, 'id')

    expect(result).toEqual({ 1: { id: 1, value: 'test1' }, 2: { id: 2, value: 'test2' } })
  })
})
