<template>
  <div class="foolsDayActivity">
    <img class="fd_top" src="../../../asset/img/foolsday/top@2x.png"/>
    <div class="fd_codeNum">
      <label>{{drawData.luckyNo}}</label>
      <span @click="scrollDown()">查看幸运值规则></span>
    </div>
    <div class="lotteryContainer" :style="{width:wrap_width*0.91+'px',height:wrap_width*0.91+'px'}">
      <ul
        :style="{width:wrap_width*0.74984+'px',height:wrap_width*0.74984+'px',marginLeft:-wrap_width*0.37492+'px',marginTop:-wrap_width*0.37492+'px'}">
        <li :class="{active:  actvieIndex ==0 }" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x10cm@2x.png"><label>10厘米娃娃</label></li>
        <li :class="{active:  actvieIndex ==1}" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x10b@2x.png"><label>娃娃币10枚</label></li>
        <li :class="{active:  actvieIndex ==2}" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x20cm@2x.png"><label>20厘米娃娃</label></li>
        <li :class="{active:  actvieIndex ==7}" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x10b@2x.png"><label>娃娃币10枚</label></li>
        <li :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}" @click="lottery()"><label>{{drawData.unDrawNo}}次抽奖次数</label></li>
        <li :class="{active:  actvieIndex ==3}" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x30b@2x.png"><label>娃娃币30枚</label></li>
        <li :class="{active:  actvieIndex ==6}" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x40cm@2x.png"><label>40厘米娃娃</label></li>
        <li :class="{active:  actvieIndex ==5}" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x60b@2x.png"><label>娃娃币60枚</label></li>
        <li :class="{active:  actvieIndex ==4}" :style="{width:wrap_width*0.24+'px',height:wrap_width*0.24+'px'}"><img
          src="../../../asset/img/foolsday/x10cm@2x.png"><label>10厘米娃娃</label></li>
      </ul>
    </div>
    <div class="fd_record" :style="{width:wrap_width*0.8586+'px',height:wrap_width*1.584+'px'}">
      <div class="fd_myrecord" :style="{width:wrap_width*0.7466+'px',height:wrap_width*0.36+'px'}">
        <div class="fd_recordTitle">
          <span></span>
          <label>我的中奖记录</label>
        </div>
        <div class="fd_recordList">
          <label v-show="myDrawRecords.length==0" style="position: absolute;width: 100%;margin-left: -50%;font-size: 12px;color: #666;top: 20%;left:50%;text-align: center;">暂无中奖记录</label>
          <p v-for="item in myDrawRecords" :key="item"><label>{{item.name}}</label><span>{{item.showTime}}</span></p>
        </div>
      </div>

      <div class="fd_othrtrecord" :style="{width:wrap_width*0.7466+'px',height:wrap_width*0.32+'px'}">
        <div class="fd_recordTitle">
          <span></span>
          <label>中奖名单</label>
        </div>
        <swiper class="swiper-container fd_recordList" id="rolling_swiper" :options="swiperOption" ref="rolling_swiper">
          <swiper-slide class="swwP" v-for="item in otherDrawRecords" :key="item"><label>{{item.name}}</label><span>{{item.nickname}}</span></swiper-slide>
        </swiper>
      </div>

      <div class="fd_rule" :style="{width:wrap_width*0.7466+'px',height:wrap_width*0.72+'px',marginLeft:-wrap_width*0.3733+'px'}">
        <div class="fd_recordTitle1">
          <span></span>
          <label>活动规则</label>
        </div>
        <div class="fd_ruledList">
          <p>1. 每充值10元、30元赠送1次抽奖机会，30元以上赠送2次抽奖机会;</p>
          <p>2. 每抓到娃娃一次，赠送1次抽奖机会;</p>
          <p>3. 幸运值越高，大奖几率越高，40cm娃娃中奖率最高达100%;</p>
          <p>4. 幸运值=游戏次数+充值金额+抓中次数*10;</p>
          <p>例：每玩1局游戏，幸运值+1;</p>
          <p>充值10元，幸运值+10，充值30则加30以此类推；每抓中娃娃1次，幸运值+10</p>
        </div>
      </div>

    </div>
    <div class="fd_show" :style="{width:wrap_width*0.8586+'px',height:wrap_width*0.92533+'px'}"></div>


    <div class="prompt_overlay" v-show="showHifi" @click.self="closeInform">
      <div class="fd_pro_con" :style="{width:wrap_width*0.7893+'px',height:wrap_width*1+'px',marginLeft:-wrap_width*0.3946+'px',marginTop:-wrap_width*0.5+'px'}">
        <img class="img1" :src="lottemImgUrl">
        <img class="img2" src="../../../asset/img/foolsday/GB@2x.png" @click="closeInform">
        <span>{{lottemSay}}</span>
        <label>奖品已存入您的账户</label>
        <div @click="closeInform">
          <label>还有{{drawData.unDrawNo}}次抽奖机会</label>
        </div>
      </div>
    </div>


    <div class="prompt_overlay" v-show="showHifiForNoM" @click.self="closeInform">
      <div class="fd_pro_con1" :style="{width:wrap_width*0.72+'px',height:wrap_width*0.8906+'px',marginLeft:-wrap_width*0.36+'px'}">
        <router-link  tag="div"  to="/index" class="fd_noMoneyBthL">
            <img src="../../../asset/img/foolsday/GOzww@2x.png">
        </router-link>
        <router-link  tag="div"  to="/recharge/index" class="fd_noMoneyBthR">
          <img src="../../../asset/img/foolsday/GOCZ@2x.png">
        </router-link>
      </div>
    </div>


  </div>


