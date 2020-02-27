import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskGroupsState } from '../../modules/TaskGroup/types'
import TaskGroupTile from '../TaskGroup/Tile/TakGroupTile'
import Spinner from '../SharedComponents/Spinner'

import './Home.scss'

type Props = TaskGroupsState & { requestUserGroups: () => void }

const Home = ({ isLoading, taskGroups, requestUserGroups, isLoaded }: Props) => {
  useEffect(() => {
    if (!isLoaded) requestUserGroups()
  })

  return (
    <div className="home">
      <Spinner isLoading={isLoading}>
        <div className="home__content">
          //TODO sortowanie
          <div className="home__content__groups">
            {taskGroups && taskGroups.length
              ? taskGroups.map(group => (
                  <TaskGroupTile key={group.id} id={group.id} name={group.name} userTasks={group.userTasks} />
                ))
              : null}
          </div>
          <Link className="home__content__add-new-button" to={`taskGroup/${0}`}>
            <FontAwesomeIcon icon="plus-circle" size="3x" />
          </Link>
        </div>
      </Spinner>
    </div>
  )
}

export default React.memo(Home)
