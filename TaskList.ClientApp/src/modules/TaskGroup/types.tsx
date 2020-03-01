import { User } from '../User/types'

export const TASK_GROUP_CREATE = 'TASK_GROUP_CREATE'

export const TASK_GROUP_LOAD_ALL_STARTED = 'TASK_GROUP_LOAD_ALL_STARTED'
export const TASK_GROUP_LOAD_ALL_COMPLETED = 'TASK_GROUP_LOAD_ALL_COMPLETED'

export const TASK_GROUP_SAVE_COMPLETED = 'TASK_GROUP_SAVE_COMPLETED'

export const TASK_GROUP_ADD_NEW_TASK = 'TASK_GROUP_ADD_NEW_TASK'

export const TASK_GROUP_CLEAR_UNSAVED = 'TASK_GROUP_CLEAR_UNSAVED'

export const TASK_GROUP_CHANGE_SORT_ORDER = 'TASK_GROUP_CHANGE_SORT_ORDER'
export const TASK_GROUP_CHANGE_SORT_DIRECTION = 'TASK_GROUP_CHANGE_SORT_DIRECTION'

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

interface AddNewTaskAction {
  type: typeof TASK_GROUP_ADD_NEW_TASK
  payload: UserTask
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

export type TaskGroupActionTypes =
  | AddNewGroupAction
  | LoadAllStartedAction
  | LoadAllCompletedAction
  | SaveGroupCompletedAction
  | AddNewTaskAction
  | ClearUnsavedGroupsAction
  | ChangeSortOrderAction
  | ChangeSortDirectionAction

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

export interface UserTask {
  id: number | null
  name: string
  deadline: string
  user: User | null
  taskStatus: number
  groupId: number
}

export enum GroupsSortOrder {
  Name,
  TasksCount,
}

export enum GroupsSortDirection {
  Ascending,
  Descending,
}
