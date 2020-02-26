import Axios from 'axios'
import { AppThunkAction } from '../../store/store'
import {
  TaskGroup,
  TaskGroupActionTypes,
  TASK_GROUP_LOAD_ALL_COMPLETED,
  TASK_GROUP_LOAD_ALL_STARTED,
  TASK_GROUP_SAVE_COMPLETED,
} from './types'
import { navigateToGroup } from '../../utils/Navigator'

const loadAllGroups = (): TaskGroupActionTypes => {
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

export const requestTaskGroups = (): AppThunkAction<TaskGroupActionTypes> => (dispatch, getState) => {
  const state = getState()
  if (!state.groups.isLoading && !state.groups.isLoaded) {
    dispatch(loadAllGroups())
    fetch('api/taskgroup')
      .then(response => response.json() as Promise<TaskGroup[]>)
      .then(data => {
        dispatch(groupsLoadingCompleted(data))
      })
  }
}

export const saveTaskGroup = (taskGroup: TaskGroup): AppThunkAction<TaskGroupActionTypes> => (dispatch, getState) => {
  taskGroup.id === 0
    ? Axios.post<TaskGroup>('api/taskgroup', taskGroup).then(response => {
        dispatch(saveGroupCompleted(response.data))
        navigateToGroup(response.data.id)
      })
    : Axios.put<TaskGroup>(`api/taskgroup/${taskGroup.id}`, taskGroup).then(() =>
        dispatch(saveGroupCompleted(taskGroup))
      )
}
