<template>
  <div class="container-login">
    <!-- 顶部导航栏 -->
    <myNav :title="'登录'" :leftIcon="'arrow-left'"  @onClickLeft="onClickLeft"></myNav>
    <van-notice-bar
      left-icon="volume-o"
      text="
        温馨提示：未注册过的账号，登录时将自动注册。
        注册过的用户可凭账号密码登录
         "
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.captcha_code"
        center
        name="验证码"
        clearable
        label="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #input>
          <div class="codeInput flex-align">
            <input v-model="form.captcha_code" placeholder="请输入验证码"/>
            <div class="codeInput-img">
              <img :src="codeImg" alt="">
            </div>
          </div>
        </template>
        <template #button>
          <van-button size="small" type="primary" @click.prevent="getCodeInfo">换一张</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="default">重置密码</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getCode, login } from '@/api/login'

export default {
  name: 'login',
  data(){
    return {
      form:{
        username: '',
        password: '',
        captcha_code: '',
      },
      codeImg:'',
    }
  },
  created(){
    this.getCodeInfo()
  },
  methods:{
    onClickLeft(){
      this.$router.back(-1)
    },
    onSubmit(values) {
      login(this.form).then(res => {
        console.log(res.message,'res.message')
        if(res.message){
          return this.$toast.fail(res.message);
        }
        this.$store.commit('setUserInfo',res)
        this.$router.push({
          path: '/'
        })
      })
    },
    getCodeInfo(){
      getCode().then(res => {
        this.codeImg = res.code
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.codeInput{
  flex: 1;
  input{
    width: 200px;
    border: 0;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers，webkit内核浏览器 */
    color: #ccc;
  }
  &-img{
    width: 130px;
    height: 60px;
    margin: 0 20px;

    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
}

</style>
