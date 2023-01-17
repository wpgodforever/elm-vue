import request from '@/lib/http'

// 获取验证码
const getCode = (data) => {
  return request({
    url: `/v1/captchas`,
    method: 'post',
    data
  })
}

// 账号密码登录
const login = (data) => {
  return request({
    url: `/v2/login`,
    method: 'post',
    data
  })
}


export {
  getCode,
  login,
}
