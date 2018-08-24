
$(function(){
  var currentPage=1;
  var pageSize=3
  var picArr=[];
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
      // console.log(info);
      var htmlStr=template('productTpl',info)
      $('tbody').html(htmlStr)
      
        //分页插件
        $('#product-paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
            // 配置按钮大小
            size: "normal",
          // itemTexts控制每个操作按钮的显示文字
          itemTexts:function(type, page, current){
            // type:page,first，last，next，prev
            // console.log(arguments)
            switch(type){
              case 'page':
              return page
              case "first":
              return '首页';
              case 'last':
              return '尾页';
              case 'prev':
              return '上一页';
              case 'next':
              return '下一页'
              

            }


          },
          
          // // 配置按钮文本
          // // 每个按钮在初始化的时候, 都会调用一次这个函数, 通过返回值进行设置文本
          // // 参数1: type  取值: page  first  last  prev  next
          // // 参数2: page  指当前这个按钮所指向的页码
          // // 参数3: current 当前页
          // / 配置 title 提示信息
          // // 每个按钮在初始化的时候, 都会调用一次这个函数, 通过返回值设置title文本
          tooltipTitles:function(type, page, current){
          
               switch (type){
                case 'page':
                return '前往第'+page+'页';
                case 'first':
                return '前往首页';
                case 'next':
                return '前往下一页';
                case 'prev':
                return '前往上一页';
                case 'last':
                return '前往尾页';


               }

          },
          // 使用 bootstrap 的提示框组件
             useBootstrapTooltip: true,
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
      //发送ajax请求，动态渲染二级分类列表
      $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
          page:1,
          pageSize:100,
        },
        dataType:'json',
        success:function(info){
          // console.log(info)
          // 使用模板引擎渲染
          var htmlStr=template('productTpl1',info)
          $('#productul').html(htmlStr)

        }
      })




    
  })
  //点击选择二级分类按钮，点击a将a的值赋值给按钮
  // 并在按钮下面添加一个隐藏域，将a的值赋值给隐藏域用于保单提交
  $('#productul').on('click','a',function(){
      var txt=$(this).text()
      // console.log(txt)
      $('#seachcate').text(txt)
      var id=$(this).data('id')
      // console.log(id)
      $("[name='brandId']").val(id)
      //id获取成功后，修改该隐藏域的状态标识
      $("#productform").data('bootstrapValidator').updateStatus('brandId','VALID')



  })

  // 文件上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过 data.result.picAddr 可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result);
      var url=data.result.picAddr
      // console.log(url)
      // $('#imagefile').attr('src',url)
      // 每次图片上传成功都会执行一次，因为是三张图片，可以把图片信息存储在数组里
      // 上传一张图片，动态创建一个image,添加在装图片盒子的最前面
      $('.imageBox').prepend('<img src='+url+">")
      //  上传一张存储一下，往数组的最前面追加
      picArr.unshift(data.result)
      
      console.log(picArr)
      //如果上传超过三张，在上传，就把最先上传的删除，也就是数组的最后一个
      if(picArr.length>3){
        // 移除数组的最后一项
        picArr.pop()
        // 移除租后一张图片
        $('.imageBox img:last-of-type').remove()
      }
      //如果上传的数量等于三张，修改上传文件的标识
      if(picArr.length===3){
      $('#productform').data('bootstrapValidator').updateStatus('picStatu','VALID')



      }


    }
});
    

  //表单校验
  $('#productform').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },


    fields: {
      brandId:{
        validators:{
          notEmpty: {
            message: '请选择二级分类'
          }
        },
      },
      proName:{
        validators:{
          notEmpty: {
            message: '请输入商品名称'
          }
        },
      },
    
      proDesc:{
        validators:{
          notEmpty: {
            message: '请输入商品描述'
          }
        },
      },
      num:{
        validators:{
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'商品库存必须是非零开头的数字'

          }
        },
      },
      size:{
        validators:{
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'尺码必须是 xx-xx 的格式, 例如: 32-40'

          }
        },
      },
        
      oldPrice:{
        validators:{
          notEmpty: {
            message: '请输入商品原价'
          }
        },
      },
        
      price:{
        validators:{
          notEmpty: {
            message: '请输入商品现价'
          }
        },
      },
      picStatu:{
        validators:{
          notEmpty: {
            message: '请上传3张图片'
          }
        },
      },
    
  
    }
  })
  
   
  // 表单校验成功，阻止默认的提交，发送ajax提交

  //发送ajax提交数据到后台，关闭模态框，重新渲染页面
  $('#productform').on('success.form.bv',function(e){
    e.preventDefault()
    var data=$('#productform').serialize()
    data+='&picName1='+picArr[0].picName+'&picAddr1='+picArr[0].picAddr
    data+='&picName2='+picArr[1].picName+'&picAddr2='+picArr[1].picAddr
    data+='&picName3='+picArr[2].picName+'&picAddr3='+picArr[2].picAddr
    console.log(data)
    $('#product-modal').modal('hide')
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      dataType:'json',
      success:function(info){
        // console.log(info)
        currentPage=1
        render()
        //重置表单
        $("#productform").data('bootstrapValidator').resetForm(true)
        //手动重置按钮和image
        $('#seachcate').text('请选择二级分类')
        $('.imageBox img').remove()
      }
    })
  })





  








})