import { connect } from 'react-redux'
import { requestTaskGroups } from '../../modules/TaskGroup/actions'
import { ApplicationState } from '../../store/store'
import Home from './Home'

export default connect(
  (state: ApplicationState) => {
    return {
      areGroupsLoading: state.groups.areLoading,
      areGroupsLoaded: state.groups.areLoaded,
      taskGroups: state.groups.taskGroups,
    }
  },
  {
    requestTaskGroups,
  }
)(Home)
