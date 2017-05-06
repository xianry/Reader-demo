// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({
  data: {
    navigateTitle: "",
    movies: {},
    requestUrl: {},
    totalCount: 0,
    isEmpty: true,
  },
  onLoad: function (options) {
    var categroy = options.category;
    this.data.navigateTitle = categroy;
    var dataUrl = "";
    switch (categroy) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }

    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData);
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  //上滑加载更多
  // onScrollLower: function (event) {
  //   var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
  //   util.http(nextUrl, this.processDoubanData);
  //   wx.showNavigationBarLoading();

  // },
//上滑加载更多
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },
  //下拉刷新
  onPullDownRefresh: function(event){
    var refreshUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    this.data.movies= {};
    this.data.isEmpty = true;
    this.data.toatalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) { //for.....in 循环 用于数组元素或对象的属性
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;//对于title的操作处理
      if (title.length >= 6) {
        title = title.substring(0, 6) + "....";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
      // console.log("评分" + movies[0].stars);
    }
    var totalMovies = {};
   
    if (!this.data.isEmpty) {
      //把老的数据和新的数据合并起来一起传入 总共的值中
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
     this.data.totalCount += 20;
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
  },


   onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },

 
})