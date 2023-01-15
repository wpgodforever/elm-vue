import request from '@/lib/http'

export function getCurrentCity(data) {
  return request({
    url: `/v1/cities`,
    method: 'get',
    params: data
  })
}
