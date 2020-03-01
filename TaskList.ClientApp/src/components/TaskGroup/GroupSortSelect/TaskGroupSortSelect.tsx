import React from 'react'
import { GroupsSortOrder, GroupsSortDirection } from '../../../modules/TaskGroup/types'

type Props = {
  changeGroupsSortOrder: (newSortOrder: number) => void
  changeGroupsSortDirection: (newSortDirection: number) => void
  selectedSortOrder: GroupsSortOrder
  selectedSortDirection: GroupsSortDirection
  className: string
}

const TaskGroupSortSelect = ({
  changeGroupsSortOrder,
  changeGroupsSortDirection,
  selectedSortOrder,
  selectedSortDirection,
  className,
}: Props) => {
  return (
    <div className={className}>
      <span>Sort gropups by </span>
      <select onChange={e => changeGroupsSortOrder(parseInt(e.target.value))} value={selectedSortOrder}>
        <option value={GroupsSortOrder.Name}>name</option>
        <option value={GroupsSortOrder.TasksCount}>tasks count</option>
      </select>
      <select onChange={e => changeGroupsSortDirection(parseInt(e.target.value))} value={selectedSortDirection}>
        <option value={GroupsSortDirection.Ascending}>ascending</option>
        <option value={GroupsSortDirection.Descending}>descending</option>
      </select>
    </div>
  )
}

export default React.memo(TaskGroupSortSelect)
