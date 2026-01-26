export function getScrollTop() {
  let scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

//获取当前可视范围的高度
export function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
  }
  return clientHeight;
}

//获取文档完整的高度
export function getScrollHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

// 获取是否到屏幕底部
export function getScrollTippingPoint() {
  return getScrollTop() + getClientHeight() == getScrollHeight() - 0;
}

export function formatTime(timestamp) {
  const n = new Date(timestamp * 1000);
  const y = n.getFullYear();
  const m = n.getMonth() + 1;
  const d = n.getDate();
  const h = n.getHours();
  const mi = n.getMinutes();
  const s = n.getSeconds();
  
  return [y, m, d].join('-') + ' ' + [h, mi, s].join(':');
}

export function downloadFile(url, name = 'unknown') {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
