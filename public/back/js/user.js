$.ajax({
  type:'get',
  url:'/user/queryUser',
  dataType:'json',
  success:function(info){
   console.log(info)
  }
})