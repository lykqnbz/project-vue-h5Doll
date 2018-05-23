import axios from 'axios'
import Qs from 'qs'
import {getAllUrlParams, isWeiXin, isMini} from '@/utils/main';

var host = 'http://88888888888';
import store from '@/store/index';
import {getToken, setToken} from "../utils/main";

var options = {}

var weiboAppKey = "88888888888";
//跨域请求需要使用withCredentials=true来带上跨域的cookie
//跨域时的preflight请求options是没办法带上MODE=true，服务端就没办法返回Access-Control-Allow-Origin：http://localhost:9530用于测试
if (process.env.NODE_ENV == 'development') {
  host = "";
} else {
  options.withCredentials = true;
  if (isMini()){
    host = "https://88888888888";
  }

}

const handleStatus = (res) => {
  return res;
}
const handleResponse = (res) => {
  if (res.status == 200) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res)
  }
}
export default {
  delete(url, params) {
    url = host + url;
    let queryString = []

    Object.keys(params).forEach(key => params[key] && queryString.push(`${key}=${params[key]}`))
    if (queryString.length > 0) {
      queryString = queryString.join('&')
      url += `?${queryString}`
    }

    return axios
      .delete(url, options)
      .then(res => {
        return res.data;
      }).catch(error => {
      })

  },
  get(url, params) {
    url = host + url;
    let queryString = []
    Object.keys(params).forEach(key => params[key] && queryString.push(`${key}=${params[key]}`))
    if (queryString.length > 0) {
      queryString = queryString.join('&')
      url += `?${queryString}`
    }
    return axios
      .get(url, options)
      .then(handleStatus)
      .then(handleResponse)
      .catch(error => {
        if (error != null) {
          console.log(error)
        }
      })
  },

  post(url, params) {
    url = host + url;

    let bid = window.localStorage.getItem("bid");
    if (bid) {
      bid = JSON.parse(bid);
      if (bid != null)
        params["bid"] = bid;
    }

    let link = window.localStorage.getItem("link");
    if (link) {
      link = JSON.parse(link);
      if (link != undefined) {
        params['link'] = link;
      }
    }

    return axios
      .post(url, params, options)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.log(error)
      })
  },
  postForm(url, params, handler) {
    url = host + url;
    options.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    return axios
      .post(url, Qs.stringify(params), options)
      .then(handleStatus)
      .then(handler)
      .catch(error => {
        console.log(error)
      })
  }
};


// 添加一个响应拦截器
axios.interceptors.request.use(config => {
  // config.headers
  if (config.url.indexOf('agoraio') < 0 && config.url.indexOf('localhost:4000') < 0) {
    config.headers.TOKEN = getToken();
    config.headers.PLATFORM = "H5";
    let code = getAllUrlParams().code;
    if (code != undefined) {
      addParam(config, "code", code);
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  let data = response.data;


  var ua = navigator.userAgent;

  if (data.code == 10009) {
    // 执行重定向
    console.log("token过期或者token没有, 执行重定向", data);
    let href = window.location.href;
    let originUrl = href.replace(/\?[^/]*/, "?#");
    store.commit('SET_TOKEN', undefined);
    window.localStorage.removeItem("TOKEN");

    if (response.config.url.indexOf('/api/v1/app/index?svc=account&cmd=getsignitur') != -1 || response.config.url.indexOf('/api/v1/app/index?svc=game&cmd=slider') !=-1) {
    } else {
      store.commit('updateLoadingStatus', {
        isLoading: false
      })
    }



    let appId = store.getters.APPID;

    if ((data.data != undefined || data.data != null) && (data.data.appId == undefined || data.data.appId == null)) {
      appId = data.data.appId;
    }
    if (process.env.NODE_ENV == 'development'){

       if (isWeiXin()) {
         window.location = "88888888888" + appId + "&redirect_uri=" + encodeURIComponent(originUrl) + "&scope=snsapi_userinfo&state=STATE"
       }

      // // 区分不同平台去登录
      // var ua = navigator.userAgent;
      //
      // // if (ua.match(/WeiBo/i) == "weibo") {
      //   window.location = "https://api.weibo.com/oauth2/authorize?client_id="+weiboAppKey+"&redirect_uri="+encodeURIComponent('http://dev.game.88888888888888.com/?#/index?abc=1')+"&response_type=code&state=register";
      // //
      // // } else {
      // //
      // //   // 默认都转到微信 ua.match(/MicroMessenger/i) == "micromessenger"
      // // }

    } else {

      // 区分不同平台去登录
      // var ua = navigator.userAgent;
      //
      // if (ua.match(/WeiBo/i) == "weibo") {
      //   window.location = "https://api.weibo.com/oauth2/authorize?client_id="+weiboAppKey+"&redirect_uri="+encodeURIComponent('http://dev.game.88888888888888.com/?#/index')+"&response_type=code&state=register";
      //
      // } else {

        // 默认都转到微信 ua.match(/MicroMessenger/i) == "micromessenger"

      if (isWeiXin()) {
        window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(originUrl) + "&response_type=code&scope=snsapi_userinfo&state=h5#wechat_redirect";
      }

      // }
    }
    return
  } else {

    // 判断是否有维护赠币
    // store.commit('SET_ERROR_GIFT_COIN', 50);
    // store.commit('SET_ERROR_DATE', "2017年12月21日5:00~9:04");
    if ((data.data != undefined || data.data != null) && (data.data.errorGiftCoin != undefined)) {

      store.commit('SET_ERROR_GIFT_COIN', data.data.errorGiftCoin);
      store.commit('SET_ERROR_DATE', data.data.errorDate);

    }
    if (response.config.url.indexOf('/api/v1/app/index?svc=account&cmd=getsignitur') != -1 || response.config.url.indexOf('/api/v1/app/index?svc=game&cmd=slider') !=-1) {
    } else {
      store.commit('updateLoadingStatus', {
        isLoading: false
      })
    }
    return response
  }
}, error => {
  if (response.config.url.indexOf('/api/v1/app/index?svc=account&cmd=getsignitur') != -1) {
  } else {
    store.commit('updateLoadingStatus', {
      isLoading: false
    })
  }
  return Promise.reject(error)
});


function addParam(config, param, paramV) {
  if (config.url.indexOf("?") === -1) {
    config.url = config.url + "?" + param + "=" + paramV;
  } else {
    config.url = config.url + "&" + param + "=" + paramV;
  }
}
