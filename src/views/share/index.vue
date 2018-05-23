<template>
  <div class="share" :style="{height:share_height+'px'}">

    <!--<div class="prompt_overlay " v-show="sureShow" @click="sureShow=false">-->
    <!--<img src="../../asset/img/tit.png">-->
    <!--</div>-->
    <div class="share_success " :style="{height:share_height+'px'}">
      <img class="img_t1" src="../../asset/img/share_top.png">
      <div class="cen" :style="{height:share_width*0.8017+'px'}">
        <img class="cen_icon" :src="data.headimgurl"
             :style="{width:share_width*0.16182+'px',height:share_width*0.16182+'px'}">
        <img class="cen_doll" :src="data.coverImg"
             :style="{width:share_width*0.4278+'px',height:share_width*0.4278+'px'}">
        <img class="cen_ewm" :src="data.qrcode" :style="{width:share_width*0.2046+'px',height:share_width*0.2046+'px'}">
        <p class="cen_name">{{data.nickname}}</p>
        <p class="cen_title">我在<font style="font-size:1.1rem;font-weight:600">H5娃娃机</font>抓到<br/>{{data.dollName}}<br/>快来陪我一起玩吧~
        </p>
      </div>
      <img class="img_b2" src="../../asset/img/share_bw.png" ref="img_b2">
      <img class="img_b1" src="../../asset/img/share_bot.png" :style="{width:share_width+'px'}" ref="img_b1">
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
        fromRoute: {}
      }
    },

    beforeRouteEnter(to, from, next) {
      next(vm => vm.fromRoute = from);
    },

    created() {
      // if (this.fromRoute && this.fromRoute.fullPath && this.fromRoute.fullPath.indexOf('/live/index') == -1) {
      //   this.sureShow = false;
      // }


      this.gameRecordId = this.$route.query.gameRecordId;
      console.info(this.gameRecordId)
      //      5a14e039231077543191afc1

      request.post('/api/v1/share/game/record', {gameRecordId: this.gameRecordId}).then(res => {
        console.info(res)
        if (res && res.code == 0) {
          this.data = res.data;
          if (this.data.self) {
            this.sureShow = true;
          }
        } else {
          this.data = {
            nickname: '测试',
            headimgurl: '88888888888888/default_headimgurl_dog.png',
            coverImg: '88888888888888/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20171124161841_201711271635_31539.png'
            ,
            bid: '5a20d21d2310771d659d0992',
            dollName: '皮卡丘',
            qrcode: '88888888888888/mp_zzww_qrcode.jpg'
          }
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
        }, 5);


        var myUrl = location.href.split('#')[0];
        request.post('/api/wx/signature', {url: myUrl}).then(res => {
          var ticketMap = res.data.ticketMap;

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
            var path = this.$route.fullPath + ( this.$route.fullPath.indexOf('?') === -1 ? "?bid=" + ticketMap.bid : this.$route.fullPath.indexOf('bid=') === -1 ? "&bid=" + ticketMap.bid : '');
            var link = window.location.protocol + "//" + window.location.host + "/?#" + path;
            wx.onMenuShareTimeline({
              // title: "我在H5娃娃机机抓到" + this.data.dollName + ",快来陪我一起玩吧~",
              title: "抓娃娃大神在此，我在H5娃娃机抓到" + this.data.dollName + "，不服来战！",
              link: link,
              imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
              success: () => {
                request.post('/api/v1/app/index?svc=game&cmd=share', {
                  gameRecordId: this.gameRecordId,
                  "shareType": "MOMENTS"
                }).then(res => {
                  console.info(res)
                  if (res.code == 0 && res.data.shareCoins > 0) {
                    layer.msg("分享成功,获得" + res.data.shareCoins + "娃娃币")
                  }
                })

                request.post('/api/v1/share/success/stat', {statType: '成功分享'}).then(res => {

                })

              },
              cancel: function () {
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: "H5娃娃机",
              desc: "抓娃娃大神在此，我在H5娃娃机抓到" + this.data.dollName + "，不服来战！",
              link: link,
              imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
              success: () => {
                request.post('/api/v1/app/index?svc=game&cmd=share', {
                  gameRecordId: this.gameRecordId,
                  "shareType": "FRIEND"
                }).then(res => {
                  console.info(res)
                  if (res.code == 0 && res.data.shareCoins > 0) {
                    layer.msg("分享成功,获得" + res.data.shareCoins + "娃娃币")
                  }
                })
                request.post('/api/v1/share/success/stat', {statType: '成功分享'}).then(res => {

                })

              },
              cancel: function () {
              }
            });
            //分享到QQ
            wx.onMenuShareQQ({
              title: "H5娃娃机",
              desc: "抓娃娃大神在此，我在H5娃娃机抓到" + this.data.dollName + "，不服来战！",
              'link': link,
              'imgUrl': "88888888888888/512_201712011145_08929.png"
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
              title: "H5娃娃机",
              desc: "抓娃娃大神在此，我在H5娃娃机抓到" + this.data.dollName + "，不服来战！",
              'link': link,
              'imgUrl': "88888888888888/512_201712011145_08929.png"
            });
            wx.onMenuShareQZone({
              title: "H5娃娃机",
              desc: "抓娃娃大神在此，我在H5娃娃机抓到" + this.data.dollName + "，不服来战！",
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
