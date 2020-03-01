import { Reducer, AnyAction } from 'redux'
import { UsersState, UserActionsType, USER_GET_ALL_COMPLETED } from './types'

const initialState: UsersState = {
  allUsers: [],
}

const reducer: Reducer<UsersState> = (state = initialState, action: UserActionsType | AnyAction) => {
  switch (action.type) {
    case USER_GET_ALL_COMPLETED:
      return { ...state, allUsers: action.payload }
    default:
      return state
  }
}

export default reducer
