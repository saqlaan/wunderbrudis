import AsyncStorage from '@react-native-async-storage/async-storage'

import {combineReducers} from 'redux'
import {authReducer} from './auth'
import {loginReducer} from './login'
import {registerReducer} from './register'
import {persistReducer} from 'redux-persist'

const persistConfigForAuth = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['token'],
}

export const rootReducer = combineReducers({
  auth: persistReducer(persistConfigForAuth, authReducer),
  register: registerReducer,
  login: loginReducer,
})
