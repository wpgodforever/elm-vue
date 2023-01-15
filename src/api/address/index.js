import request from '@/lib/http'
const SUCCESS_CODE = 200
const getCurrentCity = (data) => {
  return request({
    url: `/v1/cities`,
    method: 'get',
    params: data
  })
}

export {
  SUCCESS_CODE,
  getCurrentCity,
}
