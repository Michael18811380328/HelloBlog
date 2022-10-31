//index.js
//获取应用实例
const app = getApp()

Page({
  // Share App
  onShareAppMessage(options) {
    return {
      title: '邀请你使用SeaTable',
      imageUrl: '/images/share-app.png',
      path: '/pages/index/index',
    }
  },

  // Web Page
  weixinLogin: function (e) {
    wx.navigateTo({
      url: '/pages/webpage/webpage?path=weixin/oauth-login/',
    })
  },

  passwordLogin: function (e) {
    wx.navigateTo({
      url: '/pages/webpage/webpage',
    })
  },

})
