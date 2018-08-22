/**
 * Created by Jepson on 2018/8/22.
 */

$(function() {
  // 注意: 要进行本地存储localStorage的操作, 进行历史记录管理,
  //       需要约定一个键名,  search_list
  //       将来通过 search_list 进行读取或者设置操作

  // 准备假数据: 将下面三行代码, 在控制台执行, 可以添加假数据
  // var arr = [ "耐克", "阿迪", "阿迪王", "耐克王", "新百伦" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem( "search_list", jsonStr );



  // 功能1: 列表渲染功能
  // (1) 从本地存储中读取历史记录, 读取的是 jsonStr
  // (2) 转换成数组
  // (3) 通过模板引擎动态渲染
  render();

  // 从本地存储中读取历史记录, 以数组的形式返回
  function getHistory() {
    // 如果没有读取到数据, 默认初始化成一个空数组
    var history = localStorage.getItem("search_list") || '[]';  // jsonStr
    var arr = JSON.parse( history );
    return arr;
  }
  // 读取数组, 进行页面渲染
  function render() {
    var arr = getHistory();
    // template( 模板id, 数据对象 )
    var htmlStr = template( "historyTpl", { arr: arr } );
    $('.lt_history').html( htmlStr );
  }



  // 功能2: 清空历史记录功能
  // (1) 注册事件, 通过事件委托注册
  // (2) 清空历史记录, removeItem
  // (3) 页面重新渲染
  $('.lt_history').on("click", ".btn_empty", function() {
    // 清空记录
    localStorage.removeItem( "search_list" );
    // 重新渲染
    render();
  });



  // 功能3: 删除单条历史记录
  // (1) 注册事件, 通过事件委托
  // (2) 将下标存在删除按钮上, 获取存储的下标
  // (3) 从本地存储中读取数组
  // (4) 通过 下标 从 数组中, 删除对应项   splice
  // (5) 将修改后的数组, 转成jsonStr, 存到本地存储中
  // (6) 页面重新渲染

  $('.lt_history').on("click", ".btn_del", function() {
    // 获取下标
    var index = $(this).data("index");
    // 获取数组
    var arr = getHistory();
    // 根据下标, 删除数组的对应项
    // splice( 从哪开始, 删除几项, 添加的项1, 添加的项2, ...... );
    arr.splice( index, 1 );

    // 转成 jsonStr, 存到本地存储中
    localStorage.setItem("search_list", JSON.stringify( arr ) );

    // 页面重新渲染
    render();
  })

});
