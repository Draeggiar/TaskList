import { Reducer } from 'redux'
import {
  UserTasksState,
  USER_TASK_LOAD_STARTED,
  USER_TASK_LOAD_COMPLETED,
  USER_TASK_LOAD_ALL_IN_GROUP_STARTED,
  USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED,
} from './types'

const initialState: UserTasksState = {
  userTasks: {},
  isLoading: false,
  isLoaded: false,
}

const reducer: Reducer<UserTasksState> = (state: UserTasksState = initialState, action) => {
  switch (action.type) {
    case USER_TASK_LOAD_STARTED:
      return state
    case USER_TASK_LOAD_COMPLETED:
      state.userTasks[action.payload.id] = action.payload
      return Object.assign({}, state)
    case USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED:
      return Object.assign({}, state, {
        userTasks: Object.assign({}, state.userTasks, action.payload),
        isLoading: false,
        isLoaded: true,
      })
    case USER_TASK_LOAD_ALL_IN_GROUP_STARTED:
      return Object.assign({}, state, { isLoading: true, isLoaded: false })
    default:
      return state
  }
}

export default reducer
