$(function(){
  //已进入页面发送请求,获取用户信心

  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){
      console.log(info)
      // 使用模板引擎渲染数据
        if(info.error===400){
          //用户未登陆，跳转到登陆页
          location.href='login.html'
          return;
        }
        var htmlStr=template('userTpl',info)
        $('.user-info').html(htmlStr)
      
    }
    //如果用户没有登录，直接进入用户页的，拦截到登陆页
  
  
  
  })



  //功能2点击退出按钮，发送ajax请求，进行退出，
  $('.btn-logout button').click(function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      dataType:'json',
      success:function(info){
        // console.log(info)
        if(info.success){
          //退出成功跳转到登陆页
          location.href='login.html'
        }
      }



    })





  })




})