<template>
  <div class="half_live" style="background: #72CB5D;">
    <audio id="bgm" autoplay="autoplay" loop="loop" :src="$store.getters.bgMusic">
    </audio>
    <audio id="sm" :src="$store.getters.successMusic" v-on:ended="playBGM" v-on:playing="stopBGM">
    </audio>
    <audio id="fm" :src="$store.getters.failMusic" v-on:ended="playBGM" v-on:playing="stopBGM"></audio>
    <audio id="down" :src="$store.getters.grabDownMusic" v-on:ended="playBGM" v-on:playing="stopBGM"></audio>

    <div class="prompt_overlay " v-if="practiceArenaRule" style="z-index:999">
      <div style="width: 80%;margin-left: 10%;margin-top: 40%;">
        <div class="rule_top">
          练习场规则
        </div>
        <div class="rule_cen">
          <div class="rule_cen_p">
            <p>1.每日首次登陆即送5次练习场机会</p>
            <p>2.进入练习场房间，开启抓娃娃练习模式</p>
            <p>3.抓到娃娃奖励10个娃娃币，无实物奖励</p>
          </div>
          <img @click="practiceArenaRule=false;" src="../../asset/img/confirm@3x.png">
        </div>
      </div>
    </div>

    <!-- 弹出层 抓取失败页面 -->
    <div class="black_overlay_1 hidden">
      <div class="rservation" :style="{height:wrap_height*0.56+'px'}">
        <img src="../../asset/img/text2@3x.png"
             style="width: 14.2rem;height:4.87rem;position: absolute;top: 0%;left: 50%;margin-left: -7.1rem;">
        <img src="../../asset/img/cartoon2@3x.png"
             style="width: 11.3rem;height:13rem;position: absolute;top: 30%;left: 50%;margin-left: -5.65rem;">
        <div
          style="position: absolute;bottom: 0px;left: 0px;position: absolute;bottom: 0px;left: 0px;display: flex;align-items: center;justify-content: center;width: 100%;display: -webkit-flex;-webkit-justify-content:center;-webkit-align-items:center;">
          <!--下次再战-->
          <img src="../../asset/img/cancel@3x.png" style="width: 6.9rem;height: 3.2rem" @click="takeBreak(false)">
          <div style="width: 20%;font-size: 1.6rem;color: #FEF3A2;text-align: center;">
            {{waitTime}}s
          </div>
          <!--再接再厉-->
          <img src="../../asset/img/continueTo2@3x.png" style="width: 6.9rem;height: 3.2rem" @click="onceMore(false)">
        </div>
        <div
          style="width: 70%;margin-left: 15%;display: flex;justify-content: space-around;position: absolute;bottom: -33%;left:0%;display: -webkit-flex;-webkit-justify-content:space-around;">
          <router-link tag="div" to="/gonglv/index"><img
            src="../../asset/img/gonglue@3x.png" style="width: 5.3rem;height: 5.3rem;"></router-link>
          <router-link tag="div" :to="'/share/index_failure?userId='+$store.getters.userInfo.userId"><img
            src="../../asset/img/qiuzhu1@3x.png" style="width: 5.3rem;height: 5.3rem;"></router-link>

        </div>
        <p v-if="doll.dollType==1"
           style="position: absolute;left: 50%;bottom: -9%;transform:translate(-50%,0%);color: #fff;font-size:1.26rem; ">
          剩余练习次数：{{user.currentTrainNum}}次</p>
      </div>
    </div>

    <!-- 弹出层 抓取成功页面 -->
    <div class="black_overlay_2  hidden ">
      <div class="rservation" :style="{height:wrap_width*1.10345+'px'}" style="margin-top: 4rem; "
           v-if="doll.dollType!=1">
        <img src="../../asset/img/cartoon3@3x.png" style="width: 100%">
        <div class="rservation_name">
          <img src="../../asset/img/2-1@3x.png">
          <img src="../../asset/img/icon.png" :src="doll.coverImg">
        </div>

        <div
          style="position: absolute;bottom: 0px;left: 0px;position: absolute;bottom: 0px;left: 0px;display: flex;align-items: center;justify-content: center;width: 100%;display: -webkit-flex;-webkit-justify-content:center;-webkit-align-items:center;">
          <!--查看娃娃-->
          <router-link tag="div" :to="'/mydoll/index?roomNum=' + roomNum" style="width: 6.9rem;height: 3.2rem;">
            <img src="../../asset/img/toView@3x.png" style="width: 6.9rem;height: 3.2rem">
          </router-link>
          <div style="width: 20%;font-size: 1.6rem;color: #FEF3A2;text-align: center;">
            {{waitTime}}s
          </div>
          <!--再来一次-->
          <img src="../../asset/img/continueTo2@3x.png" style="width: 6.9rem;height: 3.2rem" @click="onceMore(true)">
        </div>
        <img src="../../asset/img/share@3x.png"
             style="width:5rem;position: absolute;left: 50%;margin-left: -2.5rem;bottom: -17%;" @click="toShare">
      </div>

      <!-- 弹出层 练习场抓取成功页面 -->
      <div class="rservation" :style="{height:wrap_height*0.7+'px'}" style="margin-top: 4rem;" v-if="doll.dollType==1">
        <img src="../../asset/img/cartoon4@3x.png" style="width: 100%">
        <div
          style="position: absolute;bottom: 0px;left: 0px;position: absolute;bottom: 0px;left: 0px;display: flex;align-items: center;justify-content: center;width: 100%;display: -webkit-flex;-webkit-justify-content:center;-webkit-align-items:center;">
          <!--查看娃娃-->
          <div style="width: 6.9rem;height: 3.2rem;" @click="takeBreak(true)">
            <img src="../../asset/img/cancel@3x.png" style="width: 6.9rem;height: 3.2rem">
          </div>
          <div style="width: 20%;font-size: 1.6rem;color: #FEF3A2;text-align: center;">
            {{waitTime}}s
          </div>
          <!--再来一次-->
          <img src="../../asset/img/continueTo2@3x.png" style="width: 6.9rem;height: 3.2rem" @click="onceMore(true)">
        </div>
        <p
          style="position: absolute;left: 50%;bottom: -10%;transform:translate(-50%,0%);color: #fff;font-size:1.26rem; ">
          剩余练习次数：{{user.currentTrainNum}}次</p>
      </div>
    </div>

    <!-- 弹出层 金币不足页面 -->
    <div class="black_overlay_3 hidden">
      <div class="nomoney overlay_1" :style="'height:'+ overlay_1_height +'px;'" id="black_overlay_3">
        <img src="../../asset/img/lackGoldCoins.png">
        <p>金币不足啦~</p>
        <div class="nomoney_button">
          <div class="nomoney_left" @click="hiddenNotice('.black_overlay_3')">随便逛逛</div>
          <router-link tag="div" class="nomoney_right" :to="'/recharge/index?roomNum=' + roomNum">充值</router-link>
        </div>
      </div>
    </div>

    <!-- 练习次数不足,弹出框 -->
    <div class="black_overlay_4 hidden">
      <div class="nomoney overlay_1" :style="'height:'+ overlay_1_height +'px;'" id="black_overlay_4">
        <img src="../../asset/img/lackGoldCoins.png">
        <p>今天没有练习次数啦~</p>
        <div class="nomoney_button">
          <div class="nomoney_left" @click="hiddenNotice('.black_overlay_4')">随便逛逛</div>
          <router-link tag="div" class="nomoney_right" to="/index">去实践场</router-link>
        </div>
      </div>
    </div>

    <!-- 聊天输入框 -->
    <div class="chat_input" v-if="imMessageShow">
      <div class="chat_con">
        <textarea type="text" v-model="imMessageContent" v-focus="imMessageShow" maxlength="25"
                  placeholder="禁止发送邀请码，发现一律封号" v-on:blur="imMessageShow = false"> </textarea>
        <p>最多25个字</p>
      </div>
      <div class="chat_send" @click="sendImMessage" v-on:mousedown="sendImMessage">
        发送弹幕
      </div>
    </div>

    <!--321倒数缺省图-->
    <img v-show="readyShow" src="../../asset/img/321.gif"
         style="position: absolute;top: 50%;left: 50%;width: 12rem;height: 12rem;margin-top: -8rem;margin-left: -6rem;z-index: 999;">

    <!-- 退出提示框 -->
    <div class="prompt_overlay" v-if="backRoomShow">
      <div class="prompt"
           :style="'height:'+ prompt_height +'px;width:'+prompt_width+'px;margin-top:'+ -prompt_height*0.5 +'px;margin-left:'+ -prompt_width*0.5+'px;'">
        <div class="prompt_cen">
          <p>正在游戏中，是否退出？</p>
        </div>
        <ul class="prompt_but">
          <div class="but_sure" @click="backRoomShow = false">
            否
          </div>
          <router-link tag="div" class="but_go" to="/index" replace>
            是
          </router-link>
        </ul>
      </div>
    </div>

    <!--弹幕位置-->
    <p class="barrage" id="game_result" v-if="!rankShow">{{barrageMsg}}</p>
    <p class="barrage" id="game_start" v-if="!rankShow">{{startMsg}}</p>

    <div class="barrage_super" id="global_barrage">
      <div class="barrage_icon">
        <img src="../../asset/img/icon.png" :src="globalBarrage.headimgurl">
      </div>
      <div class="barrage_p">
        膜拜大神！<label>&nbsp{{globalBarrage.nickname}}&nbsp</label>抓到了一只&nbsp<label>&nbsp{{globalBarrage.dollName}}&nbsp</label>&nbsp
        <img src="../../asset/img/Group@3x.png">
      </div>
    </div>

    <!--本房间围观群众看到的效果-->
    <div class="black_overlay_5 hidden">
      <div class="rservation" :style="{height:wrap_width*1.10345+'px'}" style="margin-top: 4rem; "
           v-if="doll.dollType!=1">
        <img src="../../asset/img/cartoon5@3x.png" style="width: 100%">
        <div class="rservation_name">
          <img src="../../asset/img/2-1@3x.png">
          <img src="../../asset/img/icon.png" :src="doll.coverImg">
          <img src="../../asset/img/2-2@3x.png">
          <p>{{this.playerNickname}}</p>
        </div>
      </div>
    </div>

    <!--预约提示框-->
    <div class="black_overlay_2" v-show="queueReady">
      <div class="rservation" :style="{height:wrap_height*0.56+'px'}">
        <img src="../../asset/img/decoration@3x.png" style="width: 100%">
        <img src="../../asset/img/text1@3x.png"
             style="width: 8.4rem;height:2rem;position: absolute;top: 6%;left: 50%;margin-left: -4.2rem;">
        <div class="rservation_c"
             style="width: 10.3rem;height: 14rem;position: absolute;top: 18%;left: 50%;margin-left: -5.15rem; ">
          <img src="../../asset/img/cartoon1@3x.png" style="width: 10.3rem;height:14rem;">
          <!--倒数数字-->
          <div
            style="font-size: 4rem;color: #5A0C00;position: absolute;top: 61%;left: 50%;line-height: 4rem;margin-left: -50px;width: 100px;height: 100px;text-align: center;">
            {{queueReadyTime}}
          </div>
        </div>
        <div
          style="position: absolute;bottom: 0px;left: 0px;width: 100%;display: flex; justify-content: space-around;display: -webkit-flex;-webkit-justify-content:space-around;">
          <!--偷偷离开-->
          <img src="../../asset/img/toGiveUp@3x.png" style="width: 6.9rem;height: 3.2rem" @click="queueCancel">
          <!--马上开始-->
          <img src="../../asset/img/goOn@3x.png" style="width: 6.9rem;height: 3.2rem" @click="queueStart">
        </div>
      </div>
    </div>

    <!--客服提示框-->
    <div class="prompt_overlay" v-if="imServiceShow">
      <div class="prompt_service">
        <div class="prompt_service_top">
          <img src="../../asset/img/kefutouxiang@3x.png">
          <img src="../../asset/img/close@3x.png" @click="imServiceShow=false">
        </div>
        <p>问题报错/联系客服</p>
        <div class="prompt_service_issue" @click.prevent.stop="feedback">
          <div>画面黑屏</div>
          <div>操作延时</div>
          <div>视频卡顿</div>
          <div>设备宕机</div>
        </div>
        <div class="prompt_service_show">
          <img src="../../asset/img/kf_ewm.jpg">
          <p>长按二维码扫描<br/>
            即可联系客服</p>
        </div>
      </div>
    </div>

    <!--新手指引-->
    <div class="noviceHint" v-if="newPlayerShow!=0">
      <div class="noviceHint_steps1" v-show="newPlayerShow==1" :style="{height:wrap_height+'px'}">
        <div>
          <img src="../../asset/img/noviceHint/ysyd_1.png">
          <div @click.self="newPlayerShow=2"></div>
          <div @click="closeNewPlayer"></div>
        </div>
      </div>
      <div class="noviceHint_steps2" v-show="newPlayerShow==2" :style="{height:wrap_height+'px'}">
        <img src="../../asset/img/noviceHint/ysyd_2.png" @click.self="newPlayerShow=3">
      </div>
      <div class="noviceHint_steps3" v-show="newPlayerShow==3" :style="{height:wrap_height+'px'}">
        <img src="../../asset/img/noviceHint/ysyd_3.png" @click.self="newPlayerShow=4">
      </div>
      <div class="noviceHint_steps4" v-show="newPlayerShow==4" :style="{height:wrap_height+'px'}">
        <img src="../../asset/img/noviceHint/ysyd_9.png">
        <img src="../../asset/img/noviceHint/ysyd_7.png" :style="{top:wrap_width*1.08+'px'}">
        <img src="../../asset/img/noviceHint/ysyd_6.png" :style="{top:wrap_width*1.08+'px'}">
        <img src="../../asset/img/noviceHint/ysyd_4.png" @click.self="newPlayerShow=5" :style="{top:wrap_width*1.28+'px'}">
      </div>
      <div class="noviceHint_steps5" v-show="newPlayerShow==5" :style="{height:wrap_height+'px'}" @click="closeNewPlayer">
        <img src="../../asset/img/noviceHint/ysyd_10.png">
        <img src="../../asset/img/noviceHint/ysyd_11.png" :style="{top:wrap_width*0.46+'px'}">
        <img src="../../asset/img/noviceHint/ysyd_12.png" :style="{top:wrap_width*0.46+'px'}">
        <img src="../../asset/img/noviceHint/ysyd_5.png" :style="{top:wrap_width*0.66+'px'}">
      </div>
    </div>

    <div class="wrap" :style="{height:wrap_height+'px'}">
      <section class="liveimage" style="background: #73cb5a" :style="{height:liveimage_height+'px'}">
        <header class="header">
          <img class="h_left" src="../../asset/img/exit.png" @click="backRoom">
          <div class="h_cen" v-show="showPlayerHead">
            <div><img class="hc_left" src="../../asset/img/icon.png" :src="userImg"></div>
            <div class="hc_right">
              <p>{{ this.playerNickname}}</p>
              <span>游戏中</span>
            </div>
          </div>
          <div class="h_right">
            <div class="hr_left">
              <div class="hrl_top">{{guestData.number}}人</div>
              <div class="hrl_bottom">房间{{roomNum}}</div>
            </div>
            <img class="hr_right" src="../../asset/img/icon.png" :src="guestData.headimgurl">
          </div>
        </header>

        <!--当前房间擂主头像-->
        <div class="champion_man" @click="bindToBottom">
          <img src="../../asset/img/icon.png" :src="championImg">
          <img src="../../asset/img/catchOnList/Group70@3x.png">
        </div>

        <!-- 切换主副摄像头 -->
        <img class="rotate_img" src="../../asset/img/selectView.png" @click="switchCamera"
             style="width:2.93rem;height:2.93rem;">
        <!--<img class="details_img" src="../../asset/img/details.png" @click="rankShow = !rankShow" style="width:2.93rem;height:2.93rem;" v-if="doll.dollType!=1">-->

        <ul class="talk" :style="{height:talk_height+'px'}" v-show="talkShow" style="z-index: 999; overflow: auto;">
          <li v-for="item in imMessage">
            <span><font class="talk_name" :class=" (item.nickname=='系统提示')? 'color_FFEC7F' : 'color_73CB5A' ">{{item.nickname}}</font><font class="talk_name1">:&nbsp</font><font
              class="talk_content" :class=" (item.nickname=='系统提示')? 'color_FFEC7F' : 'color_fff' ">{{item.content}}</font></span>
          </li>
        </ul>


        <img class="talk_img" src="../../asset/img/openBarrage.png" @click="talkShowClick"
             :style="talkShow ? 'transform:scaleY(-1);' : 'transform:scaleY(1);'">

        <!--zego视频,canvas使用display:none|v-show方式会导致无法渲染 -->
        <canvas :style="canvas_adaptive" :id="slave.videoId" v-if="videoType == 'zego' || videoType == 'agora'"
                style="position: absolute;z-index:0;box-sizing: border-box" width="515" height="387"></canvas>
        <canvas :style="canvas_adaptive" :id="master.videoId" v-if="videoType == 'zego' || videoType == 'agora'"
                style="position: absolute;z-index:1;box-sizing: border-box;" width="515" height="387"></canvas>


        <!--占位图-->
        <div v-show="videoLoading" class="prompt_overlay_loading" :style="{height:liveimage_height+'px'}">
          <img src="../../asset/img/seat.gif"
               style="position: absolute;top: 50%;left: 50%;width: 15rem;height: 15rem;margin-top: -7.5rem;margin-left: -7.5rem;z-index: 999;">
        </div>

      </section>


      <!-- 观看游戏的下部控制菜单-->
      <footer class="menu_in" v-show="view != 'play'" style="display: none !important;">
        <section class="menu" :style="{height:menu_height+'px'}">
          <!--<div class="talk_button" @click="imMessageShow = !imMessageShow">-->
          <!--<img src="../../asset/img/sendBarrage.png" style="width:3.75rem;height:3.75rem;">-->
          <!--</div>-->

          <div class="talk_button">
            <img src="../../asset/img/FAYAN@3x.png" style="width:4.27rem;height:1.87rem;"
                 @click="imMessageShow = !imMessageShow">
            <img src="../../asset/img/KEFU@3x.png" style="width:4.27rem;height:1.87rem;margin-top: 0.8rem"
                 @click="imServiceShow = !imServiceShow">
          </div>
          <div class="begin_button">
            <div
              :class="{'begin_button_1': queueNum == 0 , 'begin_button_2': queueNum != 0 && !queueWait , 'begin_button_3': queueNum != 0 && queueWait }"
              @click="queue">
              <p>有{{queueNum}}人排队</p>
              <span>前面有{{queueNum}}人</span>
            </div>
          </div>
          <div class="money" @click="gotoRecharge()">
            <p>{{doll.price}}币/次</p>
            <p v-text="'余额:'+(user.coins >= 10000 ? (Math.floor(user.coins/10000) + 'w+') : user.coins)  + '币'"></p>
            <img src="../../asset/img/top-up.png" style="width:60px;height:20px;">
          </div>
          <div class="preventClick" :style="{height:menu_height*2+'px'}" ontouchstart="return false;"></div>
        </section>
      </footer>

      <!--开始游戏的下部控制菜单-->
      <footer class="menu_ready " v-if="view == 'play'" style="display:block !important; ">
        <section class="menu" :style="{height:menu_height+'px'}">
          <div class="directiion_button" id="control">
            <div class="ban_div upkey"
                 v-on:touchstart.stop.prevent="control($event, 'up')"
                 v-on:onmousedown.stop.prevent="control($event, 'up')"></div>
            <div class="ban_div leftkey"
                 v-on:touchstart.stop.prevent="control($event, 'left')"
                 v-on:onmousedown.stop.prevent="control($event, 'left')"></div>
            <div class="ban_div rightkey"
                 v-on:touchstart.stop.prevent="control($event, 'right')"
                 v-on:onmousedown.stop.prevent="control($event, 'right')"></div>
            <div class="ban_div downkey"
                 v-on:touchstart.stop.prevent="control($event, 'down')"
                 v-on:onmousedown.stop.prevent="control($event, 'down')"></div>
            <img class="upkey " src="../../asset/img/buttonToDelete@3x.png">
            <img class="leftkey" src="../../asset/img/buttonToLeft@3x.png">
            <img class="rightkey" src="../../asset/img/buttonToRight@3x.png">
            <img class="downkey" src="../../asset/img/underButton@3x.png">
          </div>
          <div class="time1"></div>
          <div class="time">
            {{playTime}} S
          </div>
          <div class="catch_button" @click="control($event, 'grab')">
            <img src="../../asset/img/seize.png" style="width:8.8rem;height:4.94rem;">
          </div>

          <div class="preventClick" :style="{height:menu_height*2+'px'}" ontouchstart="return false;"></div>
        </section>
      </footer>

    </div>
    <!-- "-->
    <!--排行榜详情-->
    <div class="wrap_other">

      <div style="position: relative;">

        <div class="catch_list" :style="{height:wrap_height*0.85+'px'}"
             style="overflow: auto;-webkit-overflow-scrolling:touch">
          <div class="catch_list_top">
            <div @click="swiperChange(1)">
              娃娃详情
            </div>
            <div @click="swiperChange(2)" class="catch_active">
              抓中记录
            </div>
            <div @click="swiperChange(3)">
              抓中排行
            </div>
            <!--<div @click="dollShow = 'top'" :class="dollShow== 'top' ? 'catch_active': ''">-->
            <!--娃娃达人-->
            <!--</div>-->
          </div>
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide id="swiper_2">
              <ul class="catch_img ">
                <li v-for="item in doll.detailImgs">
                  <img src="../../asset/img/faceFailure.png" :src="item">
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide id="swiper_1">
              <ul class="catch_list_li" style="overflow: auto;-webkit-overflow-scrolling:touch">
                <li v-for="item in gameRecord">
                  <div class="catch_li_left"><img src="../../asset/img/icon.png"
                                                  :src="item.headimgurl ? item.headimgurl: logo">
                    <span>{{item.nickname}}</span></div>
                  <div class="catch_li_right"><span>{{item.playTime}}</span></div>
                </li>
              </ul>
            </swiper-slide>
            <swiper-slide id="swiper_3">
              <ul class="catch_on_list" style="overflow: auto;-webkit-overflow-scrolling:touch">
                <li v-for="(item,index) in dollRank">
                  <div class="rk_list_div">
                    <div class="rklist_num">{{index+1}}</div>
                    <div class="rklist_icon"><img src="../../asset/img/icon.png" :src="item.headimgurl"></div>
                    <div class="rklist_name">{{item.nickname}}</div>
                    <div :class="{'rklist_mb':worshiped, 'rklist_mb_1':!worshiped }" @click="worship()"></div>
                  </div>
                  <div class="rklist_zhiS">{{item.num}}</div>
                </li>
              </ul>
            </swiper-slide>


          </swiper>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import request from '@/api/request';
  //  import '@/libs/WebRTCAPI.min.js'
  import Commander from '@/libs/Commander.js'
  import {ZegoClient} from '@/libs/jZego-1.0.15.min.js'
  import axios from 'axios'
  import {isMini} from "../../utils/main";

  var wx = require('weixin-js-sdk');

  import '@/asset/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import VueAwesomeSwiper from 'vue-awesome-swiper'

  Vue.use(VueAwesomeSwiper)

  export default {
    data() {
      return {
        viewMode: 2,
        useStreamList: [],
        masterZIndex: 1,
        practiceArenaRule: false,
        slaveZIndex: 0,
        videoType: 'zego',
        videoLoading: true,
        playerId: "",
        playerNickname: "",
        showPlayerHead: false,
        userImg: require('../../asset/img/userimage.png'),
        logo: require('../../asset/img/icon.png'),
        championImg: require('../../asset/img/icon.png'),
        wrap_height: innerHeight,
        wrap_width: screen.width,
        talk_height: screen.height * 0.19,
        header_height: screen.height * 0.07,
        directiion_button_height: screen.height * 0.17,
        catch_list_height: screen.height * 0.7,
        catch_list_li_height: screen.height * 0.7 - 47,
        overlay_height: screen.height * 0.5,
        overlay_1_height: screen.height * 0.25,
        liveimage_height: innerHeight * 0.775,
        menu_height: innerHeight * 0.225,
        prompt_height: screen.height * 0.21,
        prompt_width: screen.width * 0.66,
        userInfo: {},
        canvas_bottom: 20,
        fontsize_12: 12 + "px",
        talkShow: true,
        rankShow: false,
        dollShow: 'record',
        catchActive: true,
        showMasterView: true,
        newPlayerShow: 0,
        master: {
          videoId: 'masterVideo',
          stream: {},
          streamId: '',
        },
        slave: {
          videoId: 'slaveVideo',
          stream: {},
          streamId: '',
        },
        player: {
          videoId: 222,
          stream: {}
        },
        isSafari: this.safari,
        roomNum: '',
        configRole: 'Raudience',
        SDKAPPID: 1400050930,
        ACCOUNTTYPE: 18643,
        video_list: [],
        userInfo: this.$store.getters.userInfo,
        commanderUrl: this.$store.getters.commanderUrl,
        view: 'idle',
        movement: {
          timer: {},
          element: {},
          tapStartTime: 0,
          type: "increment"
        },

        doll: {
          coverImg: require("../../asset/img/wawa.png"),
          detailImgs: []
        },
        dollRank: [],
        gameRecord: [],
        imMessage: [],
        user: {
          coins: 0
        },
        roomMember: [],
        waitTime: 10,
        waitIntervalGame: undefined,
        waitIntervalResult: undefined,
        gameTime: 30,
        playTime: 30,
        imMessageContent: "",
        imMessageShow: false,
        imServiceShow: false,
        readyShow: false, // 321倒计时的
        queueNum: 0, // 排队人数
        queueWait: false, // 是否在排队
        queueReadyTime: 10, // 10秒倒计时
        queueReady: false, // 是否准备开始
        queueReadyInterval: undefined, // 预约排队开始的倒计时
        guestData: {
          number: 0,
          lastUserId: '',
          headimgurl: require('../../asset/img/userimage.png')
        },
        barrageMsg: '',
        startMsg: '',
        backRoomShow: false,
        gameRecordId: '',
        hasData: false,
        feedbacking: false,
        //以下为滑屏插件配置
        swiperOption: {
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象
          // 假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          autoplay: 3000,
          initialSlide: 1,
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          mousewheelControl: true,
          observeParents: true,
          debugger: true,
        },
        globalBarrage: {
          nickname: 'H5娃娃机',
          headimgurl: require('../../asset/img/userimage.png'),
          dollName: "皮卡丘",
          dollType: 0
        },
        globalBarrageQueue: [],
        globalBarrageTimeOut: undefined,
        beforeStart: false,
        worshiped: false,
        dollId: ""
      };

    },

    computed: {
      canvas_adaptive() {
        //直播视口自适应
        //计算padding过后的宽度
        var liveWidth = screen.width * 0.936;
        //直播视频长宽固定比为1.33
        var liveHeight = liveWidth * 1.33
        var per = this.liveimage_height / liveWidth;
        if (per > 1.3333) {
          //liveimage_height赋值后没有重新渲染
          this.liveimage_height = liveHeight;
          this.menu_height = innerHeight - this.liveimage_height - 9
        }
        else {
          this.menu_height -= 9
        }
        this.canvas_bottom = (liveHeight - liveWidth) / 2
        return {
          height: liveWidth + 'px',
          width: liveHeight + 'px',
          left: -this.canvas_bottom + 'px',
          bottom: this.canvas_bottom + 'px',
        }
      },

      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },

    created() {

      this.roomNum = this.$route.query.roomNum;
      if (window.localStorage.getItem("FIRST_LOGIN_MANUAL") == '未提醒') {
        this.newPlayerShow = 1;
      }

      $(".catch_failed .overlay_button_1").click(() => {
        $(".black_overlay_1,.catch_failed").addClass("hidden");
        $("body").height($(window).height()).css({"overflow-y": "visible"})
      });
      $(".catch_success .overlay_button_1").click(() => {
        $(".black_overlay_2,.catch_success").addClass("hidden");
        $("body").height($(window).height()).css({"overflow-y": "visible"})
      });
      $("#black_overlay_3 .nomoney_left").click(() => {
        $(".black_overlay_3,.nomoney").addClass("hidden");
        $("body").height($(window).height()).css({"overflow-y": "visible"})
      });
      $("#black_overlay_4 .nomoney_left").click(() => {
        $(".black_overlay_4,.nomoney").addClass("hidden");
        $("body").height($(window).height()).css({"overflow-y": "visible"})
      });

      this.fetchData();
      this.talkShowClick1();

    },

    mounted() {
      this.playBGM();
      this.renderPlay();

      if (screen.width < 361) {
        $(".hrl_top").css("transform", "scale(0.867,0.867)");
        $(".hrl_bottom").css("transform", "scale(0.867,0.867)");
      }

      //滑屏控制导航栏样式
      this.swiper.on('slideChange', () => {
        switch (this.swiper.activeIndex) {
          case 0:
            $(".catch_list_top div").eq(0).addClass("catch_active");
            $(".catch_list_top div").eq(1).removeClass("catch_active");
            $(".catch_list_top div").eq(2).removeClass("catch_active");
            break;
          case 1:
            $(".catch_list_top div").eq(0).removeClass("catch_active");
            $(".catch_list_top div").eq(1).addClass("catch_active");
            $(".catch_list_top div").eq(2).removeClass("catch_active");
            break;
          case 2:
            $(".catch_list_top div").eq(0).removeClass("catch_active");
            $(".catch_list_top div").eq(1).removeClass("catch_active");
            $(".catch_list_top div").eq(2).addClass("catch_active");
            break;
        }
      });
    },

    beforeDestroy() {
      if (this.view == 'play') {
        Commander.grab();
        Commander.quitGame();
      }
      this.clearWaitInterval(true);
      if (this.queueWait) {
        this.queueCancel();
      }
      this.quitRoom();

    },

    watch: {
      imMessageShow: function (val) {
        if (val) {
          $(".preventClick").css('z-index', "-2")
        } else {
          $(".preventClick").css('z-index', "2")
        }
      }
    },

    methods: {
      switchCamera() {
        this.showMasterView = !this.showMasterView;
        if (this.masterZIndex < this.slaveZIndex) {
          this.masterZIndex = this.masterZIndex + 2;
          $('#' + this.master.videoId).css("z-index", this.masterZIndex + 2)
        } else {
          this.slaveZIndex = this.slaveZIndex + 2;
          $('#' + this.slave.videoId).css("z-index", this.slaveZIndex + 2)
        }
        if (this.showMasterView) {
          this.zg.startPlayingStream(this.master.streamId, this.master.videoView, this.viewMode)
          this.zg.stopPlayingStream(this.slave.streamId);
        } else {
          this.zg.startPlayingStream(this.slave.streamId, this.slave.videoView, this.viewMode)
          this.zg.stopPlayingStream(this.master.streamId);
        }
      },

      stopBGM() {
        var bgm = document.getElementById("bgm");
        bgm.pause();
      },

      playBGM() {
        var bgm = document.getElementById("bgm");
        bgm.play();
      },

      playGrabDown() {
        document.getElementById("down").play();
      },

      stopGrabDown() {
        document.getElementById("down").pause();
      },

      getUserCoins() {
        request.post('/api/v1/app/index?svc=account&cmd=coins', {}).then(res => {
          if (res && res.code == 0) {
            this.user = res.data;
          }
        });
      },

      fetchData() {
        request.post('/api/v1/app/index?svc=live&cmd=roominfo', {roomNum: this.roomNum}).then(res => {
          if (res && res.code == 0) {
            this.hasData = true;
            this.doll = res.data.doll;
            this.gameRecord = res.data.record;
            this.imMessage = res.data.imMessage;
            this.dollRank = res.data.dollRank;
            this.user = res.data.user;
            this.dollId = res.data.dollRank[0].dollId;
            this.championImg = res.data.dollRank[0].headimgurl;
            if (window.localStorage.getItem("Thumbs" + this.dollId + commonControl.getDateYMD(0)) != "1.1") {
              this.worshiped = true;
            }
            if (this.doll.dollType == 1 && window.localStorage.getItem("TRAIN_RULE_REMAIN") != "1.1") {
              this.practiceArenaRule = true;
              window.localStorage.setItem("TRAIN_RULE_REMAIN", "1.1");
            }
          }
        });

        request.post('/api/v1/app/index?svc=config&cmd=command', {}).then(res => {
          if (res && res.code == 0) {
            this.gameTime = res.data.gameTime;
          }
        });
      },

      clearTapTimer() {
        clearTimeout(this.movement.timer)
      },

      clearTapHandlers() {
        this.clearTapTimer()
        this.movement.element.unbind("mouseup", this.clearTapTimer).unbind("mouseleave", this.clearTapHandlers)
        this.movement.element.unbind("touchend", this.clearTapTimer).unbind("touchcancel", this.clearTapHandlers)
      },

      control(event, dir) {
        if (dir == "grab") {
          this.clearWaitInterval(false);
          this.playGrabDown();
          return Commander.grab();
        }

        // 根据主副摄像头切换方向盘的操作
        if (!this.showMasterView) {
          switch (dir) {
            case "up":
              dir = "left";
              break;
            case "left":
              dir = "down";
              break;
            case "down":
              dir = "right";
              break;
            case "right":
              dir = "up";
              break;
          }
        }

        //处理长按。按下和松开事件
        this.movement = {
          element: event.target,
          startTime: (new Date).getTime() / 1e3,
          finish: false,
          dir: dir
        };
        this.movement.element.addEventListener("mouseup", this.clearTapTimer)
        this.movement.element.addEventListener("mouseleave", this.clearTapHandlers)
        this.movement.element.addEventListener("touchend", this.clearTapTimer)
        this.movement.element.addEventListener("touchcancel", this.clearTapHandlers)
        this.move()
      },

      move() {
        if (this.movement.finish) {
          return this.clearTapTimer();
        }
        //每隔70ms发送一次控制指令
        this.movement.timer = setTimeout(this.move, 70)
        switch (this.movement.dir) {
          case 'up':
            Commander.up();
            break;
          case 'down':
            Commander.down();
            break;
          case 'left':
            Commander.left();
            break;
          case 'right':
            Commander.right();
            break;
          case 'grab':
            Commander.grab();
            break;
        }
      },

      startGame() {
        if (this.view == 'idle') {
          this.playBGM();
          Commander.startGame();
        }
      },

      safari() {
        return navigator.userAgent.toLowerCase().indexOf('safari/') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome/') === -1;
      },

      renderPlay() {
        var self = this;
        this.initCommander();
        //        if (this.roomNum == '10121' || this.roomNum == '10158') {
        this.videoType = 'zego';
        window.setTimeout(() => {
          this.initZego();
        }, 1000);
      },

      initZego() {
        var self = this;
        var loginToken = "";
        var roomID = this.roomNum;
        // var loginTokenUrl = 'http://token.88888888888888.com:8181/token';
        var server = 'ws://liveroom.88888888888888.com:8181/ws';
        var logUrl = '';
        var appid = 4001319552;
        var anchor_id = "";
        var idName = this.$store.getters.userInfo.userId;
        var nickName = "u" + idName;
        var useStreamList = [];
        var zg = new ZegoClient();
        this.zg = zg;
        zg.config({
          appid: appid,
          idName: idName,
          nickName: nickName,
          server: server,
          logLevel: 2,
          logUrl: logUrl
        });


        function getZegoToken() {
          request.get("/api/v1/app/zego/token", {}).then(res => {
            loginToken = res.data.zegoToken;
            doLogin();
          });
        }

        function doLogin() {
          zg.login(roomID, 0, loginToken, function (streamList) {
            console.log('login sucess - data = ', streamList);
            useStreamList = updateStreamInfo(streamList);
            useLocalStreamList = useStreamList || [];
            console.log("stream count:" + useLocalStreamList.length);
          }, function (err) {
            console.log('login error - data = ', err);
            request.post("/api/zego/login/error", {code: err.code, msg: err.msg, roomNum: roomID}).then(res => {
              console.log("post login error res = ", res);
            });
          });
        }

        function updateStreamInfo(streamList) {

          if (!streamList) {
            return;
          }

          if (streamList != null || streamList.length !== 0) {
            streamList.forEach(function (item) {
              // if (item.anchor_nick_name.indexOf("WWJS") === 0) {
              anchor_id = item.anchor_id_name;
              self.useStreamList.push(item);
              // }
            });
          }
          console.log('useStreamList = ', self.useStreamList);
          if (self.useStreamList.length !== 0) {
            self.useStreamList.forEach(function (item, index) {
              if (item.stream_id.indexOf('master') >= 0) {
                self.master.streamId = item.stream_id;
                item.videoView = document.getElementById("masterVideo");
                self.master.videoView = item.videoView;
              } else {
                self.slave.streamId = item.stream_id
                item.videoView = document.getElementById("slaveVideo");
                self.slave.videoView = item.videoView;
              }
              item.videoVolume = videoVolumeList[index];
              // if (item.extra_info) {
              //     $beforeQueueNum.innerHTML = JSON.parse(item.extra_info).queue_number;
              //     $audience.innerHTML = JSON.parse(item.extra_info).total;
              // }
              // if (item.extra_info && JSON.parse(item.extra_info).player.id === idName) {
              //     if (!playingStatus) {
              //         playingStatus = true;
              //         RecoveGameStateHandler();
              //     }
              // }
            });

            var reUseStreamList = [];
            if (useLocalStreamList.length !== 0) {
              var reUseFlag = true;
              for (var j = 0; j < useLocalStreamList.length; j++) {
                reUseFlag = false;
                for (var k = 0; k < self.useStreamList.length; k++) {
                  if (useLocalStreamList[j].stream_id === self.useStreamList[k].stream_id) {
                    rethis.useStreamList.push(self.useStreamList[k].stream_id);
                    reUseFlag = true;
                    break;
                  }
                }

                if (!reUseFlag) {
                  zg.stopPlayingStream(useLocalStreamList[j].stream_id);
                }
              }
            }

            var playFlag = true;
            for (var m = 0; m < self.useStreamList.length; m++) {
              playFlag = false;
              for (var n = 0; n < reUseStreamList.length; n++) {
                if (self.useStreamList[m] === reUseStreamList[n]) {
                  playFlag = true;
                  break;
                }
              }
              if (!playFlag) {
                if (self.useStreamList[m].stream_id.indexOf("master") >= 0) {
                  zg.startPlayingStream(self.useStreamList[m].stream_id, self.useStreamList[m].videoView, self.viewMode);
                  self.videoLoading = false;
                }
                //                zg.setPlayVolume(useStreamList[m].stream_id, useStreamList[m].videoVolume);
              }
            }
          }

          return self.useStreamList;
        }

        getZegoToken();

        var videoVolumeList = [0, 50];
        var useLocalStreamList = [];

        zg.onPlayStateUpdate = function (type, streamId) {
          if (streamId.indexOf("master") >= 0 && type == 0) {
            self.videoLoading = false;
          }
        };

        zg.onDisconnect = function (err) {
          console.log('客户端-onDisconnect = ', err);
          layer.msg('您断开连接了,请刷新页面！');
        };

        zg.onKickOut = function (err) {
          console.log('客户端-onKickOut = ', err);
          layer.msg('您被踢下线了,请刷新页面！');
        };

        zg.onStreamExtraInfoUpdated = function (streamList) {
        };

        zg.onStreamUpdated = function (type, streamList) {
          if (type == ENUM_STREAM_UPDATE_TYPE.added) {
            console.log("streamupdate add");
            useStreamList = updateStreamInfo(streamList);

            if (useStreamList) {
              for (var i = useStreamList.length - 1; i >= 0; i--) {
                var useFlag = false;
                var streamInfo = useStreamList[i];
                for (var j = 0; j < useLocalStreamList.length; j++) {
                  if (useLocalStreamList[j].stream_id === streamInfo.stream_id) {
                    useFlag = true;
                    break;
                  }
                }

                if (!useFlag) {
                  useStreamList.push(streamInfo);
                }
              }
            }
          } else if (type == ENUM_STREAM_UPDATE_TYPE.deleted) {
            console.log("streamupdate delete");
            if (useStreamList) {
              deleteStreamInfo(streamList);
            }
          }
        };

        zg.onPlayQualityUpdate = function (streamID, streamQuality) {
        };
      },

      showLastUser(id) {
        if (id == undefined) {
          this.guestData.headimgurl = this.$store.getters.userInfo.headimgurl;
          return;
        }
        request.post('/api/v1/app/index?svc=account&cmd=nickname', {accountId: id}).then(res => {
          if (res && res.code == 0) {
            this.guestData.headimgurl = res.data.headimgurl;
          } else {
            this.guestData.headimgurl = this.$store.getters.userInfo.headimgurl;
          }
        });
      },

      showPlayer(id) {
        request.post('/api/v1/app/index?svc=account&cmd=nickname', {accountId: id}).then(res => {
          if (res && res.code == 0) {
            this.showPlayerHead = true;
            this.playerId = id;
            this.userImg = res.data.headimgurl;
            this.playerNickname = res.data.nickname;
          } else {
            console.log("获取头像失败", id);
          }
        });
      },

      initCommander() {
        self = this;
        var listener = {
          handleStatusChange: this.handleStatusChange,
          OnClose: this.onWebSocketClose,
          OnError: this.handleError,
        }
        console.log("娃娃名", this.doll);
        Commander.init(listener, this.userInfo, this.roomNum, this.commanderUrl, this.doll);
      },

      handleError(error) {
        console.error(error);
        if (error.code === Commander.ErrorCode.WebSocketError.code) {
          layer.msg('控制端为断开状态，请刷新页面重试')
        }
      },

      //根据服务端返回的状态，渲染控制界面
      handleStatusChange(status, extras) {
        if (status == 'PONG') {
          return;
        }
        switch (status) {
          case "ROOM_IDLE":
            this.view = "idle";
            this.showPlayerHead = false;
            break;
          case "ROOM_OCCUPIED":
            this.view = "occupy";
            this.showPlayer(extras);
            break;
          case "AUTH_FAIL":
            layer.msg("授权失败");
            break;
          case "AUTH_OK":
            if (extras == 'RECONNECT') {
              this.view = 'play';
            } else {
              break;
            }
          case "USER_CONTINUE_OK":
          case "USER_START_OK":
            this.getUserCoins();
            //展示玩家头像
            this.showPlayerHead = true;
            this.showPlayer(this.$store.getters.userInfo.userId);
            //游戏倒计时
            this.playTime = this.gameTime.valueOf();
            clearInterval(this.waitIntervalGame);
            this.waitIntervalGame = setInterval(() => {
              if (this.playTime <= 0) {
                clearInterval(this.waitIntervalGame);
                return false;
              }
              this.playTime--;
            }, 1000);
            //显示操作界面
            this.view = "play";
            // 修改排队情况
            this.queueWait = false;
            break;
          case "USER_START_FAIL":
          case "USER_CONTINUE_FAIL":

            if (extras == 'NO_MONEY') {

              if (this.$store.getters.userInfo.origin == 'tourist') {
                if (isMini()) {
                  wx.miniProgram.navigateTo({url: '../jump/jump'});
                  return;
                }

                this.$router.push({path: '/tourist/index', query: {}});
                return;
              }

              $(".black_overlay_3,.nomoney").removeClass("hidden");
            } else if (extras == 'NO_TRAIN_NUM') {

              $(".black_overlay_4,.nomoney").removeClass("hidden");
            } else {
              if (extras != undefined && extras.length != 0) {
                layer.msg(extras);
              }
            }

            this.view = "idle";
            break;
          case "USER_GRAB_SUCCESS":
            this.stopBGM();
            var sm = document.getElementById('sm');
            sm.play();
            clearInterval(this.waitIntervalGame);
            $(".black_overlay_2,.catch_success").removeClass("hidden");
            this.waitTimeOut(true);
            // TODO 游戏记录ID
            extras = JSON.parse(extras);
            this.gameRecordId = extras.gameRecordId;
            window.localStorage.setItem("LOTTERY_REMAIN", 1);

            break;
          case "USER_GRAB_FAIL":
            this.stopBGM();
            var fm = document.getElementById('fm');
            fm.play()
            clearInterval(this.waitIntervalGame);
            $(".black_overlay_1,.catch_failed").removeClass("hidden");
            this.waitTimeOut(false);
            break;
          case "CUSTOM_MESSAGE":
            extras = JSON.parse(extras);

            switch (extras.type) {
              case "BARRAGE": // 弹幕的
                this.pushImMessage(extras.message);
                break;
              case "RESULT_BARRAGE":
                // 展示玩家成功抓取的弹幕
                // this.globalBarrage = extras.message;

                var userId = extras.message.userId;
                var result = extras.message.result;
                if (extras.message.dollType == 1) {
                  // 训练场
                  if (extras.message.roomNum == this.roomNum) {
                    this.barrageRun(result);
                  }
                } else if (extras.message.dollType == 0) {
                  // 实战场
                  if (result) {
                    if (userId == this.userInfo.userId) {
                      break;
                    }
                    if (extras.message.roomNum == this.roomNum) {
                      // 本房间看到的成功
                      $(".black_overlay_5").removeClass('hidden');
                      setTimeout(() => {
                        $(".black_overlay_5").addClass('hidden');
                      }, 5000)
                    } else {
                      // 其他房间看的成功
                      if (this.globalBarrageTimeOut == undefined) {
                        this.globalBarrage = extras.message;
                        $('#global_barrage').addClass("barrage_run");
                        this.globalBarrageTimeOut = setTimeout(() => {
                          $('#global_barrage').removeClass("barrage_run");
                          clearTimeout(this.globalBarrageTimeOut);
                          this.globalBarrageTimeOut = undefined;
                        }, 7000);
                      }
                    }
                  } else {
                    // 只有本房间才能看到失败的弹幕
                    if (extras.message.roomNum == this.roomNum) {
                      this.barrageRun(result);
                    }
                  }
                }
                break;
              case "START_BARRAGE":
                this.startBarrageRun(extras.message.userId);
                break;
            }
            break;
          case "USER_QUEUE_STATUS":
            extras = JSON.parse(extras);
            // 排队情况
            this.queueWait = extras.wait;
            this.queueNum = extras.queue;
            break;
          case "USER_QUEUE_OK":
            // 排队成功
            // this.queueWait = true;
            break;
          case "USER_QUEUE_READY":
            // 移出当前房间用户看到成功弹幕
            $('.black_overlay_5').addClass('hidden');
            // 准备阶段
            // 10 秒倒计时
            this.queueReady = true;
            if (this.queueReadyInterval) {
              clearInterval(this.queueReadyInterval);
            }
            this.queueReadyTime = 9;
            this.queueReadyInterval = setInterval(() => {
              this.queueReadyTime--;
              if (this.queueReadyTime <= 0) {
                console.log("清除排队开始");
                this.queueCancel();
                clearInterval(this.queueReadyInterval);
              }
            }, 1000);
            break;
          case "ERROR_COMMAND":
            extras = JSON.parse(extras);
            switch (extras.code) {
              case Commander.ErrorCommand.RoomOffline.code:
                layer.msg(Commander.ErrorCommand.RoomOffline.content);
                break;
              case Commander.ErrorCommand.RoomFault.code:
                layer.msg(Commander.ErrorCommand.RoomFault.content);
                break;
            }
            break;
          case "LIVE_GUEST":
            extras = JSON.parse(extras);
            if (this.guestData.number < extras.number) {
              // 有人进来了
              this.enterBarrage(extras.lastUserId);
            }

            // 观众数量和最新的那个用户
            this.guestData.number = extras.number;
            this.guestData.lastUserId = extras.lastUserId;
            this.showLastUser(this.guestData.lastUserId);
            break;

        }
      },

      onLocalStreamAdd() {
      },

      onRemoteCloseAudio() {
        console.log("on remote close audio!");
      },

      onUpdateRemoteStream(stream, videoId) {
        this.onRemoteStreamAdd(stream, videoId);
      },

      onRemoteLeave() {
        console.log("on remote leave!");
      },

      onRemoteCloseVideo() {
        console.log("on remote close video!");
      },

      onIceConnectionClose() {
        console.log("onIceConnectionClose!");
      },

      onKickout() {
        console.log("on kick out!");
        var self = this;
        layer.msg("其他地方登录，被T下线");
        self.quitRoom();
        self.logout();
      },

      onRelayTimeout() {
        console.error('relayTimeout')
      },

      onRemoteStreamRemove(videoId) {
        var newArr = [];
        var needResetFirst = false;

        this.video_list.forEach(video => {
          if (video.videoId == videoId) {
            newArr.push(video);
          } else if (video.first) {
            needResetFirst = true;
          }
        })
        if (needResetFirst) {
          newArr[0].first = true;
        }
        console.debug('newArr', needResetFirst, newArr);
        this.video_list = newArr;
        this.restoreVideo();
      },

      restoreVideo() {
        var self = this;
        setTimeout(function () {
          Array.prototype.forEach.call(self.video_list, function (item, idx) {
            var video = document.getElementById(item.videoId)
            if (!video) return
            if (self.isSafari) {
              //safari 的特殊处理逻辑
              if (item.stream && item.stream.getVideoTracks().length != 0 && video && video.srcObject && video.srcObject.active === false) {

                var videoMedia = new MediaStream();
                videoMedia.addTrack(item.stream.getVideoTracks()[0]);
                video.srcObject = videoMedia;
              }
              var audio = document.getElementById(item.videoId + '_audio')
              if (!audio) return
              if (item.stream && item.stream.getAudioTracks().length != 0 && audio && audio.srcObject && audio.srcObject.active === false) {
                var audioMedia = new MediaStream();
                audioMedia.addTrack(item.stream.getAudioTracks()[0]);
                audio.srcObject = audioMedia;
              }
            } else {
              if (item.stream && video && video.srcObject && video.srcObject.active === false) {
                video.srcObject = item.stream;
              }
            }
          })
        }, 100);
      },

      onJoinRoomCallback(result) {
        var self = this;
        if (result !== 0) {
          self.$root.$refs.toastr.e("create room failed!!!");
          return;
        } else {
          console.log("join ilive room ok")
        }
      },

      setCameraData(stream, videoId) {
        if (this.isMasterCamera(videoId)) {
          this.master.videoId = videoId;
          this.master.stream = stream;
        } else if (this.isSlaveCamera(videoId)) {
          this.slave.videoId = videoId;
          this.slave.stream = stream;
        } else {
          this.player.videoId = videoId;
          this.player.stream = stream;
        }
      },

      onRemoteStreamAdd(stream, videoId) {
        window.stream = stream;
        this.video_list.filter(video => {
          return video.videoId == videoId;
        })
        if (this.video_list.filter(video => {
          return video.videoId == videoId;
        }).length == 0) {
          if (this.video_list.length == 0) {
            console.log("found first video")
            this.video_list.push({
              videoId: videoId,
              first: true,
              stream: stream
            });
            this.setCameraData(stream, videoId);
          } else {
            this.video_list.push({
              videoId: videoId,
              stream: stream
            });
            this.setCameraData(stream, videoId);
          }
        }
        if (!document.getElementById(videoId)) {
          setTimeout(() => {
            this.onRemoteStreamAdd(stream, videoId);
          }, 50);
          return;
        }

        var video = document.getElementById(videoId);
        if (this.isSafari) {
          if (stream && stream.getVideoTracks().length != 0) {
            var videoMedia = new MediaStream();
            videoMedia.addTrack(stream.getVideoTracks()[0]);
            // video.srcObject = null;
            video.srcObject = videoMedia;
          }
        } else {
          console.warn(stream)
          video.srcObject = stream;
        }
      },

      onWebSocketClose() {
        this.quitRoom();
      },

      quitRoom() {
        Commander.destroy();
        switch (this.videoType) {
          case 'tx':
            ILiveSDK.quitRoom();
            break;
          case 'zego':
            this.zg.release();
            break;
          case 'agora':
            this.master.stream.destroy();
            this.slave.stream.destroy();
            break;
        }
        //        var self = this;
        this.video_list = [];
      },

      isMasterCamera(val) {
        var videoId = val.split("_")[0]
        //openId为用户名称，目前测试的这台娃娃机，两个推流帐号分别为10000_FRONT,10000_SIDE
        var open = WebRTCAPI.getOpenId(videoId);
        console.info(open)
        return WebRTCAPI.getOpenId(videoId).indexOf("master") >= 0;
      },

      isSlaveCamera(val) {
        var videoId = val.split("_")[0]
        //openId为用户名称，目前测试的这台娃娃机，两个推流帐号分别为10000_FRONT,10000_SIDE
        return WebRTCAPI.getOpenId(videoId).indexOf("slave") >= 0;
      },

      // 休息一会
      takeBreak(status) {
        this.playBGM();
        this.clearWaitInterval(false);
        if (status) {
          $(".black_overlay_2,.catch_success").addClass("hidden");
        } else {
          $(".black_overlay_1,.catch_failed").addClass("hidden");
        }
        this.view = 'idle';
        Commander.quitGame();
      },

      ifNormalUser() {
        return this.$store.getters.userInfo.role == "USER"
      },

      // 再来一次
      onceMore(status) {
        this.playBGM();
        this.clearWaitInterval(false);
        if (status) {
          $(".black_overlay_2,.catch_success").addClass("hidden");
        } else {
          $(".black_overlay_1,.catch_failed").addClass("hidden");
        }

        if (!this.ifNormalUser()) {
          Commander.continueGame();
        } else {
          // 请求服务器判断该房间是否可用
          this.doBeforeStart(false);
        }
      },

      // 排队,再来一次前的游戏校验
      // queue true 排队 false 继续游戏
      doBeforeStart(queue) {
        if (!this.beforeStart) {
          this.beforeStart = true;
          request.post('/api/v1/app/before/start', {roomNum: this.roomNum}).then(res => {
            if (res) {
              if (res.code == 0) {
                this.user.coins = res.data.coins;
                this.user.currentTrainNum = res.data.currentTrainNum;
                if (queue == true) {
                  Commander.queue();
                } else if (queue == false) {
                  Commander.continueGame();
                }
              } else if (res.code == 10012) {
                if (this.doll.dollType == 0) {

                  if (this.$store.getters.userInfo.origin == 'tourist') {
                    if (isMini()) {
                      wx.miniProgram.navigateTo({url: '../jump/jump'});
                      return;
                    }

                    this.$router.push({path: '/tourist/index', query: {}});
                    return;
                  }
                  $(".black_overlay_3,.nomoney").removeClass("hidden");
                } else if (this.doll.dollType == 1) {
                  $(".black_overlay_4").removeClass("hidden");
                }
              } else {
                layer.msg(res.msg);
              }
            }
            this.beforeStart = false;
          });
        }
      },

      // 10 秒倒计时
      waitTimeOut(status) {
        this.waitTime = 9;
        clearInterval(this.waitIntervalResult);
        this.waitIntervalResult = setInterval(() => {
          if (this.waitTime <= 0) {
            this.takeBreak(status);
            clearInterval(this.waitIntervalResult);
            return false;
          }
          this.waitTime--;
        }, 1000)
      },

      // 清除定时器
      clearWaitInterval(destroy) {
        if (this.waitIntervalResult) {
          clearInterval(this.waitIntervalResult)
        }
        if (this.waitIntervalGame) {
          clearInterval(this.waitIntervalGame)
        }
      },

      // 退出房间
      backRoom() {
        if (this.view == 'play') {
          this.backRoomShow = true;
        } else {
          this.$router.replace("/index");
        }
      },

      // 隐藏通知
      hiddenNotice(css) {
        $(css).addClass('hidden');
      },

      // 发送消息的弹幕
      sendImMessage() {
        if (this.imMessageContent.length == 0) {
          this.imMessageContent = "";
          this.imMessageShow = false;
          return;
        }


        request.post("/api/v1/app/index?svc=im&cmd=send", {
          roomNum: this.$route.query.roomNum,
          content: this.imMessageContent
        }).then(res => {
          this.imMessageContent = "";
          this.imMessageShow = false;
        });
      },

      // 聊天框 下滑到底部
      talkShowClick() {
        this.talkShow = !this.talkShow;
        if (this.talkShow) {
          setTimeout(() => {
            $('.talk').scrollTop(4000);
          }, 100);
        }
      },

      // 游戏界面开始时，聊天框滑至底部
      talkShowClick1() {
        setTimeout(() => {
          $('.talk').scrollTop(4000);
        }, 1000);
      },

      // 开始预约排队
      queue() {
        if (this.queueWait) {
          this.queueCancel();
        } else {
          this.playBGM();
          if (!this.ifNormalUser()) {
            Commander.queue();
          } else {
            // 请求服务器判断该房间是否可用
            this.doBeforeStart(true);
          }
        }
      },

      // 到你了， 开始游戏
      queueStart() {
        if (this.queueReadyInterval) {
          clearInterval(this.queueReadyInterval);
        }
        this.queueReady = false;
        Commander.queueStart();
      },

      // 取消预约
      queueCancel() {
        this.queueWait = false;
        this.queueReady = false;
        if (this.queueReadyInterval) {
          clearInterval(this.queueReadyInterval);
        }
        Commander.queueCancel();
      },

      //抓取后结果弹幕飘过效果
      barrageRun(result) {
        if (result) {
          this.barrageMsg = "恭喜" + this.playerNickname + "抓中了！！";
        } else {
          this.barrageMsg = this.playerNickname + "没有抓到，太可惜了！！";
        }

        $("#game_result").addClass("barrage_run_2");
        setTimeout(() => {
          $("#game_result").removeClass("barrage_run_2");
        }, 7000);
      },

      startBarrageRun(userId) {
        if (this.playerNickname == undefined || this.playerId != userId) {
          request.post('/api/v1/app/index?svc=account&cmd=nickname', {accountId: userId}).then(res => {
            console.log(res);
            if (res && res.code == 0) {
              this.showPlayerHead = true;
              this.playerId = userId;
              this.startMsg = res.data.nickname + "成功上机！";
              this.startPlayBarrage();
            }
          });
        } else {
          this.startMsg = this.playerNickname + "成功上机！";
          this.startPlayBarrage();
        }
      },

      startPlayBarrage() {
        $("#game_start").addClass("barrage_run_1");
        setTimeout(() => {
          $("#game_start").removeClass("barrage_run_1");
        }, 7000);
      },

      // 用户进房间提示
      enterBarrage(userId) {
        request.post('/api/v1/app/index?svc=account&cmd=nickname', {accountId: userId}).then(res => {
          if (res && res.code == 0) {
            this.pushImMessage({nickname: res.data.nickname, content: '进来啦~~~'});
          }
        });
      },

      // 发送弹幕的
      pushImMessage(message) {
        this.imMessage.push({
          nickname: message.nickname,
          content: message.content
        });
        if (this.imMessage.length > 20) {
          this.imMessage.shift();
        }
        setTimeout(() => {
          $('.talk').scrollTop(400);
        }, 500);
      },

      toShare() {
        this.$router.push({path: '/share/index', query: {gameRecordId: this.gameRecordId}});
      },

      //修复在苹果机打开小键盘，定位失效问题
      repairIOSKeyboard() {
        setTimeout(() => {
          document.body.scrollTop = document.body.scrollHeight;
          $(".chat_input").scrollIntoView(true);
          $(".chat_input").scrollIntoViewIfNeeded();
          $(".chat_input").window.scrollTo(0, document.body.offsetHeight);
        }, 1500);
      },

      feedback(event) {
        var content = event.target.innerHTML;

        if (content.length != 4) {
          return;
        }
        if (this.feedbacking) {
          return;
        }

        this.feedbacking = true;
        request.post('/api/v1/app/index?svc=account&cmd=feedback', {
          content: this.roomNum + "房间:" + content,
          type: "auto"
        }).then(res => {
          this.feedbacking = false;
          if (res && res.code == 0) {
            layer.msg("反馈成功~~");
          } else {
            layer.msg(res.msg);
          }
          this.imServiceShow = false;
        })
      },

      swiperChange(page) {
        switch (page) {
          case 1:
            this.swiper.slideTo(0, 500, false);
            $(".catch_list_top div").eq(0).addClass("catch_active");
            $(".catch_list_top div").eq(1).removeClass("catch_active");
            $(".catch_list_top div").eq(2).removeClass("catch_active");
            ;
            break;
          case 2:
            this.swiper.slideTo(1, 500, false);
            $(".catch_list_top div").eq(0).removeClass("catch_active");
            $(".catch_list_top div").eq(1).addClass("catch_active");
            $(".catch_list_top div").eq(2).removeClass("catch_active");
            ;
            break;
          case 3:
            this.swiper.slideTo(2, 500, false);
            $(".catch_list_top div").eq(0).removeClass("catch_active");
            $(".catch_list_top div").eq(1).removeClass("catch_active");
            $(".catch_list_top div").eq(2).addClass("catch_active");
            ;
            break;
        }
      },

      closeNewPlayer() {
        this.newPlayerShow = 0;
        window.localStorage.setItem("FIRST_LOGIN_MANUAL", "已提醒");
      },

      worship() {
        if (this.worshiped) {
          layer.msg("点赞成功");
          this.worshiped = false;
          window.localStorage.setItem("Thumbs" + this.dollId + commonControl.getDateYMD(0), "1.1");
        } else {
          layer.msg("不能重复点赞哟");
        }
      },

      bindToBottom() {
        this.swiper.slideTo(2, 500, false);
        $(".catch_list_top div").eq(0).removeClass("catch_active");
        $(".catch_list_top div").eq(1).removeClass("catch_active");
        $(".catch_list_top div").eq(2).addClass("catch_active");
        $('html,body').animate({scrollTop: 4000}, 1000);
      },

      gotoRecharge() {
        if (this.$store.getters.userInfo.origin == 'tourist') {
          if (isMini()) {
            wx.miniProgram.navigateTo({url: '../jump/jump'});
            return;
          } else {
            this.$router.push({path: '/tourist/index', query: {}});
            return;
          }
        } else {
          this.$router.push({path: '/recharge/index', query: {roomNum: this.roomNum}});
        }
      }
    },
  };
</script>

