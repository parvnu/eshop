<template>
  <div class="mine">
    <div class="nav">
      <div class="navTop">
        <span class="iconLeft" @click="logOut"></span>个人中心
        <span class="iconRight"></span>
        <i class="num message" v-if="userInfo">{{userInfo.message&lt;10?userInfo.message:'9+'}}</i>
      </div>
    </div>
    <div class="user" @click="goLog">
      <div class="autor">
        <img :src="userInfo.avatarUrl" alt v-if="userInfo" />
      </div>
      <p class="user_text">{{userInfo?userInfo.nickname:'点击登录'}}</p>
    </div>
    <div class="collection">
      <van-icon name="like-o" />
      <span>我的收藏 ({{userInfo?userInfo.collect:'0'}})</span>
    </div>
    <div class="order_list">
      <p>我的订单</p>
      <p class="right">查看全部订单</p>
    </div>
    <div class="info">
      <div class="infoLi">
        <span class="span1"></span>
        <i class="num infonum" v-if="userInfo">{{userInfo.pendingPay&lt;10?userInfo.pendingPay:'9+'}}</i>
        <p>待付款</p>
      </div>
      <div class="infoLi">
        <span class="span2"></span>
        <i class="num infonum" v-if="userInfo">{{userInfo.pendingSend&lt;10?userInfo.pendingSend:'9+'}}</i>
        <p>待发货</p>
      </div>
      <div class="infoLi">
        <span class="span3"></span>
        <i class="num infonum" v-if="userInfo">{{userInfo.pendingGet &lt; 10 ? userInfo.pendingGet:'9+'}}</i>
        <p>待收货</p>
      </div>
      <div class="infoLi">
        <span class="span4"></span>
        <i
          class="num infonum"
          v-if="userInfo"
        >{{userInfo.pendingAssess&lt;10?userInfo.pendingAssess:'9+'}}</i>
        <p>待评价</p>
      </div>
      <div class="infoLi">
        <span class="span5"></span>
        <p>退款/售后</p>
      </div>
    </div>
    <div class="address">
      <p>收货地址管理</p>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      userInfo: "",
      isLog:false
    };
  },
  methods: {
    //点击登录
    goLog() {
      if(this.isLog==false){
        this.$router.push("/login");
      }
    },
    //退出登录
    logOut() {
      if (localStorage.getItem("user")) {
        this.$dialog
          .confirm({
            message: "是否要退出登录吗？"
          })
          .then(() => {
            this.$axios({
              // url: "http://localhost:3000/logout"
              url: this.$api.logout
            })
              .then(res => {
                if (res.data.code == 200) {
                  localStorage.removeItem("user");
                  this.reload();
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {});
      }else{
        this.$dialog.alert({
          message:'请先登录'
        })
      }
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    if(this.userInfo != null){
      this.isLog = true
    }else{
      this.isLog = false
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/color.styl'
.nav
  background-color $normal
  height 4.4rem
.navTop
  text-align center
  font-size 0.53rem
  line-height 1.6rem
  color #fff
  background-color $normal
.navTop span
  display block
  width 0.67rem
  height 0.67rem
  background-size contain
  margin-top 0.33rem
.iconLeft
  float left
  margin-left 0.33rem
  background url('../../assets/image/set.png') no-repeat
.iconRight
  float right
  margin-right 0.33rem
  background url('../../assets/image/news.png') no-repeat
.user
  text-align center
  .autor
    width 2.4rem
    height 2.4rem
    border 10px solid #fff
    background-color #e6dfdf
    border-radius 100%
    margin -1.33rem auto
    img
      width 2.4rem
      height 2.4rem
      border-radius 100%
  .user_text
    margin-top 1.33rem
    font-size 0.4rem
    color #333
    line-height 0.93rem
.collection
  border-bottom 0.17rem solid #efeeee
  font-size 0.4rem
  line-height 1.33rem
  .van-icon
    font-size 0.53rem
    color #eb524d
    margin-left 0.4rem
    vertical-align -0.13rem
.order_list
  display flex
  justify-content space-between
  height 1.6rem
  line-height 1.6rem
  font-size 0.4rem
  padding 0 0.27rem
  color #333
  border-bottom 1px solid #b3b3b3
  .right
    color #999
.info
  height 2.51rem
  display flex
  justify-content space-around
  border-bottom 0.2rem solid #efeeee
  .infoLi
    padding-top 0.53rem
    text-align center
    position relative
    span
      display block
      width 0.67rem
      height 0.67rem
      margin 0 auto
    .span1
      background url('../../assets/image/icon_boligation.png') no-repeat
      background-size contain
    .span2
      background url('../../assets/image/prepare.png') no-repeat
      background-size contain
    .span3
      background url('../../assets/image/icon_consignee.png') no-repeat
      background-size contain
    .span4
      background url('../../assets/image/icon_evaluate.png') no-repeat
      background-size contain
    .span5
      background url('../../assets/image/icon_refund.png') no-repeat
      background-size contain
    p
      font-size 0.35rem
      color #666
      line-height 1.02rem
.address
  height 1.69rem
  line-height 1.69rem
  color #999
  font-size 0.45rem
  padding-left 0.27rem
.num
  display block
  width 0.51rem
  height 0.51rem
  background-color #ff0000
  color #fff
  font-size 0.23rem
  line-height 0.49rem
  text-align center
  font-style normal
  border-radius 100%
  position absolute
.message
  top 0.07rem
  right 0.07rem
.infonum
  top 0.27rem
  right 0
</style>