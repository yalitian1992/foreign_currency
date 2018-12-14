<template>
  <div class="helpCenter-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <Search :resultList.sync='resultList'></Search>
<!--无二级列表-->
    <div class="helpCenter-txt" v-show="hasSecond == 0">
      <ul class="help-list">
        <router-link tag="li" v-for="(v,index) in resultList"
                     :key="index"
                     :to="{path:'/details',query:{native: 0,id: v.id,title:Title}}">
          <p>{{v.name}}</p>
          <i></i>
        </router-link>
      </ul>
    </div>
<!--有二级列表-->
    <div class="helpCenter-txt" v-if="hasSecond == 1">
      <ul class="help-list" v-for="(secV,secIndex) in resultList">
        <li class="part-tit">
          <p>{{secV.name}}</p>
        </li>
        <router-link tag="li" v-for="(mapV,mapIndex) in secV.mapList"
                     :key="mapIndex"
                     :to="{path:'/details',query:{native: 0,id: mapV.id,title:Title}}">
          <p>{{mapV.name}}</p>
          <i></i>
        </router-link>
      </ul>
    </div>

  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Search from '../../components/search/search.vue'

  const resultS = '/api/help/center/queryquestion'
  const secondList = '/api/help/center/secondlist'

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
        Title: this.$route.query.name,
        hasSecond: '',
        resultList: [],
//        secondlist: []
      };
    },
    watch: {

    },
    methods: {

      SearchSQL: function(id){
        /*无二级搜索接口*/
        this.post(resultS, {
          categoryId: id
        }).then(body => {
          if(body.code == 200){
            this.resultList = body.data
          }
        });
      },
      ScoendSQL: function (id) {
        /*二级搜索接口*/
        this.post(secondList, {
          id: id
        }).then(body => {
          if(body.code == 200){
            this.resultList = body.data
            console.log(this.resultList[0].mapList[0].name)
          }
        });
      }



    },
    mounted(){
      var ID = this.$route.query.id
      console.log(ID)
      this.hasSecond = this.$route.query.hasSecond
      console.log(this.hasSecond)
      if(this.hasSecond == 0){
        this.SearchSQL(ID)
      }else{
        this.ScoendSQL(ID)
      }


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

</style>
