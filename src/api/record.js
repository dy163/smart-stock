import request from '@/untils/request'

/**
 * 8.获取筛选列表
 */
export const filtrateGetList = query => {
  return request({
    method: 'POST',
    url: '/filtrate/getList',
    data: query
  })
}

/**
 * 9.智能筛选股票
 */
export const filtrateAddList = query => {
  return request({
    method: 'POST',
    url: '/filtrate/addList',
    data: query
  })
}

/**
 * 10.清空列表
 */
export const filtrateClear = query => {
  return request({
    method: 'POST',
    url: '/filtrate/clear',
    data: query
  })
}

/**
 * 11.手动添加筛选
 */
export const filtrateAddOne = query => {
  return request({
    method: 'POST',
    url: '/filtrate/addOne',
    data: query
  })
}

/**
 * 12.删除单条筛选
 */
export const filtrateDelete = query => {
    return request({
      method: 'POST',
      url: '/filtrate/delete',
      data: query
    })
  }
