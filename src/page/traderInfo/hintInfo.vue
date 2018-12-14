<template>
  <div class="withdrawSuccess-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "title"></Head>
    <div class="withdrawSuccess-center">
      <img class="withdrawSuccess-img" src="../../assets/images/icon-success.png" alt="">
      <p class="withdrawSuccess-text3" v-if="status==1">您的申请已提交审核<br>我们将在<span>1-3个工作日</span>内审核完成<br>感谢您的耐心等待</p>
      <p class="withdrawSuccess-text3" v-if="status==0">恭喜您成功成为交易员</p>
    </div>
    <div class="withdraw-btn" v-if="status==0">
      <p>立即去交易</p>
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
        title:'申请交易员',
        status:0,
      }
    },
    methods:{

    },
    mounted(){
      if(this.$route.query.status){
        this.status=this.$route.query.status
      }
    }
  }

</script>
<style scoped>
  @import "../../style/withdrawInput.css";
</style>

