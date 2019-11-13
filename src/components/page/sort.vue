<template>
  <div class="sort">
    <div class="sortTop">
      <div class="search">
        <input type="text" placeholder="search" />
        <span class="sicon"></span>
      </div>
    </div>
    <div class="sortMain">
      <van-tree-select :items="items" :main-active-index.sync="activeIndex" >
        <template slot="content">
          <div v-if="activeIndex === i" class="s_group" v-for="(item,i) in sortList" :key="i" >
            <div class="shopCar" v-for="data in item.list" :key="data.id">
              <img :src=data.thumbnail alt />
              <p class="s_name">{{data.name}}</p>
            </div>
          </div>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      items:[],
      sortList:''
    };
  },
  mounted() {
    this.$axios({
      // url:'http://yd.msword.top/getClassify'
      url:this.$api.sort
    })
    .then(res=>{
      let arr = []
      if(res.data.code==200){
        this.sortList = res.data.data
        res.data.data.map((item,index)=>{
          let obj = {}
          obj.text = item.name
          arr.push(obj)
        })
        this.items = arr
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/color.styl'
.sort, .sortTop
  background $normal
  height 1.33rem
  .search
    text-align center
    position relative
    input
      padding 0 0.27rem
      width 6.3rem
      height 0.8rem
      border-radius 5px
      margin-top 0.27rem
      border 0
      outline none
      background-color rgba(255, 255, 255, 0.5)
      color #333
      font-size 0.35rem
    .sicon
      width 0.53rem
      height 0.53rem
      background-color #000
      position absolute
      top 0.4rem
      right 1.73rem
      background url('../../assets/image/search.png') no-repeat
      background-size cover
.van-sidebar-item--select
  border-color #1d84a7
.s_group
  display flex
  flex-wrap wrap
  padding-top 0.27rem
  padding-left .13rem
  .shopCar
    width 2.79rem
    height 2.95rem
    border 2px solid #1d84a7
    border-radius 5px
    text-align center
    margin .13rem .13rem .4rem
    img
      margin-top 0.19rem
      width 2.1rem
      height 2.11rem
    .s_name
      height 0.54rem
      background-color #1d84a7
      color #fff
</style>