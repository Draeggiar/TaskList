import Axios from 'axios'
import { AppThunkAction } from '../../store/store'
import { UserTaskActionTypes, USER_TASK_DELETE_COMPLETED, UserTask, USER_TASK_ADD_NEW } from './types'

export const addNewTask = (userTask: UserTask): UserTaskActionTypes => {
  return {
    type: USER_TASK_ADD_NEW,
    payload: userTask,
  }
}

const deleteTaskCompleted = (task: UserTask): UserTaskActionTypes => {
  return {
    type: USER_TASK_DELETE_COMPLETED,
    payload: task,
  }
}

export const deleteUserTask = (task: UserTask): AppThunkAction<UserTaskActionTypes> => (dispatch, getState) => {
  return task.id !== null
    ? Axios.delete(`api/usertask/${task.id}`).then(() => dispatch(deleteTaskCompleted(task)))
    : dispatch(deleteTaskCompleted(task))
}
