<template>
    <div class="info">
        <div v-for='(item,i) in shopDes' :key=i>
            <img :src='item' alt="">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            shopDes:this.msg
        }
    },
    props:['msg'],
}
</script>
<style lang="stylus" scoped>
.info
    div
        width 100%
        img
            width 100%
            vertical-align middle
</style>