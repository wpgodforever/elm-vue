<template>
  <div>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/common/tabbar.vue'
export default {
  name: 'tabbarChoose',
  data(){
    return {
    }
  },
  components:{
    tabbar
  },
}
</script>
