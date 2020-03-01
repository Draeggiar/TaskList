import { User } from '../User/types'

export const USER_TASK_ADD_NEW = 'USER_TASK_ADD_NEW'

export const USER_TASK_DELETE_COMPLETED = 'USER_TASK_DELETE_COMPLETED'

interface AddNewTaskAction {
  type: typeof USER_TASK_ADD_NEW
  payload: UserTask
}

interface DeleteUserTaskCompletedAction {
  type: typeof USER_TASK_DELETE_COMPLETED
  payload: UserTask
}

export type UserTaskActionTypes = DeleteUserTaskCompletedAction | AddNewTaskAction

export interface UserTask {
  id: number | null
  name: string
  deadline: string
  user: User | null
  taskStatus: TaskStatus
  groupId: number
}

export enum TaskStatus {
  New,
  InProgress,
  Completed,
}
