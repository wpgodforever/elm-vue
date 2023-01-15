import { SUCCESS_CODE, getCurrentCity } from '@/api/address/index.js'


const address = {
  namespaced: true,//开启模块化命名空间，要不然无法模块化
  state: {
    addressInfo:{
    }

  },

  getters: {
    currentCity: state => state.currentCity,
  },

  mutations: {
    setCurrentCity: (state, val) => {
      state.addressInfo = val
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

export default address
