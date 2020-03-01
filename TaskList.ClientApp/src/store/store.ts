import taskGroupReducer from '../modules/TaskGroup/reducer'
import { TaskGroupsState } from '../modules/TaskGroup/types'
import usersReducer from '../modules/User/reducer'
import { UsersState } from '../modules/User/types'

export interface ApplicationState {
  groups: TaskGroupsState
  users: UsersState
}

export const reducers = {
  groups: taskGroupReducer,
  users: usersReducer,
}

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void
}
