import React from 'react'
import _isEqual from 'lodash/isEqual'
import { UserTask } from '../../../modules/TaskGroup/types'
import UserTaskTile from '../TaskTile/UserTaskTile'

import './UserTaskList.scss'

type Props = {
  userTasks: UserTask[] | null
}

const UserTaskList = ({ userTasks }: Props) => {
  return (
    <div className="task-list">
      {userTasks ? userTasks.map((task, index) => <UserTaskTile key={index} userTask={task} />) : null}
    </div>
  )
}

export default React.memo(UserTaskList, (prevProps, nextProps) => !_isEqual(prevProps.userTasks, nextProps.userTasks))
