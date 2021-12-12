import {all} from 'redux-saga/effects'
import register from './register'
import login from './login'
import auth from './auth'

export default function* rootSaga() {
  yield all([register(), login(), auth()])
}
