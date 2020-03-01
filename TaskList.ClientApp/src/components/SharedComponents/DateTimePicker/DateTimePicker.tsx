import React, { useState, useEffect } from 'react'
import DateTime from 'react-datetime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isoToFormatedDateTime, formatedDateTimeToIso } from '../../../utils/DateTimeFormatter'

import './DateTimePicker.scss'

type Props = {
  onChange: (value: string) => void
  value: string
}

const DateTimePicker = ({ value, onChange }: Props) => {
  const [inputDateTime, setInputDateTime] = useState(value)
  const [datePickerOpened, setDatePickerOpened] = useState(false)

  useEffect(() => {
    onChange(inputDateTime)
  }, [datePickerOpened])

  return (
    <div className="date-time-picker">
      <DateTime
        className="date-time-picker__input"
        open={datePickerOpened}
        value={datePickerOpened ? isoToFormatedDateTime(inputDateTime) : isoToFormatedDateTime(value)}
        onChange={value => setInputDateTime(formatedDateTimeToIso(value))}
        onBlur={() => {
          onChange(inputDateTime)
        }}
        dateFormat="DD-MM-YYYY"
        timeFormat="HH:mm"
      />
      <button className="date-time-picker__calendar-button btn" onClick={() => setDatePickerOpened(!datePickerOpened)}>
        <FontAwesomeIcon icon="calendar-alt" />
      </button>
    </div>
  )
}

export default React.memo(DateTimePicker)
