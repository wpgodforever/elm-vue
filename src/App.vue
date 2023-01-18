<template>
  <div id="app">
    <transition name="fade">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    </transition>
    <transition name="fade">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'scss/common.scss';
#app{
  background-color: #f5f5f5;
  min-height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  	transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  	opacity: 0;
}
// 跳转动画结束后上个页面占位闪动问题
.fade-leave-to {
  display: none;
}
</style>
