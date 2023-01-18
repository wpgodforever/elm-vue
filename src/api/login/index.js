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

// 修改密码
const resetPassword = (data) => {
  return request({
    url: `/v2/changepassword`,
    method: 'post',
    data
  })
}

// 根据user_id获取用户信息
const getUserInfo = (data) => {
  return request({
    url: `/v1/user`,
    method: 'get',
    params: data
  })
}


export {
  getCode,
  login,
  getUserInfo,
  resetPassword,
}
