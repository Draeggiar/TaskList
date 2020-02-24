import axios from 'axios'
import { AppThunkAction } from '../../store/store'
import {
  TaskGroup,
  TaskGroupActionTypes,
  TASK_GROUP_LOAD_ALL_COMPLETED,
  TASK_GROUP_LOAD_ALL_STARTED,
  TASK_GROUP_SAVE_COMPLETED,
} from './types'

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
  const action =
    taskGroup.id != 0
      ? axios.put<TaskGroup>(`api/taskgroup/${taskGroup.id}`, taskGroup)
      : axios.post<TaskGroup>('api/taskgroup', taskGroup)
  return action.then(response => dispatch(saveGroupCompleted(response.data)))
}
