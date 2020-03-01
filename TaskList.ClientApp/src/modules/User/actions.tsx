import Axios from 'axios'
import { AppThunkAction } from '../../store/store'
import { UserActionsType, USER_GET_ALL_COMPLETED, User } from './types'

const usersLoadingCompleted = (usersList: User[]): UserActionsType => {
  return {
    type: USER_GET_ALL_COMPLETED,
    payload: usersList,
  }
}

export const requestAllUsers = (): AppThunkAction<UserActionsType> => (dispatch, getState) => {
  return Axios.get('api/user').then(response => dispatch(usersLoadingCompleted(response.data)))
}
