import axios from 'axios'
// import { getUser, removeUser, removeUserName } from '@/utils/auth'
// import router from '@/router'

const request = axios.create({
//   baseURL: '/api' // 线上
  // baseURL: 'http://bourse.yidonghuayuan.com' // 线上
})

// Add a request interceptor（请求拦截器）
request.interceptors.request.use(
  config => {
    // const token = getUser()
    // if (token) {
    //   config.headers.token = `${token}`
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// Add a response interceptor(响应拦截器)
request.interceptors.response.use(function (response) {
  // Do something with response data
//   if(response.data.result === 401) {
//     removeUser()
//     removeUserName()
//     this.$router.push('/login')
//   } else {
  return response
//   }
  // return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
