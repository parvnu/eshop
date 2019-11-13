<template>
  <div class="shop_car">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.go(-1)" />
    <!-- 空购物车 -->
    <div class="empty" v-if="!goodsList || goodsList.length==0">
      <img src="../../assets/image/shopping_wu.png" alt />
      <p>购物车还是空的</p>
      <p>快去逛逛吧~</p>
    </div>
    <!-- 满购物车 -->
    <div class="full" v-if="goodsList">
      <div class="good">
        <div class="card" v-for="(item,i) in goodsList" :key="i">
          <div class="cardTop">
            <img src="../../assets/image/store.png" alt class="store" />
            <span>杭州保税区仓</span>
          </div>
          <div class="touch_wrap">
            <div
              class="cardMain"
              @touchstart="touchStart(i)"
              @touchmove="touchMove(i)"
              @touchend="touchEnd(i)"
              ref="cardMain"
            >
              <input
                type="checkbox"
                :id="i"
                v-model="item.check"
                @click="choseOne(i)"
                style="display:none"
              />
              <label :for="i">
                <span class="iconfont icon-xuanzhong" :class="[item.check==true?'checked':'']"></span>
              </label>
              <img :src="item.imgSrc" alt />
              <div class="con">
                <p>{{item.name}}</p>
                <p class="span">{{item.select1}}&#12288;&#12288;{{item.select2}}</p>
                <p class="btn">
                  <span @click="cutNum(i)">-</span>
                  <span>{{item.num}}</span>
                  <span @click="addNum(i)">+</span>
                </p>
              </div>
              <div class="sprice">￥{{item.price}}</div>
            </div>
            <div class="remove" ref="remove" @click="delOne(i)">删除</div>
          </div>
        </div>
      </div>
      <div class="account">
        <div class="ce_wrap">
          <div class="check_all">
            <label for="checkAll" @click="choseAll">
              <span class="iconfont icon-total_selection" :class="[checkAll==true?'active':'']"></span>
            </label>
            <input type="checkbox" id="checkAll" v-model="checkAll" />
          </div>
          <div class="edit" @click="delMany">
            <span class="iconfont icon-bianji"></span>
          </div>
        </div>
        <div class="sum">
          <p>合计：{{all}}</p>
          <p>(不含运费)</p>
        </div>
        <div class="acc_btn" @click="goSum">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      goodsList: [],
      delArr: [],
      checkAll: false,
      startX: 0, //触摸开始位置
      endX: 0, //结束位置
      moveX: 0, //滑动时的位置
      disX: 0 //移动距离
    };
  },
  mounted() {
    this.goodsList = JSON.parse(localStorage.getItem("shopCar"));
  },
  methods: {
    //数量增加
    addNum(i) {
      if (this.goodsList[i].num < 100) {
        this.goodsList[i].num++;
      }
    },
    //数量减少
    cutNum(i) {
      if (this.goodsList[i].num > 1) {
        this.goodsList[i].num--;
      }else{
        this.$toast('要选择最少一件哦')
      }
    },
    goSum() {},
    //全选
    choseAll() {
      if (this.checkAll) {
        this.goodsList.map((item, index) => {
          item.check = false;
        });
      } else {
        this.goodsList.map((item, index) => {
          item.check = true;
        });
      }
    },
    //单选
    choseOne(n) {
      this.$set(this.goodsList[n], "check", !this.goodsList[n].check);
      let result = this.goodsList.map((item, index) => {
        return item.check;
      });
      let res = result.every((item, index) => {
        return item == true;
      });
      if (res == true) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    //批量删除
    delMany() {
      this.goodsList.map((item, index) => {
        if (item.check == true) {
          this.delArr.push(index);
        }
      });
      if(this.delArr.length != 0){
        this.$dialog
        .confirm({
          message: "是否要删除选中项？"
        })
        .then(() => {
          this.delArr.sort((a, b) => {
            return a - b;
          });
          for (var i = 0; i < this.delArr.length; i++) {
            this.goodsList.splice(this.delArr[i] - i, 1);
          }
          this.delArr = [];
          localStorage.setItem("shopCar", JSON.stringify(this.goodsList));
          this.reload();
        })
        .catch(() => {});
      }else{
        this.$toast('您还没选中商品呢')
      }
    },
    touchStart(index, ev) {
      ev = ev || event;
      this.startX = 0;
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(index, ev) {
      ev = ev || event;
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = this.$refs.remove[index].offsetWidth;
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX;
        // 起始位置 - 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX == 0) {
          this.$refs.cardMain[index].style = "transform:translateX(0px)";
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5。
          this.$refs.cardMain[index].style =
            "transform:translateX(-" + this.disX * 5 + "px)";
          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.$refs.cardMain[index].style =
              "transform:translateX(-" + wd + "px)";
          }
        }
      }
    },
    touchEnd(index, ev) {
      ev = ev || event;
      let wd = this.$refs.remove[index].offsetWidth;
      if (ev.changedTouches.length === 1) {
        let endX = ev.changedTouches[0].clientX;
        this.disX = this.startX - endX;
        // 如果距离小于删除按钮一半,强行回到起点
        if (this.disX * 5 < wd / 2) {
          this.$refs.cardMain[index].style = "transform:translateX(0px)";
        } else {
          // 大于一半 滑动到最大值
          this.$refs.cardMain[index].style =
            "transform:translateX(-" + wd + "px)";
        }
      }
    },
    delOne(n) {
      this.goodsList.splice(n, 1);
      localStorage.setItem("shopCar", JSON.stringify(this.goodsList));
      this.reload();
    }
  },
  //金额合计
  computed: {
    all() {
      let sum = 0;
      this.goodsList.map((item, index) => {
        if (item.check == true) {
          sum += item.num * item.price;
        }
      });
      return sum;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/index.styl'
.shop_car, .van-nav-bar
  height 1.33rem
  line-height 1.33rem
  font-size 0.44rem
  background-color $normal
  .van-icon
    color #fff
    font-size 0.44rem
  .van-nav-bar__title
    color #fff
    font-size 0.44rem
.empty
  padding-top 4.27rem
  width 100%
  background-color #fafafa
  text-align center
img
  width 1.2rem
  height 1.2rem
p
  font-size 0.4rem
  line-height 0.6rem
  color #333
.full
  margin-bottom 3rem
.good
  width 100%
  .card
    background-color #fafafa
    padding 0 0 0.67rem 0
    position relative
    overflow hidden
    width 10rem
    .cardTop
      color #999
      height 1.07rem
      line-height 1.07rem
      padding-left 0.27rem
      .store
        width 0.53rem
        height 0.53rem
        margin-right 0.47rem
        margin-top 0.33rem
  .touch_wrap
    width 100%
    position relative
    height 2.8rem
    .cardMain
      height 2.8rem
      background-color #fafafa
      padding 0.28rem 0
      display flex
      position absolute
      left 0
      right 0
      top 0
      z-index 1
      transition 0.3s
      .iconfont
        display block
        color #ddd
        font-size 24px
        margin 0.27rem 0.13rem
      .checked
        color $normal
      img
        width 2.09rem
        height 2.09rem
        margin 0 0.33rem 0 0.13rem
      .con
        p
          color #333
          font-size 0.4rem
          line-height 0.58rem
          width 4.5rem
        .span
          color #999
        .btn
          display flex
          margin-top 0.13rem
        span
          text-align center
          line-height 0.67rem
          width 1rem
          height 0.67rem
          border 1px solid #ccc
          border-right none
          color #666
          font-weight 500
          font-style 0.47rem
        span:last-child
          border-right 1px solid #ccc
      .sprice
        color #000
        line-height 2.09rem
        margin-left 0.27rem
    .remove
      width 1.33rem
      height 3.31rem
      background-color #ff9900
      color #fff
      line-height 3.32rem
      text-align center
      position absolute
      right 0
      top 0
      margin-top 1px
.van-checkbox
  margin-left 0.27rem
.account
  display flex
  font-sise 0.35rem
  width 100%
  height 1.49rem
  background-color #fff
  position fixed
  bottom 1.33rem
  border-top 3px solid #eee
  z-index 2
  text-align center
  .ce_wrap
    flex 1
    display flex
    .check_all
      flex 1
      color #8c8c8c
      .icon-total_selection
        font-size 0.67rem
        margin-left 0.67rem
      .active
        color $normal
    .edit
      flex 1
      color #8c8c8c
      .icon-bianji
        font-size 0.67rem
  .sum
    flex 1
    padding-top 0.27rem
    p
      font-size 0.35rem
      line-height 0.4rem
      color #999
  .acc_btn
    flex 1
    width 3.09rem
    text-align center
    color #fff
    line-height 1.49rem
    background-color #ff5500
  #checkAll
    display none
</style>