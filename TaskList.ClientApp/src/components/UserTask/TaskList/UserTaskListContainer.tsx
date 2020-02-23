import { connect } from 'react-redux'
import UserTaksList from './UserTaksList'
import { ApplicationState } from '../../../store/store'
import { requestTasksInGroup } from '../../../modules/UserTask/actions'

export default connect(
  (state: ApplicationState) => {
    return {
      userTasks: state.tasks.userTasks,
      isLoading: state.tasks.isLoading,
      areTaskLoaded: state.tasks.isLoaded,
    }
  },
  { requestTasksInGroup }
)(UserTaksList)
