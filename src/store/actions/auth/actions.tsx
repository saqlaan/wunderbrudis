import {dataActionCreator, emptyActionCreator} from '../action_creators'
import * as TYPES from './types'

export const onUserAuthenticated = dataActionCreator(TYPES.USER_AUTHENTICATED)
export const onLogoutUser = emptyActionCreator(TYPES.LOGOUT_USER)
