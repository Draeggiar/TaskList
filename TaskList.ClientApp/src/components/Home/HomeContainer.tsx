import { connect } from 'react-redux'
import { requestTaskGroups, deleteTaskGroup } from '../../modules/TaskGroup/actions'
import { ApplicationState } from '../../store/store'
import Home from './Home'
import {
  getAreGroupsLoading,
  getAreGroupsLoaded,
  getTaskGroups,
  getGroupsSortOrder,
  getGroupsSortDirection,
} from '../../modules/TaskGroup/selectors'

export default connect(
  (state: ApplicationState) => {
    return {
      areGroupsLoading: getAreGroupsLoading(state),
      areGroupsLoaded: getAreGroupsLoaded(state),
      taskGroups: getTaskGroups(state),
      sortOrder: getGroupsSortOrder(state),
      sortDirection: getGroupsSortDirection(state),
    }
  },
  {
    requestTaskGroups,
    deleteTaskGroup
  }
)(Home)
