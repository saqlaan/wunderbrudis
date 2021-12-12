import {END_POINTS, REQUEST_TYPE} from '../config'
import apiCaller from './api-caller'

export const register = async ({username, email, firstname, lastname, password}: any) => {
  try {
    const {data} = await apiCaller({
      method: REQUEST_TYPE.POST,
      endpoint: END_POINTS.register,
      data: {
        username,
        email,
        firstname,
        lastname,
        password
      }
    })
    return data
  } catch (e) {
    return {error: true, msg: e?.response?.data}
  }
}

export const login = async ({email, password}: any) => {
  
  try {
    const {data} = await apiCaller({
      method: REQUEST_TYPE.POST,
      endpoint: END_POINTS.login,
      data: {
        email,
        password
      }
    })
    return data
  } catch (e: any) {
    return {error: true, msg: e?.response?.data}
  }
}

export const logout = async (token: any) => {
  try {
    const {data} = await apiCaller({
      method: REQUEST_TYPE.GET,
      endpoint: END_POINTS.logout,
      token,
    })
    return data
  } catch (e: any) {
    return {error: true, msg: e?.response?.data}
  }
}
