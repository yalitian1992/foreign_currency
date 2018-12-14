<template>
  <section class="showChose" v-show="isPopup">
    <section class="Saddress">
      <section class="Stitle">
        <span @click="cancel">取消</span>
        <span @click="getAppInfo()">选择地址</span>
        <span @click="closeAdd">确定</span>
      </section>
      <!--<section class="OptTitle">
        <span class="area" :class="Province?'':'active'">{{Province?Province:'请选择'}}</span>
        <span class="area" :class="City?'':'active'">{{City?City:'请选择'}}</span>
        <span class="area" :class="District?'':'active'">{{District?District:'请选择'}}</span>

        &lt;!&ndash;<span class="area" @click="provinceSelected()" :class="Province?'':'active'">{{Province?Province:'请选择'}}</span>
        <span class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</span>
        <span class="area" @click="districtSelected()" :class="District?'':'active'">{{District?District:'请选择'}}</span>&ndash;&gt;
      </section>-->
      <ul>
        <div class="Flex FlexL"><li class="addList" v-for="(v,k) in countrylist" @click="getCountry(v.countryCode, v.name, k)" :class="v.selected ? 'active' : v.name == Province?'active' :''" unselectable="on" onfocus="this.blur()">{{v.name}}</li></div>
        <div class="Flex FlexC"><li class="addList" v-for="(v,k) in provincelist" @click="getProvince(v.provinceCode, v.name, k)" :class="v.selected ? 'active' : v.name == City?'active' :''" unselectable="on" onfocus="this.blur()">{{v.name}}</li></div>
        <div class="Flex FlexR"><li class="addList" v-for="(v,k) in citylist" @click="getCity('', v.name, k)" :class="v.selected ? 'active' : v.name == District?'active' :''" unselectable="on" onfocus="this.blur()">{{v.name}}</li></div>
      </ul>
    </section>
  </section>
</template>

