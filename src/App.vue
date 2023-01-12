<template>
  <div id="app">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
