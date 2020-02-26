import { Reducer, AnyAction } from 'redux'
import _find from 'lodash/find'
import {
  UserTasksState,
  USER_TASK_LOAD_COMPLETED,
  USER_TASK_LOAD_ALL_IN_GROUP_STARTED,
  USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED,
  USER_TASK_SAVE_COMPLETED,
  UserTaskActionTypes,
} from './types'
import { convertArrayToObject } from '../../utils/Dictionary'

const initialState: UserTasksState = {
  userTasks: {},
  isLoading: false,
  isLoaded: false,
}

const reducer: Reducer<UserTasksState> = (
  state: UserTasksState = initialState,
  action: UserTaskActionTypes | AnyAction
) => {
  switch (action.type) {
    case USER_TASK_LOAD_COMPLETED:
      state.userTasks[action.payload.id] = action.payload
      return Object.assign({}, state)
    case USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED:
      return Object.assign({}, state, {
        userTasks: Object.assign({}, state.userTasks, convertArrayToObject(action.payload, 'id')),
        isLoading: false,
        isLoaded: true,
      })
    case USER_TASK_LOAD_ALL_IN_GROUP_STARTED:
      return Object.assign({}, state, { isLoading: true, isLoaded: false })
    case USER_TASK_SAVE_COMPLETED:
      const newTasksState = state.userTasks
      newTasksState[action.payload.id] = Object.assign({}, action.payload)
      return Object.assign({}, state, { userTasks: newTasksState })
    default:
      return state
  }
}

export default reducer
