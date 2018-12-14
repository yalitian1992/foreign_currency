<template>
  <div class="userInfo-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "title"></Head>
    <div class="userInfo-center">
      <p>
        <label>姓</label>
        <input type="text" v-model="user.firstName" placeholder="请使用证件上姓名拼音填写" @blur="firstUpperCase(user.firstName,1)">
      </p>
      <p>
        <label>名</label>
        <input type="text" v-model="user.lastName" placeholder="请使用证件上姓名拼音填写" @blur="firstUpperCase(user.lastName,2)">
      </p>
      <p>
        <label>中文姓名</label>
        <input type="text" v-model="user.sname" placeholder="请使用证件一致的姓名">
      </p>
      <p>
        <label>电子邮箱</label>
        <input type="email" v-model="user.semail" placeholder="请输入电子邮箱">
      </p>
      <p>
        <label>联系电话</label>
        <span>{{userJson.userPhone}}</span>
      </p>
      <p class="userInfo-city">
        <label>国家</label>
        <input type="text" v-model="citys" unselectable="on" onfocus="this.blur()" placeholder="请选择您的户籍地址" readonly @click='addShow=true;cityJson={}'>
        <Address
          :addShow.sync= "addShow"
          :moduleCounery.sync='moduleCounery'
          :moduleCity.sync='moduleCity'
          :moduleProvince.sync='moduleProvince'
          :moduleDistrict.sync='moduleDistrict'
        />
      </p>
      <p>
        <label>地址</label>
        <input type="text" v-model="user.sadress" placeholder="请与您有效证件地址一致">
      </p>
      <p>
        <label>邮编</label>
        <input type="text" v-model="user.szipcode" maxlength=6 placeholder="请输入您居住地邮政编码">
      </p>
      <p>
        <label>证件类型</label>
        <span>身份证</span>
      </p>
      <p>
        <label>证件号码</label>
        <input type="text" v-model="user.scardnumber" maxlength=18 placeholder="请输入您的身份证号码">
      </p>
      <div class="uploadImg">
        <p>
          <img @click="UploadIdCard('getUserCardPhotoZ')" :src="user.scardfphoto" alt="" :onerror="defaultImg(0)">
        </p>
        <p>
          <img @click="UploadIdCard('getUserCardPhotoF')" :src="user.scardlphoto" alt="" :onerror="defaultImg(1)">
        </p>

      </div>
    </div>
    <div class="withdraw-btn" >
      <p @click="inputVerify(user,1)">下一步</p>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Address from '../../components/address/address.vue'

  export default {
     mixins: [Ajax],
    components: {
      Head,
      Address
    },
    data() {
      return {
        title: '完善个人信息',
        type: 1,    //个人信息
        addShow:false,
        citys:'',
        moduleCounery:'',
        moduleCity:'',
        moduleProvince:'',
        moduleDistrict:'',
        user:{
          firstName:'',
          lastName:'',
          sname: '',
          semail:'',//邮箱
          sadress: '',//详细地址
          szipcode: '',//邮编
          scertificates: 1 ,//证件类型(1-身份证，2-?)
          scardnumber: '' ,// 证件号码
          scardfphoto: '',//证件正面图片
          scardlphoto: '',// 证件反面图片
          countryCode: this.moduleProvince,    //国家
          provinceCode: this.moduleCity,    //省
          scitycode: this.moduleDistrict,     //城市
        },
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.init(to, from);
      });
    },
    watch:{
      moduleCounery(nextValue){
        if(nextValue){
          this.citys = nextValue
          this.user.countryCode=this.moduleProvince   //国家
          this.user.provinceCode=this.moduleCity   //省
          this.user.scitycode=this.moduleDistrict    //城市
        }
      }
    },
    created(){

    },
    methods: {
      init(to, from) {
        //    console.log(invitingPop)
        //更新路由后根据路由路由来源判断是否请求接口

        if (from.path == "/userInfoVerify") {
          this.user=JSON.parse(sessionStorage.getItem("user_data"))
          this.citys = `${this.user.countryCode}-${this.user.provinceCode}-${this.user.scitycode}`
        }
      },
      firstUpperCase(str,msg) {
        let strs = str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        if(msg==1){
          this.user.firstName=strs
        }else if(msg==2){
          this.user.lastName=strs
        }

      },
      inputVerify(user,msg){
        /*邮箱正则表达式*/
        var regu = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        /*中文拼音验证*/
        var regname =/^[A-Za-z]+$/;
        //邮编
        var reg=/^\d{6}$/;
        //表情
        var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        //证件号码
        var regIDcard=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

        if(!user.firstName || !user.lastName){
          this.toast('姓名不能为空')
          return false
        }else if(!regname.test(user.firstName) || !regname.test(user.lastName)){
          this.toast("姓与名请用中文拼音填写")
          return false;
        }else if(regRule.test(user.firstName) || regRule.test(user.lastName)){
          this.toast("姓名格式错误")
          return false;
        }

        if(!user.sname){
          this.toast('姓名不能为空')
          return false
        }else if(regRule.test(user.sname)){
          this.toast("姓名格式错误")
          return false;
        }
        if(!user.semail){
          this.toast('邮箱不能为空')
          return false
        }else if(!regu.test(user.semail)){
          this.toast("邮箱格式错误")
          return false;
        }

        if(!user.countryCode || !user.provinceCode || !user.scitycode){
          this.toast('请选择国家')
          return false;
        }

        if(!user.sadress){
          this.toast('地址不能为空')
          return false
        }else if(regRule.test(user.sadress)){
          this.toast("地址格式错误")
          return false;
        }

        if(!user.szipcode){
          this.toast('邮编不能为空')
          return false
        }else if(!reg.test(user.szipcode)){
          this.toast("邮编格式错误")
          return false;
        }

        if(!user.scardnumber){
          this.toast('证件号码不能为空')
          return false
        }else if(!regIDcard.test(user.scardnumber)){
          this.toast("证件号码格式错误")
          return false;
        }

        if(!user.scardfphoto || !user.scardlphoto){
          this.toast('请上传身份证照片')
          return false
        }

        if(msg){
          this.user.citys=this.citys
          sessionStorage.setItem("user_data", JSON.stringify(this.user))
          this.$router.push({path: '/userInfoVerify',query:{native: 0}})
        }
      },
    },

