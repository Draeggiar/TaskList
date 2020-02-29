import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskGroup } from '../../modules/TaskGroup/types'
import TaskGroupTile from '../TaskGroup/Tile/TakGroupTile'
import Spinner from '../SharedComponents/Spinner'

import './Home.scss'

type Props = {
  areGroupsLoading: boolean
  areGroupsLoaded: boolean
  taskGroups: TaskGroup[]
  requestTaskGroups: () => void
  createGroup: () => void
}

const Home = ({ areGroupsLoading, areGroupsLoaded, taskGroups, requestTaskGroups, createGroup }: Props) => {
  useEffect(() => {
    if (!areGroupsLoaded) requestTaskGroups()
  })

  return (
    <div className="home">
      <Spinner isLoading={areGroupsLoading}>
        <div className="home__content">
          //TODO sortowanie
          <div className="home__content__groups">
            {taskGroups && taskGroups.length
              ? taskGroups.map(group => (
                  <TaskGroupTile key={group.id} id={group.id} name={group.name} userTasks={group.userTasks} />
                ))
              : null}
          </div>
          <Link className="home__content__add-new-button" to={`taskGroup/${0}`} onClick={createGroup}>
            <FontAwesomeIcon icon="plus-circle" size="3x" />
          </Link>
        </div>
      </Spinner>
    </div>
  )
}

export default React.memo(Home)
