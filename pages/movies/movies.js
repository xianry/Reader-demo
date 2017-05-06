var util = require("../../utils/util.js");
var app = getApp();
Page({
    //Restful Api  Json
    // Soap xml
    data: {
        inTheater: {},
        comingSoon: {},
        top205: {},
        searchResult: {},
        containerShow: true,//列表页面
        searchPanelShow: false,//搜索页面
        cancelShow:false,//叉叉按钮
        inputValue:"",//输入框值
        cancelPanelShow:false// 取消按钮
    },
    onLoad: function (event) {
        var doubanBase = app.globalData.doubanBase;
        var inTheaterUrl = doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        var comingSoonUrl = doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top205Url = doubanBase + "/v2/movie/top250" + "?start=0&count=3";
        this.getMovieListData(inTheaterUrl, "inTheater", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top205Url, "top205", "豆瓣Top250");
    },
    //通过网络请求豆瓣电影数据
    getMovieListData: function (url, settedKey, categoryTitle) {
        var that = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "Json"//这里不能使用Application/Json 和 空， 其他的随便写一个
            }, // 设置请求的 header
            success: function (res) {
                //console.log(res);
                that.processDoubanData(res.data, settedKey, categoryTitle)
            },
            fail: function (res) {
                // fail
                console.log(error);
            },
            complete: function (res) {
                // complete
            }
        })
    },
    //处理获得的数据内容
    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
        var movies = [];
        for (var idx in moviesDouban.subjects) { //for.....in 循环 用于数组元素或对象的属性
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;//对于title的操作处理
            if (title.length >= 6) {
                title = title.substring(0, 6) + "....";
            }
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),//星星
                title: title,//movie-title
                average: subject.rating.average,//评分
                coverageUrl: subject.images.large,//大图片
                movieId: subject.id// movieid 
            }
            movies.push(temp);
            // console.log("评分" + movies[0].stars);
        }
        //settedKey的动态传值
        var readyData = {};
        readyData[settedKey] = {
            categoryTitle: categoryTitle,
            movies: movies
        }
        this.setData(readyData);
    },
    //点击更多的事件
    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category,
        })
    },
    //跳转电影详情页
    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?id=' + movieId,
        })
    },
    //点击输入框事件
    onBindFocus: function (event) {
        this.setData({
            containerShow: false,
            searchPanelShow: true,
            searchResult: {},
            cancelShow:true,
            cancelPanelShow:true

        })
    },
    //点击叉叉事件
    onCancelImgTap: function (event) {
        console.log("onCancelImgTap-----");
        this.setData({
            inputValue: "",  
            cancelShow:false, 
            containerShow: false,
            searchPanelShow: false, 
            cancelPanelShow:true  
        })
    },
    //点击取消按钮事件
    onCancel: function (event) {
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            cancelShow:false,
            inputValue: "",
            cancelPanelShow:false  

        })
    },
    //点击回车事件
    onBindconfirm: function (event) {
        var text = event.detail.value;
        var doubanBase = app.globalData.doubanBase;
        var searchUrl = doubanBase + "/v2/movie/search?q=" + text;
        this.getMovieListData(searchUrl, "searchResult", "")
    }

})