<template>
  <div class="container-login">
    <!-- 顶部导航栏 -->
    <myNav :title="'修改密码'" :leftIcon="'arrow-left'"  @onClickLeft="onClickLeft"></myNav>
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.oldpassWord"
        type="password"
        name="旧密码"
        label="旧密码"
        placeholder="请输入旧密码"
        :rules="[{ required: true, message: '请填写旧密码' }]"
      />
      <van-field
        v-model="form.newpassword"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.confirmpassword"
        type="password"
        name="确认新密码"
        label="确认新密码"
        placeholder="确认新密码"
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
        <van-button round block type="info" native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getCode, resetPassword } from '@/api/login'
import { mapMutations } from 'vuex'

export default {
  name: 'reset',
  data(){
    return {
      form:{
        username: '',
        oldpassWord: '',
        newpassword: '',
        confirmpassword: '',
        captcha_code: '',
      },
      codeImg:'',
    }
  },
  created(){
    this.getCodeInfo()
  },
  methods:{
    ...mapMutations('login', ['setUserInfo']),
    onClickLeft(){
      this.$router.back(-1)
    },
    onSubmit(values) {
      resetPassword(this.form).then(res => {
        console.log(res.message,'res.message')
        if(res.message){
          this.getCodeInfo()
          return this.$toast.fail(res.message);
        }
        this.$toast.success('修改成功');
        setTimeout(() => {
          this.$router.push({
            path: '/'
          })
        },1000)
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
