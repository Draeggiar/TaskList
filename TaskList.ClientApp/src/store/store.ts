import taskGroupReducer from '../modules/TaskGroup/reducer'
import { TaskGroupsState } from '../modules/TaskGroup/types'

export interface ApplicationState {
  groups: TaskGroupsState
}

export const reducers = {
  groups: taskGroupReducer,
}

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void
}
