import {dataActionCreator, emptyActionCreator} from '../action_creators'
import * as TYPES from './types'

export const onLoginStart = dataActionCreator(TYPES.LOGIN_PROCESS_START)
export const onLoginSuccess = emptyActionCreator(
  TYPES.LOGIN_SUCCESS,
)
export const onLoginFailure = dataActionCreator(
  TYPES.LOGIN_FAILURE,
)
