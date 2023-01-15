import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { Toast } from 'vant'

axios.defaults.withCredentials = true
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // post 请求需要序列化一下
    if (
      !config.notNeedQS &&
      (config.method === 'post' || config.method === 'put')
    ) {
      config.data = qs.stringify(config.data)
    }
    config.params = config.params ? config.params : {}
    return config
  },
  error => {
    console.log('request error', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.config.returnRes) return res
    if (+res.code === 401 || +res.code === -1) {
      return Promise.reject('登录过期')
    }
    if (
      response.config.successCode &&
      +response.config.successCode !== +res.code
    ) {
      Toast(res.msg)
      return Promise.reject(res.msg)
    }
    return res
  },
  error => {
    console.error('response error', error)
    return Promise.reject(error)
  }
)

export default service
