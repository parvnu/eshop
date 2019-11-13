<template>
  <div id="app">
    <router-view v-if="isShow"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isShow:true
    }
  },
  methods:{
    reload(){
      this.isShow = false;
      this.$nextTick(()=>{
        this.isShow = true
      })
    }
  }
}
</script>

<style>
html,body,#app{
  /* height: 100%; */
  background-color: #fafafa;
}
</style>
