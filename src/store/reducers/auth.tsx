import * as TYPES from '../actions/auth/types'
const INITIAL_STATE = {
  error: false,
  token: '',
}

export const authReducer = (state = INITIAL_STATE, {type, data} :any) => {
  switch (type) {
    case TYPES.USER_AUTHENTICATED:
      return {
        ...state,
        ...data,
      }
    case TYPES.LOGOUT_USER:
      return {
        ...INITIAL_STATE,
      }
    default:
      return state
  }
}
