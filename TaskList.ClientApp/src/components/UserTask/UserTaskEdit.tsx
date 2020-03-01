import React, { useState } from 'react'
import DateTime from 'react-datetime'
import moment from 'moment'
import TaskStatusSelect from './TaskStatusSelect/TaskStatusSelect'
import { UserTask } from '../../modules/TaskGroup/types'
import { isoToFormatedDateTime, formatedDateTimeToIso } from '../../utils/DateTimeFormatter'
import UserSelect from '../User/UserSelectContainer'
import { User } from '../../modules/User/types'

import './UserTaskEdit.scss'

type Props = {
  addNewTask: (taskDetails: UserTask) => void
  groupId: number
}

const UserTaskEdit = ({ addNewTask, groupId }: Props) => {
  const [name, setName] = useState('')
  const [deadline, setDeadline] = useState(moment().format())
  const [taskStatus, setTaskStatus] = useState(0)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <div className="user-task-edit">
      <span>
        <label>Task name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </span>
      <span>
        <label>Deadline:</label>
        <DateTime
          value={isoToFormatedDateTime(deadline)}
          onChange={value => setDeadline(formatedDateTimeToIso(value))}
        />
      </span>
      <span>
        <label>User:</label>
        <UserSelect selectedUser={selectedUser} onChange={setSelectedUser} />
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
            user: selectedUser,
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
