import * as TYPES from '../actions/register/types'
const INITIAL_STATE = {
  email: '',
  isLoading: false,
  error: false,
  errorObj: null,
  created: false,
}

export const registerReducer = (state = INITIAL_STATE, {type, data} : any) => {
  switch (type) {
    case TYPES.CREATE_ACCOUNT:
      return {
        ...state,
        isLoading: true,
        error: false,
        errorObj: null,
        created: false
      }
    case TYPES.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        email: '',
        isLoading: false,
        error: false,
        created: true,
        errorObj: null,
      }
    case TYPES.CREATE_ACCOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorObj: null,
        created: false
      }
    default:
      return state
  }
}
