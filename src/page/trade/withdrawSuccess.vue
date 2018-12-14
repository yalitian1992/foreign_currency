<template>
  <div class="withdrawSuccess-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "title" :isShow = true></Head>
    <div class="withdrawSuccess-center">
      <img class="withdrawSuccess-img" src="../../assets/images/icon-success.png" alt="">
      <p class="withdrawSuccess-text1">提交成功!</p>
      <p class="withdrawSuccess-text2">您的取款申请已经提交成功<br>IFM经纪商将尽快为您安排出金</p>
    </div>
  </div>
</template>
<script>
  import Ajax from '@/mixins/ajax';
  import Head from '../../components/header/head.vue'
  export default {
    mixins:[Ajax],
    components:{
      Head
    },
    data(){
      return{
        title:'提交成功',
        withdrawType:1
      }
    },
    methods:{

    },
    mounted(){
      let _this=this
      setTimeout(function(){
//        _this.$router.push({path: '/withdrawInfo',query:{native: 0}})
        _this.goBack()
      },3000)
    }
  }

</script>
<style scoped>
  @import "../../style/withdrawInput.css";
</style>

