import React, { useState } from 'react'

const TaskStatus = Object.freeze({
  0: 'New',
  1: 'In progress',
  2: 'Completed',
})

type Props = {
  taskStatus: number
  onChange: (value: number) => void
}

const TaskStatusSelect = ({ taskStatus = 0, onChange }: Props) => {
  const [selected, setSelected] = useState(taskStatus)

  const onSelectChange = (value: number) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <select name="taskStatus" onChange={e => onSelectChange(parseInt(e.target.value))} defaultValue={selected}>
      {Object.entries(TaskStatus).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  )
}

export default React.memo(TaskStatusSelect)
