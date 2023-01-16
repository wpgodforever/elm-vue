<template>
  <van-popup :value="show" position="top" :style="{ height: '100%' }">
    <div style="z-index: 99999;">
      <div class="navHeader flex-align">
        <van-icon name="arrow-left" @click="onLeftClick"/>
        <span>{{ cityName }}</span>
      </div>
      <!-- 地区选择第一层----城市选择 -->
      <div class="popContainer" v-show="mode === 1">
        <van-cell-group>
          <van-cell icon="location-o" title="当前城市" :value="addressInfo.name || '尚未选择'" />
        </van-cell-group>
        <div class="popContainer-hot">热门城市</div>
        <van-grid>
          <van-grid-item icon="fire-o" @click="onHotCityClick(item)" :text="item.name" v-for="(item, index) in hotCitys" :key="index"/>
        </van-grid>
        <!-- 全部城市 -->
        <van-index-bar :index-list="indexList">
          <div v-for="(item, index) in allCitys" :key="index">
            <van-index-anchor :index="item.char" />
            <van-cell :title="cityItem.name" v-for="(cityItem, cityIndex) in item.data" :key="cityIndex"/>
          </div>
        </van-index-bar>
      </div>
      <div class="secondContainer flex-col">
        <van-search v-model="searchVal" placeholder="请输入具体地址" @search="onSearch"/>
        <van-button type="info" @click="onSearch" round :disabled="searchVal === ''">搜索</van-button>
        <van-cell @click="onAddressClick(item)" :title="item.name" :label="item.address" v-for="(item,index) in searchList" :key="index"/>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { getSearchCity } from '@/api/address/index.js'
export default {
  props:['show'],
  data(){
    return {
      mode:1,//1选择城市   2选择具体地区
      cityId:'',
      cityName:'',
      searchVal:'',
      searchList:[],
    }
  },
  created(){
  },
  methods:{
    onHotCityClick(item){
      this.cityId = item.id
      this.cityName = item.name
      this.mode = 2
    },
    onLeftClick(){
      // 在第一层就收起弹框，第二层就返回第一层
      if(this.mode === 1){
        this.$emit('update:show',false)
      }else{
        this.cityName = ''
        this.mode = 1
      }

    },
    // 具体地址搜索
    onSearch(){
      if(this.searchVal === '') {
        this.$toast.fail('请输入具体地址');
        return
      }
      getSearchCity({
      	type: 'search',
      	city_id: this.cityId,
      	keyword: this.searchVal
      }).then(res => {
        if(res.length === 0){
          this.$toast.fail('暂无搜索结果');
          this.searchList = []
          return
        }
        this.searchList = res
      })
    },
    onAddressClick(item){
      this.$store.commit('address/setCurrentCity',item)
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
.navHeader{
  position: relative;
  height: 80px;
  font-size: 30px;
  padding: 0px 30px;
  span{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
  }
}
.popContainer{

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
}
</style>
