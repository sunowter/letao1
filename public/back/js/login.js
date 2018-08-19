$(function(){
  $('#form').bootstrapValidator({

    feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          callback:{
            message:'用户名不存在'
          }
         
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须在6-12之间"
          },
          callback:{
            message:'密码错误'
          }
        }
  
      }
  
    }
})

//  表单提交校验功能
  $('#form').on('success.form.bv',function(e){
   
    e.preventDefault();//校验成功有默认提交功能，进行阻止

    // 为什么不是发送登陆按钮发送请求？？？
    $.ajax({ //发送请求到后台校验用户信息是否准确
      // 查看接口文档
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
       if(info.success){//用户名密码正确，跳转到首页
        location.href='index.html'
       }
       if(info.error===1000){
        $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
       }''
       if(info.error===1001){
        $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
       }
      },
      error:function(){
        console.log('请求发送失败')
      }

        
      
    })
  })
  //点击重置按钮重置表单重置功能
  // 因为重置按钮本身有重置文本的功能，所以只需重置状态
 $("[type='reset']").click(function(){
   console.log(1)
   $('#form').data('bootstrapValidator').resetForm(true);
 })


})