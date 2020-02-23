import { AppThunkAction } from '../../store/store'
import { TaskGroup, TaskGroupActionTypes, TASK_GROUP_LOAD_ALL_COMPLETED, TASK_GROUP_LOAD_ALL_STARTED } from './types'

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
