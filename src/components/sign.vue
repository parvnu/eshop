<template>
  <div class="sign">
    <van-nav-bar
      title="注册"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="signMain">
      <form action>
        <van-cell-group>
          <van-field v-model="nickname" label="昵称" placeholder="请输入昵称" clearable @blur="testName" />
          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            clearable
            right-icon="question-o"
            @click-right-icon="$toast('密码为6-16位数字字母组合')"
            @blur="testPass"
          />
          <van-field v-model="phone" label="手机号" placeholder="请输入手机号" clearable @blur="testPhone" />
          <van-field
            v-model="captcha"
            center
            label="验证码"
            placeholder="请输入短信验证码"
            @blur="testCaptcha"
          >
            <van-button
              slot="button"
              size="small"
              @click="sendSms"
              :disabled="sendDisabled"
            >{{text}}</van-button>
          </van-field>
          <van-button size="large" @click="next" :disabled="nextDisabled">下一步</van-button>
          <van-checkbox v-model="checked" shape="square" checked-color="#ff9900">
            <span class="text">我已阅读并同意使用条款和隐私政策</span>
          </van-checkbox>
        </van-cell-group>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickname: "",
      phone: "",
      password: "",
      captcha: "",
      checked: "",
      count: 60,
      text: "发送",
      timer: null,
      nextDisabled: true,
      sendDisabled: true
    };
  },
  mounted() {
    // console.log(this.$api.sign)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/login");
    },
    //发送验证码
    sendSms() {
      //按钮倒计时
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--;
            //发送验证码
            this.$axios({
              // url: "http://localhost:3000/captcha/sent",
              url: this.$api.sendCaptcha,
              params: {
                phone: this.phone
              }
            })
              .then(res => {
                if (res.data.code == 200) {
                  this.$toast("发送成功");
                } else {
                  this.$toast("请重新发送");
                }
              })
              .catch(err => {
                this.$toast("注册失败");
              });
            if (this.count !== 0) {
              this.text = this.count;
            } else {
              clearInterval(this.timer);
              this.count = 60;
              this.text = "重新发送";
              this.timer = null;
              this.isdisabled = false;
            }
          }
        }, 1000);
      }
    },
    //检测昵称
    testName() {
      if (this.nickname == "") {
        this.$toast("请输入昵称");
      }
    },
    //检测密码
    testPass() {
      var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (this.password == "") {
        this.$toast("请输入密码");
      } else if (!passReg.test(this.password)) {
        this.$toast("密码格式不正确");
      }
    },
    //检测手机号
    testPhone() {
      var phoneReg = /^1[0-9]{10}$/;
      if (this.phone == "") {
        this.$toast("请输入手机号");
      } else if (!phoneReg.test(this.phone)) {
        this.$toast("手机号码格式不正确");
      } else {
        this.flag = 1;
        this.$axios({
          //检测手机号是否被注册
          // url: "http://localhost:3000/cellphone/existence/check",
          url: this.$api.checkPhone,
          params: {
            phone: this.phone
          }
        })
          .then(res => {
            if (res.data.exist == 1) {
              this.$toast("该手机号已被注册");
            } else if (res.data.exist == -1) {
              this.sendDisabled = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //检测验证码
    testCaptcha() {
      var captchaReg = /^[0-9]{4}$/;
      if (this.captcha == "") {
        this.$toast("请输入验证码");
      } else if (!captchaReg.test(this.captcha)) {
        this.$toast("验证码格式不正确");
      } else {
        //验证验证码
        this.$axios({
          // url: "http://localhost:3000/captcha/verify",
          url: this.$api.checkCaptcha,
          params: {
            phone: this.phone,
            captcha: this.captcha
          }
        })
          .then(res => {
            if (res.code != 200) {
              this.$toast("验证码错误");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //注册
    next() {
      this.$axios({
        // url: "http://localhost:3000/register/cellphone",
        url: this.$api.sign,
        params: {
          phone: this.phone,
          password: this.password,
          captcha: this.captcha,
          nickname: this.nickname
        }
      })
        .then(res => {
          if (res.code == 200) {
            this.Notify({ type: "success", message: "注册成功" });
            this.$router.push("/index");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    if (
      this.checked == true &&
      this.nickname != "" &&
      this.phone != "" &&
      this.password != "" &&
      this.captcha != ""
    ) {
      this.nextDisabled = false;
    }
    if (this.phone.length == 11) {
      this.sendDisabled = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../assets/css/index.styl'
</style>