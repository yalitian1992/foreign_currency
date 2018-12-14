<template>
  <div class="traderIndex-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "title"></Head>
    <div class="traderIndex-top">
      <div class="apply-start" v-if="type==1">
        <p>成为躺盈交易员</p>
        <p>
          您将有机会被其他用户跟随<br>
          并享有跟投者提供的盈利分成费
        </p>
      </div>
      <div class="apply-reject" v-if="type==0">
        <div>
          <img src="../../assets/images/icon-reject.png" alt="">
          <p>申请被驳回</p>
          <p>驳回原因：{{rejectText}}</p>
        </div>
        <div>
          <p>成为躺盈交易员</p>
          <p>
            您将有机会被其他用户跟随<br>
            并享有跟投者提供的盈利分成费
          </p>
        </div>
      </div>
    </div>
    <div class="traderIndex-center">
      <p class="trader-center-title">
        申请交易员需达到以下基本条件：
      </p>
      <div class="trader-condition">
        <div class="" v-for="(item,index) in rulefinishStatus.conditions" :class="{'trader-finish':item.status==1}">
          <!--<div v-if="item.money" :class="{'trader-finish':money>=item.money*1}">-->
            <!--<p>● {{item.memo}}</p>-->
            <!--<p v-if='money<item.money*1'>未完成</p>-->
            <!--<p v-else class="finish-bg"></p>-->
          <!--</div>-->
          <p>● {{item.memo}}</p>
          <p v-if='item.status==0'>未完成</p>
          <p v-else-if='item.status ==1' class="finish-bg"></p>
        </div>
      </div>
    </div>
    <div class="withdraw-btn">
      <p @click="application" v-if="userStatus">{{type==0?'再次申请':'立即申请成为交易员'}}</p>
      <p class="grey" v-else>立即申请成为交易员</p>
    </div>
    <popup :text="text" :isShow.sync="isShow"></popup>
  </div>
</template>
<script>
  import Ajax from '@/mixins/ajax';
  import Head from '../../components/header/head.vue'
  import popup from '../../components/popup/popup.vue'
  //驳回原因
  const postApplytraderresult= '/api/account/applytraderresult'
  //条件满足情况
  const postApplytrader='/api/account/conditionsofapplytrader'
  //申请
  const postApplytraders='/api/account/applytrader'
  export default {
    mixins:[Ajax],
    components:{
      Head,
      popup
    },
    data(){
      return{
        title:'申请交易员',
        rejectText:'',
        type:1, //0-申请交易员失败，1-普通或者跟投账户，2-交易员账户，3-申请交易员审核中
        sid:'',   //账户id
        rulefinishStatus:{},//条件状态
        isShow:false,//提示框
        text:'您现在正在跟投交易员，请先去停止跟投交易员再申请。',
        userStatus:true,
        money:0
      }
    },
    methods:{
      application(){
        if(this.rulefinishStatus.hasDealer==1){
          this.isShow=true;
        }else{
          this.post(postApplytraders,{sid:this.sid}).then(body=>{
            if(body.code==200){
              this.$router.replace({path:'/hintInfo',query:{native:0,status:1}})
            }
          })
        }

      }
    },
    created(){
      this.sid = this.userJson.currentAccountId;
    },
    mounted(){
      if(this.$route.query.type){
        this.type=this.$route.query.type
      }
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
        this.money=window.Android.getWithdrawalMoney()*1
      }else{
        this.money = WebViewJavascriptBridge.getWithdrawalMoney()*1
      }
      if(this.type==0){
        this.post(postApplytraderresult,{accountId:this.sid}).then(body=>{
          this.rejectText=body.data.reviewDesc
        })
      }else if(this.type==2){
        this.$router.replace({path:'/hintInfo',query:{native:0,status:0}})
      }else if(this.type==3){
        this.$router.replace({path:'/hintInfo',query:{native:0,status:1}})
      }

      this.post(postApplytrader, {sid:this.sid}).then(body => {
        let status='';
        for(let i=0;i<body.data.conditions.length;i++){
          if(body.data.conditions[i].equity){
            if(this.money*1>=body.data.conditions[i].equity*1){
              body.data.conditions[i].status=1
            }else{
              body.data.conditions[i].status=0
            }
            break
          }
        }
        this.rulefinishStatus=body.data
        for(let i=0;i<body.data.conditions.length;i++){
          status += body.data.conditions[i].status
        }
        if(status.indexOf('0') > -1){
          this.userStatus =false
        }else{
          this.userStatus =true
        }
      })
    }
  }

</script>
<style scoped>
  @import '../../style/withdrawInput.css';
  .traderIndex-box{
    background: #eee;
    min-height: 100%;
  }
  /*申请交易*/
  .apply-start{
    background: url("../../assets/images/start-bg.png") no-repeat center/100% 100% ;
    height:6.78rem;
    padding:1.8rem .53rem 0
  }
  .apply-start p:nth-child(1){
    font-size: .72rem;
    line-height: .9rem;
    color: #fff;
  }
  .apply-start p:nth-child(2){
    font-size: .48rem;
    line-height: .6rem;
    color: #fff;
    margin-top:.6rem;
  }

  /*申请驳回*/
  .apply-reject{
    background: #8e79c0
  }
  .apply-reject div:nth-child(1){
    height: 8.21rem;
    background:url('../../assets/images/reject-bg.png') no-repeat center bottom/100% 1.62rem;
    text-align: center;
    overflow: hidden;
  }
  .apply-reject div:nth-child(1) img{
    width:1.4rem;
    height:1.36rem;
    margin:1.5rem auto .4rem;

  }
  .apply-reject div:nth-child(1) p:nth-child(2){
    font-size: .72rem;
    line-height: .72rem;
    color: #ffffff;
  }
  .apply-reject div:nth-child(1) p:nth-child(3){
    font-size: .48rem;
    line-height: .72rem;
    color: #ffffff;
    margin:.6rem 1.63rem 0;
    text-align: left;
    max-height: 2.8rem;
    overflow: hidden;
  }
  .apply-reject div:nth-child(2){
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 1.78rem;
    background:url('../../assets/images/reject-bg1.png') no-repeat center/100% 100%;
  }
  .apply-reject div:nth-child(2) p:nth-child(1){
    font-size:.72rem;
    line-height:.8rem;
    color: #fff;
  }
  .apply-reject div:nth-child(2) p:nth-child(2){
    font-size: .36rem;
    line-height: .6rem;
    color: #fff;
  }

  /*规则*/
  .traderIndex-center{
    margin-bottom:1.6rem;
  }
  .trader-center-title{
    height: 1.35rem;
    font-size: .42rem;
    line-height: 1.35rem;
    color: #8e79c0;
    padding-left:.53rem;
  }
  .trader-condition{
    background: #fff;
    font-size:.48rem;
    padding:.6rem 0;
  }
  .trader-condition >div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 .53rem;
    height:1.4rem;
    line-height: 1.4rem;
  }
  .trader-condition >div p:nth-child(1){
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .trader-condition >div p:nth-child(2){
    width: 2rem;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    color: #8e79c0;
  }

  .trader-condition >div.trader-finish p:nth-child(1){
    color: #333;
  }
  .finish-bg{
    width: 2rem;
    height: 1.4rem;
    line-height: 1.4rem;
    background:url('../../assets/images/icon-finish.png') no-repeat center/.45rem .45rem;
  }
  .grey{
    background-color: #ccc !important;
  }
</style>

