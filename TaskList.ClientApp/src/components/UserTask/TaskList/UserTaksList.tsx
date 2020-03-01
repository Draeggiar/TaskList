import React from 'react'
import { UserTask } from '../../../modules/UserTask/types'
import UserTaskTile from '../TaskTile/UserTaskTile'

import './UserTaskList.scss'

type Props = {
  userTasks: UserTask[] | null
  deleteUserTask: (task: UserTask) => void
}

const UserTaskList = ({ userTasks, deleteUserTask }: Props) => {
  return (
    <div className="task-list">
      {userTasks
        ? userTasks.map((task, index) => (
            <UserTaskTile key={index} userTask={task} deleteUserTask={() => deleteUserTask(task)} />
          ))
        : null}
    </div>
  )
}

export default UserTaskList
