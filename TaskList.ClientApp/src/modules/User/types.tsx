export const USER_GET_ALL_COMPLETED = 'USER_GET_ALL_COMPLETED'

interface LoadAllCompletedAction {
  type: typeof USER_GET_ALL_COMPLETED
  payload: User[]
}

export type UserActionsType = LoadAllCompletedAction

export interface UsersState {
  allUsers: User[]
}

export interface User {
  id: number
  firstName: string
  lastName: string
}
