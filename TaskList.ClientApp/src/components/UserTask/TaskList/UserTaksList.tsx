import React from 'react'
import { UserTask } from '../../../modules/TaskGroup/types'

import './UserTaskList.scss'

type Props = {
  userTasks: UserTask[] | null
}

const UserTaskList = ({ userTasks }: Props) => {
  return (
    <div className="task-list">
      {userTasks
        ? userTasks.map((task, index) => (
            <div key={index} className="task-list__task-tile">
              <>
                {task.name}
                <button>//TODO remove</button>
              </>
            </div>
          ))
        : null}
    </div>
  )
}

export default React.memo(UserTaskList)
