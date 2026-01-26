import request from '@/utils/request'


// 登录
export function login (data) {
  return request({url: '/api/index/login', method: 'post', data})
}

// 首页
export function homeData (data) {
  return request({url: '/api/index/index', method: 'get', data})
}
// 消息列表
export function messageList (data) {
  return request({url: '/api/index/messageList', method: 'get', data})
}
//查看产品册文件(做去除上新标用)
export function readPamphletFile (data) {
  console.log(data,'data');
  return request({url: '/api/index/readPamphletFile', method: 'get',  params: data})
}

// 是否有上新(菜单栏判断)
export function haveNew (data) {
  return request({url: '/api/index/haveNew', method: 'get', data})
}
// 品牌介绍
export function brandInfo (data) {
  return request({url: '/api/index/brandInfo', method: 'post', data})
}

// logo
export function logoImage (data) {
  return request({url: '/api/index/logoImage', method: 'get', data})
}

// 加入我们
export function joinUs (data) {
  return request({url: '/api/index/joinUs', method: 'post', data})
}

// 产品咨询
export function consult (data) {
  return request({url: '/api/index/consult', method: 'post', data})
}

// 产品册配置数据
export function pamphletPage (data) {
  return request({url: '/api/index/pamphletPage', method: 'get', data})
}

// 产品册列表
export function pamphletList (data) {
  return request({url: '/api/index/pamphletList', method: 'post', data})
}

// 产品册资料
export function pamphletInfo (data) {
  return request({url: '/api/index/pamphletInfo', method: 'post', data})
}

// 品牌产品册列表
export function pamphletFile (data) {
  return request({url: '/api/index/pamphletFile', method: 'get', params: data})
}

// 品牌产品册资料
export function brandPamphletInfo (data) {
  return request({url: '/api/index/brandPamphletInfo', method: 'post', data})
}

// 收藏/取消收藏产品册
export function collectPamphlet (data) {
  return request({url: '/api/index/collectPamphlet', method: 'post', data})
}

// 文章列表
export function articleList (data) {
  return request({url: '/api/index/articleList', method: 'post', data})
}

// 文章关键字
export function articleKeyword (data) {
  return request({url: '/api/index/articleKeyword', method: 'post', data})
}

// 文章详情
export function articleInfo (data) {
  return request({url: '/api/index/articleInfo', method: 'post', data})
}

// 文章收藏
export function collectArticle (data) {
  return request({url: '/api/index/collectArticle', method: 'post', data})
}

// 商品列表
export function goodsList (data) {
  return request({url: '/api/index/goodsList', method: 'post', data})
}

// 商品详情
export function goodsInfo (data) {
  return request({url: '/api/index/goodsInfo', method: 'post', data})
}

// 商品配置数据
export function shopPage (data) {
  return request({url: '/api/index/shopPage', method: 'post', data})
}

// 加入购物车
export function addCart (data) {
  return request({url: '/api/index/addCart', method: 'post', data})
}

// 购物车列表
export function cartList (data) {
  return request({url: '/api/index/cartList', method: 'post', data})
}

// 删除购物车商品
export function delCart (data) {
  return request({url: '/api/index/delCart', method: 'post', data})
}

// 编辑购物车商品数量
export function editCart (data) {
  return request({url: '/api/index/editCart', method: 'post', data})
}

// 确认订单信息
export function submitPage (data) {
  return request({url: '/api/index/submitPage', method: 'post', data})
}

// 提交订单
export function submitOrder (data) {
  return request({url: '/api/index/submitOrder', method: 'post', data})
}

// 订单列表
export function orderList (data) {
  return request({url: '/api/index/orderList', method: 'post', data})
}

// 订单详情
export function orderInfo (data) {
  return request({url: '/api/index/orderInfo', method: 'post', data})
}

// 【账户安全】页面所需数据
export function userInfo (data) {
  return request({url: '/api/index/userInfo', method: 'post', data})
}

// 产品册收藏列表
export function pamphletCollect (data) {
  return request({url: '/api/index/pamphletCollect', method: 'post', data})
}

// 文章收藏列表
export function articleCollect (data) {
  return request({url: '/api/index/articleCollect', method: 'post', data})
}

// 帮助中心列表
export function helpCenter (data) {
  return request({url: '/api/index/helpCenter', method: 'post', data})
}

// 帮助详情
export function helpInfo (data) {
  return request({url: '/api/index/helpInfo', method: 'post', data})
}

// 关于我们
export function aboutUs (data) {
  return request({url: '/api/index/aboutUs', method: 'post', data})
}

// 修改个人信息
export function editUser (data) {
  return request({url: '/api/index/editUser', method: 'post', data})
}

// 删除订单
export function delOrder (data) {
  return request({url: '/api/index/delOrder', method: 'post', data})
}

// 添加/编辑地址
export function manageAddress (data) {
  return request({url: '/api/index/manageAddress', method: 'post', data})
}

// 下载订单
export function downloadOrder (data) {
  return request({url: '/api/index/downloadOrder', method: 'post', data})
}

// 修改密码
export function resetpwd (data) {
  return request({url: '/api/index/resetpwd', method: 'post', data})
}

// 加入我们
export function joinPage (data) {
  return request({url: '/api/index/joinPage', method: 'post', data})
}
