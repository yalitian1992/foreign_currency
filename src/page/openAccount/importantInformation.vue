<template>
  <div class="simpleInf-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "Title"></Head>
    <div class="head-IFM">
      <span></span>
      <p>开立账户</p>
    </div>

    <Progress :Protitle="Protitle" :stepForm=2></Progress>
    <div class="simpleInf-form">
      <div class="withdraw-bankInfo">
        <p>
          <label>英文姓名</label>
          <input class="notFill" type="text" placeholder="" v-model="EnglishName" disabled="disabled" @blur="firstUpperCase(EnglishName,1)">
        </p>
        <p>
          <label>中文姓名</label>
          <input type="text" v-model="accountinfo2.sname" placeholder="">
        </p>
        <p>
          <label>国家</label>
          <input type="text" v-model="scityCode" placeholder="" readonly @click='addClick()'>
<!--三级联动Start-->
        <Address
          :addShow.sync= "addShow"
          :moduleCounery.sync='moduleCounery'
          :moduleCity.sync='moduleCity'
          :moduleProvince.sync='moduleProvince'
          :moduleDistrict.sync='moduleDistrict'
        />
<!--三级联动End-->

        </p>
        <p>
          <label>地址</label>
          <input type="text" v-model="accountinfo2.sadress" placeholder="">
        </p>
        <p>
          <label>邮编</label>
          <input type="text" v-model="accountinfo2.szipcode" placeholder="">
        </p>
        <p>
          <label>证件类型</label>
          <input class="notFill" type="text" placeholder="居民身份证" disabled="disabled">
        </p>
        <p>
          <label>证件号码</label>
          <input type="text" v-model="accountinfo2.scardnumber" placeholder="">
        </p>
        <p class="Sel">
          <label>收入来源</label>
          <select v-model="accountinfo2.sincome">
            <option v-for="(v1,i1) in income" :value="v1.type">{{v1.name}}</option>
          </select>
          <i></i>
        </p>
        <p class="Sel">
          <label>职      业</label>
          <select v-model="accountinfo2.soccupation">
            <option v-for="(v2,i2) in career" :value="v2.type">{{v2.name}}</option>
          </select>
          <i></i>
        </p>
        <p class="Sel resident">
          <label>是否为美国公民或美国税收居民</label>
          <select v-model="accountinfo2.iamerica">
            <option v-for="(v3,i3) in iamerica" :value="v3.type">{{v3.name}}</option>
          </select>
          <i></i>
        </p>
        <p class="Sel income">
          <label>您的税前年收入大约是</label>
          <select v-model="accountinfo2.sretaxrevenue">
            <option v-for="(v4,i4) in earn" :value="v4.type">{{v4.name}}</option>
          </select>

          <i></i>
        </p>
      </div>
      <div class="withdraw-btn-box">
        <div class="withdraw-btn" @click="checkForm(EnglishName,scityCode,accountinfo2) ? nextPage() : '' ">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";
  import Head from '../../components/header/head.vue'
  import Progress from '../../components/pogressBar/progressBar.vue'
  import Address from '../../components/address/address.vue'

  const accountInfo2 = "/api/account/accountinfo/2"

  export default {
//    naem: "rewardPop",
    mixins: [Ajax],
    components: {
      Head,
      Progress,
      Address
    },
    props: {
      // 必填，是否显示弹框

    },
    data() {
      return {
        Title: '开设真实账户',
        Protitle: '3 填写详细信息',
        EnglishName: `${this.$route.query.firstName}${this.$route.query.lastName}`,
//        country: '',
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
        ],
        iamerica: [
          { name: '否',type: 0},
          { name: '是',type: 1},
        ],
        CountryS: false,
        citysSync:{},
        addShow:false,
        moduleCounery:'',
        moduleCity:'',
        moduleProvince:'',
        moduleDistrict:'',
//        cityJson:{},
        scityCode:'',
        accountinfo2: {
          sid: '',   //账户id,,,到时在路径中获取
          step: 2,   //表示基本信息的第一个页面
          sname: '',   //中文姓名
          scountry: this.moduleProvince,   //国家
          sprovincecode: this.moduleCity,   //省
          scitycode: this.moduleDistrict,   //城市
          sadress: '',   //地址
          szipcode: '',   //邮编
          scertificates: 1,   //证件类型（1-身份证件，2-?）
          scardnumber: '',  //证件号码
          bornDate: '',        //1990-1-2   出生日期
          sex: '',   //性别(0-女，1-男)
          sincome: 0,   //收入来源
          soccupation: 0,      //1   职业
          iamerica: 0,   //是否是美工公民或美国纳税居民 1-是，0-不是
          sretaxrevenue: 0   //税前收入 0-(少于$25,000),1-($25,001-$50,000),2-($50,000-$100,000),3-(超过$100,000)
        }
      };
    },
    created(){
      this.accUser =  JSON.parse(sessionStorage.getItem("base_info"))
      if(this.accUser){
        this.accountinfo2.sname = this.accUser.sname
        this.accountinfo2.sadress = this.accUser.sadress
        this.accountinfo2.szipcode = this.accUser.szipcode
        this.accountinfo2.scardnumber = this.accUser.scardnumber
        this.accountinfo2.scountry = this.accUser.countryCode
        this.accountinfo2.sprovincecode = this.accUser.provinceCode
        this.accountinfo2.scitycode = this.accUser.scitycode
        this.scityCode = `${this.accountinfo2.scountry}-${this.accountinfo2.sprovincecode}-${this.accountinfo2.scitycode}`
      }
    },
    watch: {
      moduleCounery(nextValue){
        if(nextValue){
          this.scityCode = nextValue
          this.accountinfo2.scountry=this.moduleProvince   //国家
          this.accountinfo2.sprovincecode=this.moduleCity   //省
          this.accountinfo2.scitycode=this.moduleDistrict    //城市
        }
      }
    },
    methods: {
      addClick: function () {
        this.addShow=true;
          document.getElementsByTagName("body")[0].className="active";   //遮罩层出现，禁止背景滑动
      },

      /*首字母大写*/
      firstUpperCase(str,msg) {
        let strs = str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        if(msg==1){
          this.user.firstName=strs
        }else if(msg==2){
          this.user.lastName=strs
        }
      },

      checkForm: function (EnglishName,scityCode,info) {
        /*邮箱正则表达式*/
        var regu = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$"
        /*中文拼音验证*/
        var regname = "^[A-Za-z]+$"
        //邮编
        var regCode=/^\d{6}$/;

        if(!EnglishName){
          this.toast("姓与名不能为空")
          return false
        }else if(EnglishName.search(new RegExp(regname))){
          this.toast("姓与名请用中文拼音填写")
          return false;
        }
        if(!info.sname){
          this.toast("中文姓名不能为空")
          return false
        }else if(!/^[\u2E80-\u9FFF]+$/.test(info.sname)){
          this.toast("中文姓名格式不对")
          return false
        }
        if(!scityCode){
          this.toast("请选择国家")
          return false
        }
        if(!info.sadress){
          this.toast("地址不能为空")
          return false
        }
        if(!info.szipcode){
          this.toast('邮编不能为空')
          return false
        }else if(info.szipcode.search(new RegExp(regCode))){
          this.toast("邮编格式错误")
          return false;
        }
        if(!info.scardnumber){
          this.toast("证件号码不能为空")
          return false
        }else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(info.scardnumber)){
          this.toast("证件号码格式不对")
          return false
        }
        return true
      },

      /*下一步*/
      nextPage: function () {
        this.accountinfo2.scountry = this.moduleProvince == "" ? this.accUser.countryCode : this.moduleProvince   //国家
        this.accountinfo2.sprovincecode = this.moduleCity == "" ? this.accUser.provinceCode : this.moduleCity   //省
        this.accountinfo2.scitycode = this.moduleDistrict == "" ? this.accUser.scitycode : this.moduleDistrict   //城市
        this.accountinfo2.sid = this.$route.query.sid

        this.post(accountInfo2, this.accountinfo2).then(body => {
          if(body.code == 200){
            this.$router.push({
              path: '/uploadIdCard',
              query: {
                native: 0,sid:body.data.sid
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
  .notFill{
    border: none !important;
  }
  input:disabled{
    background: none;
  }
  select{
    background: none;
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
    padding-bottom: 2.8rem;
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

  .withdraw-btn-box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .withdraw-btn{
    width: auto;
    height: 1.32rem;
    line-height: 1.32rem;
    background-color: #8e79c0;
    border-radius: .12rem;
    margin:0 .24rem .6rem .24rem;
    color: #fff;
    font-size:.54rem;
    text-align: center;
  }

  .Sel{
    position: relative;
  }
  .Sel i{
    position: absolute;
    right: 0.5rem;
    bottom: .38rem;
    display: block;
    width: 0.44rem;
    height: 0.24rem;
    background: url("../../assets/images/icon-down.png") no-repeat center/contain;
  }
  .resident select{
    width: 4.48rem !important;
  }
  .income select{
    width: 6.29rem !important;
  }
  input::-webkit-input-placeholder{
    color: #4e5052;
  }


</style>
