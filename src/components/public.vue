<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item @click="goIndex">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.h_active : icon.h_normal" />
      </van-tabbar-item>
      <van-tabbar-item @click="goSort">
        <span>分类</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.s_active : icon.s_normal" />
      </van-tabbar-item>
      <van-tabbar-item @click="goShopcar">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.c_active : icon.c_normal" />
      </van-tabbar-item>
      <van-tabbar-item @click="goMine">
        <span>我</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.m_active : icon.m_normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        h_normal: require("../assets/image/tab_home_nor.png"),
        h_active: require("../assets/image/tab_home_hig.png"),
        s_normal: require("../assets/image/tab_menu_nor.png"),
        s_active: require("../assets/image/tab_menu_hig.png"),
        c_normal: require("../assets/image/tab_shopping_nor.png"),
        c_active: require("../assets/image/tab_shopping_hig.png"),
        m_normal: require("../assets/image/tab_me_nor.png"),
        m_active: require("../assets/image/tab_me_hig.png")
      }
    };
  },
  methods: {
    goIndex() {
      this.$router.push("/index");
    },
    goSort() {
      this.$router.push("/sort");
    },
    goShopcar() {
      this.$router.push("/shopcar");
    },
    goMine() {
      this.$router.push("/mine");
    },
    matchPath() {
      if (this.$route.path == "/index") {
        this.active = 0;
      } else if (this.$route.path == "/sort") {
        this.active = 1;
      } else if (this.$route.path == "/shopcar") {
        this.active = 2;
      } else if (this.$route.path == "/mine") {
        this.active = 3;
      }
    }
  },
  mounted() {
    this.matchPath();
  }
};
</script>
<style lang="stylus" scoped>
@import '../assets/css/index.styl'
</style>