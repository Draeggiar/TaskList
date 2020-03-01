import { connect } from 'react-redux'
import TaskGroupSortSelect from './TaskGroupSortSelect'
import { changeGroupsSortOrder, changeGroupsSortDirection } from '../../../modules/TaskGroup/actions'

export default connect(() => {}, { changeGroupsSortOrder, changeGroupsSortDirection })(TaskGroupSortSelect)
