import Axios from 'axios'
import { AppThunkAction } from '../../store/store'
import {
  TaskGroup,
  TaskGroupActionTypes,
  TASK_GROUP_LOAD_ALL_COMPLETED,
  TASK_GROUP_LOAD_ALL_STARTED,
  TASK_GROUP_SAVE_COMPLETED,
  TASK_GROUP_ADD_NEW_TASK,
  UserTask,
  TASK_GROUP_CREATE,
  TASK_GROUP_CLEAR_UNSAVED,
  GroupsSortDirection,
  TASK_GROUP_CHANGE_SORT_DIRECTION,
  GroupsSortOrder,
  TASK_GROUP_CHANGE_SORT_ORDER,
} from './types'
import { navigateToGroup } from '../../utils/Navigator'

export const createGroup = (): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_CREATE,
  }
}

const loadAllGroupsStarted = (): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_LOAD_ALL_STARTED,
  }
}

const groupsLoadingCompleted = (taskGroups: TaskGroup[]): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_LOAD_ALL_COMPLETED,
    payload: taskGroups,
  }
}

const saveGroupCompleted = (taskGroup: TaskGroup): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_SAVE_COMPLETED,
    payload: taskGroup,
  }
}

export const addNewTask = (userTask: UserTask): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_ADD_NEW_TASK,
    payload: userTask,
  }
}

export const clearUnsavedGroups = (): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_CLEAR_UNSAVED,
  }
}

export const changeGroupsSortOrder = (newSortOrder: GroupsSortOrder): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_CHANGE_SORT_ORDER,
    payload: newSortOrder,
  }
}

export const changeGroupsSortDirection = (newSortDirection: GroupsSortDirection): TaskGroupActionTypes => {
  return {
    type: TASK_GROUP_CHANGE_SORT_DIRECTION,
    payload: newSortDirection,
  }
}

export const requestTaskGroups = (): AppThunkAction<TaskGroupActionTypes> => (dispatch, getState) => {
  const state = getState()
  if (!state.groups.areLoading && !state.groups.areLoaded) {
    dispatch(loadAllGroupsStarted())
    return Axios.get('api/taskgroup').then(response => {
      dispatch(groupsLoadingCompleted(response.data))
    })
  }
}

export const saveTaskGroup = (taskGroup: TaskGroup): AppThunkAction<TaskGroupActionTypes> => (dispatch, getState) => {
  return taskGroup.id === 0
    ? Axios.post<TaskGroup>('api/taskgroup', taskGroup).then(response => {
        dispatch(saveGroupCompleted(response.data))
        navigateToGroup(response.data.id)
      })
    : Axios.put<TaskGroup>(`api/taskgroup/${taskGroup.id}`, taskGroup).then(() =>
        dispatch(saveGroupCompleted(taskGroup))
      )
}
