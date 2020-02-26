import Axios from 'axios'
import {
  UserTaskActionTypes,
  USER_TASK_LOAD_COMPLETED,
  TaskDetails,
  USER_TASK_LOAD_ALL_IN_GROUP_STARTED,
  USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED,
  SimpleTask,
  USER_TASK_SAVE_COMPLETED,
} from './types'
import { AppThunkAction } from '../../store/store'
import { navigateToTask } from '../../utils/Navigator'

const loadTaskCompleted = (taskDetails: TaskDetails): UserTaskActionTypes => {
  return {
    type: USER_TASK_LOAD_COMPLETED,
    payload: taskDetails,
  }
}

const loadAllTasksInGroup = (groupId: number): UserTaskActionTypes => {
  return {
    type: USER_TASK_LOAD_ALL_IN_GROUP_STARTED,
    payload: groupId,
  }
}

const loadAllTasksInGroupCompleted = (simpleTaskDetails: SimpleTask[]): UserTaskActionTypes => {
  return {
    type: USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED,
    payload: simpleTaskDetails,
  }
}

const saveTaskCompleted = (userTask: TaskDetails): UserTaskActionTypes => {
  return {
    type: USER_TASK_SAVE_COMPLETED,
    payload: userTask,
  }
}

export const requestUserTask = (taskId: number): AppThunkAction<UserTaskActionTypes> => (dispatch, getState) => {
  const state = getState()
  const existingTask = state.tasks.userTasks[taskId]
  if (existingTask && !existingTask) {
    fetch(`api/usertask/${taskId}`)
      .then(response => response.json() as Promise<TaskDetails>)
      .then(data => {
        dispatch(loadTaskCompleted(data))
      })
  }
}

export const requestTasksInGroup = (groupId: number): AppThunkAction<UserTaskActionTypes> => (dispatch, getState) => {
  dispatch(loadAllTasksInGroup(groupId))
  Axios.get(`api/usertask/group/${groupId}`).then(response => {
    dispatch(loadAllTasksInGroupCompleted(response.data))
  })
}

export const saveUserTask = (task: TaskDetails): AppThunkAction<UserTaskActionTypes> => (dispatch, getState) => {
  task.id === 0
    ? Axios.post('api/usertask', task).then(response => {
        dispatch(saveTaskCompleted(response.data))
        navigateToTask(response.data.groupId, response.data.id)
      })
    : Axios.put(`api/usertask/${task.id}`, task).then(() => dispatch(saveTaskCompleted(task)))
}
