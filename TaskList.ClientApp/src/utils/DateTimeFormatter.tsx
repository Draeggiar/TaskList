import moment, { Moment } from 'moment'

const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm'

export const isoToFormatedDateTime = (value: string) => moment(value).format(DATE_TIME_FORMAT)

export const formatedDateTimeToIso = (value: string | Moment) => moment(value, DATE_TIME_FORMAT).format()
