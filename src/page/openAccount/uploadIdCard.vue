<template>
  <div class="simpleInf-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <div class="head-IFM">
      <span></span>
      <p>开立账户</p>
    </div>

    <Progress :Protitle="Protitle" :stepForm=3></Progress>

    <div class="simpleInf-form">
      <div class="scan">
        <p><img class="positive" @click="UploadIdCard('getUserCardPhotoZ')" :src="accountinfo3.scardfphoto" :onerror="defaultImg(0)"></p>
        <p><img class="otherSide" @click="UploadIdCard('getUserCardPhotoF')" :src="accountinfo3.scardlphoto" :onerror="defaultImg(1)"></p>
      </div>
      <div class="withdraw-btn" @click="checkForm(accountinfo3) ? nextPage() : '' ">下一步</div>
    </div>
    <!--<div :class="{mask: mask}" @click="mask = false"></div>-->
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Progress from '../../components/pogressBar/progressBar.vue'

  const accountInfo3 = "/api/account/accountinfo/3"

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
        Title: '开设真实账户',
        Protitle: '4 上传证件照片',
        codeIsShow: true,
        infoList3: [],
        accountinfo3: {
          sid: this.$route.query.sid,   //账户id
          step: 3,   //表示基本信息的第一个页面
          scardfphoto: '',   //证件正面图片
          scardlphoto: '',    //证件反面图片
        }
      };
    },
    watch: {

    },
    mounted() {
      this.$bus.on('updateImg', para => {
        let Url = {}
        Url = JSON.parse(para)
        if(Url.state == 'getUserCardPhotoZ'){
          this.accountinfo3.scardfphoto = Url.imageUrl
        }else if(Url.state == 'getUserCardPhotoF'){
          this.accountinfo3.scardlphoto = Url.imageUrl
        }
      });
    },
    methods: {

      /*下一步*/
      nextPage: function () {
        this.post(accountInfo3, this.accountinfo3).then(body => {
//          this.formFtep1 = body.data
          if(body.code == 200){
            this.infoList3 = body.data
            sessionStorage.setItem("accouont_data", JSON.stringify(this.infoList3))
            this.$router.push({
              path: '/confirmInformation',
              query: {
                native: 0,
                sid:body.data.sid,
                /*phoneF:this.accountinfo3.scardfphoto,
                phoneL:this.accountinfo3.scardlphoto*/
              }
            })
          }
        });
      },
      /*表单验证*/
      checkForm: function (cardID) {
        if(!cardID.scardfphoto || !cardID.scardlphoto){
          this.toast('请上传身份证照片')
          return false
        }
        return true
      },
    }
  };
</script>

<style scoped>
  .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    z-index: 1000;
  }
  .simpleInf-box{
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

  .withdraw-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
  .scan{
    padding: 1.2rem 0.86rem;
    display: flex;
    justify-content: space-between;
  }
  .scan>p{
    /*position: relative;*/
    width: 4.86rem;
    height: 3.15rem;
    border-radius: 0.26rem;
    overflow: hidden;
  }
  .scan img{
    /*position: absolute;*/
    /*top: -25%;*/
    border: none;
    width: 4.86rem;
    height: auto;
    margin: auto;
  }
  .scan img.positive{
    background: url("../../assets/images/idCard-positive.png") no-repeat center/100% 100%;
  }
  .scan img.otherSide{
    background: url("../../assets/images/idCard-otherSide.png") no-repeat center/100% 100%;
  }

</style>
