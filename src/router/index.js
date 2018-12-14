import Vue from 'vue'
// import App from '../App.vue'
import Router from 'vue-router'
import simpleInformation from '../page/openAccount/simpleInformation.vue'
import economicBusiness from '../page/openAccount/economicBusiness.vue'
import importantInformation from '../page/openAccount/importantInformation.vue'
import confirmInformation from '../page/openAccount/confirmInformation.vue'
import uploadIdCard from '../page/openAccount/uploadIdCard.vue'
import accountOpenAudit from '../page/openAccount/accountOpenAudit.vue'
import userInfo from '@/page/openAccount/userInfo.vue'
import userInfoVerify from '@/page/openAccount/userInfoVerify.vue'
import helpCenter from '../page/helpCenter/helpCenter.vue'
import zijinAbout from '../page/helpCenter/zijinAbout.vue'
import kaihuAbout from '../page/helpCenter/kaihuAbout.vue'
import jiaoyiAbout from '../page/helpCenter/jiaoyiAbout.vue'
import tangyingAbout from '../page/helpCenter/tangyingAbout.vue'
import details from '../page/helpCenter/details.vue'
import withdrawMoney from '@/page/trade/withdrawMoney.vue'
import withdrawInfo from '@/page/trade/withdrawInfo.vue'
import withdrawSuccess from '@/page/trade/withdrawSuccess.vue'
import hintInfo from '@/page/traderInfo/hintInfo.vue'
import traderIndex from '@/page/traderInfo/index.vue'
import protocol from '@/page/helpCenter/protocol.vue'
import protocolH5 from '@/page/helpCenter/protocolH5.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // {
      /*path: '/',
      component: App,
      children: [*/
    //选择经济商
    {
      path: '/',
      component: userInfo
    },
    {
      path: '/economicBusiness',
      component: economicBusiness
    },
    //基本信息
    {
      path: '/simpleInformation',
      component: simpleInformation,
      /*children: [
        //详细信息
        {
          path: '/simpleInformation/importantInformation',
          component: importantInformation
        }
      ]*/
    },
    //详细信息
    {
      path: '/importantInformation',
      component: importantInformation
    },
    //上传证件照片
    {
      path: '/uploadIdCard',
      component: uploadIdCard
    },
    //确认开户信息
    {
      path: '/confirmInformation',
      component: confirmInformation
    },
    //开户信息审核
    {
      path: '/accountOpenAudit',
      component: accountOpenAudit
    },
    //帮助中心
    {
      path: '/helpCenter',
      component: helpCenter
    },
    //开户相关
    {
      path: '/kaihuAbout',
      component: kaihuAbout
    },
    //资金相关
    {
      path: '/zijinAbout',
      component: zijinAbout
    },
    //交易相关
    {
      path: '/jiaoyiAbout',
      component: jiaoyiAbout
    },
    //躺赢相关
    {
      path: '/tangyingAbout',
      component: tangyingAbout
    },
    // 帮助中心详情页
    {
      path: '/details',
      component: details
    },
    {
      //出金
      path:'/withdrawMoney',
      component:withdrawMoney
    },
    {
      //出金信息确认
      path:'/withdrawInfo',
      component:withdrawInfo
    },
    {
      //出金成功提示
      path:'/withdrawSuccess',
      component:withdrawSuccess
    },
    {
      //交易员提示信息
      path:'/hintInfo',
      component:hintInfo
    },
    {
      path:'/traderIndex',
      component:traderIndex
    },
    {
      //完善用户信息
      path:'/userInfo',
      component:userInfo
    },
    {
      //确认个人信息
      path:'/userInfoVerify',
      component:userInfoVerify
    },
    {
      //协议
      path:'/protocol',
      component:protocol
    },
    {
      //协议
      path:'/protocolH5',
      component:protocolH5
    }

    /*  ]
    },*/
  ]
})
