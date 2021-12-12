import {dataActionCreator, emptyActionCreator} from '../action_creators'
import * as TYPES from './types'

export const onCreateAccount = dataActionCreator(TYPES.CREATE_ACCOUNT)
export const onCreateAccountSuccess = emptyActionCreator(
  TYPES.CREATE_ACCOUNT_SUCCESS,
)
export const onCreateaAccountFailure = dataActionCreator(
  TYPES.CREATE_ACCOUT_FAILURE,
)
