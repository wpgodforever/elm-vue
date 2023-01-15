import { SUCCESS_CODE, getCurrentCity } from '@/api/address/index.js'


const address = {
  namespaced: true,//开启模块化命名空间，要不然无法模块化
  state: {
    addressInfo:{
    },
    hotCitys:[],
    allCitys:{}
  },

  getters: {
    currentCity: state => state.currentCity,
  },

  mutations: {
    setCurrentCity: (state, val) => {
      state.addressInfo = val
    },
    setHotCitys: (state, val) => {
      state.hotCitys = val
    },
    setAllCitys: (state, val) => {
      state.allCitys = val
    },
  },

  actions: {
    getCurrentCityAction({ commit, dispatch }, channelId) {
      return getCurrentCity({type:'guess'})
        .then( res => {
          commit('setCurrentCity', res)
        })
    },
    getHotCityAction({ commit, dispatch }, channelId) {
      return getCurrentCity({type:'hot'})
        .then( res => {
          commit('setHotCitys', res)
        })
    },
    getAllCityAction({ commit, dispatch }, channelId) {
      return getCurrentCity({type:'group'})
        .then( res => {
          // 虽然是按照abcd排序，但是对象是无序的，要转换一下
          let arr = [];
          let newArr = [];
          for (const key in res) {
            arr[key.charCodeAt()] = {
              char:key,
              data:res[key]
            };
          }
          newArr = arr.filter((v,index)=>{
            return v.char
          })
          commit('setAllCitys', newArr)
        })
    },
  },
}

export default address
