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
 * 17.获取成交列表
 */
export const excelUpload = query => {
  return request({
    method: 'POST',
    url: '/excel/upload',
    data: query
  })
}
