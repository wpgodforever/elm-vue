<template>
  <div class="container">
    <!-- 顶部导航栏 -->
    <myNav @onClickTitle="onClickTitle" :title="currentCity || '请点击获取地址'" :rightIcon="'manager-o'" :leftIcon="'search'"  @onClickLeft="onClickLeft" @onClickRight="onClickRight"></myNav>
    <!-- 轮播选择区域 -->
    <div class="swip-box bg">
      <van-loading type="spinner" v-if="loading"/>
      <van-swipe v-else indicator-color="#2f97ec" class="my-swipe" :autoplay="5000">
        <van-swipe-item v-for="(item,index) in foodTypeList" :key="index">
          <div class="swip-container">
            <div class="swip-container-item" v-for="(swipItem,swipIndex) in foodTypeList[index]" :key="swipIndex">
              <div class="swip-container-item--img">
                <img class="imgClass" :src="imgBaseUrl + swipItem.image_url" alt="" srcset="">
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
      <div class="shopList-item" v-for="(item, index) in 10" :key="index">
        <div class="shopList-item-img"></div>
        <div class="shopList-item-middle flex-col">
          <div class="shopList-item-middle_title flex-align">
            <div class="brand">品牌</div>
            <div class="title">效果演示</div>
          </div>
          <van-rate
            v-model="starNum"
            :size="10"
            allow-half
            readonly
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
          <div class="shopList-item-middle_pay">
            ￥20起送/配送费约￥20
          </div>
        </div>
        <div class="shopList-item-right flex-col">
          <div class="shopList-item-right_tip">
            快 准 狠
          </div>
          <div class="shopList-item-right_rate">
            4.7
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
import { getFoodtype } from '@/api/home'

export default {
  name:'home',
  data(){
    return {
      starNum:2.5,
      show:false,
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      foodTypeList:{
        0:[]
      },
      loading:true
    }
  },
  methods:{
    ...mapActions('address', ['getCurrentCityAction', 'getHotCityAction', 'getAllCityAction', 'getDetailCity']),
    ...mapActions('login', ['getUserInfoAction']),
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
    }
  },
  async mounted(){
    this.getHotCityAction()
    this.getAllCityAction()
    // 刚进来需要获取详细地址
    if(!this.currentCity){
      // 先获取当前城市
      await this.getCurrentCityAction()
      // 在用当前城市坐标请求具体地址
      this.getDetailCity()
      // 在用当前城市坐标请求导航食品类型列表
      this.getFoodtype(this.addressInfo.latitude + ',' + this.addressInfo.longitude)
    }

  },
  computed:{
    ...mapState('address', ['addressInfo']),
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
        background-color: pink;
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
