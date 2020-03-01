import React, { useState } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TaskStatusSelect from './TaskStatusSelect/TaskStatusSelect'
import { UserTask } from '../../modules/UserTask/types'
import DateTimePicker from '../SharedComponents/DateTimePicker/DateTimePicker'
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
        <DateTimePicker value={deadline} onChange={setDeadline} />
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
        className="btn"
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
        <FontAwesomeIcon icon="plus-circle" size="2x" />
      </button>
    </div>
  )
}

export default React.memo(UserTaskEdit)
