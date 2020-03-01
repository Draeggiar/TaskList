import { Reducer } from 'redux'
import _isEqual from 'lodash/isEqual'
import {
  TaskGroupsState,
  TaskGroupActionTypes,
  TASK_GROUP_LOAD_ALL_STARTED,
  TASK_GROUP_LOAD_ALL_COMPLETED,
  TASK_GROUP_SAVE_COMPLETED,
  TASK_GROUP_CREATE,
  TASK_GROUP_CLEAR_UNSAVED,
  TASK_GROUP_CHANGE_SORT_DIRECTION,
  GroupsSortOrder,
  GroupsSortDirection,
  TASK_GROUP_CHANGE_SORT_ORDER,
  TASK_GROUP_DELETE_COMPLETED,
} from './types'
import { UserTaskActionTypes, USER_TASK_DELETE_COMPLETED, USER_TASK_ADD_NEW } from '../UserTask/types'

const initialState: TaskGroupsState = {
  areLoading: false,
  areLoaded: false,
  taskGroups: [],
  sortOrder: GroupsSortOrder.Name,
  sortDirection: GroupsSortDirection.Ascending,
}

const reducer: Reducer<TaskGroupsState> = (
  state = initialState,
  action: TaskGroupActionTypes | UserTaskActionTypes
) => {
  switch (action.type) {
    case TASK_GROUP_CREATE:
      const newGroupsState = state.taskGroups
      newGroupsState.push({ id: 0, name: '', userTasks: [] })
      return { ...state, taskGroups: newGroupsState }
    case TASK_GROUP_LOAD_ALL_STARTED:
      return { ...state, areLoading: true, areLoaded: false }
    case TASK_GROUP_LOAD_ALL_COMPLETED:
      return { ...state, areLoading: false, areLoaded: true, taskGroups: action.payload }
    case TASK_GROUP_SAVE_COMPLETED: {
      const newGroupsState = [...state.taskGroups]

      let groupIndex = state.taskGroups.findIndex(g => g.id === action.payload.id)
      if (groupIndex === -1) groupIndex = state.taskGroups.findIndex(g => g.id === 0)
      if (groupIndex !== -1) newGroupsState.splice(groupIndex, 1)

      newGroupsState.push(action.payload)

      return { ...state, taskGroups: newGroupsState }
    }
    case TASK_GROUP_CLEAR_UNSAVED: {
      const newGroupsState = state.taskGroups.filter(g => g.id !== 0)
      return { ...state, taskGroups: newGroupsState }
    }
    case TASK_GROUP_CHANGE_SORT_ORDER:
      return { ...state, sortOrder: action.payload }
    case TASK_GROUP_CHANGE_SORT_DIRECTION:
      return { ...state, sortDirection: action.payload }
    case TASK_GROUP_DELETE_COMPLETED: {
      const newGroupsState = state.taskGroups.filter(group => group.id !== action.payload)
      return { ...state, taskGroups: newGroupsState }
    }
    case USER_TASK_ADD_NEW: {
      const newGroupsState = state.taskGroups.map(group => {
        if (group.id !== action.payload.groupId) return group

        group.userTasks.push(action.payload)
        return {
          ...group,
        }
      })

      return { ...state, taskGroups: newGroupsState }
    }
    case USER_TASK_DELETE_COMPLETED: {
      const newGroupsState = state.taskGroups.map(group => {
        if (group.id !== action.payload.groupId) return group

        const newTasksState = group.userTasks
        const taskToDeleteIndex = newTasksState.indexOf(action.payload)
        newTasksState.splice(taskToDeleteIndex, 1)
        return {
          ...group,
          userTasks: newTasksState,
        }
      })

      return { ...state, taskGroups: newGroupsState }
    }
    default:
      return state
  }
}

export default reducer
