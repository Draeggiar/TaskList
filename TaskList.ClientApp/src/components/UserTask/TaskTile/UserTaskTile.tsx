import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserTask } from '../../../modules/TaskGroup/types'

import './UserTask.scss'

type Props = {
  userTask: UserTask
}

const UserTaskTile = ({ userTask }: Props) => {
  return (
    <div className="task-tile">
      <button className="task-tile__remove-task-button btn">
        <FontAwesomeIcon icon="trash-alt" />
      </button>
      <span>{userTask.name}</span>
      <span>{moment(userTask.deadline).format(moment.HTML5_FMT.DATE)}</span>
      <span>{userTask.taskStatus}</span>
      <span>{userTask.user}</span>
    </div>
  )
}

export default React.memo(UserTaskTile)
