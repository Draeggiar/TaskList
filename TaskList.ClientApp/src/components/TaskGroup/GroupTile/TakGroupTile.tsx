import React from 'react'
import { useHistory } from 'react-router'
import { TaskGroup } from '../../../modules/TaskGroup/types'

import './TaskGroupTile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = TaskGroup

const TaskGroupTile = ({ id, name, userTasks }: Props) => {
  const history = useHistory()
  return (
    <div className="task-group-tile" onClick={() => history.push(`/taskGroup/${id}`)}>
      <button className="task-group-tile__remove-group-button btn" onClick={e => {e.stopPropagation()}}>
        <FontAwesomeIcon icon="trash-alt" />
      </button>
      <span className="task-group-tile__name">{name}</span>
      <span className="task-group-tile__task-count">{userTasks.length}</span>
    </div>
  )
}

export default React.memo(TaskGroupTile)
