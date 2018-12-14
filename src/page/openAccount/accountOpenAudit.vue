<template>
  <div class="accountOpen-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <div class="head-IFM">
      <span></span>
      <p>开立账户</p>
    </div>
    <div class="simpleInf-form">
      <div class="withdrawSuccess-center">
        <img class="withdrawSuccess-img" src="../../assets/images/icon-audit.png" alt="">
        <!--<p class="withdrawSuccess-text1">您的开户申请已经提交审核</p>-->
        <p class="withdrawSuccess-text2">您的开户申请已经提交审核<br>IFM经纪商会将在<i class="c-purple">1-3个工作日内</i>完成审核<br>请耐心等待...</p>
      </div>

      <div class="withdraw-btn" @click="closeBrowser()">返回首页</div>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'

  export default {
//    naem: "rewardPop",
     mixins: [Ajax],
    components: {
      Head
    },
    props: {
      // 必填，是否显示弹框

    },
    data() {
      return {
        Title: '开设真实账户',
        Protitle: '4 上传证件照片',
        codeIsShow: true
      };
    },
    watch: {

    },
    methods: {
      codeShow: function(){
        this.codeIsShow = !this.codeIsShow
      }
    }
  };
</script>

<style scoped>
  .c-purple{
    color: #8e79c0 !important;
  }

  .accountOpen-box{
    height: 100%;
    background: #fff;
  }
  .head-IFM{
    height: 1.79rem;
    padding: 0.64rem 0.56rem 0 0.56rem;
    background: #8e79c0;
    display: flex;
  }
  .head-IFM span{
    display: block;
    width: 1.71rem;
    height: 0.85rem;
    background: url("../../assets/images/right-logo-economic.png") no-repeat center/100% 100%;
  }
  .head-IFM p{
    margin: 0.26rem 0 0 0.3rem;
    font-size: 0.48rem;
    color: #fff;
  }

  .withdraw-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    height: 1.32rem;
    line-height: 1.32rem;
    background-color: #8e79c0;
    border-radius: .12rem;
    margin:.6rem .24rem;
    color: #fff;
    font-size:.54rem;
    text-align: center;
  }

  .withdrawSuccess-center{
    margin:4rem auto 0;
    text-align: center;
  }
  .withdrawSuccess-img{
    width:1.92rem;
    height:1.92rem;
    margin:0 auto;
  }
  .withdrawSuccess-text2{
    margin: 0.81rem auto 0 auto;
    font-size: .48rem;
    line-height: .8rem;
    color: #333;
  }

</style>
