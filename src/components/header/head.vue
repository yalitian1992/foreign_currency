<template>
  <div class="head-box" :class="{marginTop:isIphonex}">
    <div class="head" :class="{marginTop:isIphonex}">
      <i class="go-back" @click="goBack"></i>
      <i>{{title}}</i>
      <i :class="{rLogo: isShow}"></i>
    </div>
  </div>
</template>
<script>
  import { Ajax } from "@/mixins";

  export default {
    /*naem: "rewardPop",
     mixins: [Ajax],*/
    name: "Head",
    mixins: [Ajax],
    props: ["title","isShow"],
    components: {

    },
    data() {
      return {

      };
    },
    watch: {

    },
    methods: {
      /*goBack: function(){
        window.history.back()
      }*/
    }
  };
</script>

<style scoped>
  .head-box{
    width: 100%;
    height: 1.32rem;
  }
  .head{
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.32rem;
    background: #8e79c0;
    text-align: center;
    font-size: 0.6rem;
    line-height: 1.32rem;
    color: #fff;
  }
  .head-box.marginTop{
    margin-top:40px;
    overflow: hidden;
  }
  .head.marginTop{
    top:40px;
  }
  .head .go-back,.head .rLogo{
    display: block;
    width: 1.32rem;
    height: 1.32rem;
  }
  .head .go-back{
    position: absolute;
    left: 0;
    background: url("../../assets/images/go-back.png") no-repeat center/.37rem .64rem;
  }
  .head .rLogo{
    position: absolute;
    top: 0;
    right: .4rem;
    background: url("../../assets/images/right-logo-economic.png") no-repeat center/1.12rem .56rem;
  }
</style>
