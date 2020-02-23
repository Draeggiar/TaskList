import React, { useEffect } from 'react'
import { TaskGroupsState } from '../../modules/TaskGroup/types'
import TaskGroupTile from '../TaskGroup/Tile/TakGroupTile'
import { Link } from 'react-router-dom'

import './Home.scss'

type Props = TaskGroupsState & { requestUserGroups: () => void }

const Home = ({ isLoading, taskGroups, requestUserGroups, isLoaded }: Props) => {
  useEffect(() => {
    if (!isLoaded) requestUserGroups()
  })

  //TODO Sortowanie
  return (
    <div className="home">
      {isLoading ? (
        <span className="home__content--loading">Loading</span>
      ) : (
        <div className="home__content">
          <div className="home_content__groups">
            {taskGroups && taskGroups.length
              ? taskGroups.map(group => <TaskGroupTile id={group.id} name={group.name} userTasks={group.userTasks} />)
              : null}
          </div>
          <Link className="home__content__add-new-button" to={`taskGroup/${0}`}>
            Add new
          </Link>
        </div>
      )}
    </div>
  )
}

export default React.memo(Home)
