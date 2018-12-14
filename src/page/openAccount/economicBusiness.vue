<template>
  <div class="economic-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <Progress :Protitle="Protitle" :isDescribe=true></Progress>
    <div class="IFM-box" v-for="(item, index) in IFMList">
      <div class="L">
        <span class="logo"></span>
        <p>
          <span>{{item.brokersName}}</span>
          <i>{{item.briefIntroduce}}</i>
        </p>
      </div>
      <p class="C">{{item.detailIntroduce}}</p>
      <div class="R">
        <p class="explain">
          <span @click="AmountFun(1,index)">出入金说明</span>
          <span @click="AmountFun(2,index)">交易说明</span>
        </p>
        <span class="Btn" v-if="item.istatus == 0" @click="openPrompt = true,IFMIndex = index">开户</span>
        <span class="Btn" v-else="item.istatus == 1" @click="examPage">审核中</span>
      </div>
    </div>

    <!--说明弹框-->
    <div class="Amount-box" v-show="Amount">
      <div class="Amount">
        <h4>{{poxTit}}</h4>
        <!--出入金-->
        <ul class="explain" v-show="moneyExp">
          <li>
            <p>{{moneyTxt}}</p>
            <!--<h5>入金</h5>
            <p>1.目前仅支持PC端入金，请登录IFM官网<i class="link">https://myportal.ifmtrade.com/ifmtrade/Login</i>进行入金；</p>
            <p>2.入金金额最低$200；</p>
            <p>3.支持银联入金，不支持信用卡；</p>
            <p>4.支持24小时入金，入金成功即时到账。</p>-->
          </li>
        </ul>
        <!--交易-->
        <ul class="explain" v-show="tradeExp">
          <li>
            <p>{{tradeTxt}}</p>
            <!--<p>IFM提供30个不同货币对，包括外汇、黄金、原油，支持在躺盈和MT4上交易。</p>-->
          </li>
        </ul>
        <p @click="Amount = !Amount">知道了</p>
      </div>
    </div>
    <!--开户弹框-->
    <div class="openPrompt-box" v-show="openPrompt">
      <div class="openPrompt">
        <i class="closeX" @click="openPrompt = false"></i>
        <p>您接下来将去经纪商开设真实账户！</p>
        <span class="Btn" @click="openAccount(IFMIndex)">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Ajax } from "@/mixins";
import Head from '../../components/header/head.vue'
import Progress from '../../components/pogressBar/progressBar.vue'

const economicList = "/api/broker/list"

export default {
//  naem: "rewardPop",
  mixins: [Ajax],
  components: {
    Head,
    Progress
  },
  props: {
    // 必填，是否显示弹框

  },
  data() {
    return {
      Hidden: true,
      Title: '开设真实账户',
      Protitle: '1 选择经纪商',
      Amount: false,
      poxTit: "",    //说明弹框小title
      moneyExp: false,
      tradeExp: false,
      openPrompt: false,
      IFMList: [],     //IFM开户列表
      IFMIndex: '',
      moneyTxt: '',     //出入金说明
      tradeTxt: '',     //交易说明
      brokerId: '',     //经济商id
    };
  },
  watch: {

  },
  methods: {
    Show: function () {
      this.Hidden = !this.Hidden
    },
    /*开户跳转页*/
    openAccount: function(inx){
      this.$router.push({
        path: '/simpleInformation',
        query: {native: 0, brokerId: this.IFMList[inx].id}
      })
    },
    /*审核中跳转页*/
    examPage: function(){
      this.$router.push({
        path: '/accountOpenAudit',
        query: {native: 0, /*token: _this.getToken()*/}
      })
    },
    /*说明弹框*/
    AmountFun: function (t,index) {
      this.Amount = true
      if(t == 1){
        this.moneyExp = true
        this.tradeExp = false
        this.poxTit = "IFM-出入金说明"
        this.moneyTxt = this.IFMList[index].outInComeExplain
      }
      if(t == 2){
        this.tradeExp = true
        this.moneyExp = false
        this.poxTit = "IFM-交易说明"
        this.tradeTxt = this.IFMList[index].transExplain
      }
    },
  },
  mounted(){
    this.get(economicList, {
//      auth: 'eyJhbGciOiJIUzUxMiJ9.eyJpaGF2ZXUiOiJqcm1ldXAiLCJzdWIiOiIxIiwiZXhwIjoxNTI2MjkwMTM0LCJpYXQiOjE1MjU2ODUzMzR9.55kG62viksBg0V9hmOj8HOLkj8IzUDmH0XmCby9Axr2TEtgNjaYdjlP3z4onYfjri2qyn0-bKaCCwnpTS4hH5w'
    }).then(body => {
//      this.formFtep1 = body.execDatas
      this.IFMList = body.data
      console.log(this.IFMList)

    });

    /*this.$http({
      method: 'get',
      url: '/api/broker/list',
      headers: {auth: 'eyJhbGciOiJIUzUxMiJ9.eyJpaGF2ZXUiOiJqcm1ldXAiLCJzdWIiOiIxIiwiZXhwIjoxNTI2MjkwMTM0LCJpYXQiOjE1MjU2ODUzMzR9.55kG62viksBg0V9hmOj8HOLkj8IzUDmH0XmCby9Axr2TEtgNjaYdjlP3z4onYfjri2qyn0-bKaCCwnpTS4hH5w'},
      params: { }
    }).then(function (res) {
      var data = res.body
      this.IFMList = data.data
      console.log(res.body)
    })*/


  }
};

