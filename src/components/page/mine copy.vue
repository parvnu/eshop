<template>
  <div class="mine">
    <div class="nav">
      <div class="navTop">
        <span class="iconLeft"></span>个人中心
        <span class="iconRight"></span>
      </div>
    </div>
    <div class="user" @click="goLog">
      <div class="autor"></div>
      <p class="user_text">点击登录</p>
    </div>
    <div class="collection">
      <van-icon name="like-o" />
      <span>我的收藏</span>
    </div>
    <div class="order_list">
      <p>我的订单</p>
      <p class="right">查看全部订单</p>
    </div>
    <div class="info">
      <div class="infoLi">
        <span class="span1" info="12"></span>
        <p>待付款</p>
      </div>
      <div class="infoLi">
        <span class="span2"></span>
        <p>待发货</p>
      </div>
      <div class="infoLi">
        <span class="span3"></span>
        <p>待收货</p>
      </div>
      <div class="infoLi">
        <span class="span4"></span>
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
    methods: {
        goLog(){
            this.$router.push('./login')
        }
    },
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
</style>