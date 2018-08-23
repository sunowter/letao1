
//区域滚动功能初始化
mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条
  deceleration: 0.0001 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//封装获取地址栏参数的方法
function getSearch(key) {
  var str = location.search//得到地址栏里的查询字符串(汉字会被编译成一次编码)
  str = decodeURI(str)//把地址栏中的汉字编码解译为汉字
  str = str.slice(1)//截取字符串，把第一个问号去掉name=tt&age-18
  var arr = str.split('&')//把字符串转化为数组[name=tt,age-18]
  var obj = {}
  //  遍历数组
  arr.forEach(function (v, i) {
    var key = v.split('=')[0]//把数组的每一项再拆分成数组，存入到对象里,第一项是键
    var value = v.split('=')[1]
    obj[key] = value
  })

  return obj[key]
}