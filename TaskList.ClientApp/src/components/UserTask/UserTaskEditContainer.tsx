import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import _find from 'lodash/find'
import UserTaskEdit from './UserTaskEdit'
import { ApplicationState } from '../../store/store'
import { TaskDetails } from '../../modules/UserTask/types'
import { saveUserTask,  } from '../../modules/UserTask/actions'

type OwnProps = RouteComponentProps<{ groupId: string; taskId: string }>

export default connect(
  (state: ApplicationState, ownProps: OwnProps) => {
    const groupId = parseInt(ownProps.match.params.groupId)
    const taskIdAsNumber = parseInt(ownProps.match.params.taskId)
    return {
      selectedTask: taskIdAsNumber
        ? _find(state.tasks.userTasks, (task: TaskDetails) => task.id === taskIdAsNumber)
        : null,
      groupId,
    }
  },
  { saveUserTask }
)(UserTaskEdit)
