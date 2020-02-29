import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskGroup } from '../../modules/TaskGroup/types'
import UserTaskList from '../UserTask/TaskList/UserTaksList'
import UserTaskEdit from '../UserTask/UserTaskEditContainer'

import './TaskGroupEdit.scss'

type Props = {
  selectedGroup: TaskGroup | null | undefined
  areGroupsLoaded: boolean
  requestTaskGroups: () => void
  saveTaskGroup: (TaskGroup: TaskGroup) => void
  clearUnsavedGroups: () => void
  createGroup: () => void
}

const TaskGroupEdit = ({
  selectedGroup,
  areGroupsLoaded,
  requestTaskGroups,
  saveTaskGroup,
  clearUnsavedGroups,
  createGroup,
}: Props) => {
  const [groupName, setGroupName] = useState('')

  useEffect(() => {
    if (!areGroupsLoaded) {
      requestTaskGroups() //TODO zamienić na pojedynczą grupę
    }
  }, [areGroupsLoaded, requestTaskGroups])

  useEffect(() => {
    selectedGroup ? setGroupName(selectedGroup.name) : createGroup()
  }, [selectedGroup])

  useEffect(() => () => clearUnsavedGroups(), [])

  return selectedGroup ? (
    <div className="task-group-edit">
      <span className="task-group-edit__header">
        <Link className="task-group-edit__header__back-button" to="/">
          <FontAwesomeIcon icon="share-square" flip="horizontal" size="2x" />
        </Link>
        <input
          className="task-group-edit__header__name-input"
          type="text"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <button
          className="task-group-edit__header_save-button btn"
          onClick={() =>
            saveTaskGroup({
              id: selectedGroup.id,
              name: groupName,
              userTasks: selectedGroup.userTasks,
            })
          }
        >
          <FontAwesomeIcon icon="save" size="2x" />
        </button>
      </span>
      <div className="task-group-edit__content">
        <div className="task-group-edit__content__left-column">
          <UserTaskList userTasks={selectedGroup.userTasks} />
        </div>
        <div className="task-group-edit__content__right-column">
          <UserTaskEdit groupId={selectedGroup.id} />
        </div>
      </div>
    </div>
  ) : null
}

export default React.memo(TaskGroupEdit)
