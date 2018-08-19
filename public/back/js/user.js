(function(){


      var currentPage=1;//页面初始化即渲染
      var pageSize=5;//每页显示的条数
      var id;//更改状态时使用,
      var isDelete;
      render()
    //  1、封装渲染页面的函数
    function render(){
      $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
          page:currentPage,
          pageSize:pageSize,
        },
        dataType:'json',
        success:function(info){
        // console.log(info)
        //使用模板引擎动态渲染页面
        var htmlStr=template('tpl',info)
        $('tbody').html(htmlStr)
            
          //2\分页插件的使用
          // 1、引包
          // 2、准备机构
          // 3、初始化
        $('#userpagination').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(a,b,c,page){
            //点击分页按钮执行的函数
            currentPage=page;
            render()
          }
        
        
        })
        
        }
      })
    }
    
    //2\分页插件的使用
    // 1、引包
    // 2、准备机构
    // 3、初始化
// $("#pagintor").bootstrapPaginator({
//   bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
//   currentPage:1,//当前页
//   totalPages:10,//总页数
//   size:"small",//设置控件的大小，mini, small, normal,large
//   onPageClicked:function(event, originalEvent, type,page){
//     //为按钮绑定点击事件 page:当前点击的按钮值
//   }
// });
    // 点击按钮，切换状态
    // 按钮为禁用，说明当前状态为启用，isDelete的值为1，，点击后状态为进入，值变为0
    //动态生成的元素使用事件委托
    $('tbody').on('click','.btn',function(){
      id=$(this).parent().data('id')//获取父元素身上存储的id
      isDelete=$(this).hasClass('btn-danger')? 0:1
      // console.log(isDelete)
          // console.log(id)
        //点击按钮显示模态框
      $('#user-modal').modal('show')
        //  点击确定按钮，发送ajax请求,修改数据库状态值，重新渲染页面
     
      $('#confirm').click(
        function(){
      
           $.ajax({
             type:'post',
             url:'/user/updateUser',
             data:{
               id:id,//需要更改的id，可以利用模板引擎了里row里的id值，存储到父元素上
               isDelete:isDelete//传给数据库的值，即要修该为的状态值
             },
             dataType:'json',
             success:function(info){
              //  console.log(info)
              // 1、隐藏模块框
              // 2、重新渲染页面
              $('#user-modal').modal('hide')
              render()
             }
           })
   
         
         }
      )
    })


})()

