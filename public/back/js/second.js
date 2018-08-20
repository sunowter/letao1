
$(function(){
  //进入页面发送ajax请求渲染页面，点击分页按钮时，也要调用，所以封装成方法
  var currentPage=1
  var pageSize=5
  render()
  
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
      // console.log(info)
      //使用模板引擎动态渲染页面
      var htmlStr=template('secondtpl',info)
      $('tbody').html(htmlStr)
      //分页插件使用
      $('#second-paginator').bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:info.page,
        totalPages:Math.ceil(info.total/info.size),
        onPageClicked:function(a,b,c,page){
          currentPage=page
          render()
        }
      })
  
  
      }
    })
  }
  
  //点击添加分类按钮显示模态框
  $('#add-cates').click(function(){
    $("#second-modal").modal('show')
      $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
          page:1,
          pageSize:100,
        },
        dataType:'json',
        success:function(info){
        //  console.log(info)
        var htmlStr=template('secondtpl1',info)
        $('#secondlul').html(htmlStr)
        // 给ul注册点击事件
       
    
        }
      })
    //发送ajax请求，获取以及分类，动态渲染下拉按钮里的li
   
    // console.log(555)
  })
  $('#secondlul').on('click','a',function(e){
  
    e.preventDefault()
       var text= $(this).text()
       $('#seachcate').text(text)
      //  console.log(text)
      //点击a时，将a的id赋值给隐藏域
      var id =$(this).data('id')
      $("[name='categoryId']").val(id)
      // 表单校验成功，改变状态
  $('#secondform').data('bootstrapValidator').updateStatus('categoryId','VALID')
      
      })
  
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var imageurl=data.result.picAddr
      // console.log(imageurl)
      $("#imagefile").attr('src',imageurl)
      $("[name='brandLogo']").val(imageurl)//存储图片的地址
      //图片存储成功后更改状态
      $('#secondform').data('bootstrapValidator').updateStatus('brandLogo','VALID')
  
    }
  });
  
  
  // //使用隐藏域提交表单信息
  // 1、存储一级分类的id
  // 2、存储图片的地址
  
  
  //添加表单校验
  $('#secondform').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
  
       fields: {
          categoryId:{
            validators:{
              notEmpty: {
                message: '请选择一级分类'
              }
            },
          },
          brandName:{
            validators:{
              notEmpty: {
                message: '请输入二级分类'
              }
            },
          },
          brandLogo:{
            validators:{
              notEmpty: {
                message: '请上传图片'
            
              }
            },
          }
      
        }
  }) 
  
  
  
  //检验成功后注册成功点击事件，阻止默认提交，发送ajax请求
  // 模态框隐藏
  // 页面渲染
  $('#addSubmit').click(function(e){
    e.preventDefault();
     $.ajax({
       type:'post',
       url:'/category/addSecondCategory',
       data:$('#secondform').serialize(),
       dataType:'json',
       success:function(info){
        if(info.success){
          $('#second-modal').modal('hide');
             currentPage=1;
             render()
  
        }
       }
     })
  
  })
  
  
  
  
  // 重置表单
  // 重置按钮文本
  // 重置图片途径为默认
  
  
  
  //
  
  
  })
