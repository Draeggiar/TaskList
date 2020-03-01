import { UserTask } from '../UserTask/types'

export const TASK_GROUP_CREATE = 'TASK_GROUP_CREATE'

export const TASK_GROUP_LOAD_ALL_STARTED = 'TASK_GROUP_LOAD_ALL_STARTED'
export const TASK_GROUP_LOAD_ALL_COMPLETED = 'TASK_GROUP_LOAD_ALL_COMPLETED'

export const TASK_GROUP_SAVE_COMPLETED = 'TASK_GROUP_SAVE_COMPLETED'

export const TASK_GROUP_CLEAR_UNSAVED = 'TASK_GROUP_CLEAR_UNSAVED'

export const TASK_GROUP_CHANGE_SORT_ORDER = 'TASK_GROUP_CHANGE_SORT_ORDER'
export const TASK_GROUP_CHANGE_SORT_DIRECTION = 'TASK_GROUP_CHANGE_SORT_DIRECTION'

export const TASK_GROUP_DELETE_COMPLETED = 'TASK_GROUP_DELETE_COMPLETED'

interface AddNewGroupAction {
  type: typeof TASK_GROUP_CREATE
}

interface LoadAllStartedAction {
  type: typeof TASK_GROUP_LOAD_ALL_STARTED
}

interface LoadAllCompletedAction {
  type: typeof TASK_GROUP_LOAD_ALL_COMPLETED
  payload: TaskGroup[]
}

interface SaveGroupCompletedAction {
  type: typeof TASK_GROUP_SAVE_COMPLETED
  payload: TaskGroup
}

interface ClearUnsavedGroupsAction {
  type: typeof TASK_GROUP_CLEAR_UNSAVED
}

interface ChangeSortOrderAction {
  type: typeof TASK_GROUP_CHANGE_SORT_ORDER
  payload: GroupsSortOrder
}

interface ChangeSortDirectionAction {
  type: typeof TASK_GROUP_CHANGE_SORT_DIRECTION
  payload: GroupsSortDirection
}

interface DelteTaskGroupCompletedAction {
  type: typeof TASK_GROUP_DELETE_COMPLETED
  payload: number
}

export type TaskGroupActionTypes =
  | AddNewGroupAction
  | LoadAllStartedAction
  | LoadAllCompletedAction
  | SaveGroupCompletedAction
  | ClearUnsavedGroupsAction
  | ChangeSortOrderAction
  | ChangeSortDirectionAction
  | DelteTaskGroupCompletedAction

export interface TaskGroupsState {
  areLoading: boolean
  areLoaded: boolean
  taskGroups: TaskGroup[]
  sortOrder: GroupsSortOrder
  sortDirection: GroupsSortDirection
}

export interface TaskGroup {
  id: number
  name: string
  userTasks: UserTask[]
}

export enum GroupsSortOrder {
  Name,
  TasksCount,
}

export enum GroupsSortDirection {
  Ascending,
  Descending,
}
