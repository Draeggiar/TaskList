import { isoToFormatedDateTime, formatedDateTimeToIso } from '../../utils/DateTimeFormatter'

describe('DateTimeFormatter', () => {
  describe('isoToFormatedDateTime', () => {
    ;[
      { value: '2003-02-01T04:05', expected: '1-02-2003 4:05' },
      { value: '2003-02-01T14:05:06', expected: '1-02-2003 14:05' },
      { value: '2020-02-29T00:00', expected: '29-02-2020 0:00' },
      { value: '2003-02-01T04:05:00+01:00', expected: '1-02-2003 4:05' },
    ].forEach(testCase => {
      it('should return correct formated value', () => {
        const result = isoToFormatedDateTime(testCase.value)

        expect(result).toBe(testCase.expected)
      })
    })
  })

  describe('formatedDateTimeToIso', () => {
    ;[
      { value: '1-02-2003 4:05', expected: '2003-02-01T04:05:00+01:00' },
      { value: '15-12-2020 16:26', expected: '2020-12-15T16:26:00+01:00' },
    ].forEach(testCase => {
      it('should return correct iso value', () => {
        const result = formatedDateTimeToIso(testCase.value)

        expect(result).toBe(testCase.expected)
      })
    })
  })
})
