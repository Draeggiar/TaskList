import React, { useEffect } from 'react'
import { Link, match } from 'react-router-dom'
import { SimpleTask } from '../../../modules/UserTask/types'
import { Dictionary } from '../../../utils/CommonTypes'

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

  return isLoading ? (
    <span>Loading ... </span>
  ) : (
    <div>
      {Object.entries(userTasks).map(([key, task]) => (
        <Link key={task.id} to={`${match.url}/userTask/${task.id}`}>
          {task.name}
        </Link>
      ))}
    </div>
  )
}

export default React.memo(UserTaskList)
