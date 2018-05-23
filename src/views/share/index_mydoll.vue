<template>
  <div class="share_mydoll" :style="{height:share_height+'px'}">
    <!--<div class="prompt_overlay " v-show="sureShow" @click="sureShow=false">-->
      <!--<img src="../../asset/img/tit.png">-->
    <!--</div>-->
    <div class="share_my " :style="{height:share_height+'px'}"   style="display: none;">
      <img class="m_img_t1" src="../../asset/img/share_my_hint.png">
      <div class="m_cen" :style="{height:share_width*0.98082+'px'}">
        <div class="m_cen_t">

            <div><img :src="headimgurl" style="width:4.6rem;height: 4.6rem;border-radius:50%;border: 5px solid #475B6A;"></div>
            <div style="display: flex;flex-direction: column;justify-content:space-around;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
               <span class="m_cent_name">{{nickname}}</span>
               <span>称号：<label style="color:#E94356 ">{{honour}}</label></span>
            </div>
        </div>
        <div class="m_cen_b">看！我在这里抓到了<span style="color:#E94356">&nbsp{{dollNum}}&nbsp</span>只娃娃！</div>

        <div class="m_cen_bin" :style="{height:share_width*0.49041+'px'}">
          <div class="m_cent_ewm"><img :src="mpQrCode"></div>
        </div>
      </div>
      <img class="m_img_b2" src="../../asset/img/share_my_p.png">
    </div>

    <div class='mydoll_sharedoll_container'>
      <img src='../../asset/img/share/1BJ.jpg' :style="{height:share_height+'px;'}" />
      <img src='../../asset/img/share/4biaoti.png' />
      <img src='../../asset/img/share/6wawa.png' />
      <img src='../../asset/img/share/3zhuangshi.png' />
      <img :src="mpQrCode" />
      <img src='../../asset/img/share/wenzi.png'  />
      <img src='../../asset/img/share/2WZK.png' />
      <img src='../../asset/img/share/5mao.png' />
      <img :src="headimgurl" />

      <div class='mydoll_N'>
        <div>玩家
          <label class='myNm'>{{nickname}}</label>在"H5娃娃机"</div>
        <div>大显神威！共捕获
          <label>{{dollNum}}只</label>大娃娃！</div>
        <div>获得荣誉称号：
          <label>{{honour}}</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import request from '@/api/request';
  import  font from "../../asset/font/FZZYJT/FZZYJT.css"
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
        mpQrCode:'',
        dollNum:0,
        honour:"娃娃菜鸟"
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
      request.post('/api/v1/share/game/user/honour', {accountId: this.userId}).then(res => {
        console.info(this.userId)
        if (res && res.code == 0) {
          this.nickname =res.data.nickname;
          this.headimgurl =res.data.headimgurl;
          this.mpQrCode = res.data.mpQrCode;
          this.dollNum = res.data.dollNum;
          this.honour = res.data.honour;
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
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline','onMenuShareQQ', 'onMenuShareWeibo','onMenuShareQZone', 'showMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

          wx.ready(() => {
//            wx.hideOptionMenu();
//            wx.showMenuItems({
//              menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:copyUrl',  "menuItem:share:qq", "menuItem:share:weiboApp",'menuItem:share:QZone',"menuItem:favorite"]
//            });
            //分享到朋友圈
            var path = this.$route.fullPath + ( this.$route.fullPath.indexOf('?') === -1 ?  "?bid=" + ticketMap.bid :  this.$route.fullPath.indexOf('bid=') === -1 ?"&bid=" + ticketMap.bid:'');
            var link = window.location.protocol + "//" + window.location.host + "/?#" + path;
            wx.onMenuShareTimeline({
              // title: "我在H5娃娃机机抓到" + this.data.dollName + ",快来陪我一起玩吧~",
              title: "我在掌上娃娃斩获海量萌娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              link: link,
              imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
              success: () => {
                request.post('/api/v1/share/success/stat', {statType: '娃娃分享'}).then(res=>{

                })
              },
              cancel: function () {
              }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: "H5娃娃机",
              desc: "我在掌上娃娃斩获海量萌娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              link: link,
              imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
              success: () => {
                request.post('/api/v1/share/success/stat', {statType: '娃娃分享'}).then(res=>{

                })
              },
              cancel: function () {
              }
            });
            wx.onMenuShareQQ({
              title: "H5娃娃机",
              desc: "我在掌上娃娃斩获海量萌娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              'link': link,
              'imgUrl': "88888888888888/512_201712011145_08929.png"
            });
            //分享到腾讯微博
            wx.onMenuShareWeibo({
              title: "H5娃娃机",
              desc: "我在掌上娃娃斩获海量萌娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
              'link': link,
              'imgUrl': "88888888888888/512_201712011145_08929.png"
            });
            wx.onMenuShareQZone({
              title: "H5娃娃机",
              desc: "我在掌上娃娃斩获海量萌娃，直播抓娃娃，海量萌公仔，点开即玩，全国包邮！" ,
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
