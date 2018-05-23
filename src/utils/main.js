export function getAllUrlParams(url) {
  if (url == undefined) {
    url = window.location.href
  }
  // 从url(可选)或window对象获取查询字符串

  var quertArr = url.split('?');
  var queryString = null;
  if (quertArr.length > 2) {
    queryString = url.split('?')[1] + "&"+ url.split('?')[2];
  } else if (quertArr.length ==2) {
    queryString = url.split('?')[1];
  }
  // 我们把参数保存在这里
  var obj = {};
  // 如果查询字符串存在
  if (queryString) {
    // 把查询字符串分割成各部分
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
      // 分离出key和value
      var a = arr[i].split('=');
      // 考虑到这样的参数：list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      });

      // 设置参数值（如果为空则设置为true）
      var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];

      // 如果参数名已经存在
      if (obj[paramName]) {
        // 将值转成数组（如果还是字符串）
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // 如果没有指定数组索引
        if (typeof paramNum === 'undefined') {
          // 将值放到数组的末尾
          obj[paramName].push(paramValue);
        }
        // 如果指定了数组索引
        else {
          // 将值放在索引位置
          obj[paramName][paramNum] = paramValue;
        }
      }
      // 如果参数名不存在则设置它
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}

export function setToken(token) {
  window.localStorage.setItem("TOKEN", token);
}

export function getToken() {
  return window.localStorage.getItem("TOKEN");
}

export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return !isMini();
  } else {
    return false;
  }
}

export function isMini() {
  if (window.__wxjs_environment == 'miniprogram'){
    return true;
  }
  return false;
}
