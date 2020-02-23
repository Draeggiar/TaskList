import taskGroupReducer from '../modules/TaskGroup/reducer'
import { TaskGroupsState } from '../modules/TaskGroup/types'
import { UserTasksState } from '../modules/UserTask/types'
import userTaskReducer from '../modules/UserTask/reducer'

export interface ApplicationState {
  groups: TaskGroupsState
  tasks: UserTasksState
}

export const reducers = {
  groups: taskGroupReducer,
  tasks: userTaskReducer,
}

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void
}
