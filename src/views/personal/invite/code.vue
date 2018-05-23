<template>
  <div class="myinvite"  :style="'height:'+ myinvite_height +'px;'" >
    <header class="header"  :style="'height:'+ header_height +'px;'" >
      <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        我的邀请码
      </div>
      <div class="h_right">
      </div>
    </header>
    <!--<div style="display: flex;flex-direction: column;justify-content: space-around"  :style="{transform:'translate(0,'+header_height*1.5+'px)'}" >-->
      <!--<div class="niv_cen" >-->
        <!--<img style="position: absolute;top: -8%;left: 50%;transform: translate(-50%,-50%);width: 4.6rem;height: 3rem;" src="../../../asset/img/topCartoon.png">-->
        <!--<div class="nivc_c">每邀请一个新用户<br/>-->
          <!--输入小主的专属邀请码<br/>-->
          <!--你和他都获得20娃娃币<br/>-->
          <!--最高可获得1000娃娃币-->
        <!--</div>-->
        <!--<div class="nivc_s">-->
          <!--<span v-for="item in codeAyy" :key="item" >-->
            <!--{{item}}-->
          <!--</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="niv_bot" :style="'height:'+ myinvite_height*0.333 +'px;'" >-->
        <!--<p>温馨提示</p>-->
        <!--<span>点下方邀请攻略，海量娃娃币等你来拿</span>-->
        <!--<img src="../../../asset/img/arrow@3x.png">-->
        <!--<router-link tag="label" to="/invite/gonglve">邀请攻略</router-link>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="niv_again_bot">-->
        <!--<img src="../../../asset/img/TXEBJ.png">-->
        <!--<div class="niv_again_bot_p" id="gonglve_con_p">-->
          <!--亲，赶紧下载微信并关注微信公众号【{{mpName}}】<br/>-->
          <!--进入游戏-我的-输入邀请码：{{inviteCode}}<br/>-->
          <!--即可获得大量娃娃币<br/>-->
          <!--在线直播抓娃娃，无需下载，点开即玩<br/>-->
          <!--超萌娃娃，抓到全国包邮送到家-->
        <!--</div>-->
      <!--<div class="niv_again_bot_b copy"  @click="copyUrl"></div>-->
    <!--</div>-->


    <div class="nw_myinvite_top">
      <div :style="{height:myinvite_width*0.65+'px',width:myinvite_width*0.613+'px'}">
        <img :src="mpQrCode">
        <p>{{inviteCode}}</p>
      </div>
      <img src="../../../asset/img/invite/introduce@3x.png">
    </div>

    <div class="nw_myinvite_bot">
      <img src="../../../asset/img/bottomCartoon.png">
    </div>
  </div>
</template>
<script>
  import request from '@/api/request';
  import wx from 'weixin-js-sdk'
  export default {
    data() {
      return {
        header_height: screen.height * 0.06,
        invite_height: innerHeight*0.25,
        myinvite_height: innerHeight,
        myinvite_width: innerWidth,
        p5_fontsize:14,
        inviteCode: '',
        inviteUrl:'',
        inviteHz:[],
        codeAyy:[],
        mpName:'',
        mpQrCode:''
      }
    },
    created() {
      if (screen.width < 350) {
        this.p5_fontsize = 12
      }
//      if (this.$route.query.code != undefined) {
//        this.inviteCode = this.$route.query.code;
//        for (var i=0; i<= this.inviteCode.length; i++) {
//          this.codeAyy[i] = this.inviteCode.charAt(i);
//        }
//        console.info(this.codeAyy)
//      } else {
        request.post("/api/v1/app/index?svc=account&cmd=info", {}).then(res => {
          if (res && res.code == 0) {
            this.inviteCode = res.data.inviteCode;
            this.inviteUrl = res.data.inviteUrl;
            this.mpName=res.data.mpName;
            this.mpQrCode=res.data.mpQrCode;

            for (var i=0; i< this.inviteCode.length; i++) {
              this.codeAyy.push(this.inviteCode.charAt(i));
            }
            var myUrl = location.href.split('#')[0];
            request.post('/api/wx/signature', {url: myUrl}).then(res => {
              var ticketMap = res.data.ticketMap;
              wx.config({
                // debug: true,
                appId: ticketMap.appId,
                timestamp: ticketMap.timestamp,
                nonceStr: ticketMap.noncestr,
                signature: ticketMap.signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'showMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });

              wx.ready(() => {
                wx.hideOptionMenu();
                wx.showMenuItems({
                  menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:copyUrl', "menuItem:favorite"]
                });
                //分享到朋友圈
                var path = '/index?bid=' + ticketMap.bid;
                var link = window.location.protocol + "//" + window.location.host + "/?#" + path;
                wx.onMenuShareTimeline({
                  // title: "我在H5娃娃机机抓到" + this.data.dollName + ",快来陪我一起玩吧~",
                  title: "真机在线抓娃娃，点开即玩，全国包邮，快输入我的邀请码【"+this.inviteCode+"】，一起拿免费赠币。" ,
                  link: link,
                  imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
                  success: () => {
                    request.post('/api/v1/share/success/stat', {statType: '邀请分享'}).then(res=>{

                    })
                  },
                  cancel: function () {
                  }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                  title: "H5娃娃机",
                  desc:  "真机在线抓娃娃，点开即玩，全国包邮，快输入我的邀请码【"+this.inviteCode+"】，一起拿免费赠币。" ,
                  link: link,
                  imgUrl: encodeURI("88888888888888/512_201712011145_08929.png"),
                  success: () => {
                    request.post('/api/v1/share/success/stat', {statType: '邀请分享'}).then(res=>{

                    })
                  },
                  cancel: function () {
                  }
                });
              });
            })

          }
        });
//      }



    },

    methods:{
      copyUrl(){
        window.getSelection().removeAllRanges();
        var range = document.createRange();
        range.selectNode(document.getElementById('gonglve_con_p'));  //selectable为下面页面中DIV中的id
        window.getSelection().addRange(range);
        document.execCommand("Copy");
        layer.msg('复制成功!');
      }
    }
  }
  ;
</script>
