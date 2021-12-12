import {call, put, takeEvery} from '@redux-saga/core/effects'
import { logout } from '../../services/api'
import { LOGOUT_USER, onUserAuthenticated } from '../actions/auth'
import {
  LOGIN_PROCESS_START,
  onLoginFailure,
  onLoginSuccess
} from '../actions/login'

function* handleLogout({data}: any) {
  yield call(logout, data)
}

export default function* () {
  yield takeEvery(LOGOUT_USER, handleLogout)
}
