import {
  USER_TASK_LOAD_STARTED,
  UserTaskActionTypes,
  USER_TASK_LOAD_COMPLETED,
  TaskDetails,
  USER_TASK_LOAD_ALL_IN_GROUP_STARTED,
  USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED,
  SimpleTask,
} from './types'
import { AppThunkAction } from '../../store/store'

const loadTask = (taskId: number): UserTaskActionTypes => {
  return {
    type: USER_TASK_LOAD_STARTED,
    taskId,
  }
}

const loadTaskCompleted = (taskDetails: TaskDetails): UserTaskActionTypes => {
  return {
    type: USER_TASK_LOAD_COMPLETED,
    payload: taskDetails,
  }
}

const loadAllTasksInGroup = (groupId: number): UserTaskActionTypes => {
  return {
    type: USER_TASK_LOAD_ALL_IN_GROUP_STARTED,
    groupId,
  }
}

const loadAllTasksInGroupCompleted = (simpleTaskDetails: SimpleTask[]): UserTaskActionTypes => {
  return {
    type: USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED,
    payload: simpleTaskDetails,
  }
}

export const requestUserTask = (taskId: number): AppThunkAction<UserTaskActionTypes> => (dispatch, getState) => {
  const state = getState()
  const existingTask = state.tasks.userTasks[taskId]
  if (existingTask && !existingTask) {
    dispatch(loadTask(taskId))
    fetch(`api/usertask/${taskId}`)
      .then(response => response.json() as Promise<TaskDetails>)
      .then(data => {
        dispatch(loadTaskCompleted(data))
      })
  }
}

export const requestTasksInGroup = (groupId: number): AppThunkAction<UserTaskActionTypes> => (dispatch, getState) => {
  dispatch(loadAllTasksInGroup(groupId))
  fetch(`api/usertask/group/${groupId}`)
    .then(response => response.json() as Promise<TaskDetails[]>)
    .then(data => {
      dispatch(loadAllTasksInGroupCompleted(data))
    })
}
