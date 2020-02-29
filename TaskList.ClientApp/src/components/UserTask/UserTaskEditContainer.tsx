import { connect } from 'react-redux'
import UserTaskEdit from './UserTaskEdit'
import { addNewTask } from '../../modules/TaskGroup/actions'

export default connect(() => {}, { addNewTask })(UserTaskEdit)
