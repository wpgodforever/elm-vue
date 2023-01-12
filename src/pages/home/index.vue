<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <myNav :title="'首页'" :rightIcon="'manager-o'" :leftIcon="'search'"  @onClickLeft="onClickLeft" @onClickRight="onClickRight"></myNav>
    <!-- 轮播选择区域 -->
    <van-swipe indicator-color="#2f97ec" class="my-swipe" :autoplay="5000">
      <van-swipe-item v-for="(item,index) in foodTypeList" :key="index">
        <div class="swip-container">
          <div class="swip-container-item" v-for="(swipItem,swipIndex) in foodTypeList[index]" :key="swipIndex">
            <div class="swip-container-item--img"></div>
            <div class="swip-container-item--text">{{ swipItem.title }}</div>

          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name:'home',
  data(){
    return {
      foodTypeList:{
        0:[
          {
            title:'甜品'
          },{
            title:'甜品'
          },{
            title:'甜品'
          },{
            title:'甜品'
          },{
            title:'甜品'
          },{
            title:'甜品'
          },{
            title:'甜品'
          },{
            title:'甜品'
          },
        ],
        1:[
          {
            title:'饮料'
          },{
            title:'饮料'
          },{
            title:'饮料'
          },{
            title:'饮料'
          },{
            title:'饮料'
          },{
            title:'饮料'
          },{
            title:'饮料'
          },{
            title:'饮料'
          },
        ],
      }
    }
  },
  methods:{
    onClickLeft(){
      console.log('左边被点击')
    },
    onClickRight(){
      console.log('右边被点击')
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  font-size: 16px;
  .swip-container{
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e4e4e4;
    &-item{
      display: flex;
      flex-direction: column;
      width: 25%;
      height: 110px;
      &--img{
        width: 100%;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
        background-color: pink;
      }
      &--text{
        text-align: center;
      }
    }
  }
}
.van-nav-bar {
  background-color: #2f97ec;
  /deep/ .van-nav-bar__title{
    color: white;
  }
}

</style>
