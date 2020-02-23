import React, { useEffect } from 'react'
import { Link, Route, match } from 'react-router-dom'
import { TaskGroup } from '../../modules/TaskGroup/types'
import UserTaskList from '../UserTask/TaskList/UserTaskListContainer'
import UserTaskEdit from '../UserTask/UserTaskEditContainer'

import './TaskGroupEdit.scss'

type Props = {
  selectedGroup: TaskGroup | null | undefined
  match: match
  areGroupsLoaded: boolean
  requestTaskGroups: () => void
}

const TaskGroupEdit = ({ selectedGroup, match, areGroupsLoaded, requestTaskGroups }: Props) => {
  useEffect(() => {
    if (!areGroupsLoaded) {
      requestTaskGroups() //TODO zamienić na pojedynczą grupę
    }
  })

  return (
    <div className="task-group-edit">
      <span className="task-group-edit__header">
        <form>
          <Link to="/">Back</Link>
          <input
            className="task-group-edit__header__name-input"
            type="text"
            value={selectedGroup ? selectedGroup.name : ''}
          />
          <input type="submit" value="Save group" />
        </form>
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