//  {"imageUrl":"/q/q/1231.jpg","state":"getUserCardPhotoZ"}
    mounted(){
      this.$bus.on('updateImg', para => {
        let Url = {}
        Url = JSON.parse(para)
        if(Url.state == 'getUserCardPhotoZ'){
          this.user.scardfphoto = Url.imageUrl
        }else if(Url.state == 'getUserCardPhotoF'){
          this.user.scardlphoto = Url.imageUrl
        }
      });
      this.user.semail = this.userJson.userEmail
    },
    destroyed(){
      this.$bus.off('updateImg')
    }
  };
</script>

<style scoped>
@import "../../style/withdrawInput.css";

.userInfo-center{
  padding:.8rem 0 2rem;
}
.userInfo-center > p{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 .53rem;
  height:1.4rem;
}
.userInfo-center > p label{
  font-size:.48rem;
  color: #666;
  height:.8rem;
}
.userInfo-center > p span,.userInfo-center p input{
  width:8.9rem;
  height:.8rem;
  line-height: .8rem;
  font-size: .48rem;
  padding:0 .3rem;
  display: inline-block;
}
.userInfo-center > p span{
  color: #000;
}
.userInfo-center > p input{
  border-bottom:1px solid #ede9f5;
  -webkit-appearance: none
}
.userInfo-center > p input:focus{
  border-color: #8e79c0;
  border-radius:inherit;
}
.userInfo-city input{
  background: url("../../assets/images/icon-right.png") no-repeat right center/.23rem .4rem;
}
</style>