</template>
<script>
  import Vue from 'vue';
  import request from '@/api/request';
  import 'flexslider'
  import '@/asset/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import VueAwesomeSwiper from 'vue-awesome-swiper'

  Vue.use(VueAwesomeSwiper)
  export default {
    data() {
      return {
        wrap_width: innerWidth,
        wrap_height: innerHeight,
        actvieIndex: 0,
        i: 0,
        count: 0,
        items: [
          {name: '1'},
          {name: '2'},
          {name: '3'},
          {name: '4'},
          {name: '5'},
          {name: '6'},
          {name: '7'},
          {name: '8'},
        ],
        swiperOption: {
          loop: true,
          direction: 'vertical',
          slidesPerView: "5",
          watchSlidesProgress: !0,
          paginationClickable: false,
          noSwiping: true,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
        },
        doubleClike: true,
        showHifi: false,
        showHifiForNoM:false,
        showImg: {
          '10币': require('../../../asset/img/foolsday/10b@2x.png'),
          '30币': require('../../../asset/img/foolsday/30b@2x.png'),
          '60币': require('../../../asset/img/foolsday/60b@2x.png'),
          '10cm': require('../../../asset/img/foolsday/10cm@2x.png'),
          '20cm': require('../../../asset/img/foolsday/20cm@2x.png'),
          '40cm': require('../../../asset/img/foolsday/60cm@2x.png'),
        },
        lottemImgUrl: '',
        lottemSay: '',

        drawData: {
          luckyNo: 0,
          unDrawNo: 0
        },

        myDrawRecords : [],
        otherDrawRecords: [],


      }
    },
    created() {
      this.getActivityAccount();
    },

    methods: {
      go(seconds, callback) {
        const SECONDS = seconds * 1000;
        const HALF_SECONDS = SECONDS / 2;
        const FREQUENCY = 50;
        setTimeout(() => {
          //          console.log(this.count)

          this.actvieIndex++;
          if (this.actvieIndex >= this.items.length) this.actvieIndex = 0;

          if (this.count >= HALF_SECONDS) {
            this.i += 10;
            this.count += 50 + this.i;
          } else {
            this.count += 50;
          }

          if (this.count <= SECONDS) {
            this.go(seconds, callback)
          }
          else {
            callback();
          }
        }, FREQUENCY + this.i);
      },

      getActivityAccount() {
        request.get("/api/v1/app/activity/account", {}).then(res => {
          this.drawData = res.data.drawData;
          if (this.drawData.luckyNo == undefined) {
            this.drawData.luckyNo = 0;
          }
          if (this.drawData.unDrawNo == undefined) {
            this.drawData.unDrawNo = 0;
          }
          this.myDrawRecords = res.data.myDrawRecords;
          this.otherDrawRecords = res.data.otherDrawRecords;
          this.$store.commit('updateLoadingStatus', {
            isLoading: false
          })
        })
      },


      lottery() {

        if (this.doubleClike) {
          if (this.drawData.unDrawNo <= 0 ) {
            this.showHifiForNoM=true;
            return;
          }
          this.doubleClike = false
        request.get("/api/v1/app/activity/draw", {}).then(res => {
          console.warn(res);
          this.drawData = res.data.drawData;
          let data = res.data;
          let seconds = 0;
          // none
          // coins
          // doll
          let type = data.type;
          // 10 30 60
          let coins = data.coins;
          // 10 20 40
          let dollType = data.dollType;
          let doll = data.doll;
          // 恭喜您获得 娃娃币60枚
          let rewardMsg = data.rewardMsg;


          let imgType = '10币';
          let goType = 2.8;

          if (data.type == "coins") {
            switch (data.coins) {
              case 10:
                goType = Math.random() > 0.5 ? 3.25 : 2.8;
                imgType = '10币'
                break;
              case 30:
                goType = 3;
                imgType = '30币'
                break;
              case  60:
                goType = 3.15;
                imgType = '60币'
                break;
            }
          } else if (data.type == "doll") {
            switch (data.dollType) {
              case 10:
                goType = Math.random() > 0.5 ? 3.1 : 3.31;
                imgType = '10cm'
                break;
              case 20:
                goType = 2.9;
                imgType = '20cm'
                break;
              case  40:
                goType = 3.2;
                imgType = '40cm';
                break;
            }
          } else {
            layer.msg(rewardMsg)
            return;
          }


          this.actvieIndex = 0;
          this.go(goType, ()=>{
            this.doubleClike = true;
            this.i = 0;
            this.count = 0
            this.showHifi = true;
            this.lottemImgUrl = this.showImg[imgType];
            this.lottemSay = data.rewardMsg;
            this.myDrawRecords = res.data.myDrawRecords;
          });
//          window.setTimeout(() => {
//            this.doubleClike = true;
//            this.i = 0;
//            this.count = 0
//            this.showHifi = true;
//            this.lottemImgUrl = this.showImg[imgType];
//            this.lottemSay = data.rewardMsg;
//          }, 3500);
        })
        }else{

          return;
        }

      },

      scrollDown() {
        $('html,body').animate({scrollTop: 700}, 1000);
      },

      closeInform() {
        this.showHifi = false;
        this.showHifiForNoM=false;
      }
    },
    mounted() {
    }
  };
</script>
