<template>
  <div class="recharge">
    <div class="normal" v-show="!showActivity">
      <header class="header" :style="'height:'+ header_height +'px;'">
        <div class="h_left">
          <img src="../../asset/img/yd/return@3x.png" @click="routePath">
        </div>
        <div class="h_centen">
          娃娃币
        </div>
        <router-link tag="div" :to="'/cost/index?roomNum=' + roomNum" class="h_right">
          金币记录
        </router-link>
      </header>
      <ul class="recharge_list" :style="{transform: 'translate(0,'+header_height+'px)'}">
        <li class="money_balance">
          <div style="align-items: center;height: 5.7rem;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;flex-direction: column;-webkit-flex-direction: column;">
            <span><b class="balance">{{coins}}</b></span>
            <p style="font-weight: 100;color:#333">账户余额</p>
          </div>
        </li>


        <p class="recharge_hint" >充娃娃币
          <img  src="../../asset/img/G-1.png">
        </p>
        <li class="money_amount">
          <div v-for="item in rechargeList" :class="{'selected_money': item.rmb==selectedItem.rmb}" @click="changeItem(item)">
            <span>{{item.rmb}}元</span>
            <p>{{item.coins}}币<font  v-show="item.giftCoins>0" style="color:#FF8239">+{{item.giftCoins}}币</font></p>
            <h5></h5>
            <strong v-show="item.giftCoins>0">再送{{(item.giftCoins)/10}}元</strong>
            <img v-show="item.rmb<=100&&item.rmb!=10" src="../../asset/img/yd/hot.png">
            <img v-show="item.rmb>100&&item.rmb!=10" src="../../asset/img/yd/bao.png">
          </div>
        </li>
        <li class="money_sure" @click="recharge">
          确认充值
        </li>
      </ul>
      <div class="recharge_hint_p"  :style="{transform: 'translate(0,'+header_height+'px)'}">
      <p class="recharge_hint_img">充值说明</p>
      1.为了感谢小主对我们的支持，每个充值价位都有一次，充值就多送50%娃娃币的福利。<br/>
      2.感恩小主的充值和鼓励，我们会努力提供更好的体验，更多的娃娃，更多的福利。<br/>
      3.很多小主问为什么不是免费？因为精品娃娃采购，设备维护，全国包邮都需要较高的成本。<br/>
      4.在平台购买收费服务成功后，虚拟产品不提供退费服务，请谅解。<br/>
      5.若充值遇到任何问题，可联系客服微信：zzwawa666。<br/>
      </div>

      <div class="prompt_overlay"  v-if="showFoolRemain" @click.self="showFoolRemain=false">
        <div class="fd_getChangeHifi">
          <span>恭喜您获得{{lotteryNum}}次抽奖机会</span>
          <label>可赢40cm公仔、海量娃娃币</label>
          <router-link  tag="div"  class="rechargeInIndex1" to="/foolsDay/index" >
            <img src="../../asset/img/foolsday/GOcj@2x.png">
          </router-link>
        </div>
      </div>
    </div>


    <div class="springDay" v-show="showActivity">
      <header class="header" :style="'height:'+ header_height +'px;'">
        <div class="h_left">
          <img src="../../asset/img/yd/return@3x.png" @click="routePath">
        </div>
        <div class="h_centen">
          娃娃币
        </div>
        <router-link tag="div" :to="'/cost/index?roomNum=' + roomNum" class="h_right">
          金币记录
        </router-link>
      </header>
      <ul class="recharge_list" :style="{transform: 'translate(0,'+header_height+'px)'}">
        <li class="money_balance">
          <div style="align-items: center;height: 5.7rem;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;flex-direction: column;-webkit-flex-direction: column;">
            <span><b class="balance">{{coins}}</b></span>
            <p style="font-weight: 100;color:#333">账户余额</p>
          </div>
        </li>
        <p class="recharge_hint" >充娃娃币
          <img  src="../../asset/img/G-1.png">
        </p>
        <li class="money_amount">
          <div v-for="item in rechargeList" :class="{'selected_money': item.rmb==selectedItem.rmb}" @click="changeItem(item)">
            <span>{{item.rmb}}元</span>
            <p>{{item.coins}}币<font  v-show="item.giftCoins>0" style="color:#FF8239">+{{item.giftCoins}}币</font></p>
            <h5></h5>
            <label></label>
            <strong v-show="item.giftCoins>0">再送{{(item.giftCoins)/10}}元</strong>
            <img v-show="item.rmb<=100&&item.rmb!=10" src="../../asset/img/yd/hot.png">
            <img v-show="item.rmb>100&&item.rmb!=10" src="../../asset/img/yd/bao.png">
          </div>
        </li>
        <label style="font-size: 12px;color: #999;display: block;width: 100%;text-align: center;margin: 10px 0px;">温馨提示：活动期间，每位用户限领一个游戏水机</label>
        <li class="money_sure" @click="recharge">
          确认充值
        </li>
      </ul>
      <div class="recharge_hint_p"  :style="{transform: 'translate(0,'+header_height+'px)'}">
        <p class="recharge_hint_img">充值说明</p>
        1.为了感谢小主对我们的支持，每个充值价位都有一次，充值就多送50%娃娃币的福利。<br/>
        2.感恩小主的充值和鼓励，我们会努力提供更好的体验，更多的娃娃，更多的福利。<br/>
        3.很多小主问为什么不是免费？因为精品娃娃采购，设备维护，全国包邮都需要较高的成本。<br/>
        4.在平台购买收费服务成功后，虚拟产品不提供退费服务，请谅解。<br/>
        5.若充值遇到任何问题，可联系客服微信：zzwawa666。<br/>
      </div>
    </div>


    <div class="yuandan" v-show="showActivity&&!noShow">
      <header class="header" :style="'height:'+ header_height +'px;'">
        <div class="h_left">
          <img src="../../asset/img/yd/return@3x.png" @click="routePath">
        </div>
        <div class="h_centen">
          娃娃币
        </div>
        <router-link tag="div" :to="'/cost/index?roomNum=' + roomNum" class="h_right">
          金币记录
        </router-link>
      </header>
      <ul class="recharge_list" :style="{transform: 'translate(0,'+header_height+'px)'}">
        <li class="money_balance">
          <div style="align-items: center;height: 5.7rem;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;flex-direction: column;-webkit-flex-direction: column;">
             <span><b class="balance">{{coins}}</b></span>
             <p style="font-weight: 100;color:#333">账户余额</p>
          </div>
          <router-link tag="div" class="yd_gift" to="/yuandan/index"><img src="../../asset/img/yd/gift-01@3x.png"><span style="font-weight: 100;font-size: 0.93rem;color: #333;">元旦豪礼</span></router-link>
        </li>
        <p class="recharge_hint" >充娃娃币
          <img    v-if="ifFirst" src="../../asset/img/yd/G-2.png">
          <img    v-if="!ifFirst" src="../../asset/img/yd/G-1.png">
        </p>
        <li class="money_amount">
          <div v-for="item in rechargeList" :class="{'selected_money': item.rmb==selectedItem.rmb}" @click="changeItem(item)">
            <span>{{item.rmb}}元</span>
            <p>{{item.coins}}币<font  v-show="item.giftCoins>0" style="color:#FF8239">+{{item.giftCoins}}币</font></p>
            <h5></h5>
            <label>赠</label>
            <strong v-show="item.giftCoins>0">再送{{(item.giftCoins)/10}}元</strong>
            <img v-show="item.rmb<=100&&item.rmb!=10" src="../../asset/img/yd/hot.png">
            <img v-show="item.rmb>100&&item.rmb!=10" src="../../asset/img/yd/bao.png">
          </div>
        </li>
        <li class="money_sure" @click="recharge">
          确认充值
        </li>
      </ul>
      <div class="recharge_hint_p"  :style="{transform: 'translate(0,'+header_height+'px)'}">
        若充值遇到任何问题，可联系客服微信：zzwawa666<br/>
      </div>



    </div>
  </div>
