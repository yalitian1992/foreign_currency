export default {
  data() {
    return {
      authToken: "",
      userJson:{
        userId: "",                  // 用户ID
        userPhone :"",            // 用户手机号
        userNickname : "",         // 用户昵称
        userEmail :"",              // 用户邮箱
        userHeadImg : "",            // 用户头像
        userSex : "",               // 用户性别  1=男，2=女
        authToken : "",              // 登录token
        currentAccountId:''
        // currentAccountId : "00000000633f29ed01633f5c6ad80000",      // 当前账户id*/
      },
      sJSON: '',       //接收ios传参
      imgPath: '',     //接收app返回证件图片base64
      cardImage:'',
      cardImageF:'',
      timer:{},
      // imgBaseUrl:"http://app.eawin.com/api",
      // imgBaseUrl:'http://10.0.1.90:8080/api',
      mask: false,         //证件遮罩
      isIphonex:false
    }
  },
  created(){
    let _this = this;
    window.getUserCardPhotoH5 = function (para) {       //app返回上传证件信息
      _this.$bus.emit("updateImg", para);
    }
    this.userJson = this.getAppInfo()
    this.authToken = this.userJson.authToken
    // this.authToken='eyJhbGciOiJIUzUxMiJ9.eyJpaGF2ZXUiOiJ1Z2d3dWciLCJzdWIiOiIwMDAwMDAwMDYzNDNlNjY2MDE2MzQzZWEwOWY2MDAwMCIsImV4cCI6MTUyOTk5NjE3NSwiaWF0IjoxNTI5MzkxMzc1fQ.CMpvxVho7XHoKSMcx2iv5UGvL04XHrnYrY13eJTTFRNEkEpwexH33PxVVla6A_APeQxBJJ6FAfzeztzEoerJaA'
  },
  mounted(){
    this.isIphonexFun();
  },
  methods: {
    /**
     * POST请求
     * @param {Object} params post传递的参数以及URL方法，建议token在这里传递，等扩展
     * @param {Boolean} isProcessing 是否需要处理返回状态
     * @description <code>
     *  this.post({
     *    url: '/card-service-web/h5/chestRecords/sacrifice',
     *    headers: {accessToken: _this.getCookie('intoToken')},
     *    params: {...params}
     *  }).then(body => {
     *    return "123";
     *  }).then(info => {
     *    // info === "123" info是根据前一个then返回的值决定的 如果不懂可以去了解下promise
     *    return "5667";
     *  });
     *
     * </code>
     */
    post(url, options, isProcessing) {
      if(typeof options === "boolean"){
        isProcessing = options;
      }
      return this.$http({
        method: "POST",
        url: url,
        body: options || {},
        headers: {
          auth:this.authToken,
        },
        emulateJSON:true
      }).then(res => {
        if(isProcessing){
          return res;
        }
        // 在此处做一些错误处理

        // 获取请求状态码
        const status = +res.body.code;
        // 如果登入失效则跳转登录

        if(+status !== 200) {
          this.toast(res.body.message);
        }
        return res.body;
      });
    },
    /**
     * GET请求
     * @param {String} url 请求地址
     * @param {Object} options 请求参数
     * @param {Boolean} isProcessing 是否需要处理返回状态
     */
    get(url, options, isProcessing) {
      if(typeof options === "boolean"){
        isProcessing = options;
      }
      return this.$http({
        method: "GET",
        url: url,
        params: options || {},
        headers: {
          // accessToken: this.token
          auth:this.authToken
        }
      }).then(res => {
        if(isProcessing){
          return res;
        }
        // 获取请求状态码
        const status = +res.body.code;

        if(+status !== 200) {
          this.toast(res.body.message);
        }
        return res.body;
      });
    },

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
      let toast = document.getElementsByClassName('toast-alert')[0];
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
        WebViewJavascriptBridge.getFinishPage()
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
    getAppInfo: function(){
      try {
       var u = navigator.userAgent,
         userJson=''
       if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){ // android
         userJson = window.Android.getUserInfo();
       } else {
         // window.webkit.messageHandlers.AppModel.postMessage("getUserInfo");
         userJson = WebViewJavascriptBridge.getUserInfo()
       }
       return JSON.parse(userJson)
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
          // window.webkit.messageHandlers.AppModel.postMessage(img)
           WebViewJavascriptBridge.getUserCardPhoto(img)
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
    // 判断iphonex
    isIphonexFun(){
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
      }else{
        if (window.screen.height == 812) {
          this.isIphonex = true;
        }
      }
    },
    //格式化金额
    outputmoney(number) {
      //number = number.replace(/\,/g, "");
      if(isNaN(number) || number == "")return 0;
      number = Math.round(number * 100) / 100;
      if (number < 0)
        return '-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(number) - 0);
      else
        return this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0);
    },
    //格式化金额
    outputdollars(number) {
      if (number.length <= 3)
        return (number == '' ? '0' : number);
      else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (let i = 0; i < Math.floor(number.length / 3); i++) {
          if ((mod == 0) && (i == 0))
            output += number.substring(mod + 3 * i, mod + 3 * i + 3);
          else
            output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
      }
    },
    outputcents(amount) {
      amount = Math.round(((amount) - Math.floor(amount)) * 100);
      return (amount < 10 ? '.0' + amount : '.' + amount);
    }
  }
}
