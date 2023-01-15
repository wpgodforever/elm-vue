<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      color="#fff"
    >
    <template #right v-if="rightIcon">
      <van-icon color="#fff" :name="rightIcon" size="20" />
    </template>
    <template #left v-if="leftIcon">
      <van-icon color="#fff" :name="leftIcon" size="20" />
    </template>
    </van-nav-bar>
    <div class="title-click-box" @click="onClickTitle">

    </div>
  </div>
</template>

<script>
export default {
  props:['leftIcon','rightIcon','title'],
  methods:{
    onClickLeft(){
      this.$emit('onClickLeft')
    },
    onClickRight(){
      this.$emit('onClickRight')
    },
    onClickTitle(){
      this.$emit('onClickTitle')
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
.title-click-box{
  position: absolute;
  top: 0;
  left: 50%;
  width: 500px;
  height: 92px;
  transform: translate(-50%,0);
  z-index: 99;
}

</style>