<!--1.2-->
</template>
<script>
  import request from '@/api/request';

  export default {
    data() {
      return {
        customRMB: '',
        header_height: screen.height * 0.072,
        recharge_height: innerHeight,
        wrap_width:innerWidth,
        rechargeList: [],
        selectedItem: {},
        coins: 0,
        userInfo: {},
        fromRoute: {},
        dupClick: false,
        ifFirst: false,
        roomNum: undefined,
        ydGiftShow:false,
        showActivity:false,
        noShow:true,
        showFoolRemain:false,
        lotteryNum:1,
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => vm.fromRoute = from);
    },
    created() {

      this.roomNum = this.$route.query.roomNum;
      request.post('/api/v1/app/index?svc=account&cmd=rechargelist', {}).then(res => {
        if (res && res.code == 0) {
          this.coins = res.data.coins;
          this.ifFirst = !res.data.expense;
          if (  commonControl.getDateYMD(0)>='2018-02-15' && commonControl.getDateYMD(0)<='2018-02-21') {
            this.showActivity=true;
          }
          this.rechargeList = res.data.rechargeList;
          for (var item of this.rechargeList) {
            if (item.status) {
              this.selectedItem = item;
              break;
            }
          }
        }
      });
    },
    watch: {
      customRMB: function () {
        if (this.customRMB != '') {
          this.selectedItem = {};
        }

        if (isNaN(this.customRMB)) {
          this.customRMB = '';
        }
      }
    },
    methods: {

      routePath() {
        this.$router.back();
        // var path = '/personal/index';
        // if (this.roomNum != undefined) {
        //   this.$router.replace('/live/index?roomNum=' + this.roomNum);
        //   return;
        // }
        //
        // if (this.fromRoute.fullPath && this.fromRoute.fullPath.indexOf('cost/index') == -1) {
        //   this.$router.replace(this.fromRoute.fullPath);
        //   return;
        // }
        //
        // this.$router.replace('/index');
      },

      changeItem(item) {
        this.selectedItem = item;
        this.customRMB = '';
      },
      recharge() {

        if (this.$store.getters.userInfo.origin == 'tourist') {
          this.$router.push({path: '/tourist/index', query: {}});
          return;
        }

        if (this.dupClick) return;

        if (this.selectedItem.id == undefined && (this.customRMB == 0 || this.customRMB == '')) {
          layer.msg("请选择一个金额");
          return;
        }
        let tradeType = null;
        // 判断是否在微信内, 调用不同的支付类型
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          tradeType = "JSAPI";
        } else {
          tradeType = "MWEB";
        }

        this.dupClick = true;
        let self = this;
        request.post('/api/v1/pay/h5/order', {
          rechargeId: this.selectedItem.id,
          customRMB: this.customRMB,
          platform: 'WXPAY',
          tradeType: tradeType,
          roomNum: this.roomNum
        }).then(res => {
          this.dupClick = false;
          console.log(res);
          if (res && res.code == 0) {
            if (tradeType == 'JSAPI') {
              // 调用公众号支付
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', function () {
                    self.onBridgeReady(res.data);
                  }, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', function () {
                    self.onBridgeReady(res.data);
                  });
                  document.attachEvent('onWeixinJSBridgeReady', function () {
                    self.onBridgeReady(res.data);
                  });
                }
              } else {
                this.onBridgeReady(res.data);
              }
            } else {
              // h5 支付
              // 302 跳转？
            }
          } else {
            layer.msg("发起支付失败");
          }
        });
      },

      onBridgeReady(data) {
        let self = this;
        let wxPay = data.wxpay;
        let orderId = data.orderId;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": wxPay.appId,
            "timeStamp": wxPay.timeStamp,
            "nonceStr": wxPay.nonceStr,
            "package": wxPay.package,
            "signType": wxPay.signType,
            "paySign": wxPay.paySign
          },
          function (res) {
            console.log(res);
            let query = {orderId: orderId, platform: 'WXPAY', tradeType: 'JSAPI', res: res};
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              request.post("/api/v1/pay/query", query).then(resOk => {
                console.log(resOk);

                if (resOk && resOk.code == 0) {
                  self.coins = data.coins;

                  window.localStorage.setItem("LOTTERY_REMAIN", 0);
                  if (commonControl.getDateYMD(0) >='2018-04-01' && commonControl.getDateYMD(0)<='2018-04-03' ) {
                      self.showFoolRemain = true;

                      self.lotteryNum = self.selectedItem.rmb<=30? 1:2;
                  } else {
                    if (self.fromRoute.fullPath.indexOf("/live/index" != -1)) {
                      self.$router.replace(self.fromRoute.fullPath);
                    }
                  }

                } else {
                  let index = layer.load(2);
                  layer.close(index);
                  layer.msg(resOk.msg);
                }
              });
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
              request.post("/api/v1/pay/cancel", query).then(resCancel => {
                console.log(resCancel);
              });
            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
              request.post("/api/v1/pay/fail", query).then(resFail => {
                console.warn(resFail);
                let index = layer.load(2);
                layer.close(index);
                layer.msg(res.err_desc);
              });
            }
          }
        );
      }

    }
  }
  ;
</script>
<style>
</style>
