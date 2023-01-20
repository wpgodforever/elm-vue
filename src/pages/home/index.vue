<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <myNav fixed @onClickTitle="onClickTitle" :title="currentCity || '请点击获取地址'" :rightIcon="'manager-o'" :leftIcon="'search'"  @onClickLeft="onClickLeft" @onClickRight="onClickRight"></myNav>
    <!-- 轮播选择区域 -->
    <div class="swip-box bg">
      <van-loading type="spinner" v-if="loading"/>
      <van-swipe v-else indicator-color="#2f97ec" class="my-swipe" :autoplay="5000">
        <van-swipe-item v-for="(item,index) in foodTypeList" :key="index">
          <div class="swip-container">
            <div class="swip-container-item" v-for="(swipItem,swipIndex) in foodTypeList[index]" :key="swipIndex">
              <div class="swip-container-item--img">
                <img class="imgClass" :src="navImgBaseUrl + swipItem.image_url" alt="" srcset="">
              </div>
              <div class="swip-container-item--text">{{ swipItem.title }}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>


    <!-- 店铺列表区域 -->
    <div class="shopList flex-col">
      <div class="shopList-head flex-align">
        <van-icon name="shop-o" style="margin-right: 5px;"/>
        附近商家
      </div>
      <div class="shopList-item" v-for="(item, index) in shopList" :key="index">
        <div class="shopList-item-img">
          <img :src="imgBaseUrl + item.image_path" class="shop_img">
        </div>
        <div class="shopList-item-middle flex-col">
          <div class="shopList-item-middle_title flex-align">
            <div class="brand">品牌</div>
            <div class="title">{{ item.name }}</div>
          </div>
          <van-rate
            v-model="item.rating"
            :size="10"
            allow-half
            readonly
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
          <div class="shopList-item-middle_pay">
            ￥{{item.float_minimum_order_amount}}起送/{{ item.piecewise_agent_fee.tips }}
          </div>
        </div>
        <div class="shopList-item-right flex-col">
          <div class="shopList-item-right_tip">
            快 准 狠
          </div>
          <div class="shopList-item-right_rate">
            {{ item.rating }}
          </div>
        </div>
      </div>
    </div>
    <adressSelectPop :show.sync="show"></adressSelectPop>
  </div>
</template>

<script>
import tabbar from '@/components/common/tabbar.vue'
import adressSelectPop from '@/components/common/adressSelectPop.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import { getFoodtype, getrestaurantsList } from '@/api/home'
import { imgBaseUrl } from '@/lib/env'

export default {
  name:'home',
  data(){
    return {
      starNum:2.5,
      show:false,
      navImgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      foodTypeList:{
        0:[]
      },
      shopList:[],
      loading:true,
      imgBaseUrl
    }
  },
  methods:{
    ...mapActions('address', [ 'getHotCityAction', 'getAllCityAction',]),
    onClickLeft(){
      console.log('左边被点击')
    },
    onClickRight(){
      if(localStorage.getItem('elm-vue-userId')){
        this.$router.push({
          path: '/tabbar/mine'
        })
      }else{
        this.$router.push({
          path: '/login'
        })
      }

    },
    onClickTitle(){
      if(!this.hotCitys.length){
        this.getHotCityAction()
      }
      if(!this.allCitys.length){
        this.getAllCityAction()
      }

      this.show = true
    },
    getFoodtype(geohash){
      getFoodtype({
        geohash,
        group_type: '1',
	      'flags[]': 'F'
      }).then(res => {
        let resLength = res.length;
       	let resArr = [...res]; // 返回一个新的数组
    		for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          this.$set(this.foodTypeList,j,resArr.splice(0, 8))
    		}
        this.loading = false
      })
    },
    getrestaurantsList(){
      getrestaurantsList({
        offset:0,
        limit:20,
        latitude:this.addressInfo.latitude,
        longitude:this.addressInfo.longitude,
      }).then(res => {
        this.shopList = res
      })
    }
  },
  watch: {
    currentCity(newVal){
      // 刚进来时或者当前城市改变时重新请求
      if(newVal){
        // 在用当前城市坐标请求导航食品类型列表
        this.getFoodtype(this.addressInfo.  latitude + ',' + this.addressInfo.   longitude)
        this.getrestaurantsList()
      }
    }
  },
  created(){
    if(this.currentCity){
      // 若是在别的页面刷新了页面，则列表也要重新请求
      this.getFoodtype(this.addressInfo.  latitude + ',' + this.addressInfo.   longitude)
        this.getrestaurantsList()
    }
  },
  computed:{
    ...mapState('address', ['addressInfo','hotCitys','allCitys']),
    ...mapGetters('address', ['currentCity'])
  },
  components:{
    tabbar,
    adressSelectPop,
  }
}
</script>

<style lang="scss" scoped>
.container{
  font-size: 16px;
  padding-bottom: 95px;
  .swip-container{
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
    &-item{
      display: flex;
      flex-direction: column;
      width: 25%;
      height: 220px;
      &--img{
        width: 100%;
        height: 180px;
        border-radius: 50%;
        overflow: hidden;
        .imgClass{
          width: 100%;
          height: 180px;
        }
      }
      &--text{
        text-align: center;
      }
    }
  }
  .shopList{
    margin-top: 20px;
    background-color: #fff;
    &-head{
      color: #999;
      padding: 20px;
      font-size: 28px;
    }
    &-item{
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      padding: 20px 10px;
      &-img{
        width: 130px;
        height: 130px;
        margin-right: 20px;
      }
      &-middle{
        &_title{
          font-weight: bold;
          margin-bottom: 10px;
          .brand{
            background-color: #ffd930;
            font-size: 12px;
            padding: 0 5px;
            margin-right: 10px;
          }
          .title{
            font-size: 30px;
          }
        }
        &_pay{
          margin-top: auto;
        }
      }
      &-right{
        margin-left: auto;
        &_tip{
          color: #999;
        }
        &_rate{
          color: $themeColor;
          margin-top: auto;
          font-size: 40px;
          margin-left: auto;
        }
      }
    }
  }
}
.swip-box{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 440px;
  width: 100%;
  margin-top: 100px;
}
.bg{
  background-color: #fff;
}
.van-nav-bar {
  background-color: #2f97ec;
  /deep/ .van-nav-bar__title{
    color: white;
  }
}

</style>
