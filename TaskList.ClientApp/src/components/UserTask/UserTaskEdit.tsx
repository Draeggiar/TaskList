import React from 'react'
import DateTime from 'react-datetime'
import TaskStatusSelect from './TaskStatusSelect/TaskStatusSelect'
import { TaskDetails } from '../../modules/UserTask/types'

import './UserTaskEdit.scss'

type Props = {
  selectedTask: TaskDetails | null | undefined
}

const UserTaskEdit = ({ selectedTask }: Props) => {
  return (
    <div className="user-task-edit">
      <span>
        <label>Task name:</label>
        <input type="text" value={selectedTask ? selectedTask.name : ''} />
      </span>
      <span>
        <label>Deadline:</label>
        <DateTime />
      </span>
      <span>
        <label>User:</label>
      </span>
      <span>
        <label>Status:</label>
        <TaskStatusSelect taskStatus={selectedTask ? selectedTask.taskStatus : null} />
      </span>
      <button>Save task</button>
    </div>
  )
}

export default React.memo(UserTaskEdit)
