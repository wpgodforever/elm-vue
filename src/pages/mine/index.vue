<template>
  <div class="container-mine flex-col">
    <div class="mine-msg flex-align">
      <div class="mine-msg-img">
        <img :src="imgBaseUrl + userInfo.avatar" alt="">
      </div>
      <div class="mine-msg-middle flex-col">
        <div class="middle-name">
          {{ userInfo.username }}
        </div>
        <div class="middle-phone">
          <van-icon name="phone-o" />
          {{ userInfo.mobile || '暂无添加手机号' }}
        </div>
        
      </div>
      <van-icon name="arrow" style="margin-left: auto;"/>
    </div>
    <div class="mine-tab flex-align">
      <van-icon name="cart-o" style="margin-right: 5px;"/>
      我的订单
      <van-icon name="arrow" style="margin-left: auto;"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {imgBaseUrl} from '@/config/env'
export default {
  name: 'mine',
  data(){
    return {
      imgBaseUrl,
    }
  },
  computed:{
    ...mapState('login',['userInfo'])
  },
}
</script>

<style lang="scss" scoped>
.container-mine{
  .mine-msg{
    padding: 20px 40px;
    background: $themeColor;
    color: #fff;
    .mine-msg-img{
      width: 150px;
      height: 150px;
      background-color: pink;
      border-radius: 50%;
      overflow: hidden;
    }
    .mine-msg-middle{
      color: #fff;
      margin-left: 20px;
      font-size: 36px;
      .middle-name{
        margin-bottom: 15px;
      }
    }
  }
  .mine-tab{
    padding: 30px 20px;
    background-color: #fff;
    font-size: 36px;
  }
  
}
</style>
