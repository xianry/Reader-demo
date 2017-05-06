
var postsData = require("../../data/posts-data.js")//必须使用相对路径
var app = getApp();
Page({
    data: {
        isPlayingMusic: false
    },
    onLoad: function (option) {
        var postId = option.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        })

        // wx.setStorageSync('key',"风暴"),
        //   wx.setStorageSync('key',{
        //     game:"愤怒",
        //     developer:"报修"
        //   })

        var postsCollected = wx.getStorageSync('posts_collected');
        if (postsCollected) {
            var postcollected = postsCollected[postId];
            this.setData({
                collected: postcollected
            })
        }
        else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }
        //全局变量 g_isPlayingMusic, g_currentMusicPostId
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
            this.setData({
                isPlayingMusic: true
            })
            // this.data.isPlayingMusic=true;
        }
        //设置全局变量
        this.setMusicMonitor();
    },

    setMusicMonitor: function () {
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;
        })

        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        })
          wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        })
    },  
    //音乐开启暂停操作
    onMusicTap: function (event) {
        var isPlayingMusic = this.data.isPlayingMusic;
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId];
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })

        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            })
            this.setData({
                isPlayingMusic: true
            })
        }
    },
//文章收藏按钮的点击操作
    onCollectionTap: function (event) {
        var postsCollected = wx.getStorageSync('posts_collected');
        //具体的当前的文章是否收藏过
        var postcollected = postsCollected[this.data.currentPostId];
        //收藏变未收藏 ，  未收藏变收藏
        postcollected = !postcollected;
        //给当前的文章赋值
        postsCollected[this.data.currentPostId] = postcollected;
        this.showToast(postsCollected, postcollected)
    },

    showModal: function (postsCollected, postcollected) {
        var that = this;
        wx.showModal({
            title: "收藏",
            content: postcollected ? "收藏该文章?" : "取消收藏该文章?",
            showCancel: "true",
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确认",
            confirmColor: "#405f80",
            success: function (res) {
                if (res.confirm) {
                    //更新文章是否的缓存值
                    wx.setStorageSync('posts_collected', postsCollected);
                    //更新数据绑定变量，从而切换图片
                    //this的指代是函数调用的上下文环境，如果在自定义的嵌套函数中使用this指针，
                    //这样的this.setData({}),是属于Page({})结构中的变量，所以在自定义的函数中是不起作用的
                    that.setData({
                        collected: postcollected
                    })
                }
            }
        })
    },
//是否收藏，提示框
    showToast: function (postsCollected, postcollected) {
        //更新文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        //更新数据绑定变量，从而切换图片
        this.setData({
            collected: postcollected
        })
        wx.showToast({
            title: postcollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success",
            mask: true,
        })
    },
//分享按钮操作
    onShareTap: function (event) {
        var itemlist = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ]
        wx.showActionSheet({
            itemList: itemlist,
            itemColor: "#405f80",
            success: function (res) {
                //res.cancel 用户 是不是点击了取消按钮
                //res.tapIndex 数组元素的序号,从0 开始
                wx.showModal({
                    title: "用户" + itemlist[res.tapIndex],
                    content: "用户是否取消？" + res.cancel + "现在无法实现分享功能"
                })
            }
        })

    },
    onShareAppMessage: function () {
        return {
            title: '列表分享',
            path: '/pages/posts/post-detail/post-detail?id=this.data.currentPostId'
        }
    },

  


})