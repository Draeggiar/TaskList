import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import TaskGroupEdit from './TaskGroupEdit'
import { ApplicationState } from '../../store/store'
import { requestTaskGroups } from '../../modules/TaskGroup/actions'

type OwnProps = RouteComponentProps<{ groupId: string }>

export default connect(
  (state: ApplicationState, ownProps: OwnProps) => {
    const groupIdAsNumber = parseInt(ownProps.match.params.groupId)
    return {
      selectedGroup: groupIdAsNumber ? state.groups.taskGroups.find(g => g.id === groupIdAsNumber) : null,
      areGroupsLoaded: state.groups.isLoaded,
    }
  },
  {
    requestTaskGroups,
  }
)(TaskGroupEdit)
