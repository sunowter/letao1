//点击确认按钮，发送ajax请求，进行登录验证
$('.mui-btn-primary').click(function(){
  var username=$('.username').val().trim()
  var password=$('.password').val().trim()
  // console.log(username)
  // console.log(password)
  //非空校验
  if(username===''){
    mui.toast('请输入用户名') 
    return
  }
  if(password===''){
    mui.toast('请输入密码') 
    return
  }
  $.ajax({
    type:'post',
    url:'/user/login',
    data:{
      username:username,
      password:password
    },
    dataType:'json',
    success:function(info){
      console.log(info)
      if(info.error===403){
        mui.toast('用户名或密码不存在') 
        return;
      }
        //如果登陆成功，
        // 1、直接从登陆页登陆的，跳转到个人中心页
        // 2、从其他页面拦截来定，跳回到原来的页面
        if(location.search.indexOf('reUrl')>-1){
          reUrl=location.search.replace('?reUrl=','')
          console.log( reUrl)
         location.href=reUrl

        }
      else{
        location.href='user.html'
      }
      }

  })
})