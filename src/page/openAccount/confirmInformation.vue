<template>
  <div class="simpleInf-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <div class="head-IFM">
      <span></span>
      <p>开立账户</p>
    </div>

    <Progress :Protitle="Protitle" :stepForm=4></Progress>

    <div class="simpleInf-form">
      <div class="withdrawInfo-center">
        <p>
          <span class="withdrawInfo-Name">英文姓名</span>
          <span>{{`${infoList4.firstName}${infoList4.lastName}`}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">中文姓名</span>
          <span>{{infoList4.sname}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">电子邮箱</span>
          <span>{{infoList4.semail}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">国家</span>
          <span class="withdrawInfo-red">{{`${infoList4.scountry}-${infoList4.sprovincecode}-${infoList4.scitycode}`}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">地址</span>
          <span>{{infoList4.sadress}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">邮编</span>
          <span>{{infoList4.szipcode}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">证件类型</span>
          <span class="withdrawInfo-numColor">身份证</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">证件号码</span>
          <span>{{infoList4.scardnumber}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">收入来源</span>
          <span v-for="(item,index) in income" v-show="item.type == infoList4.sincome">{{item.name}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">职业</span>
          <span v-for="(v,i) in career" v-show="v.type == infoList4.soccupation">{{v.name}}</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">是否为美国公民或美国税收居民</span>
          <span v-if="infoList4.iamerica == 0">否</span>
          <span v-if="infoList4.iamerica == 1">是</span>
        </p>
        <p>
          <span class="withdrawInfo-Name">您的税前年收入大约是</span>
          <span v-for="(v,i) in earn" v-show="v.type == infoList4.sretaxrevenue">{{v.name}}</span>
        </p>
        <div class="scan">
          <p class="positive"><img :src="infoList4.scardfphoto" :onerror="defaultImg(0)"></p>
          <p class="otherSide"><img :src="infoList4.scardlphoto" :onerror="defaultImg(1)"></p>
        </div>
      </div>
      <div class="withdraw-btn-box">
        <div :class="{withdrawBtn: true,isPoint: !isClick}" @click="nextPage">确认提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Progress from '../../components/pogressBar/progressBar.vue'

  var Commit = "/api/account/commitopenaccount"

  export default {
//    naem: "rewardPop",
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
        isClick: true,
        Title: '开设真实账户',
        Protitle: '5 确认开户信息',
        codeIsShow: true,
        infoList4: [],
        income: [
          { name: '工资收入',type: 0},
          { name: '个体经营',type: 1},
          { name: '投资红利',type: 2},
          { name: '退休养老金',type: 3},
          { name: '存款储蓄金',type: 4},
          { name: '其他来源',type: 5}
        ],
        career: [
          { name: '管理人员/行政人员',type: 0},
          { name: '文员',type: 1},
          { name: '农民',type: 2},
          { name: '家庭主妇',type: 3},
          { name: '学生',type: 4},
          { name: '教师',type: 5},
          { name: '离退休人员',type: 6},
          { name: '自雇',type: 7},
          { name: '未瘦雇佣的自由职业',type: 8},
          { name: '公司职员',type: 9}
        ],
        earn: [
          { name: '少于$25,000',type: 0},
          { name: '$25,001-$50,000',type: 1},
          { name: '$50,000-$100,000',type: 2},
          { name: '超过$100,000',type: 3}
        ]
      };
    },
    watch: {

    },
    methods: {
      nextPage: function () {
        if(this.isClick){
          this.isClick = false
          this.post(Commit, {
            sid: this.infoList4.sid
          }).then(body => {
            if(body.code == 200){
              console.log(body)
              if(body.data.errcode == 0){
                this.$router.push({
                  path: '/accountOpenAudit',
                  query: {
                    native: 0
                  }
                })
              }else{
                this.toast(body.data.errmsg)
              }
              this.isClick = true
            }else{
              this.toast(body.message)
            }
          });
        }
      }
    },
    mounted(){
      this.infoList4 = JSON.parse(sessionStorage.getItem("accouont_data"))
    }
  };
</script>

<style scoped>
  .isPoint{
    opacity: 0.7;
  }
  .simpleInf-box{
    height: 100%;
    background: #eee;
  }
  .head-IFM{
    height: 1.79rem;
    padding: 0.64rem 0.56rem 0 0.56rem;
    background: #8e79c0;
    display: flex;
  }
  .head-IFM span{
    display: block;
    width: 1.71rem;
    height: 0.85rem;
    background: url("../../assets/images/right-logo-economic.png") no-repeat center/100% 100%;
  }
  .head-IFM p{
    margin: 0.26rem 0 0 0.3rem;
    font-size: 0.48rem;
    color: #fff;
  }

  .simpleInf-form{
    margin: 0.3rem auto 0 auto;
    height: 100%;
    background: #fff;
  }

  .withdraw-btn-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .withdrawBtn{
    width: auto;
    height: 1.32rem;
    line-height: 1.32rem;
    background-color: #8e79c0;
    border-radius: .12rem;
    margin:.6rem .24rem;
    color: #fff;
    font-size:.54rem;
    text-align: center;
  }

  .withdrawInfo-center{
    margin-top:0.3rem;
    padding:1rem .5rem;
  }
  .withdrawInfo-center p {
    display: flex;
    justify-content: flex-start;
    min-height:1.2rem;
    font-size:.48rem;
  }
  .withdrawInfo-center p span{
    display: inline-block;
  }
  .withdrawInfo-center p span:nth-child(1){
    color: #666;
    min-width:2rem;
    margin-right:.6rem;
  }
  .withdrawInfo-Name{
    font-size: 0.48rem;
    color: #999 !important;
  }

  .scan{
    padding: 0.6rem 0;
    display: flex;
    justify-content: space-between;
    margin-bottom:1rem;
  }
  .scan p{
    width: 4.86rem;
    height: 3.15rem;
    border-radius: 0.26rem;
    overflow: hidden;
  }
  .scan p.positive{
    /*background: green;*/
  }
  .scan p.otherSide{
    /*background: green;*/
  }
  .scan p img{
    border: none;
    width: 4.86rem;
    height: auto;
    margin: auto;
  }


</style>
