// 一进入页面，发送ajax请求渲染页面
var id=getSearch('productID')
$.ajax({
  type:'get',
  url:'/product/queryProductDetail',
  data:{
    id:id,
  },
  dataType:'json',
  success:function(info){
    console.log(info)
    //使用模板引擎渲染商品详情页
    var htmlStr=template('productinfoTpl',info)
    $('.mui-scroll').html(htmlStr)
    //轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    mui('.mui-numbox').numbox()
  }

})
//加入购物车功能
// 1、点击尺码，注册点击事件，添加背景高亮
// 2、点击购物车，绑定事件
// 准备ajax的参数，发送ajax
$('.main').on('click','.size span',function(){
  $(this).addClass('current').siblings().removeClass('current')
})
 $('.mui-btn-danger').click(function(){
   var num=mui('.mui-numbox').numbox().getValue()
  //  console.log(num)
   var size=$('span.current').text()
   if(!size){
    mui.toast('请选择尺码',{ duration:'long'}) 
    return;
   }
  //  console.log(size)
  $.ajax({
    type:'post',
    url:'/cart/addCart',
    data:{
       id:id,
       num:num,
       size:size,
    },
    dataType:'json',
    success:function(info){
      //  console.log(info)
      if(info.error===400){
        //用户未登陆，跳转到登陆页
        
        location.href='login.html?reUrl='+location.href
        //把当前地址拼接在地址栏，方面登陆成功后跳回
      }
      if(info.success){
        //用户已登录，弹出确认框确认是否加入购物车
        mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
          //  console.log(e.index)
          if(e.index===0){
            //去购物车
            location.href='cart.html'
          }
        })
      }
    }
  })
 })