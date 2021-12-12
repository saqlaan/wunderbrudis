import {call, takeEvery, select, put} from '@redux-saga/core/effects'
import { logout } from '../../services/api'
import { LOGOUT_USER, onResetUser } from '../actions/auth'
import { getToken } from '../selectors'

function* handleLogout({data}: any) {
  const token = yield select(getToken)
  yield call(logout, token)
  yield put(onResetUser())
}

export default function* () {
  yield takeEvery(LOGOUT_USER, handleLogout)
}
