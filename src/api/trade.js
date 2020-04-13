import request from '@/untils/request'

/**
 * 13.单条买入数据
 */
export const buyTrade = query => {
    return request({
      method: 'POST',
      url: '/filtrate/buyEntrust',
      data: query
    })
  }