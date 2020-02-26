import React, { useEffect, useState } from 'react'
import { Link, Route, match } from 'react-router-dom'
import { compile } from 'path-to-regexp'
import { TaskGroup } from '../../modules/TaskGroup/types'
import UserTaskList from '../UserTask/TaskList/UserTaskListContainer'
import UserTaskEdit from '../UserTask/UserTaskEditContainer'

import './TaskGroupEdit.scss'

type Props = {
  selectedGroup: TaskGroup | null | undefined
  match: match<{ groupId: string }>
  areGroupsLoaded: boolean
  requestTaskGroups: () => void
  saveTaskGroup: (TaskGroup: TaskGroup) => void
}

const TaskGroupEdit = ({ selectedGroup, match, areGroupsLoaded, requestTaskGroups, saveTaskGroup }: Props) => {
  const [groupName, setGroupName] = useState(selectedGroup ? selectedGroup.name : '')

  useEffect(() => {
    if (!areGroupsLoaded) {
      requestTaskGroups() //TODO zamienić na pojedynczą grupę
    }
  }, [areGroupsLoaded])

  useEffect(() => {
    if (selectedGroup) setGroupName(selectedGroup.name)
  }, [selectedGroup])

  return (
    <div className="task-group-edit">
      <span className="task-group-edit__header">
        <Link to="/">Back</Link>
        <input
          className="task-group-edit__header__name-input"
          type="text"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
        />
        <button
          onClick={() =>
            saveTaskGroup({
              id: selectedGroup ? selectedGroup.id : 0,
              name: groupName,
              userTasks: selectedGroup ? selectedGroup.userTasks : [],
            })
          }
        >
          Save group
        </button>
      </span>
      <div className="task-group-edit__content">
        <div className="task-group-edit__content__left-column">
          {selectedGroup && selectedGroup.userTasks && selectedGroup.userTasks.length ? (
            <UserTaskList match={match} groupId={selectedGroup.id} />
          ) : null}
          <Link to={`${match.url}/userTask/0`}>Add new task</Link>
        </div>
        <div className="task-group-edit__content__right-column">
          <Route path={`${match.path}/userTask/:taskId?`} component={UserTaskEdit} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(TaskGroupEdit)
