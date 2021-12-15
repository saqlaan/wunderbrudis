import axios from 'axios'
import {API_BASE_URL} from '../../configs'

export default async ({
  method,
  baseURL = '',
  endpoint = '',
  params = undefined,
  data = undefined,
  token
}: any = {}) => {
  return axios({
    method,
    url: API_BASE_URL + endpoint,
    params,
    data,
    baseURL: baseURL ? baseURL : API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token? 'Bearer ' + token: ''
    },
    responseType: 'json',
  })
    .then(res => {
      console.log(res);

      return res
    })
    .catch(error => {
      throw error
    })
}
