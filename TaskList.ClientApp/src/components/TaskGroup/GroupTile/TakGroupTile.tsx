import React from 'react'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserTask } from '../../../modules/UserTask/types'

import './TaskGroupTile.scss'

type Props = {
  id: number
  name: string
  userTasks: UserTask[]
  deleteTaskGroup: () => void
}

const TaskGroupTile = ({ id, name, userTasks, deleteTaskGroup }: Props) => {
  const history = useHistory()

  return (
    <div className="task-group-tile" onClick={() => history.push(`/taskGroup/${id}`)}>
      <button
        className="task-group-tile__remove-group-button btn"
        onClick={e => {
          deleteTaskGroup()
          e.stopPropagation()
        }}
      >
        <FontAwesomeIcon icon="trash-alt" />
      </button>
      <span className="task-group-tile__name">{name}</span>
      <span className="task-group-tile__task-count">{userTasks.length}</span>
    </div>
  )
}

export default React.memo(TaskGroupTile)
