import axios from 'axios'
import { getUser, removeUser, removeUserName } from '@/untils/auth'
// import router from '@/router'

const request = axios.create({
  // baseURL: 'http://192.168.3.238:8089' 
  baseURL: 'http://smartStock.yidonghuayuan.com' 
  // baseURL: 'http://47.92.85.1:8089' 
})

// Add a request interceptor（请求拦截器）
request.interceptors.request.use(
  config => {
    const token = getUser()
    if (token) {
      config.headers.token = `${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// Add a response interceptor(响应拦截器)
request.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.data.result == 10000) {
    removeUser()
    removeUserName()
    window.location.reload()
    this.$router.push('/login')
  } else {
    return response
  }
  // return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
