<template>
  <div class="withdrawMoney-box" :class="{iphonexHeight: isIphonex}">
    <Head :title= "title" :isShow = true></Head>
    <div class="withdraw-top">
      <p>出金金额</p>
      <div class="withdraw-line">
        <label for="withdraw-money">$</label>
        <input type="number" v-model='withMoney' placeholder="出金金额" id="withdraw-money" @blur="MoneyVerify(withMoney)"/>
      </div>
      <div class="withdraw-top-bottom">
        <div>
          <p>可出金额${{outputmoney(totalMoney)}} </p>
          <p class="withdraw-top-color" @click="allwithdraw">全部出金</p>
        </div>
        <p @click="isShow=true"><span>手续费${{serviceChange}}</span></p>
      </div>
    </div>
    <div class="withdraw-center">
      <div class="withdraw-center-top">
        <label>取款方式</label>
        <select v-model="backInfo.outComeType">
          <option value="1">银联</option>
          <option value="2">电汇</option>
        </select>
      </div>
      <div class="withdraw-bankInfo">
        <p>
          <label>银行名称</label>
          <select v-model='backInfo.bankName'>
            <option value="请选择">请选择</option>
            <option value="中国工商银行">中国工商银行(借)</option>
            <option value="中国建设银行">中国建设银行(借)</option>
            <option value="上海浦东发展银行">上海浦东发展银行(借)</option>
            <option value="中国农业银行">中国农业银行(借)</option>
            <option value="中国民生银行">中国民生银行(借)</option>
            <option value="兴业银行">兴业银行(借)</option>
            <option value="中国交通银行">中国交通银行(借)</option>
            <option value="中国光大银行">中国光大银行(借)</option>
            <option value="中国银行">中国银行(借)</option>
            <option value="北京银行">北京银行(借)</option>
            <option value="平安银行">平安银行(借)</option>
            <option value="广东发展银行">广东发展银行(借)</option>
            <option value="中国邮政储蓄银行">中国邮政储蓄银行(借)</option>
            <option value="中信银行">中信银行(借)</option>
            <option value="上海银行">上海银行(借)</option>
            <option value="华夏银行">华夏银行(借)</option>
            <option value="杭州银行">杭州银行(借)</option>
            <option value="宁波银行">宁波银行(借)</option>
          </select>
        </p>
        <p>
          <label>开户城市</label>
          <input type="text" v-model="scityCode" unselectable="on" onfocus="this.blur()" placeholder="开户城市" readonly @click='addShow=true;cityJson={}'>
          <Address
            :addShow.sync= "addShow"
            :moduleCounery.sync='moduleCounery'
            :moduleCity.sync='moduleCity'
            :moduleProvince.sync='moduleProvince'
            :moduleDistrict.sync='moduleDistrict'
          />
        </p>
        <p>
          <label>支行名称</label>
          <input type="text" v-model='backInfo.branchName' placeholder="请填写收款银行支行名称">
        </p>
        <p>
          <label>账户信息</label>
          <select v-model='accountInfo'>
            <option value="1">使用新账号</option>
            <option v-if="oldBackcard" :value="oldBackcard">{{oldBackcard}}</option>
          </select>
        </p>
        <p>
          <label>银行账号</label>
          <input type="text" maxlength=18 v-model='backInfo.bankCard' placeholder="请输入您的银行账号">
        </p>
        <p>
          <label>确认账号</label>
          <input type="text" maxlength=18 v-model='backInfo.confirmBankcard' placeholder="请再次输入您的银行账号">
        </p>
        <p v-if="backInfo.outComeType==2">
          <label>swift代码</label>
          <input type="text" v-model='backInfo.swiftCode' placeholder="swift代码">
        </p>
        <div class="withdraw-remark">
          <label>备注</label>
          <textarea cols="30" rows="10" maxlength="100" v-model='backInfo.remark'></textarea>
        </div>
      </div>
    </div>
    <div class="withdraw-btn">
      <p @click="inputVerify(backInfo,1)">下一步</p>
    </div>
    <popup :text="text" :isShow.sync="isShow"></popup>
  </div>
