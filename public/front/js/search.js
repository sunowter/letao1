//功能1.列表渲染
      // 从本地获取数据，动态渲染生成历史记录
      // 先存一些假数据
      // var arr = [ "耐克", "阿迪", "阿迪王", "耐克王", "新百伦" ];
      // var jsonStr = JSON.stringify( arr );
      // localStorage.setItem( "search_list", jsonStr )

      render()
  function getHis(){
    var his=localStorage.getItem('search_list')//得到的是json字符串
    //arr为空时，返回的结果是null，此时赋值给空数组
    var arr =JSON.parse(his)||[]//把接送字符串转换为数组
    // console.log(arr)
    return arr  //得到的数组
  }
  //根据读取的本地数据，渲染页面
  function render(){
    var arr= getHis() 
    var htmlStr=template('historyTpl',{arr:arr})
    $('.history').html(htmlStr)

  }

//功能2：清空历史记录
  //  注册事件委托
  $('.history').on('click','.clearAll',function(){
    //点击清空所有，清除本地存储的历史数据
    // 弹出确认框
    mui.confirm("你确认要清空历史吗",'温馨提示',['取消','确认'],function(e){
    // console.log(e),e.index=1,确认index=0，取消
  
    if(e.index==1){
      localStorage.removeItem('search_list')
      render()
   


    }
    })
    
  })


//功能3删除单条历史记录
$('.history').on('click','.del-btn',function(){
  // 注册事件委托，单击×，删除对应的项
  // 获取对应的下标，读取本地数据，从数中删除，在重新写入到本地，重新渲染
  var index=$(this).data('index')
  // console.log(index)
  var arr=getHis();

  // console.log(arr)
  arr.splice(index,1)
  // console.log(arr)
  localStorage.setItem('search_list',JSON.stringify(arr))
  render()

})



//功能4、点击搜索按钮添加历史记录
// 获取input框的值，追到到本地数据的数组的最前面
// 1、判断有没有重复，重复的话删除重复项
// 2、判断的数组的长度，数组的长度超过10的话，删除最后一项
  $('.search-btn').click(function(){
    var key=$('.search-input').val().trim()
    // console.log(key)
    //非空校验
    if(key===""){
      alert('请输入关键字')
      return
    }
    var arr =getHis()//获取本地数组
    var index=arr.indexOf(key)//获取关键字在本地数组中的索引
    // arr.unshift(key)
    // console.log(arr)
    if(index!=-1){
      //该关键词存在
      arr.splice(index,1)//将已存在的删除
      console.log(arr)
    }
     arr.unshift(key)
     console.log(arr)
     if(arr.length>=10){
       arr.pop()//长度大于10，删除最后一个
     }
      localStorage.setItem('search_list',JSON.stringify(arr))
      render()
      // 重置表单
      $('.search-input').val("")
      //跳转到商品列表页
      location.href='productList.html'
  })





