<template>
  <div class="userVerufy-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "title"></Head>
    <div class="userVerify-center">
      <p>
        <label>姓</label>
        <span>{{userInfo.firstName}}</span>
      </p>
      <p>
        <label>名</label>
        <span>{{userInfo.lastName}}</span>
      </p>
      <p>
        <label>中文姓名</label>
        <span>{{userInfo.sname}}</span>
      </p>
      <p>
        <label>电子邮箱</label>
        <span>{{userInfo.semail}}</span>
      </p>
      <p>
        <label>联系电话</label>
        <span>{{userJson.userPhone}}</span>
      </p>
      <p class="userInfo-city">
        <label>国家</label>
        <span>{{userInfo.citys}}</span>
      </p>
      <p>
        <label>地址</label>
        <span>{{userInfo.sadress}}</span>
      </p>
      <p>
        <label>邮编</label>
        <span>{{userInfo.szipcode}}</span>
      </p>
      <p>
        <label>证件类型</label>
        <span>身份证</span>
      </p>
      <p>
        <label>证件号码</label>
        <span>{{userInfo.scardnumber}}</span>
      </p>
      <div class="uploadImg">
        <p>
          <img :src="userInfo.scardfphoto" alt="" :onerror="defaultImg(0)">
        </p>
        <p>
          <img :src="userInfo.scardlphoto" alt="" :onerror="defaultImg(1)">
        </p>
      </div>
      <div class="userVerify-Rule-box">
        <span class="userVerify-Rule" :class='{userVerifyChecked:checked}' @click="checked=!checked">我已阅读并同意</span><router-link :to="{path: '/protocolH5', query: {native: 0}}" tag="span">《躺盈跟投者/交易员协议》</router-link>
      </div>
    </div>
    <div class="withdraw-btn">
      <p @click="affirm">下一步</p>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'

  const postSavepersoninfo='/api/user/savepersoninfo'
  export default {
    mixins: [Ajax],
    components: {
      Head
    },
    data() {
      return {
        title: '确认个人信息',
        checked:false,
        userInfo:{}
      };
    },
    methods: {
      affirm(){
        if(this.checked){
          this.userInfo.iagree =1
          this.post(postSavepersoninfo,this.userInfo).then(body=>{
            if(body.code==200){
              //接口成功返给app,isagreen
              var u = navigator.userAgent;
              if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
               window.Android.updateIAgree()
              }else{
                WebViewJavascriptBridge.updateIAgree()
              }
              this.$router.push({path: '/economicBusiness'})
            }
          })
        }else{
          this.toast('请阅读并同意协议和声明')
        }

      }
    },
    mounted (){
      this.userInfo=JSON.parse(sessionStorage.getItem("user_data"))
    }
  };
</script>

<style scoped>
@import "../../style/withdrawInput.css";
.userVerify-center{
  padding:.8rem 0 1.8rem;
}
.userVerify-center > p{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:1.25rem;
  padding:0 .53rem;
}
.userVerify-center > p label{
  font-size: .48rem;
  color: #666;
}
.userVerify-center > p span{
  width:8.91rem;
  font-size:.48rem;
  color: #333;
}
.userVerify-Rule-box{
  font-size:.42rem;
  margin-top:.3rem;
  height:1.4rem;
  line-height: 1.4rem;
}
.userVerify-Rule{
  display: inline-block;
  background: url('../../assets/images/icon-uncheck.png') no-repeat .6rem center/.42rem .42rem;
  padding-left:1.2rem;
}
.userVerifyChecked{
  background-image: url('../../assets/images/icon-check.png');
}
.userVerify-Rule-box span:nth-child(2){
  color: #8e79c0;
}
</style>
