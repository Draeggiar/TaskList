import React from 'react'
import _find from 'lodash/find'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserTask } from '../../../modules/TaskGroup/types'
import { isoToFormatedDateTime } from '../../../utils/DateTimeFormatter'
import { TaskStatus } from '../TaskStatusSelect/TaskStatusSelect'

import './UserTask.scss'

type Props = {
  userTask: UserTask
}

const UserTaskTile = ({ userTask }: Props) => {
  const matchStatusWithName = () => {
    const status = Object.entries(TaskStatus).find(keyValue => keyValue[0] === userTask.taskStatus.toString())
    return status ? status[1] : null
  }

  return (
    <div className="task-tile">
      <button className="task-tile__remove-task-button btn">
        <FontAwesomeIcon icon="trash-alt" />
      </button>
      <span>{userTask.name}</span>
      <span>{isoToFormatedDateTime(userTask.deadline)}</span>
      <span>{matchStatusWithName()}</span>
      {userTask.user ? <span>{`${userTask.user?.firstName} ${userTask.user?.lastName}`}</span> : null}
    </div>
  )
}

export default React.memo(UserTaskTile)
