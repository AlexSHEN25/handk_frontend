/*
 * @Autor: 
 * @Date: 2020-01-17 11:11:42
 * @LastEditors: 
 * @LastEditTime: 2021-04-21 12:23:29
 */
// 分转元单位
export function setPriceYuan (price) {
  let newPrice
  if (typeof price === 'number') {
    newPrice = (price / 100).toFixed(2)
  } else {
    price = 0
    newPrice = (price / 100).toFixed(2)
  }
  return newPrice
}
// 将元转成分
export function setMoneyToPoints (price) {
  const reg = /^\d+$|^\d+[.]?\d+$/
  if (reg.test(price)) {
    // toFixed() 解决18.9和19.9 乘100 失真问题
    return (price * 100).toFixed()
    // return parseFloat(price).toFixed(2) * 100
  } else {
    return price
  }
}

// 将分转成元
export function setMoneyToYuan (price) {
  const reg = /^\d+$|^\d+[.]?\d+$/
  if (reg.test(price)) {
    return (price / 100).toFixed(2)
    // return (parseFloat(price) / 100).toFixed(2)
  } else {
    return price
  }
}
// 平方米转平方千米
export function squareKilometers (meters) {
  let kilometers = (meters / 1000000).toFixed(2)
  return kilometers
}

/**
 * 全局java date 数据类型转换时间日期
 * @param {*} filterDate 需要过滤的时间格式
 * @param {*} isTimeStamp 时间戳
 * @param {*} fmt 时间处理返回格式
 */
export function filterTimeStamp (filterDate, isTimeStamp = false, fmt = "yyyy-MM-dd hh:mm:ss") {
  const date = isTimeStamp ? new Date(filterDate * 1000) : new Date(filterDate); //根据时间戳生成的时间对象
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
    T: "T" //datetime-local的分隔符
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}