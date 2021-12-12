import * as TYPES from '../actions/login/types'

const INITIAL_STATE = {
  loading: false,
  error: false,
  errorObj: null,
}

export const loginReducer = (state = INITIAL_STATE, {type, data} : any) => {
  switch (type) {
    case TYPES.LOGIN_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: false,
        errorObj: null,
      }
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      }
    case TYPES.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorObj: data
      }
    default:
      return state
  }
}
