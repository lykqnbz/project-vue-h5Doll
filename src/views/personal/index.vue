<template>
  <div class="personal">
    <div id="head" :style="{height:head_hight+'px',backgroundSize:'100% '+head_hight+'px'}">
      <header class="header" :style="{height:header_hight+'px'}">
        <div class="h_centen">
          我的
        </div>
      </header>
      <section class="user" :style="{height:user_hight+'px'}">
        <img class="user_img" :src="$store.getters.userInfo.headimgurl ? $store.getters.userInfo.headimgurl : require('../../asset/img/userimage.png')">
        <p class="user_name">{{userInfo.nickname}}</p>
        <p class="user_id">ID:{{userInfo.inviteCode}}</p>
      </section>
    </div>
    <div class="centen">
      <ul class="centen_wawa">
        <li @click="gotoRecharge()">
          <img src="../../asset/img/money.png">
          <p>娃娃币</p>
          <span>{{userInfo.coins}}个</span>
        </li>
        <router-link tag="li" to="/mydoll/index">
          <img src="../../asset/img/doll.png">
          <p>我的娃娃</p>
          <span>{{userInfo.dollsNum}}个</span>
        </router-link>
        <router-link tag="li" to="/message/index">
          <img src="../../asset/img/message.png">
          <p>消息</p>
          <span>{{userInfo.messageNum}}条未读</span>
        </router-link>
      </ul>
      <ul class="centen_code" v-if="$store.getters.userInfo.origin != 'tourist'">
        <router-link tag="li" to="/invite/code">
          <div>
            <img src="../../asset/img/invitation.png">我的邀请码
          </div>
          <div>
            <img src="../../asset/img/comein.png">
          </div>
        </router-link>
        <router-link tag="li" to="/invite/input">
          <div>
            <img src="../../asset/img/inviteCode.png">输入邀请码
          </div>
          <div>
            <img src="../../asset/img/comein.png">
          </div>
        </router-link>
      </ul>
      <ul class="centen_code">
        <!--<router-link tag="li" to="/config/index">-->
        <!--<div>-->
        <!--<img src="../../asset/img/setUp.png">系统设置-->
        <!--</div>-->
        <!--<div>-->
        <!--<img src="../../asset/img/comein.png">-->
        <!--</div>-->
        <!--</router-link>-->
        <router-link tag="li" to="/recharge/index" v-if="$store.getters.userInfo.origin != 'tourist'">
          <div>
            <img src="../../asset/img/recharge@3x.png">我要充值
          </div>
          <div>
            <img src="../../asset/img/comein.png">
          </div>
        </router-link>

        <router-link tag="li" to="/logistics/index" v-if="$store.getters.userInfo.origin != 'tourist'">
          <div>
            <img src="../../asset/img/other/parcel@3x.png">查看物流
          </div>
          <div>
            <img src="../../asset/img/comein.png">
          </div>
        </router-link>

        <!--<router-link tag="li" to="/index">-->
        <!--<div>-->
        <!--<img src="../../asset/img/free@3x.png">免费练习-->
        <!--</div>-->
        <!--<div style="color: #AfAfAf;font-size: 0.9rem;">-->
        <!--{{userInfo.currentTrainNum}}次-->
        <!--</div>-->
        <!--</router-link>-->
        <router-link tag="li" to="/feedback/index" v-if="$store.getters.userInfo.origin != 'tourist'">
          <div>
            <img src="../../asset/img/feedback.png">用户反馈
          </div>
          <div>
            <img src="../../asset/img/comein.png">
          </div>
        </router-link>
        <!--<router-link tag="li" to="/service/index">-->
        <!--<div>-->
        <!--<img src="../../asset/img/customerService.png">联系客服-->
        <!--</div>-->
        <!--<div>-->
        <!--<img src="../../asset/img/comein.png">-->
        <!--</div>-->
        <!--</router-link>-->

        <router-link tag="li" to="/about/index" v-if="$store.getters.userInfo.origin != 'tourist'">
          <div>
            <img src="../../asset/img/about.png">关于我们
          </div>
          <div>
            <img src="../../asset/img/comein.png">
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
  import request from '@/api/request';
  import {isMini} from "../../utils/main";
  var wx = require('weixin-js-sdk');

  export default {
    data() {
      return {
        header_hight: screen.height * 0.06,
        head_hight: innerHeight * 0.28,
        user_hight: innerHeight * 0.21,
        centen_hight: innerHeight * 0.72,
        wrap_height: innerHeight,
        userInfo: {},

      }
    },
    created() {
      this.fetchData();
      request.post('/api/v1/app/index?svc=account&cmd=info', {}).then(res => {
        if (res && res.code == 0) {
          this.coins = res.data.coins;
          this.userInfo = res.data;
        }
      });
      $("body").css('background', "#f5f5f5");
    },

    methods: {
      fetchData() {
        request.post("/api/v1/app/index?svc=account&cmd=info", {}).then(res => {
          if (res && res.code == 0) {
            this.userInfo = res.data;
          }
        });
      },

      gotoRecharge() {
        if (this.$store.getters.userInfo.origin == 'tourist') {
          if (isMini()) {
            console.log(wx);
            wx.miniProgram.navigateTo({url: '../jump/jump'});
            return;
          } else {
            this.$router.push({path: '/tourist/index', query: {}});
            return;
          }
        } else {
          this.$router.push({path: '/recharge/index'});
        }
      }

    },
    beforeDestroy() {
      $("body").css('background', "none");
    },


  }
  ;
</script>
