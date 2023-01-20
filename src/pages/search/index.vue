<template>
  <div class="container">
    <van-field
      v-model="keyword"
      center
      clearable
      placeholder="请输入商家或者美食名称"
      class="searchBox"
    >
      <template #button>
        <van-button size="small" type="primary" @click="getSearchRestaurantsList">搜索</van-button>
      </template>
    </van-field>
    <div class="container-list flex-col">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="item-img">
          <img :src="imgBaseUrl + item.image_path" class="shop_img"/>
        </div>
        <div class="item-right flex-col">
          <div class="item-right-title">{{ item.name }}</div>
          <div class="item-right-num">{{item.month_sales||item.recent_order_num}}</div>
          <div class="item-right-tip">
            {{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue';
import { mapState } from 'vuex'
import { getSearchRestaurantsList } from '@/api/home'
import { imgBaseUrl } from '@/lib/env'

export default {
  name: 'search',
  data(){
    return {
      keyword:'',
      list:[],
      imgBaseUrl
    }
  },
  methods:{
    getSearchRestaurantsList(){
      if(!this.keyword) return this.$toast.fail('请输入搜索值');
      getSearchRestaurantsList({
      	'extras[]': 'restaurant_activity',
      	geohash:this.addressInfo.latitude + ',' + this.addressInfo.longitude,
      	keyword:this.keyword,
      	type: 'search'
      }).then(res => {
        if(res.message){
          return this.$toast.fail(res.message);
        }
        this.list = res
      })
    }
  },
  computed:{
    ...mapState('address', ['addressInfo'])
  },
}
</script>

<style lang="scss" scoped>
.searchBox{
  position: fixed;
  top: 0;
}

.container-list{
  margin-top: 100px;
  font-size: 36px;
  margin-bottom: 100px;
  .item{
    display: flex;
    padding: 20px;
    &-img{
      width: 180px;
      height: 180px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &-right{
      flex: 1;
      justify-content: space-around;
    }
  }
}


.van-button{
  background-color: $themeColor;
}
</style>
