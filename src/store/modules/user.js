import axios from 'axios'
import request from '@/api/request';
import {setToken, getToken, isMini} from "@/utils/main";

// 线上模式
var username = getToken();
var loginType = 4;
var commanderUrl = "ws://88888888888888";
if (process.env.NODE_ENV == 'development') {
  commanderUrl = "ws://888888888888888"
}
username = window.localStorage.getItem("username");
// if (username == undefined) {
//   username = '游客' + new Date().getTime();
//   window.localStorage.setItem("username", username)
// }

const user = {
  state: {
    isLoading: false,
    TOKEN: '',
    APPID: "888888888888",
    userInfo: {},
    bgMusic: '',
    successMusic: '',
    failMusic: '',
    grabUpMusic: '',
    grabDownMusic: '',
    loadIndex: '',
    loginCoin: 0,
    subscribe: false,
    mpQrCode: '',
    commanderUrl: commanderUrl,
    scrollTop: 0,
    errorGiftCoin: 0,
    errorDate: '',
    showActivityHint: false,
    activityDollImg: '',
    ifShowSpring: ''
  },

  mutations: {
    SET_TOKEN: (state, TOKEN) => {
      state.TOKEN = TOKEN;

    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    SET_SHOW_ACTIVITY_HINT(state, showActivityHint) {
      state.showActivityHint = showActivityHint;
    },
    SET_ACTIVITY_DOLL_IMG(state, activityDollImg) {
      state.activityDollImg = activityDollImg;
    },
    SET_BG_MUSIC(state, bgMusic) {
      state.bgMusic = bgMusic
    },
    SET_SUCCESS_MUSIC(state, m) {
      state.successMusic = m
    },
    SET_FAIL_MUSIC(state, m) {
      state.failMusic = m
    },
    SET_LOGIN_COIN(state, coin) {
      state.loginCoin = coin;
    },
    SET_ERROR_GIFT_COIN(state, coin) {
      state.errorGiftCoin = coin;
    },
    SET_ERROR_DATE(state, desc) {
      state.errorDate = desc;
    },
    SET_QR_CODE(state, mpQrCode) {
      state.mpQrCode = mpQrCode;
    },
    SET_SUBSCRIBE(state, subscribe) {
      state.subscribe = subscribe;
    },
    SET_GRAB_UP_MUSIC(state, m) {
      state.grabUpMusic = m;
    },
    SET_GRAB_DOWN_MUSIC(state, m) {
      state.grabDownMusic = m;
    },
    SET_SCROLL_TOP: (state, scrollTop) => {
      state.scrollTop = scrollTop;
    },
    SET_LOGIN_GIFTSHOW(state, m) {
      state.ifShowSpring = m;
    },
  },

  actions: {

    //获取用户信息
    GetToken({commit, state}) {
      return new Promise((resolve, reject) => {
        let platform = "h5";
        if (isMini()){
          platform = "mini";
          loginType = 5;
        }
        request.post("/api/v1/app/index?svc=account&cmd=login", {type: loginType, data: username, platform: platform}).then((response) => {
          console.log(response);
          commit('SET_TOKEN', response.data.token);
          commit('SET_USER_INFO', response.data);
          commit('SET_LOGIN_GIFTSHOW', response.data.hasGiftDoll)
          setToken(response.data.token);
          window.localStorage.setItem("username", response.data.nickname);
          window.localStorage.setItem("Login_" + commonControl.getDateYMD(0), "1.1");

          if (response.data.origin == 'tourist') {
            response.data.loginCoins = 0;
          }
          if (response.data.loginCoins > 0) {
            commit('SET_LOGIN_COIN', response.data.loginCoins);
            commit('SET_QR_CODE', response.data.mpQrCode);

            if (response.data.loginDesc && response.data.loginDesc.indexOf("首次登录") != -1) {
              window.localStorage.setItem("FIRST_LOGIN_MANUAL", "未提醒");
            }


            commit('SET_SUBSCRIBE', response.data.subscribe);
          }

          resolve(response);

          commit('SET_BG_MUSIC', 'http://88888888888/wwj_music.mp3');
          commit('SET_SUCCESS_MUSIC', 'http://88888888888/wwj_success.mp3');
          commit('SET_FAIL_MUSIC', 'http://88888888888/wwj_fail.mp3');
          commit('SET_GRAB_DOWN_MUSIC', 'http://88888888888/wawaji_up_down.mp3');
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default user;
