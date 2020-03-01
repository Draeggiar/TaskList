import React from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserTask, TaskStatus } from '../../../modules/UserTask/types'
import { isoToFormatedDateTime } from '../../../utils/DateTimeFormatter'
import { TaskStatusNames } from '../TaskStatusSelect/TaskStatusSelect'

import './UserTask.scss'

type Props = {
  userTask: UserTask
  deleteUserTask: () => void
}

const UserTaskTile = ({ userTask, deleteUserTask }: Props) => {
  return (
    <div
      className={classnames(
        'task-tile',
        { '--new': userTask.taskStatus === TaskStatus.New },
        { '--in-progress': userTask.taskStatus === TaskStatus.InProgress },
        { '--completed': userTask.taskStatus === TaskStatus.Completed }
      )}
    >
      <button className="task-tile__remove-task-button btn" onClick={deleteUserTask}>
        <FontAwesomeIcon icon="trash-alt" />
      </button>
      <span>{userTask.name}</span>
      <span>{isoToFormatedDateTime(userTask.deadline)}</span>
      <span>{TaskStatusNames[userTask.taskStatus]}</span>
      {userTask.user ? <span>{`${userTask.user?.firstName} ${userTask.user?.lastName}`}</span> : null}
    </div>
  )
}

export default React.memo(UserTaskTile)
