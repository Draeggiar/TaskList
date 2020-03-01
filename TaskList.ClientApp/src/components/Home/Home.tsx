import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskGroup, GroupsSortOrder, GroupsSortDirection } from '../../modules/TaskGroup/types'
import TaskGroupTile from '../TaskGroup/GroupTile/TakGroupTile'
import Spinner from '../SharedComponents/Spinner'
import TaskGroupSortSelect from '../TaskGroup/GroupSortSelect/TaskGroupSortSelectContainer'

import './Home.scss'

type Props = {
  areGroupsLoading: boolean
  areGroupsLoaded: boolean
  taskGroups: TaskGroup[]
  requestTaskGroups: () => void
  sortOrder: GroupsSortOrder
  sortDirection: GroupsSortDirection
}

const Home = ({
  areGroupsLoading,
  areGroupsLoaded,
  taskGroups,
  requestTaskGroups,
  sortOrder,
  sortDirection,
}: Props) => {
  const [sortedGroups, setSortedGroups] = useState(taskGroups)

  useEffect(() => {
    if (!areGroupsLoaded) requestTaskGroups()
  })

  useEffect(() => {
    const newSort = [...taskGroups]
    newSort.sort(
      sortOrder === GroupsSortOrder.Name
        ? (a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
          }
        : (a, b) => {
            if (a.userTasks.length > b.userTasks.length) return -1
            if (a.userTasks.length < b.userTasks.length) return 1
            return 0
          }
    )
    if (sortDirection === GroupsSortDirection.Descending) newSort.reverse()
    setSortedGroups(newSort)
  }, [sortOrder, sortDirection, taskGroups])

  return (
    <div className="home">
      <Spinner isLoading={areGroupsLoading}>
        <div className="home__content">
          <TaskGroupSortSelect className="home__content__sort-select" selectedSortOrder={sortOrder} selectedSortDirection={sortDirection} />
          <div className="home__content__groups">
            {taskGroups && taskGroups.length
              ? sortedGroups.map((group, index) => (
                  <TaskGroupTile
                    key={`${index}_${group.id}`}
                    id={group.id}
                    name={group.name}
                    userTasks={group.userTasks}
                  />
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
