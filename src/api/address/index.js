import request from '@/lib/http'
const SUCCESS_CODE = 200

// 当前城市默认地址  guess
// 热门城市  hot
// 所有城市  group
const getCurrentCity = (data) => {
  return request({
    url: `/v1/cities`,
    method: 'get',
    params: data
  })
}

// 获取搜索地址
const getSearchCity = (data) => {
  return request({
    url: `/v1/pois`,
    method: 'get',
    params: data
  })
}

// 跟进坐标获取地址
const getLocation = (data) => {
  return request({
    url: `/v2/pois/${data}`,
    method: 'get',
  })
}

export {
  SUCCESS_CODE,
  getCurrentCity,
  getSearchCity,
  getLocation,
}
