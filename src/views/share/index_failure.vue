<template>
  <div class="share_f" :style="{height:share_height+'px'}">

    <!--<div class="prompt_overlay" v-show="sureShow" @click="sureShow=false">-->
      <!--<img src="../../asset/img/tit.png">-->
    <!--</div>-->

    <div class="share_failure" :style="{height:share_height+'px'}">
      <img class="img_t1_f" src="../../asset/img/share_failure_hint.png">
      <div class="f_cen" :style="{height:share_width*0.6061+'px'}">
        <img class="f_cen_icon"  :src="headimgurl" :style="{width:share_width*0.25368+'px',height:share_width*0.25368+'px'}" >
        <img class="f_cen_ewm" :src="mpQrCode" :style="{width:share_width*0.35696+'px',height:share_width*0.35696+'px'}" >
        <!--<img class="f_cen_ewm" :src="'http://qr.liantu.com/api.php?&bg=ffffff&logo=88888888888888/512_201712011145_08929.png&fg=000000&text='+skipUrl" ref="cen_ewm">-->
        <p class="f_cen_name">{{nickname}}</p>
      </div>
      <img class="f_img_b2" src="../../asset/img/share_failure_p.png">
    </div>

  </div>
</template>

<script>
  import request from '@/api/request';
  import wx from 'weixin-js-sdk'

  export default {
    data() {
      return {
        share_height: innerHeight,
        share_width: innerWidth,
        sureShow: false,
        gameRecordId: '',
        data: {},
        fromRoute: {},
        nickname:'',
        headimgurl:'',
//        skipUrl:window.location.protocol + "//" + window.location.host + "/?#/index",
        mpQrCode:''

      }
    },

    beforeRouteEnter(to, from, next) {
      next(vm => vm.fromRoute = from);
    },

    created() {

      this.userId = this.$route.query.userId;

      if (this.userId==this.$store.getters.userInfo.userId) {
        this.sureShow =true;
      }

      request.post('/api/v1/share/game/failure', {accountId: this.userId}).then(res => {
        console.info(res)
        if (res && res.code == 0) {
          this.nickname =res.data.nickname;
          this.headimgurl =res.data.headimgurl;
          this.mpQrCode = res.data.mpQrCode;
        } else {

        }
        setTimeout(() => {
          if (innerHeight / innerWidth > 1.5) {
            $(".img_t1").css("width", '70%')
            $(".img_t1").css("marginLeft", '15%')
          }
          else if (innerHeight / innerWidth < 1.5) {
            $(".img_t1").css("width", '60%')
            $(".img_t1").css("marginLeft", '20%')
          }
          if (innerHeight < 700 && innerHeight > 640) {
            $(".img_t1").css("top", '6%')
          }
          else if (innerHeight > 700) {
            $(".img_t1").css("top", '10%')
          }
        }, 250);


        var myUrl = location.href.split('#')[0];
        request.post('/api/wx/signature', {url: myUrl}).then(res => {
          var ticketMap = res.data.ticketMap;

          this.skipUrl= this.skipUrl+"?bid="+ticketMap.bid;
          wx.config({
            // debug: true,
            appId: ticketMap.appId,
            timestamp: ticketMap.timestamp,
            nonceStr: ticketMap.noncestr,
            signature: ticketMap.signature,
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo','onMenuShareQZone','showMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

          wx.ready(() => {
//            wx.hideOptionMenu();
//            wx.showMenuItems({
//              menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:copyUrl', "menuItem:share:qq", "menuItem:share:weiboApp",'menuItem:share:QZone', "menuItem:favorite"]
//            });
            //分享到朋友圈
            var path = this.$route.fullPath + ( this.$route.fullPath.indexOf('?') === -1 ?  "?bid=" + ticketMap.bid :  this.$route.fullPath.indexOf('bid=') === -1 ?"&bid=" + ticketMap.bid:'');
            var link = window.location.protocol + "//" + window.location.host + "/?#" + path;
            wx.onMenuShareTimeline({
              // title: "我在H5娃娃机机抓到" + this.data.dollName + ",快来陪我一起玩吧~",
              title: "你的好友叫你帮忙抓娃娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              link: link,
              imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
              success: () => {
                request.post('/api/v1/share/success/stat', {statType: '失败分享'}).then(res=>{

                })
              },
              cancel: function () {
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: "H5娃娃机",
              desc: "你的好友叫你帮忙抓娃娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              link: link,
              imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
              success: () => {
                request.post('/api/v1/share/success/stat', {statType: '失败分享'}).then(res=>{

                })
              },
              cancel: function () {
              }
            });

            wx.onMenuShareQQ({
              title: "H5娃娃机",
              desc: "你的好友叫你帮忙抓娃娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              'link': link,
              'imgUrl': "88888888888888/512_201712011145_08929.png"
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
              title: "H5娃娃机",
              desc: "你的好友叫你帮忙抓娃娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              'link': link,
              'imgUrl': "88888888888888/512_201712011145_08929.png"
            });
            wx.onMenuShareQZone({
              title: "H5娃娃机",
              desc: "你的好友叫你帮忙抓娃娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              'link': link,
              'imgUrl': "88888888888888/512_201712011145_08929.png",
            });
          });
        })


      })
    },
    methods: {},
    mounted() {

    },
    updated() {
    },
  }
  ;
</script>
