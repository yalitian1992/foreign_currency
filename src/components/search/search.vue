<template>
    <div class="search-box">
      <input type="text" placeholder="请输入您的问题" v-model.trim="seaTitle">
      <i class="search-btn" @click="SearchSQL(categoryId)"></i>
    </div>
</template>

<script>
  import { Ajax } from "@/mixins";

  const result = '/api/help/center/queryquestion'
  const secondList = '/api/help/center/secondlist'

  //  节流函数
  const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  export default {
//    naem: "rewardPop",
    mixins: [Ajax],
    props: ["result"],
    components: {

    },
    data() {
      return {
        seaTitle: '',
        categoryId: this.$route.query.id ? this.$route.query.id : '',
        searchShow: false
      };
    },
    watch: {
      title() {
        delay(() => {
          this.fetchData();
        }, 300);
      },
    },
    methods: {
      /*async fetchData(val) {
        const res = await this.fetch({
          url: '写上你的URL',
          method: 'GET',
          params: { title: this.title },
        });
        this.search = res.data.list;
      },*/

      /*搜索*/
      SearchSQL: function(id){
        if(this.$route.query.hasSecond == 0 || this.$route.query.hasSecond == null){
          this.post(result, {
            categoryId: id,
            name: this.seaTitle
          }).then(body => {
            if(body.code == 200){
              this.resultList = body.data
              this.searchShow = true
              this.$emit("update:resultList", this.resultList);
              this.$emit("update:searchShow", this.searchShow);
            }
          });
        }else if(this.$route.query.hasSecond == 1){
          this.post(secondList, {
            id: id,
            name: this.seaTitle
          }).then(body => {
            if(body.code == 200){
              this.resultList = body.data
              this.searchShow = true
              this.$emit("update:resultList", this.resultList);
              this.$emit("update:searchShow", this.searchShow);
            }
          });
        }

      },

    },
    mounted(){

    }
  };
</script>

<style scoped>

  .search-box{
    position: relative;
    padding: 0.4rem 0 0.6rem 0.54rem;
    background: #fff;
  }
  .search-box input{
    padding-left: 0.3rem;
    width: 9.64rem;
    height: 1.32rem;
    border-radius: 0.12rem;
    border: solid 1px #8e79c0;
  }
  .search-btn{
    position: absolute;
    right: 0.36rem;
    bottom: 0.6rem;
    width: 1.32rem;
    height: 1.32rem;
    background: url("../../assets/images/icon-search.png") no-repeat center/66% 64%;
  }

</style>
