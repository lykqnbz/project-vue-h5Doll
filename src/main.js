import Vue from 'vue'
import 'setimmediate';
import VueRouter from 'vue-router'
import store from './store'
import routes from './router'
import App from './App.vue'
import '@/asset/js/jquery.js'
import '@/asset/js/picker.min.js'
import '@/asset/css/style.css'
import '@/asset/layer.css'
import '@/utils/layer.js'
import VueResource from 'vue-resource'
import '@/utils/common.js'

Vue.use(VueResource);
Vue.use(VueRouter);
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
import * as filters from './filters'; // 全局vue filter

import HtmlPanel from '@/components/HtmlPanel/index.vue'

Vue.component('v-html-panel', HtmlPanel)

import {getToken} from "@/utils/main";
// fundebug注册
var fundebug = require("fundebug-javascript");
fundebug.apikey = "6f2083f0982e619a74c190c0d46f336f995437f362ae151e438b739985fe6e43";
function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err,
    {
      metaData: {
        componentName: componentName,
        propsData: propsData,
        info: info
      }
    });
};

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {

  store.commit('updateLoadingStatus', {
    isLoading: true
  });

  // 分享界面 不走 TOKEN 验证的
  if (to.path == '/share/index' || to.path == '/share/index_failure' || to.path == '/share/index_mydoll') {
    next();

  } else {

    // token为空先请求一下登录
    let bid = to.query.bid;
    if (bid) {
      // 判断 bid 是不是重复， 或者多个， 拿取最后一个
      if (Array.isArray(bid)) {
        bid = bid[bid.length - 1];
      }
      window.localStorage.setItem("bid", JSON.stringify(bid));
    }

    let link = to.query.link;
    if (link) {
      window.localStorage.setItem("link", JSON.stringify(link));
    }


    let token = store.getters.TOKEN;
    if (token == undefined || token == null || token == '') {
      store.dispatch('GetToken').then((res) => {
        next({...to});
      })

    } else {
      if (window.localStorage.getItem("Login_" + commonControl.getDateYMD(0)) != "1.1") {
        store.dispatch('GetToken').then((res) => {
          next({...to});
        })
      } else if (to.path == '/') {
        next('/index');
      } else {
        next()
      }
    }
  }
});

router.afterEach(function (to) {

});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
