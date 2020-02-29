import React, { useState } from 'react'
import DateTime from 'react-datetime'
import moment from 'moment'
import TaskStatusSelect from './TaskStatusSelect/TaskStatusSelect'
import { UserTask } from '../../modules/TaskGroup/types'

import './UserTaskEdit.scss'

type Props = {
  addNewTask: (taskDetails: UserTask) => void
  groupId: number
}

const UserTaskEdit = ({ addNewTask, groupId }: Props) => {
  const [name, setName] = useState('')
  const [deadline, setDeadline] = useState(new Date().toString())
  const [taskStatus, setTaskStatus] = useState(0)

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
          value={moment(deadline).format(moment.HTML5_FMT.DATE)}
          onChange={value => setDeadline(moment(value).format(moment.HTML5_FMT.DATE))}
        />
      </span>
      <span>
        <label>User:</label>
        //TODO User select
      </span>
      <span>
        <label>Status:</label>
        <TaskStatusSelect taskStatus={taskStatus} onChange={setTaskStatus} />
      </span>
      <button
        onClick={() =>
          addNewTask({
            id: null,
            name,
            deadline,
            taskStatus,
            userId: null,
            groupId: groupId,
          })
        }
      >
        Add task
      </button>
    </div>
  )
}

export default React.memo(UserTaskEdit)
