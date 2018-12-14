<template>
  <div class="simpleInf-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <div class="head-IFM">
      <span></span>
      <p>开立账户</p>
    </div>

    <Progress :Protitle="Protitle" :stepForm=1></Progress>
    <div class="simpleInf-form">
      <div class="withdraw-bankInfo">
        <p>
          <label>姓</label>
          <input type="text" v-model="accountinfo1.firstName" @blur="firstUpperCase(accountinfo1.firstName,1)">
        </p>
        <p>
          <label>名</label>
          <input type="text" v-model="accountinfo1.lastName" @blur="firstUpperCase(accountinfo1.lastName,2)">
        </p>
        <p>
          <label>电子邮箱</label>
          <input type="text" v-model="accountinfo1.semail" placeholder="">
        </p>
        <p>
          <label>联系电话</label>
          <input type="text" v-model="accountinfo1.smobile" placeholder="">
        </p>
        <p>
          <label>密码</label>
          <input type="password" v-model="accountinfo1.accountPass"  ref="pwd" placeholder="">
          <i :class="{codeIcon: true,codeIsShow: codeIsShow}" @click="codeShow()"></i>
        </p>
      </div>
      <div class="withdraw-btn-box">
        <div class="withdraw-btn" @click="checkForm1(accountinfo1) ? nextPage() : '' ">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Progress from '../../components/pogressBar/progressBar.vue'

  const accountInfo1 = `/api/account/accountinfo/1`;
  const baseinfo = `/api/user/baseinfo`;

  export default {
//    naem: "rewardPop",
    mixins: [Ajax],
    components: {
      Head,
      Progress
    },
    props: {

    },
    data() {
      return {
        Title: '开设真实账户',
        Protitle: '2 填写基本信息',
        codeIsShow: true,
        type: 2,     //账户信息验证
        formFtep1: [],
        step: 1,
        JsonList: [],        //本地存储信息列表

        accountinfo1: {
          step: 1,   //表示基本信息的第一个页面
          firstName: '',   //姓
          lastName: '',   //名
          semail: '',  //邮箱
          smobile: '',   //联系方式
          accountPass: '',   //账户密码
          brokerId: this.$route.query.brokerId   //经纪商id
        },
        S: ''     //input框标红判断
      };
    },
    watch: {

    },
    created(){
      this.post(baseinfo, {}).then(body => {
        if(body.code == 200){
          sessionStorage.setItem("base_info", JSON.stringify(body.data))
          this.JsonList = JSON.parse(sessionStorage.getItem("base_info"))
          if(this.JsonList != null){
            this.accountinfo1.firstName = this.JsonList.firstName
            this.accountinfo1.lastName = this.JsonList.lastName
            this.accountinfo1.semail = this.JsonList.semail
            this.accountinfo1.smobile = this.JsonList.sphone
          }
        }
      });

    },
    methods: {
      /*首字母大写*/
      firstUpperCase(str,msg) {
        let strs = str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        if(msg==1){
          this.accountinfo1.firstName=strs
        }else if(msg==2){
          this.accountinfo1.lastName=strs
        }

      },

      checkForm1: function (info) {
        /*邮箱正则表达式*/
        var regu = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$"
        /*中文拼音验证*/
        var regname = "^[A-Za-z]+$"

        if(!info.firstName || !info.lastName){
          this.toast("姓与名不能为空")
          return false
        }else if((info.firstName.search(new RegExp(regname))) || info.lastName.search(new RegExp(regname))){
          this.toast("姓与名请用中文拼音填写")
          return false;
        }
        if(!info.semail){
          this.toast("邮箱不能为空")
          return false
        }else if(info.semail.search(new RegExp(regu)) == -1){
          this.toast("电子邮箱格式不对")
          return false
        }
        if(!info.smobile){
          this.toast("联系电话不能为空")
          return false
        }else if(!/^1(3|4|5|7|8)[0-9]\d{8}/.test(info.smobile)){
          this.toast("联系电话格式")
          return false
        }
        if(!info.accountPass){
          this.toast("密码不能为空")
          return false
        }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(info.accountPass)){
          this.toast("密码格式不对，请输入6-16位数字+字母组合")
          return false
        }
        return true
      },


      /*密码显示*/
      codeShow: function(){
        this.codeIsShow = !this.codeIsShow
        this.$refs.pwd.type = this.codeIsShow ? "password" : "text"
      },
      /*下一步跳转页*/
      nextPage: function () {
        this.post(accountInfo1, this.accountinfo1).then(body => {
          this.formFtep1 = body.data
          if(body.code == 200){
            this.$router.push({
              path: '/importantInformation',
              query: {
                native: 0,
                sid: this.formFtep1.sid,
                firstName: this.formFtep1.firstName,
                lastName: this.formFtep1.lastName
              }
            })
          }
        });
      },

    },
    mounted(){

    }
  };
</script>

<style scoped>
  .withdraw-btn-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .simpleInf-box{
    margin-bottom: 2rem;
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

  .withdraw-bankInfo{
    padding:.6rem .54rem 0;
  }
  .withdraw-bankInfo p{
    position: relative;
    height: .9rem;
    line-height: .9rem;
    margin-bottom:.4rem;
  }
  .withdraw-bankInfo label{
    vertical-align: middle;
    font-size:.45rem;
    color: #666;
    min-width:1.9rem;
    display: inline-block;
    text-align: left;
  }
  .withdraw-bankInfo input,.withdraw-bankInfo select{
    display: inline-block;
    width:8.84rem;
    height:.9rem;
    line-height: .9rem;
    font-size:.45rem;
    vertical-align: middle;
    padding:0 .6rem;
    border-bottom:1px solid #ede9f5;
    box-sizing: border-box;
    -webkit-appearance: none
  }
  .withdraw-bankInfo input:focus {
    border-color: #8e79c0;
    border-radius:inherit;
  }
  .withdraw-remark > label{
    vertical-align: top;
  }
  .withdraw-bankInfo textarea{
    width: 8.86rem;
    height: 2.07rem;
    border-radius: .12rem;
    border: solid 1px #d2c9e6;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding:.23rem .6rem;
    font-size:.45rem;
  }

  .withdraw-btn{
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
  .codeIcon{
    position: absolute;
    bottom: -0.1rem;
    right: 0.32rem;
    display: block;
    width: 0.9rem;
    height: 0.9rem;
    background: url("../../assets/images/code-show.png") no-repeat center/75% 50%;
  }
  .codeIsShow{
    background: url("../../assets/images/code-no-show.png") no-repeat center/65% 40%;
  }

</style>
