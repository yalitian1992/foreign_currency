<template>
  <div class="withdrawInfo-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "title" :isShow = true></Head>
    <div class="withdrawInfo-center">
      <p>
        <span class="withdrawInfo-Name">中文姓名</span>
        <span>{{bankInfo.sname}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">取款账号</span>
        <span>{{bankInfo.smt4account}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">取款方式</span>
        <span>{{bankInfo.outComeType==1?'银联':bankInfo.outComeType==2?'电汇':''}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">取款金额</span>
        <span class="withdrawInfo-red">${{outputmoney(bankInfo.money*1)}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">手续费</span>
        <span class="">${{bankInfo.serviceChange}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">银行名称</span>
        <span>{{bankInfo.bankName}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">支行名称</span>
        <span>{{bankInfo.branchName}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">银行账号</span>
        <span class="withdrawInfo-numColor">{{cardFormat(bankInfo.bankCard)}}</span>
      </p>
      <p>
        <span class="withdrawInfo-Name">备注</span>
        <span>{{bankInfo.remark}}</span>
      </p>
    </div>
    <div class="withdraw-btn">
      <p @click="postFun" :class="{greys:!clickBack}">确认</p>
    </div>
  </div>
</template>
<script>
  import Ajax from '@/mixins/ajax';
  import Head from '../../components/header/head.vue'

  const postWithdraw='/api/withdrawcash/commitwithdrawcashapply'
  export default {
    mixins:[Ajax],
    components:{
      Head
    },
    data(){
      return{
        title:'确认出金信息',
        bankInfo:{
          money:0,
          bankCard:''
        },
        clickBack:true,
      }
    },
    methods:{
      //四位加空格
      cardFormat(num){
        var num=num.replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'');
        return num
      },
      postFun(){
        if(this.clickBack){
          this.bankInfo.accountId=this.bankInfo.sid
          this.post(postWithdraw,this.bankInfo).then(body=>{
            this.clickBack=true;
            if(body.code==200){
              this.$router.push({path: '/withdrawSuccess'})
            }
          })
        }else{
          setTimeout(function () {
            this.clickBack=true;
          }, 2000);
        }

      }
    },
    mounted(){
      this.bankInfo=JSON.parse(sessionStorage.getItem("bank_data"))
    }
  }

</script>
<style scoped>
  @import "../../style/withdrawInput.css";
  .greys{
    background: #eee !important;
  }
</style>

