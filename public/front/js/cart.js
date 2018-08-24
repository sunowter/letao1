

//已进入页面放ajax请求，渲染购物车
// $.ajax({
//   type:'get',
//   url:'/cart/queryCart',
//   dataType:'json',
//   success:function(info){
//     // console.log(info)
//     // console.log({info:info})
//     if(info.error===400){
//       //用户未登陆，跳转到登陆页面
//       location.href='login.html'
//       return
//     }
//     var htmlStr=template('cartTpl',{info:info})
//     $('.cart-list').html(htmlStr)
//     // 添加下拉刷新
    
//   }
// })
//      一进入页面开启下拉刷新，发送ajax请求，渲染页面
        mui.init({
          pullRefresh : {
            container:".main",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
              auto: true,//可选,默认false.首次加载自动上拉刷新一次
              callback :function(e){
                console.log(e)
                setTimeout(function(){
                  $.ajax({
                    type:'get',
                    url:'/cart/queryCart',
                    dataType:'json',
                    success:function(info){
                      // console.log(info)
                      // console.log({info:info})
                      if(info.error===400){
                        //用户未登陆，跳转到登陆页面
                        location.href='login.html'
                        return
                      }
                      var htmlStr=template('cartTpl',{info:info})
                      $('.cart-list').html(htmlStr)
                      // 添加下拉刷新
                      //关闭下拉刷新
                      
                      mui('.main').pullRefresh().endPulldownToRefresh();
  
                    }
                  })
      

                },500)
              } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
          }
        });


        //删除功能
        // 点击删除按钮，发送ajax请求，删除数据后重新调用下拉刷新，刷新页面
        // 给删除的a标签注册tap事件
        $('.main ').on('tap','.mui-icon-trash',function(){
          // console.log(1)
          var id=$(this).data('id')
          console.log(id)
          $.ajax({
            type:'get',
            url:'/cart/deleteCart',
            data:{
              id:[id]
            },
            dataType:'json',
            success:function(info){
              console.log(info)
              if(info.success){
                //删除成功
                //开启下拉加载
                mui('.main').pullRefresh().pulldownLoading();
              }
            }

          })
        })  


        //编辑功能
        // 给编辑按钮注册点击事件
        $('.main ').on('tap','.mui-icon-compose',function(){
          // console.log('编辑')
          //弹出编辑框
          var obj=this.dataset;
          
          console.log(obj)
          var id=obj.id;
          var htmlStr=template('editTpl',obj)   
          //去除空格
          htmlStr=htmlStr.replace(/\n/g,'')

          mui.confirm(htmlStr,'编辑商品',['确认','取消'],function(e){

            if(e.index===0){
              //点击确认发送ajax请求
              var size=$('span.current').text()
              var num=$('.mui-numbox-input').val()
              $.ajax({
                type:'post',
                url:'/cart/updateCart',
                data:{
                  id:id,
                  size:size,
                  num:num,
                },
                success:function(info){
                  // console.log(info)
                  // 编辑成功后
                  console.log(mui('.main').pullRefresh())
                  //重新启用一次下拉刷新，
                  mui('.main').pullRefresh().pulldownLoading();
                }
              })

            }
          })
                // 进行数字框初始化
          mui(".mui-numbox").numbox();
              })


//给尺码注册点击tap事件
$('body').on('tap','.size span',function(){
  $(this).addClass('current').siblings().removeClass('current')
})
