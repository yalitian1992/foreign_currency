export default {
  data(){
    return {
      appId: 0,
      timer: ''  //toast定时器
    }
  },

  install: function (Vue, options) {
    // Vue.prototype.toast = function (msg, time) {
    //   time = time ? time : 1500;
    //   let toast = document.getElementsByClassName('toast-alert')[0];
    //   // if (toast) {
    //   //   clearTimeout(_this.timer);
    //   //   document.body.removeChild(toast);
    //   // }
    //   let newToast = document.createElement("div");
    //   newToast.className = 'toast-alert align-c';
    //   newToast.innerHTML = "<p class='con'>" + msg + "</p>"
    //   document.body.appendChild(newToast);
    //   this.timer = setTimeout(function () {
    //     document.body.removeChild(newToast);
    //   }, time);
    //
    // }
    // Vue.prototype.getAppInfo = function(){
    //   var u = navigator.userAgent,
    //     userJson='';
    //
    //   if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){ // android
    //     usernJson = window.Android.getUserInfo();
    //   } else {
    //     // window.webkit.messageHandlers.AppModel.postMessage("getUserInfo");
    //     userJson = WebViewJavascriptBridge.getUserInfo()
    //   }
    //   //           this.toast(this.userJson+'---',1000)
    //   return JSON.parse(userJson)
    //
    // }

  }
}
