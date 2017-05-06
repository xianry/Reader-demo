// pages/address/address.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  defaultButton: function (event) {
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      },
    })
  },
  getUserinfo: function (event) {
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
          },
        })
      },

    })
  },
  checkSession: function (event) {
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log("success")
      },
      fail: function () {
        //登录态过期
        console.log("error")
      }
    })
  },
  openSetting: function (event) {
    wx.openSetting({
      success: function (res) {
        console.log(res);
      }
    })
  },
  getLocation: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      },
      fail:function(res){
        console.log(res);
        console.log("error");
      }
    })
  }

})