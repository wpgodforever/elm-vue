import request from '@/lib/http'

// 获取导航食品类型列表
const getFoodtype = (data) => {
  return request({
    url: `/v2/index_entry`,
    method: 'get',
    params: data
  })
}
// 获取店铺列表
const getrestaurantsList = (data) => {
  return request({
    url: `/shopping/restaurants`,
    method: 'get',
    params: data
  })
}

export {
  getFoodtype,
  getrestaurantsList,
}
