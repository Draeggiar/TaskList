import React from 'react'
import { TaskStatus } from '../../../modules/UserTask/types'

export const TaskStatusNames = Object.freeze({
  0: 'New',
  1: 'In progress',
  2: 'Completed',
})

type Props = {
  taskStatus: TaskStatus
  onChange: (value: number) => void
}

const TaskStatusSelect = ({ taskStatus, onChange }: Props) => {
  return (
    <select name="taskStatus" onChange={e => onChange(parseInt(e.target.value))} value={taskStatus}>
      <option value={TaskStatus.New}>{TaskStatusNames[TaskStatus.New]}</option>
      <option value={TaskStatus.InProgress}>{TaskStatusNames[TaskStatus.InProgress]}</option>
      <option value={TaskStatus.Completed}>{TaskStatusNames[TaskStatus.Completed]}</option>
    </select>
  )
}

export default React.memo(TaskStatusSelect)
