import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import TaskGroupEdit from './TaskGroupEdit'
import { ApplicationState } from '../../store/store'
import { requestTaskGroups, saveTaskGroup, clearUnsavedGroups, createGroup } from '../../modules/TaskGroup/actions'
import { deleteUserTask, addNewTask } from '../../modules/UserTask/actions'

type OwnProps = RouteComponentProps<{ groupId: string }>

export default connect(
  (state: ApplicationState, ownProps: OwnProps) => {
    const groupIdAsNumber = parseInt(ownProps.match.params.groupId)
    return {
      selectedGroup: state.groups.taskGroups.find(g => g.id === groupIdAsNumber),
      areGroupsLoaded: state.groups.areLoaded,
    }
  },
  {
    requestTaskGroups,
    saveTaskGroup,
    clearUnsavedGroups,
    createGroup,
    deleteUserTask,
    addNewTask,
  }
)(TaskGroupEdit)
