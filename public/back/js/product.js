
$(function(){
  var currentPage=1;
  var pageSize=3
   render();
  function render(){
   //发送ajax请求，获取数据，使用模板引擎渲染页面
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
      console.log(info);
      var htmlStr=template('productTpl',info)
      $('tbody').html(htmlStr)
      
        //分页插件
        $('#product-paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
          currentPage=page;
          render()

          }

         
      
      
      
      
      
      
      
      
        })
      
      }

    })
  }

  //点击添加商品按钮，显示模态框
  $("#add-product").click(function(){
      $('#product-modal').modal('show')




    
  })









})