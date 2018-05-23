<template>
  <div>
    <span v-show="false">{{title}}</span>
    <div class="loading_icon" v-show="isLoading">
      <div class="loading bar">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p class="loading_title">加载中</p>
    </div>

    <div style='margin:0 auto;width:0px;height:0px;overflow:hidden;'>
      <img src="888888888888888888888888888" width='280'>
    </div>

    <!--维护停电通知-->
    <div class="prompt_overlay" v-show="!isLoading &&showStopE" @click.self="closeInform">
      <div class="urgentInform " :style="{height:wrap_width*1.21+'px'}">
        <img class="InformSure" src="./asset/img/OK@2x.png" @click="closeInform">
      </div>
    </div>


    <!--春节领奖-->
    <div class="prompt_overlay" v-show="!isLoading && loginCoin>0&&ifShowSpring">
      <div class="springDayIndex" :style="{height:wrap_width*1.152+'px'}">
        <img src="./asset/img/newYear/TC@2x.png" :style="{height:wrap_width*1.152+'px'}">
        <img src="./asset/img/newYear/anniu@2x.png" @click="getPresentInSpring">
      </div>
    </div>

    <div class="black_overlay_8" v-show="!isLoading && loginCoin>0 && errorGiftCoin==0">
      <!--<div class="black_overlay_8">-->
      <!--已关注登录-->
      <div class="login_hint  " :style="{width:login_width+'px',marginLeft:-login_width/2+'px'}"
           v-show="subscribe &&loginRemain">
        <div class="login_title" :style="'height:'+login_title_height+'px'">
          <img src="./asset/img/reward.png">
          <p>登录奖励</p>
        </div>
        <div class="login_centen" :style="'height:'+login_height+'px'">
          <p>获得娃娃币+{{loginCoin}}</p>
          <span>每日首次登陆赠送最多<font style="color: #0AB054;">88</font>币<br/>记得每天来哦~</span>
          <div @click="closeFirst"
               :style="'height:'+login_cd_height+'px;lineHeight:'+login_cd_height+'px;'">确定
          </div>
        </div>
      </div>

      <!--未关注登录  -->
      <div class="login_hint  " :style="{width:login_width*1.1+'px',marginLeft:-(login_width*1.1)/2+'px'}"
           v-show="!subscribe &&loginRemain">
        <div class="login_title" :style="'height:'+login_title_height+'px'">
          <img src="./asset/img/noreward.png">
          <p>登录奖励</p>
          <img src="./asset/img/login_exit.png"
               style="width: 16px;height: 16px;position: absolute;right: 4%;top: 3%;margin-top: 0px;"
               @click="closeFirst">
        </div>
        <div class="login_centen1">
          <p>关注公众号领取娃娃币</p>
          <span>每日登录获得娃娃币，最高获得<font style="color: #0AB054;">88</font>枚</span>
          <img src="./asset/img/login_ewm.jpg" :src="mpQrCode">
          <b>今日可领{{loginCoin}}娃娃币</b>
          <label>长按识别二维码领币</label>
        </div>
      </div>


      <!--练习场次数提示-->
      <!--<div class="practiceArenaHint " v-if="practiceArenaHint" :style="{height:wrap_width*1.153+'px'}">-->
      <!--<img src="./asset/img/practiceArenaNum.png">-->
      <!--<img @click="closeLogin" src="./asset/img/practiceArenaBut.png">-->
      <!--</div>-->

      <!--邀请提示框 -->
      <!--<div class="practiceInviteHint " v-if="practiceInviteHint" :style="{height:wrap_width*0.5457+'px'}">-->
      <!--<img @click="toInvite" src="./asset/img/AN.png">-->
      <!--<img @click="closeLogin3" src="./asset/img/GB.png">-->
      <!--</div>-->

      <div class="prompt_overlay1" v-if="practiceArenaHint">
        <div class="prompt" :style="'height:'+ wrap_height*0.5 +'px;width:'+wrap_width*0.85+'px;'">
          <img class="prompt_img" src="./asset/img/yd/ydtc.png" @click="closeLogin">
          <img class="prompt_exit" src="./asset/img/yd/GB.png" @click="closeLogin3">

        </div>
      </div>
    </div>
    <div class="prompt_overlay" v-if="$store.getters.showActivityHint">
      <div class="yd_hint" :style="{height:wrap_width*1.2+'px',marginTop:(-wrap_width*0.6)+'px'}">
        <p>恭喜！获得一个元旦礼包</p>
        <div class="yd_box">
          <img :src="$store.getters.activityDollImg">
        </div>
        <div class="yd_but" @click="getPresent">
          <img src="./asset/img/yd/but@2x.png">
        </div>
      </div>
    </div>
    <router-view v-show="!isLoading"></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import routes from '@/router/index';
  import request from '@/api/request';
  var wx = require('weixin-js-sdk');
  import {isMini} from "./utils/main";

  export default {
    name: 'app',
    data() {
      return {
        shareStatus: true,
        login_title_height: innerHeight * 0.16,
        login_cd_height: innerHeight * 0.06,
        login_height: innerHeight * 0.253,
        login_width: innerHeight * 0.413,
        wrap_height: innerHeight,
        wrap_width: innerWidth,
        practiceArenaHint: false,
        practiceInviteHint: false,
        practiceArenaRule: false,
        loginRemain: false,
        urgentInform: true,
        currentDate: commonControl.getDateYMD(0),
        showStopE:false
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.user.isLoading,
        loginCoin: state => state.user.loginCoin,
        subscribe: state => state.user.subscribe,
        errorGiftCoin: state => state.user.errorGiftCoin,
        mpQrCode: state => state.user.mpQrCode,
        ifShowSpring: state => state.user.ifShowSpring,
      }),
      title: function () {

        if (this.loginCoin > 0) {
          this.loginRemain = true;
        }


        var title = "H5娃娃机";
        var currentPath = this.$route.path;
        var share = false;
        var innerShare = false;
        first : for (var route of routes) {

          if (route.children) {
            for (var child of route.children) {
              if (currentPath == route.path + child.path) {
                if (child.share) {
                  share = true;
                }
                if (child.innerShare) {
                  innerShare = true;
                }
                break first;
              }
            }
          }
          if (route.path == currentPath) {
            if (route.share) {
              share = true;
            }
            if (route.innerShare) {
              innerShare = true;
            }

            break first;
          }
        }
        if (share || currentPath == '/index') {
          if (isMini()) return;
          var myUrl = location.href.split('#')[0];
          request.post('/api/wx/signature', {url: myUrl}).then(res => {
            var ticketMap = res.data.ticketMap;

            wx.config({
              // debug: true,
              appId: ticketMap.appId,
              timestamp: ticketMap.timestamp,
              nonceStr: ticketMap.noncestr,
              signature: ticketMap.signature,
              jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'showMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(() => {
              //              wx.hideOptionMenu();
              //              wx.showMenuItems({
              //                menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', "menuItem:share:qq", "menuItem:share:weiboApp",'menuItem:share:QZone', 'menuItem:copyUrl', "menuItem:favorite"]
              //              });
              //分享到朋友圈

              var path = this.$route.fullPath + (this.$route.fullPath.indexOf('?') === -1 ? "?bid=" + ticketMap.bid : this.$route.fullPath.indexOf('bid=') === -1 ? "&bid=" + ticketMap.bid : '');
              var link = window.location.protocol + "//" + window.location.host + "/?#" + path;
              wx.onMenuShareTimeline({
                title: "随时随地，真机直播操控，免费送币抓娃娃，全国包邮送到家！！",
                link: link,
                imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
                success: function () {
                },
                cancel: function () {
                }
              });
              //分享给朋友
              wx.onMenuShareAppMessage({
                title: document.title,
                desc: "随时随地，真机直播操控，免费送币抓娃娃，全国包邮送到家！！",
                link: link,
                imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
                success: function () {
                },
                cancel: function () {
                }
              });
              //分享到QQ
              wx.onMenuShareQQ({
                'title': document.title,
                'desc': "随时随地，真机直播操控，免费送币抓娃娃，全国包邮送到家！！",
                'link': link,
                'imgUrl': "88888888888888/512_201712011145_08929.png",
                trigger: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
              });
              //分享到腾讯微博
              wx.onMenuShareWeibo({
                'title': document.title,
                'desc': "随时随地，真机直播操控，免费送币抓娃娃，全国包邮送到家！！",
                'link': link,
                'imgUrl': "88888888888888/512_201712011145_08929.png",
                trigger: function (res) {
                  //alert('用户点击发送给朋友');
                },
                success: function (res) {
                  //alert('已分享');
                },
                cancel: function (res) {
                  //alert('已取消');
                },
                fail: function (res) {
                  //alert(JSON.stringify(res));
                }
              });

              wx.onMenuShareQZone({
                'title': document.title,
                'desc': "随时随地，真机直播操控，免费送币抓娃娃，全国包邮送到家！！",
                'link': link,
                'imgUrl': "88888888888888/512_201712011145_08929.png",
              });
            });
          })
        } else if (!share && !innerShare) {
          //          wx.ready(() => {
          wx.hideOptionMenu();
          wx.showMenuItems({
            menuList: ['menuItem:copyUrl', "menuItem:favorite"]
          });
          //          });
        }
        return title;
      }
    },
    created() {
      if (commonControl.getDateYMD(0) >= '2018-04-28' && commonControl.getDateYMD(0) <= '2018-04-28') {
        if(window.localStorage.getItem("showStopE" + this.currentDate)!=1.1){
              this.showStopE=true;
        }
      }
    },
    methods: {
      closeLogin() {
        this.$store.commit('SET_LOGIN_COIN', 0);
        this.practiceArenaHint = false;
        this.$router.push({path: '/yuandan/index', query: {}});

      },
      closeLogin3() {
        this.$store.commit('SET_LOGIN_COIN', 0);
        this.practiceArenaHint = false;
        this.practiceInviteHint = false;
      },
      closeFirst() {
        this.loginRemain = false;
        if (this.currentDate >= '2017-12-30' && this.currentDate <= '2018-01-01') {
          this.practiceArenaHint = true;
          window.localStorage.setItem("openActivty" + this.currentDate, "1.1")
        } else {
          //          this.$store.commit('SET_LOGIN_COIN', 0);
          this.practiceInviteHint = true;
        }
        this.$store.commit('SET_LOGIN_COIN', 0);

        this.$store.commit('SET_LOGIN_COIN', 0);
        //大神圈跳动效果，每日一次

      },
      closeInform() {
//        this.$store.commit('SET_ERROR_GIFT_COIN', 0)
        window.localStorage.setItem("showStopE" + this.currentDate, "1.1")
        this.showStopE = false;
      },
      getPresent() {
        this.$store.commit('SET_SHOW_ACTIVITY_HINT', false);
        this.$router.push({path: '/mydoll/index', query: {}});
      },
      getPresentInSpring() {
        this.$store.commit('SET_LOGIN_COIN', 0);
        this.$router.push({path: '/mydoll/index', query: {}});
      },
      toInvite() {
        this.$store.commit('SET_LOGIN_COIN', 0);
        this.practiceInviteHint = false;
        this.$router.push({path: '/invite/code', query: {}});
      },
    }
  }

</script>


