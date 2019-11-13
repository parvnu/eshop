<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="loginMain">
      <van-cell-group>
        <van-field v-model="phone" clearable label="手机号" placeholder="请输入手机号" class="label" />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
        <p class="forgotPass">
          <a href="javascript:" @click="forget">忘记密码</a>
        </p>
        <van-button size="large" @click="login">登录</van-button>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      userInfo: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/sign");
    },
    forget() {
      console.log("忘记密码");
    },
    login() {
      this.$axios({
        // url: "http://localhost:3000/login/cellphone",
        url:this.$api.login,
        params: {
          phone: this.phone,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.userInfo = {
              avatarUrl: res.data.profile.avatarUrl,
              nickname: res.data.profile.nickname,
              message: 10,
              collect: 6,
              pendingPay: 9,
              pendingSend: 3,
              pendingGet: 3,
              pendingAssess: 11,
              phone: this.phone,
              password: this.password
            };
            if (localStorage.getItem("user")) {
              this.$router.push("/index");
            } else {
              localStorage.setItem("user", JSON.stringify(this.userInfo));
              this.$router.push("/index");
            }
          }
        })
        .catch(err => {
          this.$dialog.alert({
            message: "账号或者密码错误"
          }).then(() => {
            // on close
          });
        });
    }
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.phone = JSON.parse(localStorage.getItem("user")).phone;
      this.password = JSON.parse(localStorage.getItem("user")).password;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../assets/css/index.styl'
</style>