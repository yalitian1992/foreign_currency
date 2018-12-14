<template>
  <div class="helpCenter-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <Search></Search>
    <div class="helpCenter-txt">
      <ul class="help-list">
        <li>
          <p>如何跟投高手下单？</p>
          <i></i>
        </li>
        <li>
          <p>有跟投额度限制吗？</p>
          <i></i>
        </li>
        <li>
          <p>跟投过程中可以增加或减少资金吗？</p>
          <i></i>
        </li>
        <li>
          <p>终止跟投后订单会被平仓吗？</p>
          <i></i>
        </li>
        <li>
          <p>怎么进行交易员对比？</p>
          <i></i>
        </li>
      </ul>
    </div>
    <div class="helpCenter-txt">
      <ul class="help-list">
        <li class="part-tit">
          <p>入金指引流程</p>
        </li>
        <li>
          <p>有跟投额度限制吗？</p>
          <i></i>
        </li>
        <li>
          <p>跟投过程中可以增加或减少资金吗？</p>
          <i></i>
        </li>
        <li>
          <p>终止跟投后订单会被平仓吗？</p>
          <i></i>
        </li>
        <li>
          <p>怎么进行交易员对比？</p>
          <i></i>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Search from '../../components/search/search.vue'

  export default {
    /*naem: "rewardPop",
     mixins: [Ajax],*/
    components: {
      Head,
      Search
    },
    props: {
      // 必填，是否显示弹框

    },
    data() {
      return {
        Title: '资金相关',
      };
    },
    watch: {

    },
    methods: {

    }
  };
</script>

<style scoped>
  .helpCenter-box{
    background: #eee;
  }

  .helpCenter-txt{
    margin: 0.3rem auto 0 auto;
    background: #fff;
  }
  .help-list .part-tit{
    border: none !important;
    background: #f8f8f8 !important;
  }
  .help-list li{
    position: relative;
    padding: 0 0.54rem;
    height: 1.32rem;
    line-height: 1.32rem;
    border-bottom: 0.03rem solid #eee;
  }
  .help-list li>p{
    font-size: 0.42rem;
    color: #666;
  }
  .help-list li>i{
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 1.32rem;
    height: 1.32rem;
    background: url("../../assets/images/icon-right.png") no-repeat center/18% 34%;
  }

</style>
