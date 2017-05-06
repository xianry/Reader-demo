var postsData = require("../data/posts-data.js")//必须使用相对路径

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
  },
  onLoad: function (options) {
    //this.data.postList = postsData.postList;  122100版本中
    //this.data做数据绑定的方法已失效， 请在以后所有数据绑定的 地方。使用this.setData
    this.setData({
      post_key: postsData.postList,
    });
  },
  //列表页跳转文章详情页
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    ///console.log("postId" + postId);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  //Banner轮播图跳转文章详情
  onSwiperTap: function (event) {
    //target 和currentTarget
    //target 指的是当前点击的组件
    //currentTarget 指的是事件捕获的组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})