<script>
  import { Ajax } from "@/mixins";

  const CountryList = "/api/commonarea/countrylist"
  const ProvinceList = "/api/commonarea/provincelist"
  const CityList = "/api/commonarea/citylist"

  export default {
    mixins: [Ajax],
    props: ['addShow','moduleCounery', 'moduleCity', 'moduleProvince','moduleDistrict'],
    components: {

    },
    data() {
      return {

//        三级联动Start
        country: '',
        countrylist: [],
        provincelist: [],
        citylist: [],
        countryCode: '',
        showChose: false,
        isPopup:false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        province: 5,
        city: 3,
        district: 57,
        GetProvinceId: 2,
        Province: '中国',
        District: '北京市',
        City: '北京市',
        // v-for循环判断是否为当前
        selected: false,
        cityText:{}
//        三级联动End

      };
    },
    watch: {
      addShow(nextValue){
        this.isPopup = nextValue
        if(nextValue){
          /*国家*/
          this.post(CountryList, {}).then(body => {
            if(body.code == 200){
              this.countrylist = body.data
              this.countryCode = this.countrylist.countryCode
              this.Sheng(this.countrylist[0].countryCode)
            }
          });
        }
      }
    },
    methods: {


//      三级联动~~~~~Start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      /*省~方法*/
      Sheng: function(c){
        this.post(ProvinceList, {
          countryCode: c
        }).then(body => {
          if(body.code == 200){
            this.provincelist = body.data
            this.City = this.provincelist[0].name
            this.Shi(this.provincelist[0].provinceCode)
          }
        });
      },
      /*市~方法*/
      Shi: function(s){
        this.post(CityList, {
          provinceCode: s
        }).then(body => {
          if(body.code == 200){
            this.citylist = body.data
            this.District = this.citylist[0].name
          }
        });
      },

      /*点击input选择地址*/
      CountryS: function(){
        /*this.showChose = true
        /!*国家*!/
        this.post(CountryList, {}).then(body => {
          if(body.code == 200){
            this.countrylist = body.data
            this.countryCode = this.countrylist.countryCode
            this.Sheng(this.countrylist[0].countryCode)
          }
        });*/
      },
      cancel:function(){
        this.isPopup=false;
        this.$emit("update:addShow", this.isPopup);
        document.body.removeAttribute("class","active");   //遮罩层消失，可以滑动
      },
      /*关闭选择弹框*/
      closeAdd: function() {
        this.isPopup=false
        document.body.removeAttribute("class","active");
        this.country = `${this.Province}-${this.City}-${this.District}`
        this.$emit("update:addShow", this.isPopup);
        this.$emit("update:moduleCounery", this.country);
        this.$emit("update:moduleCity", this.City);
        this.$emit("update:moduleProvince", this.Province);
        this.$emit("update:moduleDistrict", this.District);
      },
      _filter(add,name,code) {
        let result = [];
        for(let i=0;i<add.length;i++) {
          if(code == add[i].id){
            result = add[i][name];
          }
        }
        return result;
      },
      getCountry: function(code,input,index) {
        this.province = code;
        this.Province = input;
        this.showProvince=false;

        this.Sheng(this.province)

        this.showCity=true;
        this.showDistrict = false;
        this.provincelist = this._filter(this.countrylist,'city',this.province);
        // 点击选择当前
        this.countrylist.map( a => a.selected = false );
        this.countrylist[index].selected = true;
      },
      provinceSelected: function() {
        // 清除市级和区级列表
//        this.provincelist = false;
//        this.citylist = false;
        // 清除市级和区级选项
        this.City = false;
        this.District = false;
        // 选项页面的切换
        this.showProvince = true;
        this.showCity = false;
        this.showDistrict = false;
      },
      getProvince: function(code, input, index) {
        this.city = code;
        this.City = input;
        this.showProvince=false;

        this.Shi(this.city)

        this.showCity=false;
        this.showDistrict = true;
        this.citylist = this._filter(this.provincelist,'district',this.city);
        // 选择当前添加active
        this.provincelist.map( a => a.selected = false );
        this.provincelist[index].selected = true;
      },
      citySelected: function() {
        this.showProvince=false;
        this.showCity=true;
        this.showDistrict = false;
      },
      getCity: function(code, input, index) {
        this.district = code;
        this.District = input;
        // 选择当前添加active
        this.citylist.map( a => a.selected = false );
        this.citylist[index].selected = true;
        // 选取市区选项之后关闭弹层
//        this.showChose = false;
      },
      districtSelected: function() {
        this.showProvince=false;
        this.showCity=false;
        this.showDistrict = true;
      }

//      三级联动~~~~~~~~~~~~~~~End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    },
    mounted(){

    }

  }

</script>

<style scoped>
  /*三级联动Start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  .cityHidden{
    visibility:hidden !important;
  }

  .myAddress{
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245,245,245,1);
    color:#333;
  }
  .myAddress .cont{
    border-bottom: 1px solid rgba(245,245,245,0.8);
  }
  .myAddress .cont span{
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }
  .myAddress .cont section{
    float:left;
  }
  .myAddress .cont p{
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
    margin-left: 1rem;
  }
  .myAddress .cont .pic2{
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
  }
  .myAddress .cont p.text{
    margin-left: 0.72rem;
  }
  .showChose{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    z-index:120;
    background:rgba(0,0,0,0.45);
  }
  .Saddress{
    position:absolute;
    bottom:0;
    left:0;
    z-index:121;
    background:#fff;
    width:100%;
  }
  .Saddress .Stitle{
    display: flex;
    justify-content: space-between;
    padding: 0 0.64rem;
    height: 1.32rem;
    line-height: 1.32rem;
    background: #8e79c0;
    font-size: 0.48rem;
    color: #fff;
  }
  .Saddress .OptTitle{
    padding: 0 0.84rem;
    display: flex;
    justify-content: space-between;
    height: 1rem;
    line-height: 1rem;
    font-size: .42rem;
    color: #999;
  }
  .addList{
    width:100%;
    /*padding-left:0.32rem;*/
    font-size:0.42rem;
    line-height:0.88rem;
    color:#333;
  }
  /* 修改的格式 */
  .Saddress ul{
    display: flex;
    justify-content: space-between;
    height: 4.4rem;
    /*height:100%;
    max-height: 4.4rem;*/
    /*overflow:auto;*/
  }
  .Flex{
    width: 30%;
    overflow: auto;
  }
  .Saddress ul .FlexL li{
    text-align: center;
    margin-left: -0.5rem;
  }
  .Saddress ul .FlexC li{
    margin-left: -0.2rem;
    text-align: center;
  }
  .Saddress ul .FlexR li{
    margin-left: 0.2rem;
    text-align: center;
  }
  .Saddress ul li{
    height: 1.32rem;
    line-height: 1.32rem;
    /*margin-left:5%;*/
  }
  .Saddress .OptTitle .active{
    color:#0071B8;
    border-bottom:0.02rem solid #0071B8;
  }
  .Saddress ul .active{
    color:#0071B8;
  }

  /*三级联动End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
</style>
