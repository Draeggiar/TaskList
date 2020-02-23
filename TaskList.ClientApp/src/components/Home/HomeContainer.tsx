import { connect } from 'react-redux';
import { requestTaskGroups } from '../../modules/TaskGroup/actions'
import { ApplicationState } from '../../store/store';
import Home from './Home'

export default connect(
    (state: ApplicationState) => {
        return state.groups;
    },
    {
        requestUserGroups: requestTaskGroups
    }
)(Home)