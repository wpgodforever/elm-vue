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
