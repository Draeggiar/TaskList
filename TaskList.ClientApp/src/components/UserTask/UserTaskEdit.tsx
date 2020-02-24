import React, { useState } from 'react'
import DateTime from 'react-datetime'
import moment from 'moment'
import TaskStatusSelect from './TaskStatusSelect/TaskStatusSelect'
import { TaskDetails } from '../../modules/UserTask/types'

import './UserTaskEdit.scss'

type Props = {
  selectedTask: TaskDetails | null | undefined
}

const UserTaskEdit = ({ selectedTask }: Props) => {
  const [name, setName] = useState(selectedTask ? selectedTask.name : '')
  const [deadline, setDeadline] = useState(selectedTask ? selectedTask.deadline : '')
  const [status, setStatus] = useState(selectedTask ? selectedTask.taskStatus : 0)

  return (
    <div className="user-task-edit">
      <span>
        <label>Task name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </span>
      <span>
        <label>Deadline:</label>
        <DateTime
          timeFormat={false}
          value={deadline}
          onChange={value => setDeadline(moment(value).format(moment.HTML5_FMT.DATE))}
        />
      </span>
      <span>
        <label>User:</label>
        //TODO User select
      </span>
      <span>
        <label>Status:</label>
        <TaskStatusSelect taskStatus={status} onChange={setStatus} />
      </span>
      <button>Save task</button>
    </div>
  )
}

export default React.memo(UserTaskEdit)
