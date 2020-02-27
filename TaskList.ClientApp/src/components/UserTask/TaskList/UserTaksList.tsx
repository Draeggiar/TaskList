import React, { useEffect } from 'react'
import { Link, match } from 'react-router-dom'
import { SimpleTask } from '../../../modules/UserTask/types'
import { Dictionary } from '../../../utils/Dictionary'
import Spinner from '../../SharedComponents/Spinner'

import './UserTaskList.scss'

type Props = {
  userTasks: Dictionary<SimpleTask>
  match: match
  isLoading: boolean
  requestTasksInGroup: (groupId: number) => void
  groupId: number
  areTaskLoaded: boolean
}

const UserTaskList = ({ userTasks, match, isLoading, requestTasksInGroup, groupId, areTaskLoaded }: Props) => {
  useEffect(() => {
    if (!isLoading && !areTaskLoaded) requestTasksInGroup(groupId)
  })

  return (
    <Spinner isLoading={isLoading}>
      <div className="task-list">
        {Object.entries(userTasks).map(([key, task]) => (
          <Link className="task-list__task-tile" key={key} to={`${match.url}/userTask/${task.id}`}>
            {task.name}
          </Link>
          //TODO remove
        ))}
      </div>
    </Spinner>
  )
}

export default React.memo(UserTaskList)
