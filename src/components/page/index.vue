<template>
  <div class="index">
    <div class="banner">
      <div class="banMain">
        <div class="search">
          <input type="text" placeholder="search" />
          <span class="sicon"></span>
        </div>
      </div>
    </div>
    <div class="goodSort" v-for="(item,index) in recomList" :key="index">
      <div class="title">
        <img src="../../assets/image/baby.png" alt />
        {{item.name}}
      </div>
      <div class="goodCar">
        <div class="car" v-for="(data,i) in item.list" :key="data.id" v-if="i<2">
          <img :src="data.thumbnail" alt @click="goDetail(data.id)" />
          <div class="price" v-if="data.reduct_price">
            <span class="now">￥{{data.original_price}}</span>
            <span class="before">￥{{data.reduct_price}}</span>
          </div>
          <div class="con">
            <p>{{data.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recomList: "",
      // imgSrc:[
      //   require('../../assets/image/hot.png'),
      //   require('../../assets/image/baby.png'),
      //   require('../../assets/image/baby.png'),
      //   require('../../assets/image/baby.png'),
      //   require('../../assets/image/baby.png'),
      // ]
    };
  },
  mounted() {
    this.$axios({
      // url:'http://yd.msword.top/getIndexData',
      url: this.$api.index
    })
      .then(res => {
        if (res.data.code == 200) {
          this.recomList = res.data.data;
        } else {
          console.log("err");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goDetail(pid) {
      this.$router.push({
        path: "/details",
        query: {
          pid: pid
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/color.styl'

.index
  margin-bottom 1.47rem
  .banner
    height 6.4rem
    width 100%
    background url('../../assets/image/ban.png') no-repeat
    background-size cover
    background-position center
    .banMain
      .search
        text-align center
        position relative
        input
          padding 0 0.27rem
          width 6.3rem
          height 0.8rem
          border-radius 5px
          margin-top 0.45rem
          border 0
          outline none
          background-color rgba(255, 255, 255, 0.3)
          color #333
          font-size 0.35rem
        .sicon
          width 0.53rem
          height 0.53rem
          background-color #000
          position absolute
          top 0.53rem
          right 1.73rem
          background url('../../assets/image/search.png') no-repeat
          background-size cover
  .goodSort
    padding 0 0.27rem
    .title
      padding-left 0.67rem
      font-size 0.37rem
      height 1.33rem
      line-height 1.33rem
      color #333
      position relative
      img
        width 0.53rem
        height 0.53rem
        position absolute
        left 0
        top 0.4rem
    .goodCar
      display flex
      width 100%
      overflow hidden
      justify-content space-between
      .car
        padding 0 0.24rem
        width 3.85rem
        height 6.2rem
        border 2px solid #eee
        background-color #fff
        img
          width 3.2rem
          height 3.89rem
          margin 0.27rem 0.27rem 0
        .price
          display flex
          line-height 0.8rem
          font-size 0.35rem
          justify-content space-around
          .now
            color #e60012
          .before
            color #666
            text-decoration line-through
        .con
          color #666
          line-height 0.53rem
          font-size 0.36rem
</style>