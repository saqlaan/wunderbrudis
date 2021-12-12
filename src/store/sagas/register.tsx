import {call, takeEvery, put} from 'redux-saga/effects'
import {register as registerUser} from '../../services/api'
import {
  CREATE_ACCOUNT,
  onCreateAccountSuccess,
  onCreateaAccountFailure,
} from '../actions/register'

function* handleCreateAccout({data}: any) {
  const registerCall = yield call(registerUser, data)
  if(registerCall.error){
    yield put(onCreateaAccountFailure(registerCall.msg))
    return null
  }
  yield put(onCreateAccountSuccess())
}

export default function* register() {
  yield takeEvery(CREATE_ACCOUNT, handleCreateAccout)
}
