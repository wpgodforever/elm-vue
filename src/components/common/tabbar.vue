<template>
  <van-tabbar v-model="tabbarIndex" @change="onChange">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="search">搜索</van-tabbar-item>
    <van-tabbar-item icon="friends-o">订单</van-tabbar-item>
    <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { watch } from 'vue';

export default {
  data(){
    return {
      tabbarIndex:0,
      path: {
        0: '/tabbar/home',
        1: '/tabbar/search',
        2: '/tabbar/order',
        3: '/tabbar/mine',
      }
    }
  },
  methods:{
    onChange(index){
      this.$router.push({
        path: this.path[index]
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
