import { Reducer } from 'redux'
import {
  TaskGroupsState,
  TaskGroupActionTypes,
  TASK_GROUP_LOAD_ALL_STARTED,
  TASK_GROUP_LOAD_ALL_COMPLETED,
  TASK_GROUP_SAVE_COMPLETED,
  TASK_GROUP_ADD_NEW_TASK,
  TASK_GROUP_CREATE,
  TASK_GROUP_CLEAR_UNSAVED,
} from './types'

const initialState: TaskGroupsState = {
  areLoading: false,
  areLoaded: false,
  taskGroups: [],
}

const reducer: Reducer<TaskGroupsState> = (state: TaskGroupsState = initialState, action: TaskGroupActionTypes) => {
  switch (action.type) {
    case TASK_GROUP_CREATE:
      const newGroupsState = state.taskGroups
      newGroupsState.push({ id: 0, name: '', userTasks: [] })
      return { ...state, taskGroups: newGroupsState }
    case TASK_GROUP_LOAD_ALL_STARTED:
      return Object.assign({}, state, { areLoading: true, areLoaded: false })
    case TASK_GROUP_LOAD_ALL_COMPLETED:
      return {
        areLoading: false,
        areLoaded: true,
        taskGroups: action.payload,
      }
    case TASK_GROUP_SAVE_COMPLETED: {
      const newGroupsState = [...state.taskGroups]

      let groupIndex = state.taskGroups.findIndex(g => g.id === action.payload.id)
      if (groupIndex === -1) groupIndex = state.taskGroups.findIndex(g => g.id === 0)
      if (groupIndex !== -1) newGroupsState.splice(groupIndex, 1)

      newGroupsState.push(action.payload)

      return { ...state, taskGroups: newGroupsState }
    }
    case TASK_GROUP_ADD_NEW_TASK: {
      const newGroupsState = state.taskGroups.map(group => {
        if (group.id !== action.payload.groupId) return group

        group.userTasks.push(action.payload)
        return {
          ...group,
        }
      })

      return { ...state, taskGroups: newGroupsState }
    }
    case TASK_GROUP_CLEAR_UNSAVED: {
      const newGroupsState = state.taskGroups.filter(g => g.id !== 0)
      return { ...state, taskGroups: newGroupsState }
    }
    default:
      return state
  }
}

export default reducer
