import { connect } from 'react-redux'
import { requestTaskGroups } from '../../modules/TaskGroup/actions'
import { ApplicationState } from '../../store/store'
import Home from './Home'
import { getAreGroupsLoading, getAreGroupsLoaded, getTaskGroups } from '../../modules/TaskGroup/selectors'

export default connect(
  (state: ApplicationState) => {
    return {
      areGroupsLoading: getAreGroupsLoading(state),
      areGroupsLoaded: getAreGroupsLoaded(state),
      taskGroups: getTaskGroups(state),
    }
  },
  {
    requestTaskGroups,
  }
)(Home)
