//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '开启小程序之旅',
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onStart: function () {
    //wx.navigateTo需要跳转的应用内非 tabBar 的页面的路径
    // wx.navigateTo({
    //   url: '/pages/posts/post'
    // });
    //  wx.redirectTo({
    //    url:"../posts/post"
    //  })
     wx.switchTab({
            url: "../posts/post"
        });
  }
  // onUnload:function(){
  //   console.log("welcome page is unload");
  // },
  //  onHide:function(){
  //   console.log("welcome page is hide");
  // }
})
