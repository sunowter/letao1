
//进度条功能
// 1、发送第一个ajax请求时启用进度条
//2、最后一个ajax请求成功时进度条完成
$(document).ajaxStart(function(){
 
  NProgress.start();
})
$(document).ajaxStop(function(){
 
    NProgress.done();
})

//点击分类管理
// 显示二级菜单
$('#nav-cate').click(function(e){
  e.preventDefault()
  console.log(555)
  $('.child').stop().slideToggle()
})
//点击顶部菜单，隐藏侧边栏

$('.icon-menu').click(function(e){
  e.preventDefault()
   $('.index-left').toggleClass('hiddenmenu')
   $('.r-top').toggleClass('hiddenmenu')
   $('.container-fluid').toggleClass('hiddenmenu')
})

//点击按钮显示模态框
$('.icon-logout').click(function(e){
  e.preventDefault()
  $('#my-modal').modal('show')
})
//点击退出按钮，实现退出功能
$('#layoutBtn').click(function(){
  // 发送ajax请求
  $.ajax({
     type:'get',
     url:'/employee/employeeLogout',
     dataType:'json',
     success:function(info){
      if(info.success){
        location.href='login.html'
      }
      
     }





  })

})

//登陆拦截功能
// 判断当前页面是不是登陆页，如果不是登陆页，要进行登陆拦截
if(location.href.indexOf('login.html')===-1){
// 地址栏中没有登陆，说明不是登录页
$.ajax({
  type:'get',
  url:'/employee/checkRootLogin',
  dataType:'json',
  success:function(info){
    console.log(info)
   if(info.success){
     //允许访问，什么都不做
   }
   if(info.error===400){
     //未登录。跳转到登陆页面
     location.href='login.html'
   }
  }

})
}
  

