export default {
  data() {
    return {
      // 是否为iphone x
      isIphonex: false,
      // 是否为Ios
      isIos: false,
      infoJson: {},
      userJson:{
        userId: "",                  // 用户ID
        userPhone :"",            // 用户手机号
        userNickname : "",         // 用户昵称
        userEmail :"",              // 用户邮箱
        userHeadImg : "",            // 用户头像
        userSex : "",               // 用户性别  1=男，2=女
        authToken : "",              // 登录token
        currentAccountId : "",      // 当前账户id*/
      },
      sJSON: '',       //接收ios传参
      imgPath: '',     //接收app返回证件图片base64
      cardImageZ:'',
      cardImageF:'',
      timer:{}
    };
  },
  beforeCreate(){
    var _this = this;
    window.getUserInfo2=function(s){      //ios返回个人信息 JSON
      _this.$bus.emit("sJson",s)
    }
  },
  created(){
    this.$bus.on("sJson", this.getAppInfo.bind(this));
    var _this = this
    window.getUserCardPhotoH5 = function (para) {       //app返回上传证件信息
      _this.$bus.emit("updateImg", para);
    }
  },
  methods: {

    /*返回按钮设置*/
    goBack: function () {
      // this.setSlide();
      if (this.$route.query.native == 0) {
        this.$router.go(-1);
      } else if (this.$route.query.backHref == 1) {
        window.history.back();
      } else {
        this.closeBrowser();
      }
    },
    toast: function (msg, time) {
      time = time ? time : 1500;
      let _this = this
      let toast = document.getElementsByClassName('toast-alert')[0];
      // if (toast) {
      //   clearTimeout(_this.timer);
      //   document.body.removeChild(toast);
      // }
      let newToast = document.createElement("div");
      newToast.className = 'toast-alert align-c';
      newToast.innerHTML = "<p class='con'>" + msg + "</p>"
      document.body.appendChild(newToast);
      this.timer = setTimeout(function () {
        document.body.removeChild(newToast);
      }, time);

    },

    /*APP内关闭浏览器*/
    closeBrowser : function () {
      var u = navigator.userAgent;

      if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
        window.Android.getFinishPage();
      }else{
        window.webkit.messageHandlers.AppModel.postMessage('getFinishPage');
      }
    },

    /*提供App方法：
      在线客服 getOnlineService()
      返回信息 getUserInfo()
      扫描证件 getUserCardPhoto()
      关闭浏览器 getFinishPage()*/

    /*// 用户基本信息
    private String userId = "";                  // 用户ID
    private String userPhone = "";               // 用户手机号
    private String userNickname = "";            // 用户昵称
    private String userEmail = "";               // 用户邮箱
    private String userHeadImg = "";             // 用户头像
    private String userSex = "";                 // 用户性别  1=男，2=女

    private String authToken = "";               // 登录token
    private String currentAccountId = "";        // 当前账户id*/


    /*获取App传值*/
    getAppInfo: function(data){
      try {
        // var infoJson = {};
        var u = navigator.userAgent;

        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){ // android
         this.userJson = window.Android.getUserInfo();
        } else { // IOS
          this.userJson = data
          // window.webkit.messageHandlers.AppModel.postMessage("getUserInfo");
          // this.$bus.on('sJson', s => {
          //   this.infoJson = s
          //   // sessionStorage.setItem('user-Info',JSON.stringify(s))
          // });

        }
        this.userJson = JSON.parse(this.userJson)
        this.toast(this.userJson.authToken)

      } catch (err) {

      }
    },

    /*上传证件*/
    UploadIdCard: function (img) {
      try{
        var u = navigator.userAgent;

        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
          /*Android*/
          window.Android.getUserCardPhoto(img)
        }else{
          /*IOS*/
          window.webkit.messageHandlers.AppModel.postMessage(img)
        }
      }catch(err){

      }
    },
    defaultImg (option) {
      var defaultImg = '';
      switch (option) {
        case 0:
          defaultImg = 'this.src = "' + require('../assets/images/idCard-positive.png') + '"';
          break;
        case 1:
          defaultImg = 'this.src = "' + require('../assets/images/idCard-otherSide.png') + '"';
          break;
      }
      return defaultImg
    },
  },
  mounted (){

  },
};
