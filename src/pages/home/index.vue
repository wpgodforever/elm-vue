<template>
  <div class="container">
    <myNav :title="'首页'" :rightIcon="'manager-o'" :leftIcon="'search'"  @onClickLeft="onClickLeft" @onClickRight="onClickRight"></myNav>
  </div>
</template>

<script>
export default {
  name:'home',
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
}
.van-nav-bar {
  background-color: #2f97ec;
  /deep/ .van-nav-bar__title{
    color: white;
  }
}

</style>
