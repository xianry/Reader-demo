// pages/movies/movie-detail/movie-detail.js
import { Movie } from 'class/Movie.js';
var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    var movieId = options.id;
    console.log(movieId);
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    var movie = new Movie(url);
    // var that = this;
    // movie.getMovieData(function (movie) {
    //   that.setData({
    //     movie: movie
    //   })
    // })
//ES 6  语法
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },

  //点击详情页面背景图
  viewMoviePostImg: function (event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [src],

    })
  }

})