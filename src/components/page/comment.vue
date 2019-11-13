<template>
  <div class="comment">
    <!-- <ul class="com_sort">
      <li
        v-for="(item,i) in name"
        :key="i"
        @click="change(i)"
        :class="[i==num?'active':'']"
      >{{item}}</li>
    </ul>-->
    <ul class="com_sort">
      <li
        v-for="item in group"
        :key="item.name"
        @click="change(item.name)"
        :class="[item.name==flag?'active':'']"
      >{{item.title}}</li>
    </ul>
    <div class="com_main">
      <div class="com_card" v-for="(item,i) in buyerReviews" :key="i">
        <div class="consumer">
          <div class="name">{{item.buyerName}}</div>
          <div class="time">{{Number(item.createTime) | toTime}}</div>
        </div>
        <div class="ptoto">
          <div v-for="(data,index) in item.postImg" :key="index">
            <img :src="data" alt />
          </div>
        </div>
        <p class="con">{{item.postDescribe}}</p>
        <div class="reply">管理员:{{item.adminReviews}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      buyerReviews: "",
      group: [
        {
          title: "全部评价",
          name: "all"
        },
        {
          title: "好评",
          name: "good"
        },
        {
          title: "差评",
          name: "bad"
        },
        {
          title: "晒单",
          name: "postForm"
        }
      ],
      // name: ["全部评价", "好评", "差评", "晒单"],
      // num: 0
      flag:'all'
    };
  },
  methods: {
    //评论切换
    // change(n) {
    //   this.num = n;
    //   if (n == 0) {
    //     this.buyerReviews = this.data.all;
    //   } else if (n == 1) {
    //     this.buyerReviews = this.data.good;
    //   } else if (n == 2) {
    //     this.buyerReviews = this.data.bad;
    //   } else if (n == 3) {
    //     this.buyerReviews = this.data.postForm;
    //   }
    // }
    change(name) {
      this.flag = name;
      this.buyerReviews = this.data[name];
    }
  },
  filters: {
    //时间转换
    toTime(n) {
      let date = new Date(n);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      let hour =
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      let minute =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      let second =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  },
  mounted() {
    this.buyerReviews = this.data.all;
  }
};
</script>
<style lang="stylus" scoped>
.comment
  padding 0 0.13rem
  .com_sort
    display flex
    text-align center
    justify-content space-between
    border-top 1px solid #ddd
    border-bottom 1px solid #ddd
    li
      width 1.8rem
      height 0.67rem
      line-height 0.67rem
      font-size 0.29rem
      background-color rgba(0, 0, 0, 0.3)
      border-radius 10px
      color #fff
      margin 10px 0
    .active
      background-color #ff9900
.com_main
  .com_card
    .consumer
      display flex
      justify-content space-between
      height 0.8rem
      line-height 0.8rem
      .name
        font-size 0.31rem
        color #ff9900
      .time
        font-size 0.19rem
        color #999
    .ptoto
      display flex
      img
        width 2rem
        height 2rem
        margin 0 0.27rem
    .con
      margin-top 0.13rem
      font-size 0.27rem
      line-height 0.51rem
      color #999
    .reply
      width 9.2rem
      margin 0.13rem auto
      background-color #ddd
      color #666
      border-radius 0.13rem
      font-size 0.21rem
      line-height 0.4rem
      padding 0.13rem
</style>