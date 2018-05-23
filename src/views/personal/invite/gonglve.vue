<template>
  <div class="gonglve"  :style="'min-height:'+ myinvite_height +'px;'" >
    <header class="header"  :style="'height:'+ header_height +'px;'" >
      <div class="h_left"><router-link to="/invite/code" replace><img src="../../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        我的邀请码
      </div>
      <div class="h_right">
      </div>
    </header>
    <div class="gonglve_con" :style="{height:+ myinvite_width*1.6055 +'px',transform:'translate(0,'+header_height+10+'px)'}">
      <div class="gonglve_con_p" id="gonglve_con_p">
        亲，关注微信公众号【H5娃娃机】<br/>
        进入游戏-我的-输入邀请码：{{inviteCode}}<br/>
        即可获得海量娃娃币<br/>
        在线直播抓娃娃，无需下载，点开即玩<br/>
        超萌娃娃，抓到全国包邮送到家
      </div>
      <!--<div class="gonglve_con_b" v-clipboard:copy="inviteSpeak" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制邀请语</div>-->
      <div class="gonglve_con_b copy"    @click="copyUrl">点击复制邀请语</div>
    </div>
  </div>
</template>
<script>
  import request from '@/api/request';
  import Clipboard from 'clipboard/dist/clipboard'
  export default {
    data() {
      return {
        header_height: screen.height * 0.072,
        invite_height: innerHeight*0.25,
        myinvite_height: innerHeight,
        myinvite_width: innerWidth,
        p5_fontsize:14,
        inviteCode: '',
        inviteUrl:'',
        currentRecord: {},
        inviteHz:[],
        codeAyy:[],
      }
    },
    created() {
      if (screen.width < 350) {
        this.p5_fontsize = 12
      }

        request.post("/api/v1/app/index?svc=account&cmd=info", {}).then(res => {
          if (res && res.code == 0) {
            this.inviteCode = res.data.inviteCode;
          }
          this.$store.commit('updateLoadingStatus', {
            isLoading: false
          })
        });
      window.setTimeout(() => {

        var clipboard = new Clipboard('.copy');
        clipboard.on('success', (e) => {
          e.clearSelection();
          layer.msg('复制成功!');

        });

      }, 10)
    },
    methods:{
      onCopy: function (e) {
        layer.msg('复制成功!');
      },
      onError: function (e) {
        layer.msg('复制失败，请重新复制!');
      },
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
