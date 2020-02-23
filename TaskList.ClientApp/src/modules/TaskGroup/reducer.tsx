import { Reducer } from 'redux'
import {
  TaskGroupsState,
  TaskGroupActionTypes,
  TASK_GROUP_LOAD_ALL_STARTED,
  TASK_GROUP_LOAD_ALL_COMPLETED,
} from './types'

const initialState: TaskGroupsState = {
  isLoading: false,
  isLoaded: false,
  taskGroups: [],
}

const reducer: Reducer<TaskGroupsState> = (state: TaskGroupsState = initialState, action: TaskGroupActionTypes) => {
  switch (action.type) {
    case TASK_GROUP_LOAD_ALL_STARTED:
      return Object.assign({}, state, { isLoading: true, isLoaded: false })
    case TASK_GROUP_LOAD_ALL_COMPLETED:
      return {
        isLoading: false,
        isLoaded: true,
        taskGroups: action.payload,
      }
    default:
      return state
  }
}

export default reducer
