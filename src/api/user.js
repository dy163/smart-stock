import request from '@/untils/request'

/**
 * 1.登录
 */
export const userLogin = query => {
  return request({
    method: 'POST',
    url: '/adminUser/login',
    data: query
  })
}

/**
 * 2.选择弹框账号
 */
export const userSelect = query => {
  return request({
    method: 'POST',
    url: '/account/select',
    data: query
  })
}

/**
 * 3.添加账号
 */
export const userAdd = query => {
  return request({
    method: 'POST',
    url: '/account/add',
    data: query
  })
}

/**
 * 4.获取账号列表
 */
export const userGetList = query => {
  return request({
    method: 'POST',
    url: '/account/getList',
    data: query
  })
}

/**
 * 5.更新账号
 */
export const userUpdate = query => {
  return request({
    method: 'POST',
    url: '/account/update',
    data: query
  })
}

/**
 * 6.删除账号
 */
export const userDelete = query => {
  return request({
    method: 'POST',
    url: '/account/delete',
    data: query
  })
}

/**
 * 7.是否选择账号
 */
export const userIsSelect = query => {
  return request({
    method: 'POST',
    url: '/account/isSelect',
    data: query
  })
}

/**
 * 8.是否选择账号
 */
export const userExit = query => {
  return request({
    method: 'POST',
    url: '/adminUser/exit',
    data: query
  })
}