</script>

<style scoped>
  .closeX{
    position: absolute;
    right: 0;
    top: 0;
    width: 1.5rem;
    height: 1.5rem;
    background: url("../../assets/images/icon-close.png") no-repeat 80% 20%/25% 28%;
  }

  .economic-box{
    min-height: 100%;
    padding-bottom: 0.54rem;
    background: #eee;
  }

  .IFM-box{
    margin: 0.27rem 0.54rem 0 0.54rem;
    padding: 0.9rem 0.64rem 0.6rem 0.64rem;
    width: 11.34rem;
    border-radius: 0.12rem;
    background: #fff;
  }
  .IFM-box .L{
    overflow: hidden;
  }
  .IFM-box .L .logo{
    display: block;
    width: 2.64rem;
    height: 1.26rem;
    background: url("../../assets/images/right-logo-economic.png") no-repeat center/70% 60% #162883;
  }
  .IFM-box .L .logo,.IFM-box .L p{
    float: left;
  }
  .IFM-box .L p{
    margin-left: 0.4rem;
  }
  .IFM-box .L p>span,.IFM-box .L p>i{
    display: block;
  }
  .IFM-box .L p>span{
    font-size: 0.6rem;
    color: #333;
  }
  .IFM-box .L p>i{
    font-size: 0.42rem;
    line-height: 0.62rem;
    color: #666;
  }
  .IFM-box .C{
    width: 10.08rem;
    margin: 0.3rem auto;
    font-size: 0.36rem;
    line-height: 0.54rem;
    color: #999;
  }
  .IFM-box .R{
    display: flex;
    justify-content: space-between;
  }
  .IFM-box .R .explain{
    width: 48%;
    height: 1.2rem;
    line-height: 1.2rem;
    display: flex;
    justify-content: space-between;
  }
  .IFM-box .R .explain>span{
    font-size: 0.42rem;
    color: #8e79c0;
  }
  .IFM-box .R .Btn{
    display: block;
    width: 2.98rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background: #8e79c0;
    font-size: 0.48rem;
    color: #fff;
    border-radius: 0.12rem;
  }

  /*出入金弹框*/
  .Amount-box{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.8);
  }
  .Amount{
    margin: 3rem auto 0 auto;
    width: 80%;
    border-radius: 0.24rem;
    overflow: hidden;
  }
  .Amount h4{
    height: 1.32rem;
    line-height: 1.32rem;
    text-align: center;
    font-size: 0.48rem;
    color: #8e79c0;
    background: #f3f1f9;
  }
  .Amount .explain{
    overflow-y: auto;
    padding: 0.69rem 0.55rem;
    height: 13rem;
    background: #fff;
    font-size: 0.42rem;
  }
  .Amount .explain li{
    margin-bottom: 0.6rem;
  }
  .Amount .explain h5{
    font-size: 0.42rem;
    color: #8e79c0;
  }
  .Amount .explain p{
    line-height: 0.72rem;
  }
  .Amount .explain p .link{
    font-size: 0.36rem;
    color: #8e79c0;
  }
  .Amount>p{
    height: 1.32rem;
    line-height: 1.32rem;
    text-align: center;
    font-size: 0.48rem;
    color: #fff;
    background: #8e79c0;
  }

  /*开户弹框*/
  .openPrompt-box{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.8);
  }
  .openPrompt{
    position: relative;
    margin: 55% auto;
    padding: 1.4rem 0.9rem 2.4rem 0.9rem;
    width: 70%;
    background: #fff;
    border-radius: 0.24rem;
    overflow: hidden;
  }
  .openPrompt>p{
    font-size: 0.48rem;
    color: #333;
    line-height: 0.72rem;
  }
  .openPrompt .Btn{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.32rem;
    line-height: 1.32rem;
    text-align: center;
    background: #8e79c0;
    color: #fff;
    font-size: 0.48rem;
  }
</style>
