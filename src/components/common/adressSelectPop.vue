<template>
  <van-popup :value="show" position="top" :style="{ height: '100%' }">
    <div class="popContainer">
      <div class="popContainer-header flex-align">
        <van-icon name="arrow-left" @click="onLeftClick"/>
      </div>
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
    onHotCityClick(){
      console.log(this.allCitys,'allCitys')
    },
    onLeftClick(){
      this.$emit('update:show',false)
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
  .popContainer-header{
    height: 80px;
    font-size: 30px;
    padding: 0 30px;
  }
  .popContainer-hot{
    font-size: 30px;
    padding: 20px 40px;
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
