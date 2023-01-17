import {  login } from '@/api/login'


const address = {
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
      window.localStorage('elm-vue-userId',val.user_id)
    },
  },

  actions: {
    getCurrentCityAction({ commit, dispatch }, channelId) {
      return getCurrentCity({type:'guess'})
        .then( res => {
          commit('setCurrentCity', res)
        })
    },
  },
}

export default login
