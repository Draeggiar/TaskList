import React from 'react'

export const TaskStatus = Object.freeze({
  0: 'New',
  1: 'In progress',
  2: 'Completed',
})

type Props = {
  taskStatus: number
  onChange: (value: number) => void
}

const TaskStatusSelect = ({ taskStatus, onChange }: Props) => {
  return (
    <select name="taskStatus" onChange={e => onChange(parseInt(e.target.value))} value={taskStatus}>
      {Object.entries(TaskStatus).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>
  )
}

export default React.memo(TaskStatusSelect)
