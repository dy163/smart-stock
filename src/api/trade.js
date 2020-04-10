import request from '@/untils/request'

/**
 * 1.登录
 */
export const buyTrade = query => {
    return request({
      method: 'POST',
      url: '/filtrate/buyEntrust',
      data: query
    })
  }