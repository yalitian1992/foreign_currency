<template>
  <div class="withdrawInfo-box">
    <Head :title= "title" :isShow = true></Head>
    <div class="withdrawInfo-center">
      <p>
        <span class="withdrawInfo-Name">中文姓名</span>
        <span>张海洋</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">英文姓名</span>
        <span>张海洋</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">电子邮箱</span>
        <span>110154</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">入金账号</span>
        <span>银联</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">入金金额</span>
        <span class="withdrawInfo-red">$2000.00</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">入金方式</span>
        <span>银联</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">银行名称</span>
        <span>中国建设银行</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">银行账号</span>
        <span>6217 0000 1006 0573 125</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">备注</span>
        <span>出金莎婚纱婚纱是活生生的萨芬和出金莎婚纱婚纱是活生生的萨芬和出金莎婚纱婚纱是活生生的萨芬和出金莎婚纱婚纱是活生生的萨芬和出金莎婚纱婚纱是活生生的萨芬和出金莎婚纱婚纱是活生生的萨芬和</span>
      </p>
    </div>
    <div class="withdraw-btn">
      <p>确认</p>
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
        title:'确认入金信息',
        withdrawType:1
      }
    },
    methods:{

    },
    mounted(){

    }
  }

</script>
<style scoped>
  @import "../../style/withdrawInput.css";
</style>

