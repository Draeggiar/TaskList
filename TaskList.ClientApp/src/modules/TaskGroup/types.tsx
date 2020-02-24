export const TASK_GROUP_LOAD_ALL_STARTED = 'TASK_GROUP_LOAD_ALL_STARTED'
export const TASK_GROUP_LOAD_ALL_COMPLETED = 'TASK_GROUP_LOAD_ALL_COMPLETED'
export const TASK_GROUP_SAVE_COMPLETED = 'TASK_GROUP_SAVE_COMPLETED'

interface LoadAllStartedAction {
  type: typeof TASK_GROUP_LOAD_ALL_STARTED
}

interface LoadAllCompletedAction {
  type: typeof TASK_GROUP_LOAD_ALL_COMPLETED
  payload: TaskGroup[]
}

interface SaveGroupcCompletedAction {
  type: typeof TASK_GROUP_SAVE_COMPLETED
  payload: TaskGroup
}

export type TaskGroupActionTypes = LoadAllStartedAction | LoadAllCompletedAction | SaveGroupcCompletedAction

export interface TaskGroupsState {
  isLoading: boolean
  isLoaded: boolean
  taskGroups: TaskGroup[]
}

export interface TaskGroup {
  id: number
  name: string
  userTasks: number[]
}
