import React from 'react'
import { TaskGroup } from '../../../modules/TaskGroup/types'

import './TaskGroupTile.scss'
import { useHistory } from 'react-router'

type Props = TaskGroup

const TaskGroupTile = ({ id, name, userTasks }: Props) => {
  const history = useHistory()
  return (
    <div className="task-group-tile" key={id} onClick={() => history.push(`/taskGroup/${id}`)}>
      <span className="task-group-tile__name">{name}</span>
      <span className="task-group-tile__task-count">{userTasks.length}</span>
    </div>
  )
}

export default React.memo(TaskGroupTile)