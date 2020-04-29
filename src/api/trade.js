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

/**
 * 14.获取持仓列表
 */
export const myBuyStockGetList = query => {
  return request({
    method: 'POST',
    url: '/myBuyStock/getList',
    data: query
  })
}

/**
 * 15.获取委托列表
 */
export const entrustStockList = query => {
  return request({
    method: 'POST',
    url: '/entrust/getList',
    data: query
  })
}

/**
 * 16.获取成交列表
 */
export const tradeGetkList = query => {
  return request({
    method: 'POST',
    url: '/trade/getList',
    data: query
  })
}

/**
 * 19.买入行情订阅
 */
export const filtrateBuySubscribe = query => {
  return request({
    method: 'POST',
    url: '/filtrate/buySubscribe',
    data: query
  })
}

/**
 * 20.卖出行情订阅
 */
export const filtrateSellSubscribe = query => {
  return request({
    method: 'POST',
    url: '/filtrate/sellSubscribe',
    data: query
  })
}

/**
 * 21.卖出行情订阅
 */
export const filtratebuyAllEntrust = query => {
  return request({
    method: 'POST',
    url: '/filtrate/buyAllEntrust',
    data: query
  })
}

/**
 * 22.手动单条卖出
 */
export const sellEntrust = query => {
  return request({
    method: 'POST',
    url: '/myBuyStock/sellEntrust',
    data: query
  })
}
