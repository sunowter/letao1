      //获取地址浏览传递的参数
      // //获取传递过来的参数，赋值给input框
      var key=getSearch("key")
      $('.search-input').val(key)
      var currentPage=1;
      var pageSize=2;
    

      mui.init({
      pullRefresh : {
        container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        //下拉刷新
        down : {
          auto:true,//配置已进入页面就执行一次
          callback :function(){
            // 下拉刷新只渲染第一页
            currentPage=1
            render(function(info){
            var htmlStr=template('productTpl',info)
            $('.product').html(htmlStr)
            //下拉刷新，在ajax发送成功完成后，关闭下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            //当下拉刷新执行完毕，页面被重新加载一次，开始上拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
            })
          }
        },
        //上拉加载
        up : {
          callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            //上拉加载，在当前页的后面追加下一页的数据
            currentPage++
            render(function(info){
              var htmlStr=template('productTpl',info)
              $('.product').append(htmlStr)
              //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
              //  ajax请求完成后，关闭上拉刷新
                // endPullupToRefresh(boolean) 结束上拉加载
                // 1. 如果传 true, 没有更多数据, 会显示提示语句, 会自动禁用上拉加载, 防止发送无效的ajax
                // 2. 如果传 false, 还有更多数据
                //进行判断
                console.log(info)
                if(info.data.length===0){
                  //如果没有更多数据了，禁用加载
                  mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                }else{
                  mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                }
              


            })
          }
        }
      }
    });




    // 因为下拉刷新和下拉加载，ajax发送成功后执行的代码不一样，所以把要执行的代码作为参数传递
    //根据关键字发送ajax请求，获取商品，进行页面渲染
    function render(callback){
      // 三个必传参数
      var parmas={}//把参数存储在对象里
      parmas.proName=$('.search-input').val();
      parmas.page=currentPage;
      parmas.pageSize=pageSize;
      // 连个选传参数
      // 根据高亮选择按照那个排序
      var $current=$('.nav .current')
      if($current.length>0){
        //说明有要排序的
        // 获取需要传递给后台的键
        var sortName=$current.data('type')
        // 获取需要传递给后台的值
          // 根据箭头方向判断升序还是降序,
        var sortValue=$current.find('span').hasClass("fa-angle-down")? 2:1;
        parmas[sortName]=sortValue
      }
      //设置定时器，模拟页面加载
        setTimeout(function(){
          $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:parmas,
            dataType:"json",
            success:function(info){
              callback && callback(info)
              
            }
        
          })

        },500)
    }


//点击搜索按钮，获取搜索框的值，添加到本地
$('.search-btn').click(function(){
  var key=$('.search-input').val().trim();
  if(key===''){
    mui.toast('请输入关键字',{ duration:'long' }) 
    return
  }
  //执行一次下拉刷新即可，相当于render一次页面

  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  //读取本地仓库，把值添加到数组里
  // 再把数组写入到本地
  var str=localStorage.getItem('search_list') ||[]
  // console.log(str)
  var arr =JSON.parse(str)
  // console.log(arr)
  var index=arr.indexOf(key)
  // console.log(index)
  //判断是否重重复
  if(index!=-1){
    arr.splice(index,1)
  }
  if(arr.length>=10){
    arr.pop()
  }
  arr.unshift(key)
//把数组转化为字符串存储到本地
 localStorage.setItem('search_list',JSON.stringify(arr))

 })
 

//排序功能
// 1、判断是否有current类，如果有，切换箭头的方向
// 2、如果没有，添加current类，并移除兄弟元素的current类
// mui中使用下拉刷新的页面，禁用了a标签的click事件
$('a[data-type]').on('tap',function(e){
  e.preventDefault()
  if($(this).hasClass('current')){
    $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
  }else{
    $(this).addClass('current').parents().siblings().find('a').removeClass('current')
  }
  //调用一下下拉加载
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();



})