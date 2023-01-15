<template>
  <van-popup :value="show" position="top" @click-overlay="clickOverlay" :style="{ height: '100%' }">
    <div class="popContainer">
      <van-cell-group>
        <van-cell icon="location-o" title="当前城市" :value="addressInfo.name || '尚未选择'" />
      </van-cell-group>
      <div class="popContainer-hot">热门城市</div>
      <van-grid>
        <van-grid-item icon="fire-o" @click="onHotCityClick" :text="item.name" v-for="(item, index) in hotCitys" :key="index"/>
      </van-grid>
      <!-- 全部城市 -->
      <van-index-bar :index-list="indexList">
        <div v-for="(item, index) in allCitys" :key="index">
          <van-index-anchor :index="item.char" />
          <van-cell :title="cityItem.name" v-for="(cityItem, cityIndex) in item.data" :key="cityIndex"/>
        </div>
      </van-index-bar>
    </div>
  </van-popup>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props:['show'],
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
    clickOverlay () {
      this.$emit('update:show',false)
    },
    onHotCityClick(){
      console.log(this.allCitys,'allCitys')
    }
  },
  computed:{
    ...mapState('address', ['addressInfo', 'hotCitys', 'allCitys']),
    // 索引列表
    indexList(){
      if(this.allCitys.length){
        let arr = []
        this.allCitys.forEach(v => {
          arr.push(v.char)
        })
        return arr
      }else{
        return []
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.popContainer{
  .popContainer-hot{
    font-size: 30px;
    padding: 20px 10px;
  }
  .van-cell{
    font-size: 36px;
    font-weight: bold;
  }
  .van-cell__title, .van-cell__left-icon{
    color: $themeColor;
  }
  /deep/ .van-grid-item{
    color: red!important;
    .van-grid-item__text{
      color: red!important;
    }
  }

  z-index: 999999;
}
</style>
