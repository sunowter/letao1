
$(function(){
//  打开页面，发送请求，动态渲染页面
var page=1;
var pageSize=5;
var currentPage=1
render();
function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize,

      },
      dataType:'json',
      success:function(info){
          // console.log(info)
          //使用模板引擎动态渲染页面
          var htmlStr=template('firsttpl',info)
          $('tbody').html(htmlStr)

          //添加分页
          $('#first-paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:info.page,//初始化，当前页显示第一页
            totalPages:Math.ceil(info.total/info.size),
            onPageClicked:function(a,b,c,page){//点击分页执行的函数
              // 渲染指定页
              currentPage=page;
              render()

            }
            
          })

      }

    })
}
 //点击添加按钮，弹出模态框
 $('#add-cate').click(function(){
  //  console.log(999)
   $('#first-modal').modal('show')
  })
  //  添加表单校验功能
$("#firstform").bootstrapValidator({
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    //校验用户名，对应name表单的name属性
    categoryName:{
      validators:{
        //不能为空
        notEmpty:{
          message: '请输入一级分类'
        },

      }
    }
  }
})
//点击添加按钮，向数据库添加数据，模态框消失，重新选渲染页面
// 表单校验成功时会,禁止表单的自动提交，使用ajax发送请求
// 要想让提交按钮能将数据提交到后台，需要把按钮包裹在表单里
$("#firstform").on('success.form.bv',function(e){
  e.preventDefault()
  //发送ajax请求
  $.ajax({
    type:'post',
    url:'/category/addTopCategory',
    data:$("#firstform").serialize(),
    dataType:'json',
    success:function(info){
      console.log(info)
      $('#first-modal').modal('hide')
      //新添加的显示在最前面,第一页,渲染第一页
      currentPage=1
      render()
    
    } 
  })
  $('#firstform').data('bootstrapValidator').resetForm(true);
})








})