</template>
<script>
  import Ajax from '@/mixins/ajax';
  import Head from '../../components/header/head.vue'
  import popup from '../../components/popup/popup.vue'
  import Address from '../../components/address/address.vue'


  const postLastrecord='/api/withdrawcash/lastrecord'

  const regMoney = /^\d+(\.\d+)?$/
  export default {
    mixins:[Ajax],
    components:{
      Head,
      popup,
      Address
    },
    data(){
      return{
        title:'出金',
        text:'取款金额>$100，无手续费，<br/>取款金额<=$100，手续费$5',
        isShow:false,
        sid:'',
        backInfo:{
          accountId: '',   //账户id
          money: null,   //提现金额
          bankName: '请选择',  //银行名称
          outComeType: 1,   //1-银联出金，2-电汇出金
          branchName:'',   //支行名称
          bankCard:'',   //银行卡号
          remark: '',    //备注
          swiftCode: '',  //swift代码
          confirmBankcard:'',//确认银行卡号
          cityCode:'北京',//城市
          countryCode:'中国',//国家
          provinceCode:'北京',//省
        },
        accountInfo:1, //账户信息
        oldBackcard:'',
        oldBackName:'',
        totalMoney:0,
        withMoney:null,
        serviceChange:'0',
        city:'',
        addShow:false,
        scityCode:'',
        moduleCounery:'',
        moduleCity:'',
        moduleProvince:'',
        moduleDistrict:'',
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.sid = vm.userJson.currentAccountId
        vm.init(to, from, vm.sid);
      });
    },
    created(){
    },
    watch:{
      accountInfo(nextValue){
        if(nextValue==1){
          this.backInfo.branchName='';
          this.backInfo.bankCard='';
          this.backInfo.confirmBankcard=''
        }else{
          this.backInfo.branchName=this.oldBackName;
          this.backInfo.bankCard=this.oldBackcard
          this.backInfo.confirmBankcard=this.oldBackcard
        }
      },
      moduleCounery(nextValue){
        if(nextValue){
          this.scityCode = nextValue
          this.backInfo.countryCode=this.moduleProvince   //国家
          this.backInfo.provinceCode=this.moduleCity   //省
          this.backInfo.cityCode=this.moduleDistrict    //城市
        }
      }
    },
    methods:{
      init(to, from,userid) {
        //    console.log(invitingPop)
        //更新路由后根据路由路由来源判断是否请求接口
        if (from.path == "/withdrawInfo") {
          this.backInfo=JSON.parse(sessionStorage.getItem("bank_data"))
          this.withMoney=this.backInfo.money
          this.accountInfo=this.backInfo.bankCard
          this.backInfo.confirmBankcard=this.backInfo.bankCard

          this.oldBackcard=this.backInfo.bankCard
          this.oldBackName=this.backInfo.bankName
          this.scityCode = `${this.backInfo.countryCode}-${this.backInfo.provinceCode}-${this.backInfo.cityCode}`
        } else {
          this.post(postLastrecord,{accountId:userid}).then(body=>{
            if(body.code==200){
              if(body.data.bankCard){
                this.backInfo = body.data
                this.accountInfo=this.backInfo.bankCard
                this.backInfo.confirmBankcard=this.backInfo.bankCard
                this.oldBackcard=this.backInfo.bankCard
                this.oldBackName=this.backInfo.bankName
                this.scityCode = `${this.backInfo.countryCode}-${this.backInfo.provinceCode}-${this.backInfo.cityCode}`
              }else if(body.data.sname){
                this.backInfo.sname = body.data.sname
                this.backInfo.smt4account = body.data.smt4account
                this.backInfo.sid = body.data.sid
              }
            }
          })
        }
      },
      allwithdraw (){
        this.withMoney = this.totalMoney
        this.backInfo.money=this.withMoney*1
      },
      MoneyVerify(msg){
        if(msg){
          if(regMoney.test(msg)){
            if(msg>this.totalMoney*1){
              this.toast('当前可出金金额不足')
            }else{
              if(msg>0 && msg<=100){
                this.serviceChange ='5.00'
              }else{
                this.serviceChange ='0.00'
              }
            }
          }else {
            this.toast("金额格式错误")
          }
          this.backInfo.money=msg*1
        }
      },
      inputVerify(user,msg){
        //表情
        var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        //银行卡
        var regCard = /^[1-9]\d*$/;

        console.log(user.money)
        if(user.money==undefined){
          this.toast('请输入出金金额')
          return false
        }else if(user.money<=0){
          this.toast('出金金额需大于0')
          return false
        }else if(!regMoney.test(user.money)){
          this.toast('出金金额格式错误')
          return false
        }else if(user.money*1<=100 && user.money*1>this.totalMoney*1-5){
          this.toast('当前可出金金额不足')
          return false
        }else if(user.money*1>100 && user.money*1>this.totalMoney*1){
          this.toast('当前可出金金额不足')
          return false
        }

        if(!user.branchName){
          this.toast('支行名称不能为空')
          return false
        }else if(regRule.test(user.branchName)){
          this.toast("支行名称格式错误")
          return false;
        }

        if(!user.bankCard || !user.confirmBankcard){
          this.toast('银行账号不能为空')
          return false
        }else if(!regCard.test(user.bankCard) || !regCard.test(user.confirmBankcard)){
          this.toast("银行账号格式错误")
          return false;
        }else if(!(user.bankCard==user.confirmBankcard)){
          this.toast("两次账号不匹配请重新输入")
          return false;
        }

        if(user.outComeType==2){
          if(!user.swiftCode){
            this.toast("swift代码不能为空")
            return false;
          }
        }

        if(regRule.test(user.remark)){
          this.toast("备注格式错误")
          return false;
        }

        if(msg){
          this.backInfo.serviceChange=this.serviceChange
          sessionStorage.setItem("bank_data", JSON.stringify(this.backInfo))
          this.$router.push({path: '/withdrawInfo',query:{native: 0}})
        }
      }
    },
    mounted(){
//      if(this.$route.query.totalMoney){
//        this.totalMoney = this.$route.query.totalMoney
//      }

      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
        this.totalMoney=window.Android.getWithdrawalMoney()*1
      }else{
        this.totalMoney = WebViewJavascriptBridge.getWithdrawalMoney()*1
      }
    }
  }

</script>
<style scoped>
  @import "../../style/withdrawInput.css";
</style>

