import { Dictionary } from '../../utils/CommonTypes'

export const USER_TASK_LOAD_STARTED = 'USER_TASK_LOAD_STARTED'
export const USER_TASK_LOAD_COMPLETED = 'USER_TASK_LOAD_COMPLETED'

export const USER_TASK_LOAD_ALL_IN_GROUP_STARTED = 'USER_TASK_LOAD_ALL_IN_GROUP_STARTED'
export const USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED = 'USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED'

interface LoadStartedAction {
  type: typeof USER_TASK_LOAD_STARTED
  taskId: number
}

interface LoadCompletedAction {
  type: typeof USER_TASK_LOAD_COMPLETED
  payload: TaskDetails
}

interface LoadAllInGroupAction {
  type: typeof USER_TASK_LOAD_ALL_IN_GROUP_STARTED
  groupId: number
}

interface LoadAllInGroupCompletedAction {
  type: typeof USER_TASK_LOAD_ALL_IN_GROUP_COMPLETED
  payload: SimpleTask[]
}

export type UserTaskActionTypes =
  | LoadStartedAction
  | LoadCompletedAction
  | LoadAllInGroupAction
  | LoadAllInGroupCompletedAction

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
  deadline: Date
  userId: number | undefined
  taskStatus: number
  groupId: number
}
