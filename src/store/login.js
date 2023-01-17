import {  login, getUserInfo } from '@/api/login'


const loginModule = {
  namespaced: true,//开启模块化命名空间，要不然无法模块化
  state: {
    userInfo:{
    },
  },

  getters: {

  },

  mutations: {
    setUserInfo: (state, val) => {
      state.userInfo = val
      window.localStorage.setItem('elm-vue-userId',val.user_id)
    },
  },

  actions: {
    getUserInfoAction({ commit, dispatch }, channelId) {
      return getUserInfo({
        user_id: localStorage.getItem('elm-vue-userId')
      })
        .then( res => {
          commit('setUserInfo', res)
        })
    },
  },
}

export default loginModule
