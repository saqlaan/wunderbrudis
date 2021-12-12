import {call, put, takeEvery} from '@redux-saga/core/effects'
import {login as loginUser} from '../../services/api'
import { onUserAuthenticated } from '../actions/auth'
import {
  LOGIN_PROCESS_START,
  onLoginFailure,
  onLoginSuccess
} from '../actions/login'

function* handleLogin({data}: any) {
  const loginCall = yield call(loginUser, data)
  if(loginCall.error){
    yield put(onLoginFailure(loginCall.msg))
    return null
  }
  yield put(onLoginSuccess())
  yield put(onUserAuthenticated(loginCall))
}

export default function* register() {
  yield takeEvery(LOGIN_PROCESS_START, handleLogin)
}
