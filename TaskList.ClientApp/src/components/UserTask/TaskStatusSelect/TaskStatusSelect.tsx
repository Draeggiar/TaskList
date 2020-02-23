import React, { useState } from 'react'

const TaskStatus = Object.freeze({
  0: 'New',
  1: 'In progress',
  2: 'Completed',
})

type Props = {
  taskStatus: number | null
}

const TaskStatusSelect = ({ taskStatus = 0 }: Props) => {
  const [selected, setSelected] = useState(taskStatus)

  return (
    <select name="taskStatus" onChange={e => setSelected(parseInt(e.target.value))}>
      {Object.entries(TaskStatus).map(([key, value]) => (
        <option value={key} selected={selected === parseInt(key)}>
          {value}
        </option>
      ))}
    </select>
  )
}

export default React.memo(TaskStatusSelect)
