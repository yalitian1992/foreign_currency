<template>
  <div class="helpCenter-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title" @click="SSS()"></Head>
    <Search :resultList.sync='resultList' :searchShow.sync='searchShow'></Search>
<!--首次加载-->
    <div class="helpCenter-txt" v-for="(helpitem,helpindex) in resultList" v-if="searchShow == false">
      <router-link  class="tit" tag="div"
                    :to="{path:'/kaihuAbout',query:{native: 0,id: helpitem.id,hasSecond: helpitem.hasSecond,name: helpitem.name}}">
        <img :src="helpitem.logo" alt="">
        <p>{{helpitem.name}}</p>
        <span>更多></span>
      </router-link>
      <ul class="help-list">
        <router-link tag="li" v-for="(qv,qi) in helpitem.questionList"
                     :key="qi"
                     :to="{path:'/details',query:{native: 0,id: qv.id,title: Title}}">
          <p>{{qv.name}}</p>
          <i></i>
        </router-link>
      </ul>
    </div>
<!--二次查询-->
    <div class="helpCenter-txt" v-if="searchShow == true">
      <ul class="help-list">
        <router-link tag="li"
                     v-for="(helpitem,helpindex) in resultList"
                     :key="helpindex"
                     :to="{path:'/details',query:{native: 0,id: helpitem.id,title: Title}}">
          <p>{{helpitem.name}}</p>
          <i></i>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
//  href="tel:4008718228"
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Search from '../../components/search/search.vue'

  const allCenter = '/api/help/center'

  export default {
//    naem: "rewardPop",
    mixins: [Ajax],
    components: {
      Head,
      Search
    },
    props: {
      // 必填，是否显示弹框

    },
    data() {
      return {
        Title: '帮助中心',
        search:[],       //搜索框列表
        resultList: [],
        searchShow: false,
      };
    },
    watch: {

    },
    created(){

    },
    methods: {
      /*在线咨询*/
      Online: function () {
        var u = navigator.userAgent;

        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
          /*Android*/
          window.Android.getOnlineService()
        }else{
          /*IOS*/
//          window.webkit.messageHandlers.AppModel.postMessage('getOnlineService');
          WebViewJavascriptBridge.getOnlineService()
        }
      },
      /*电话咨询*/
      tellPhone: function () {
        var u = navigator.userAgent;

        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
          /*Android*/
          window.Android.diallPhone('4008718228')
        }else{
          /*IOS*/
//          window.webkit.messageHandlers.AppModel.postMessage('getOnlineService');
          WebViewJavascriptBridge.diallPhone('4008718228')
        }
      }
    },
    mounted(){
      this.post(allCenter, {}).then(body => {
        if(body.code == 200){
          this.resultList = body.data
          console.log(this.resultList)
        }
      });

    }
  };
</script>

<style scoped>
  .helpCenter-box{
    /*padding-bottom: 1.8rem;*/
    background: #eee;
  }
  .helpCenter-box:after{
    display: block;
    content: "";
    height: 1.8rem;
    width: 100%;
    background: #fff;
  }

  .helpCenter-txt{
    margin: 0.3rem auto 0 auto;
    background: #fff;
  }
  .helpCenter-txt .tit{
    position: relative;
    padding: 0.73rem 0.54rem;
    display: flex;
  }
  .helpCenter-txt .tit img{
    margin-right: 0.44rem;
    width: 0.9rem;
    height: 0.65rem;
  }
  .helpCenter-txt .tit img.F{
    width: 0.87rem;
    height: 0.87rem;
  }
  .helpCenter-txt .tit p{
    font-size: 0.48rem;
    color: #8e79c0;
  }
  .helpCenter-txt .tit span{
    position: absolute;
    right: 0.54rem;
    font-size: 0.36rem;
    color: #999;
  }

  .help-list{
    /*padding: 0 0.54rem;*/
  }
  .help-list li{
    position: relative;
    padding: 0 0.54rem;
    height: 1.32rem;
    line-height: 1.32rem;
    border-bottom: 1px solid #eee;
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
  .help-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    font-size: 0.48rem;
    color: #fff;
    background: #8e79c0;
  }
  .help-footer>.p{
    display: block;
    width: 50%;
    height: 1.8rem;
    text-align: center;
    color: #fff;
  }
  .help-footer>.p>i{
    display: inline-block;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .help-footer>.p>i.font{
    position: relative;
    top: -0.64rem;
  }
  .help-footer>.p>i.icon{
    width: 1.8rem;
  }
  .help-footer>.p>i.kefu{
    background: url("../../assets/images/icon-kefu.png") no-repeat center/39% 44%;
  }
  .help-footer>.p>i.call{
    background: url("../../assets/images/icon-call.png") no-repeat center/45% 46%;
  }

</style>
