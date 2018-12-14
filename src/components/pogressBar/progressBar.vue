<template>
  <div class="economic-title">
    <ul class="speed-progress">
      <li :class="{selectedL: step1}">
        <span class="start-point selected"><i></i></span>
        <span :class="{endPoint: true,selected:step1}">
          <i></i>
        </span>
      </li>
      <li :class="{selectedL: step2}">
        <span :class="{endPoint: true,selected:step2}">
          <i></i>
        </span>
      </li>
      <li :class="{selectedL: step3}">
        <span :class="{endPoint: true,selected:step3}">
          <i></i>
        </span>
      </li>
      <li :class="{selectedL: step4}">
        <span :class="{endPoint: true,selected:step4}">
          <i></i>
        </span>
      </li>
    </ul>
    <div class="economic-txt">
      <h4>{{Protitle}}</h4>
      <div v-show="isDescribe">
        <p :class="{hidden: Hidden}">躺盈选择合作的经纪商是经过严格筛选、审核，具有从事相关行业牌照，且受相关机构或部门监管的合法、正规平台。躺盈是由合作经纪商授权发布信息的第三方平台，躺盈并不给您提供交易软件（如MT4）及交易技术支持，也不对交易资金作任何担保。您在合作经纪商平台交易的资金风险和使用交易软件存在的风险，躺盈概不承担任何法律责任。</p>
        <i :class="{showTip:true, hiddenTip:Hidden}" @click="Show"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Progress",
    props: ["Protitle","isDescribe","stepForm"],
    components: {
    },
    data() {
      return {
        Hidden: true,
        step1: false,
        step2: false,
        step3: false,
        step4: false
      };
    },
    watch: {

    },
    methods: {
      Show: function () {
        this.Hidden = !this.Hidden
      }
    },
    mounted(){
      switch(this.stepForm){
        case 1:
          this.step1 = true
          break;
        case 2:
          this.step1 = this.step2 = true
          break;
        case 3:
          this.step1 = this.step2 = this.step3 = true
          break;
        case 4:
          this.step1 = this.step2 = this.step3 = this.step4 = true
          break;
      }
    }
  };
</script>

<style scoped>
  .showTip{
    position: absolute;
    left: 44%;
    bottom: -0.78rem;
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url("../../assets/images/icon-up.png") no-repeat center/62% 32%;
  }
  .hiddenTip{
    background: url("../../assets/images/icon-down.png") no-repeat center/62% 32%;
  }

  .economic-title{
    width: 100%;
    background: #fff;
    padding: 0.99rem 0 0.69rem 0;
  }

  .speed-progress{
    margin-left: 0.68rem;
  }
  .speed-progress:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  }
  .speed-progress li{
    position: relative;
    float: left;
    width: 2.75rem;
    height: 0.06rem;
    background: #d2c9e6;
  }
  .speed-progress li span,.speed-progress li i{
    display: block;
    border-radius: 50%;
  }
  .speed-progress li span{
    width: 0.21rem;
    height: 0.21rem;
    background: #d2c9e6;
  }
  .speed-progress li i{
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0.14rem;
    height: 0.14rem;
    background: #fff;
  }
  .speed-progress li span.endPoint{
    position: absolute;
    right: 0;
    top: -0.06rem;
  }
  .speed-progress li span.start-point{
    position: absolute;
    left: 0;
    top: -0.06rem;
  }
  .speed-progress li.selectedL{
    background: #8e79c0;
  }
  .speed-progress li span.selected{
    background: #8e79c0;
  }
  .speed-progress li span.selected i{
    /*margin-top: 0.04rem !important;*/
    width: 0.14rem !important;
    height: 0.14rem !important;
  }

  .economic-txt{
    position: relative;
    margin: 0.99rem 0.53rem 0 0.53rem;
  }
  .economic-txt h4{
    font-size: 0.48rem;
    color: #333;
  }
  .economic-txt p{
    margin: 0.2rem auto 0 auto;
    width: 10.41rem;
    font-size: 0.36rem;
    line-height: 0.6rem;
    color: #999;
  }
  .economic-txt p.hidden{
    overflow: hidden;
    height: 1.2rem;
  }
</style>
