import { SUCCESS_CODE, getCurrentCity, getLocation } from '@/api/address/index.js'


const address = {
  namespaced: true,//开启模块化命名空间，要不然无法模块化
  state: {
    addressInfo:{
    },
    hotCitys:[],
    allCitys:{}
  },

  getters: {
    currentCity: state => state.addressInfo.name || '',
  },

  mutations: {
    setCurrentCity: (state, val) => {
      // 不可以直接const newObj1 = Object.assign(state.addressInfo,val)
      // 监听对象时候，若对象的引导地址未改变，那么computed将不会检测到。
      // 比如object中的某个key对应的value变化了，computed检测不出来。
      const newObj1 = Object.assign({},state.addressInfo)
      const newObj2 = Object.assign(newObj1,val)
      state.addressInfo = newObj2
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
          dispatch('getDetailCity')
        })
    },
    getDetailCity({ commit, dispatch, state }, channelId) {
      return getLocation(state.addressInfo.latitude + ',' + state.addressInfo.longitude)
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
