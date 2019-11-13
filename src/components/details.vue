<template>
  <div class="details">
    <div class="banner">
      <div class="s_top">
        <div class="btn btn1" @click="$router.go(-1)">
          <img src="../assets/image/go.png" class="go" />
        </div>
        <div class="btn btn2">
          <img src="../assets/image/gocar.png" class="gocar"  @click="$router.push('./shopcar')" />
        </div>
        <div class="btn btn3">
          <img src="../assets/image/dot.png" class="bot" />
        </div>
      </div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,i) in goodInfo.swiperImgArr" :key="i">
            <img :src="item" alt />
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="goodLabel">
        <div class="title">
          <p class="name">{{goodInfo.name}}</p>
          <div class="storeup">
            <img src="../assets/image/storeup.png" alt />
            <p>收藏</p>
          </div>
        </div>
        <div class="bottom">
          <div class="price">
            <p class="now">￥{{Number(goodInfo.reduct_price).toFixed(2)}}</p>
            <p class="before">￥{{Number(goodInfo.original_price).toFixed(2)}}</p>
          </div>
          <div class="labels">
            <div class="flex">
              <div class="solid">{{(goodInfo.allowance*10).toFixed(1)}}折</div>
              <div class="solid">{{goodInfo.isFreeShip?'包邮':'不包邮'}}</div>
            </div>
            <div class="flex">
              <div class="dotted" v-for="(item,i) in goodInfo.describe" :key="i">{{item}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="change">
      <ul class="tab">
        <li :class="[round=='dInfo'?'active':'']" @click="round='dInfo'">商品详情</li>
        <li :class="[round=='comment'?'active':'']" @click="round='comment'">卖家口碑</li>
      </ul>
      <div
        v-if="goodInfo.shopDes || goodInfo.buyerReviews"
        :is="round"
        :msg="goodInfo.shopDes"
        :data="goodInfo.buyerReviews"
      ></div>
    </div>
    <div class="count">
      <div class="sum">
        加入购物车：
        <span class="money">￥{{buyNum*this.goodInfo.reduct_price}}</span>
        起
      </div>
      <div class="choose">
        <div class="add_car" @click="addCar">加入购物车</div>
        <div class="buy_now" @click="buyNow">立即购买</div>
      </div>
    </div>
    <div class="wrap-sku" v-if="show">
      <div class="sku_top">
        <div class="img_wrap">
          <img :src="goodInfo.swiperImgArr[0]" alt />
        </div>
        <div class="top_right">
          <p class="top_p">￥{{Number(goodInfo.reduct_price).toFixed(2)}}</p>
          <p class="top_s">库存{{goodInfo.total}}</p>
          <p class="top_s">请选择商品属性</p>
          <div class="close" @click="show=false"></div>
        </div>
      </div>
      <div class="buy_num">
        <p>购买数量</p>
        <div class="btn">
          <span @click="cutNum">-</span>
          <div>{{buyNum}}</div>
          <span @click="addNum">+</span>
        </div>
      </div>
      <div class="buy_select">
        <div class="select_list">
          <div class="list_name">{{buySelect[0].name}}</div>
          <ul class="con_wrap">
            <li
              class="list_con"
              v-for="(data,i) in buySelect[0].list"
              :key="i"
              :class="[i==iSelect?'active':'']"
              @click="iSelect=i"
            >{{data}}</li>
          </ul>
        </div>
        <div class="select_list">
          <div class="list_name">{{buySelect[1].name}}</div>
          <ul class="con_wrap">
            <li
              class="list_con"
              v-for="(data,n) in buySelect[1].list"
              :key="n"
              :class="[n==nSelect?'active':'']"
              @click="nSelect=n"
            >{{data}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "../../node_modules/swiper/js/swiper.min.js";
import dInfo from "./page/detailInfo";
import comment from "./page/comment";
export default {
  data() {
    return {
      shopDes: "",
      goodInfo: "",
      round: "dInfo",
      show: false,
      buyNum: 1,
      iSelect: -1,
      nSelect: -1,
      buySelect: "",
      pid: this.$route.query.pid,
    };
  },
  methods: {
    //轮播
    swiper() {
      new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    },
    //加入购物车
    addCar() {
      this.show = !this.show;
      if (this.iSelect != -1 && this.nSelect != -1) {
        let arr = [];
        let obj = {
          check: false,
          select1: this.buySelect[0].list[this.iSelect],
          select2: this.buySelect[1].list[this.nSelect],
          num: this.buyNum,
          price: this.goodInfo.reduct_price,
          name: this.goodInfo.name,
          imgSrc: this.goodInfo.swiperImgArr[0]
        };
        //如果本地存储有值，取出来  存入arr 再存入本地存储中
        //如果没有 将数据直接存到arr中 再存入本地存储中
        if (localStorage.getItem("shopCar")) {
          arr = JSON.parse(localStorage.getItem("shopCar"));
          arr.push(obj);
          localStorage.setItem("shopCar", JSON.stringify(arr));
        } else {
          arr.push(obj);
          localStorage.setItem("shopCar", JSON.stringify(arr));
        }
        this.iSelect = -1;
        this.nSelect = -1;
        this.$toast("快去购物车看看吧");
      }
    },
    //立即购买
    buyNow() {
      this.show = true;
      this.$router.push("/shopcar");
    },
    //商品数量增加
    addNum() {
      if (this.buyNum <= 99) {
        this.buyNum++;
      }
    },
    //商品数量减少
    cutNum() {
      if (this.buyNum > 0) {
        this.buyNum--;
      }
    },
  },
  mounted() {
    //渲染页面
    this.$axios({
      // url: "http://yd.msword.top/getDetails",
      url:this.$api.detail,
      params: {
        pid: this.pid
      }
    })
      .then(res => {
        if (res.data.code == 200) {
          this.goodInfo = res.data.data;
          this.buySelect = res.data.data.buySelect;
          this.$nextTick(() => {
            this.swiper();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    dInfo,
    comment
  }
};
</script>
<style lang="stylus" scoped>
.details
  position relative
  height 100%
.banner
  position relative
  .s_top
    width 100%
    display flex
    position absolute
    top 0
    left 0
    z-index 999
    .btn
      width 0.73rem
      height 0.73rem
      background rgba(0, 0, 0, 0.3)
      border-radius 100%
      position relative
      top 0.15rem
      .go
        width 0.21rem
        height 0.37rem
        margin-left 0.25rem
        margin-top 0.19rem
      .gocar
        width 0.39rem
        height 0.36rem
        margin-left 0.19rem
        margin-top 0.17rem
      .bot
        width 0.35rem
        height 0.08rem
        margin-left 0.2rem
        margin-top 0.31rem
.btn1
  left 0.31rem
.btn2
  left 6.53rem
.btn3
  left 7.07rem
.swiper-container
  width 100%
  height 100%
  margin-left auto
  margin-right auto
.swiper-slide
  height 7.2rem
  text-align center
  font-size 0.24rem
  background #fff
  /* Center slide text vertically */
  display -webkit-box
  display -ms-flexbox
  display -webkit-flex
  display flex
  -webkit-box-pack center
  -ms-flex-pack center
  -webkit-justify-content center
  justify-content center
  -webkit-box-align center
  -ms-flex-align center
  -webkit-align-items center
  align-items center
.goodLabel
  border-top 1px solid #eee
  padding 0.11rem 0 0.27rem 0.27rem
  margin-bottom 0.43rem
  background-color #fff
  .title
    width 100%
    display flex
    .name
      font-size 0.4rem
      line-height 0.6rem
      width 7.6rem
      padding-right 0.53rem
    .storeup
      width 1.31rem
      text-align center
      color #e71f19
      border-left 1px solid #ddd
      img
        width 0.49rem
        height 0.49rem
  .bottom
    display flex
    .price
      width 2rem
      .now
        font-size 0.4rem
        line-height 0.6rem
        color #eb2222
      .before
        font-size 0.24rem
        line-height 0.6rem
        text-decoration line-through
        color #a0a0a0
    .labels
      .flex
        display flex
      div
        height 0.4rem
        padding 0 0.07rem
        line-height 0.4rem
        margin 0.13rem
      .solid
        background-color #ff9900
        color #fff
      .dotted
        box-sizing border-box
        border 0.03rem solid #ff9900
        color #ff9900
        line-height 0.35rem
.change
  margin-bottom 1.33rem
  background-color #fff
  padding 0 0.27rem 0.67rem
  .tab
    display flex
    padding-top 0.13rem
    padding-bottom 0.35rem
    li
      flex 1
      text-align center
      font-size 0.35rem
      line-height 0.61rem
      border-bottom 2px solid #fff
      color #999
      margin 0 0.89rem
    .active
      border-bottom 2px solid #ff9900
      color #ff9900
.count
  width 100%
  height 1.33rem
  position fixed
  bottom 0
  display flex
  font-sise 0.4rem
  line-height 1.29rem
  text-align center
  background-color #fff
  border-top 1px solid #ddd
  .sum
    flex 1
    color #666
    .money
      color #eb2222
  .choose
    flex 1
    display flex
    color #fff
    .add_car
      flex 1
      background-color #ff9900
    .buy_now
      flex 1
      background-color #eb2222
.wrap-sku
  width 100%
  height 7.67rem
  position fixed
  bottom 1.33rem
  background-color #fff
  padding 0 0.53rem
  background-color #fafafa
  .sku_top
    display flex
    .img_wrap
      width 2.85rem
      height 2.85rem
      margin-top -0.37rem
      margin-right 0.27rem
      img
        width 2.85rem
        height 2.85rem
    .top_right
      width 5.87rem
      margin-top 0.75rem
      position relative
      p
        font-size 0.32rem
        line-height 0.45rem
        color #333
      .top_p
        color #eb2222
      .close
        position absolute
        right 0
        top 0
        width 0.75rem
        height 0.75rem
        background url('../assets/image/close.png') no-repeat
        background-size cover
  .buy_num
    width 8.89rem
    display flex
    justify-content space-between
    p
      font-size 0.37rem
      line-height 0.64rem
      color #333
    .btn
      display flex
      width 2.67rem
      height 0.67rem
      text-align center
      line-height 0.67rem
      font-size 0.33rem
      span
        width 0.67rem
        height 0.67rem
        background-color #999
        color #fff
      div
        width 1.33rem
        border-top 2px solid #ddd
        border-bottom 2px solid #ddd
  .buy_select
    width 8.89rem
    .select_list, .list_name
      font-size 0.4rem
      line-height 0.8rem
      color #333
    .con_wrap
      display flex
      .list_con
        width 1.6rem
        height 0.6rem
        line-height 0.6rem
        text-align center
        background-color #dddddd
        color #999
        border-radius 5px
        margin 10px
        padding 0 10px
      .active
        background-color #ff9900
        color #fff
</style>