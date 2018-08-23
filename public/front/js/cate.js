$(function(){
  //f渲染一级分类
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      // console.log(info)
      var htmlStr=template('leftTpl',info)
      $('.left ul').html(htmlStr)
    }
  })
  


  //点击一级分类，渲染对应的二级分类
  // 注册事件委托
  $('.left').on('click','a',function(){
    var index =$(this).data('index')
    // 当前高亮，其他移除高亮
    $(this).addClass('current').parent().siblings().find('a').removeClass('current')
    render()
    // console.log(id)
    function render(){
      $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
          id:index
        },
        success:function(info){
          
          console.log(info)
          var htmlStr=template('rightTpl',info)
          $('.right ul').html(htmlStr)
        }
    
    
    
      })

    }
  
   })





  })