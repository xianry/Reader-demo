function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//对评价星星的处理
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(2);
    }
  }
  return array;
}

function http(url, callBack) {
  var that = this;
  wx.request({
    url: url,
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      "Content-Type": "Json"//这里不能使用Application/Json 和 空， 其他的随便写一个
    }, // 设置请求的 header
    success: function (res) {
      callBack(res.data);
    },
    fail: function (res) {
      console.log(error);
    },
    complete: function (res) {
    }
  })
}

function coverToCastString(casts){
  var castsjoin = "";
  for(var ind in casts){
    castsjoin = castsjoin + casts[ind].name+"/"
  }
  return castsjoin.substring(0,castsjoin.length-2);
}

function convertToCastInfos(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img :casts[idx].avatars? casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http: http,
  coverToCastString:coverToCastString,
  convertToCastInfos:convertToCastInfos
}



