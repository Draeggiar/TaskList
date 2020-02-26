import { Dictionary } from '../../utils/Dictionary'

export const USER_TASK_LOAD_COMPLETED = 'USER_TASK_LOAD_COMPLETED'

export const USER_TASK_LOAD_ALL_IN_GROUP_STARTED = 'USER_TASK_LOAD_ALL_IN_GROUP_STARTED'
export const USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED = 'USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED'

export const USER_TASK_SAVE_COMPLETED = 'USER_TASK_SAVE_COMPLETED'

interface LoadCompletedAction {
  type: typeof USER_TASK_LOAD_COMPLETED
  payload: TaskDetails
}

interface LoadAllInGroupAction {
  type: typeof USER_TASK_LOAD_ALL_IN_GROUP_STARTED
  payload: number
}

interface LoadAllInGroupCompletedAction {
  type: typeof USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED
  payload: SimpleTask[]
}

interface SaveUserTaskCompletedAction {
  type: typeof USER_TASK_SAVE_COMPLETED
  payload: TaskDetails
}

export type UserTaskActionTypes =
  | LoadCompletedAction
  | LoadAllInGroupAction
  | LoadAllInGroupCompletedAction
  | SaveUserTaskCompletedAction

export interface UserTasksState {
  isLoading: boolean
  isLoaded: boolean
  userTasks: Dictionary<TaskDetails>
}

export interface SimpleTask {
  id: number
  name: string
}

export interface TaskDetails extends SimpleTask {
  deadline: string | Date
  userId: number | undefined
  taskStatus: number
  groupId: number
}
