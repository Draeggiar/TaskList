import { connect } from 'react-redux'
import UserSelect from './UserSelect'
import { ApplicationState } from '../../store/store'
import { requestAllUsers } from '../../modules/User/actions'

export default connect(
  (state: ApplicationState) => {
    return {
      availableUsers: state.users.allUsers,
    }
  },
  {
    requestAllUsers,
  }
)(UserSelect)
