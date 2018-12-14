<template>
  <div class="helpCenter-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <div class="details-txt">
      <h4>{{name}}</h4>
      <p>{{content}}</p>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
//  import Search from '../../components/search/search.vue'

  const result = '/api/help/center/result'

  export default {
//    naem: "rewardPop",
    mixins: [Ajax],
    components: {
      Head,
//      Search
    },
    props: {
      // 必填，是否显示弹框

    },
    data() {
      return {
        Title: this.$route.query.title,
        name: '',
        content: ''
      };
    },
    watch: {

    },
    methods: {

    },
    mounted(){
      this.post(result, {
        id: this.$route.query.id
      }).then(body => {
        if(body.code == 200){
          this.resultList = body.data
          this.name = this.resultList.name
          this.content = this.resultList.content
        }
      });
    }
  };
</script>

<style scoped>
  .details-txt{
    padding: 0.54rem;
  }
  .details-txt h4{
    color: #8e79c0;
    font-size: 0.54rem;
  }
  .details-txt p{
    /*text-indent: 2em;*/
    line-height: .7rem;
    margin-top: 0.2rem;
    font-size: 0.42rem;
    color: #666;
  }

</style>
