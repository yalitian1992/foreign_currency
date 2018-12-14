<template>
  <div class="withdrawMoney-box">
    <Head :title= "title" :isShow = true></Head>
    <div class="withdraw-top">
      <p>输入金额</p>
      <div class="withdraw-line">
        <label for="withdraw-money">$</label>
        <input type="number" placeholder="最低$100" id="withdraw-money"/>
      </div>
      <div class="withdraw-top-bottom">
        <div>
          <p>可出金额50000,</p>
          <p class="withdraw-top-color">全部出金</p>
        </div>
        <p><span>手续费$50.00</span></p>
      </div>
    </div>
    <div class="withdraw-center">
      <div class="withdraw-bankInfo">
        <p>
          <label>支付方式</label>
          <input type="text" placeholder="请输入您的银行账号">
        </p>
        <p>
          <label>银行名称</label>
          <select>
            <option value="1">中国银行</option>
            <option value="2">中国工商银行</option>
            <option value="3">招商银行</option>
          </select>
        </p>
        <p>
          <label>银行账号</label>
          <input type="text" placeholder="请输入您的银行账号">
        </p>
        <p>
          <label>确认账号</label>
          <input type="text" placeholder="请再次输入您的银行账号">
        </p>
        <div class="withdraw-remark">
          <label>备注</label>
          <textarea cols="30" rows="10" maxlength="100"></textarea>
        </div>
      </div>
    </div>
    <div class="withdraw-btn">
      <p>下一步</p>
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
        title:'入金金额',
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

