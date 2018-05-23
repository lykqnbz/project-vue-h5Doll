<template>
  <div class="index" :style="'min-height:'+ index_height +'px;'">
    <!--<header class="header" style="padding: 1% 3.5%;" :style="'height:'+ header_height +'px;'">-->
    <!--<router-link tag="div" to="/personal/index" class="h_left">-->
    <!--<img src="../asset/img/moreMore.png" style="width: 27px;height: 21px;">-->
    <!--</router-link>-->
    <!--<router-link tag="div" to="/mydoll/index" class="h_right">-->
    <!--<img src="../asset/img/fetchingRecords.png" style="width: 27px;height: 25px;">-->
    <!--</router-link>-->
    <!--</header>-->


    <!--维护停电通知-->
    <div class="prompt_overlay" v-show="showStopE" @click.self="closeInform">
      <div class="urgentInform " :style="{height:wrap_width*1.21+'px'}">
        <img class="InformSure" src="./../asset/img/OK@2x.png" @click="closeInform">
      </div>
    </div>


    <div class="banner" :style="'height:'+ banner_height +'px;'">
      <div id="banner_tabs" class="flexslider" :style="'height:'+ banner_height +'px;'">
        <ul class="slides">
          <li v-for="(item,index) in bannerList">
            <router-link :to="'/banner/index?bannerId=' + item.id" v-if="item.type == 0">
              <img :src="item.img" :style="'height:'+ banner_height +'px;'">
            </router-link>
            <a href="javascript:void(0)" v-if="item.type == 2">
              <img :src="item.img" :style="'height:'+ banner_height +'px;'">
            </a>
            <router-link :to="item.url" v-if="item.type == 3">
              <img :src="item.img" :style="'height:'+ banner_height +'px;'">
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="rolling_information">
      <swiper class="swiper-container" id="rolling_swiper" :options="swiperOption" ref="rolling_swiper" :style="{fontSize:fontSize+'px'}">

        <!--假人-->
        <swiper-slide class="rolling_slide swiper-no-swiping" v-for="item in randomList" :key="item.imgUrl">
          <div>
            <img src="../asset/img/random/1.jpg" :src="item.imgUrl">
            <p>恭喜玩家<label :style="{maxWidth: fontNum+'em'}">{{item.name}}</label>抓到一只<label :style="{maxWidth: fontLength+'em'}">{{item.dollName}}</label></p>
          </div>
          <div>
            <p>{{item.time}}</p>
          </div>
        </swiper-slide>
        <!--真人-->
        <swiper-slide class="rolling_slide swiper-no-swiping" v-for="item in rollingList" :key="item.accountId">
          <div>
            <img src="../asset/img/icon.png" :src="item.headimgurl">
            <p v-if="item.type==1">恭喜玩家<label :style="{maxWidth: fontNum+'em'}">{{item.nickname}}</label>抓到一只<label :style="{maxWidth: fontLength+'em'}">{{item.showMsg}}</label></p>
            <p v-if="item.type==2">玩家<label :style="{maxWidth: fontNum+'em'}">{{item.nickname}}</label>成功<label>{{item.showMsg}}</label>娃娃</p>
          </div>
          <div>
            <p>{{item.time}}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <ul class="room_list" :style="'paddingBottom:'+footer_height*0.5+'px;'">

      <!--新非节日样式样式-->
      <li v-for="item in dollList" :key="item.id" @click="enterRoom(item)" class="room_list_li radius ">
        <img class="wawa_img" :src="item.dollImg">
        <div class="wawa_cen">
          <div class="wawa_cen_left">
            <p class="wawa_name">{{item.title}}</p>
            <p class="wawa_roomnum"><img src="../asset/img/goldCoins@3x.png">{{item.price}}币/次</p>
          </div>
          <div class="wawa_cen_right">
            <img v-if="item.statusMsg == '空闲'" src="../asset/img/free1@3x.png">
            <img v-else-if="item.statusMsg == '维护中'" src="../asset/img/Group 201@3x.png">
            <img src="../asset/img/busy@3x.png" v-else>
          </div>
        </div>
        <p v-if="role=='TESTER'" style="position: absolute;bottom: 60px;left:5px;font-size: 18px;color: red;">{{item.roomNum}}</p>
      </li>
      <!--非节日样式-->
      <!--<li v-for="item in dollList" :key="item.id" @click="enterRoom(item)" class="room_list_li radius ">-->
      <!--<div class="ifin">-->
      <!--<span class="ifin_1" v-if="item.statusMsg == '空闲'">空闲中</span>-->
      <!--<span class="ifin_2" v-else-if="item.statusMsg == '维护中'">维护中</span>-->
      <!--<span class="ifin_3" v-else>游戏中</span>-->
      <!--</div>-->
      <!--<img class="wawa_img" :src="item.dollImg">-->
      <!--<div class="wawa_cen">-->
      <!--<p class="wawa_name">{{item.title}}</p>-->
      <!--<p class="wawa_roomnum">{{item.roomNum}}房间</p>-->
      <!--</div>-->
      <!--<p class="wawa_price">{{item.price}}币/次</p>-->
      <!--</li>-->
      <!--元旦样式-->
      <!--<li v-for="item in dollList" :key="item.id" @click="enterRoom(item)" class="room_list_li radius "-->
      <!--:style="{height:wrap_width*0.56+'px'}">-->
      <!--<div class="ifin">-->
      <!--<img src="../asset/img/yd/yd_status_kx.png" class="ifin_1" v-if="item.statusMsg == '空闲'">-->
      <!--<img src="../asset/img/yd/yd_status_wh.png" class="ifin_2" v-else-if="item.statusMsg == '维护中'">-->
      <!--<img src="../asset/img/yd/yd_status_yx.png" class="ifin_3" v-else>-->
      <!--</div>-->
      <!--<img class="wawa_img" :src="item.dollImg">-->
      <!--<div class="wawa_cen" :style="{height:wrap_width*0.24+'px'}">-->
      <!--<p class="wawa_name">{{item.title}}</p>-->
      <!--<p class="wawa_roomnum">{{item.roomNum}}房间</p>-->
      <!--<p class="wawa_price">{{item.price}}</p>-->
      <!--</div>-->
      <!--<img class="yd_light" src="../asset/img/yd/yd_light.png">-->
      <!--</li>-->
    </ul>
    <router-link v-if="$store.getters.userInfo.origin != 'tourist' &&!ifFoolsDay" tag="div" class="rechargeInIndex" to="/recharge/index" @click.native="statClick">
      <img src="../asset/img/other/GO.gif">
    </router-link>
    <router-link v-if="$store.getters.userInfo.origin != 'tourist' &&ifFoolsDay" tag="div" class="rechargeInIndex1" to="/foolsDay/index">
      <img src="../asset/img/foolsday/rukou@2x.png">
    </router-link>


    <div class='loading1' v-show="loading"><img src='../asset/img/loading-0.gif'/></div>


    <!--<div class="prompt_overlay" v-show="showLotteryRemain" @click.self="showLotteryRemain=false">-->
    <!--<div class="fd_getChangeHifi">-->
    <!--<span>恭喜您获得1次抽奖机会</span>-->
    <!--<label>可赢40cm公仔、海量娃娃币</label>-->
    <!--<router-link tag="div" class="rechargeInIndex1" to="/foolsDay/index">-->
    <!--<img src="../asset/img/foolsday/GOcj@2x.png">-->
    <!--</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <!--<img class="footer" src="../asset/img/bottomCartoon.png" style="width:100%; z-index:999;">-->
  </div>

</template>
<script>
  import Vue from 'vue';
  import request from '@/api/request';
  import 'flexslider'
  import '@/asset/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import {isMini} from '@/utils/main.js'
  import wx from 'weixin-js-sdk';

  Vue.use(VueAwesomeSwiper)

  export default {
    data() {
      return {
        index_height: innerHeight,
        wrap_width: innerWidth,
        header_height: screen.height * 0.06,
        banner_height: innerWidth * 0.427,
        room_list_li_height: screen.height * 0.32,
        footer_height: screen.height * 0.22,
        bannerList: [1, 2],
        loading: false,
        haveData: true,
        dollList: [],
        index: 0,
        waitInterval: undefined,
        fontSize: 13,
        fontNum: 6,
        role: '',
        fontLength: 6,
        randomName: ["薛·姐姐🌺", "梦之风", "家多宝", "杨洋", "梦", "see", "🌿", "猫咪没有了魚", "百花争妍", "Daisy . 沫涵", "陕汽商", "prem", "刘凯", "没离开过", "Richard", "流浪的鱼", "啊柒", "uuu", "Pol.先生", "Bingo", "笑靥如花", "池", "回忆冻结成冰", "陈磊", "7月南极梨",
          "DanielIa", "ChrisChen", "雾里看花", "badboy", "ddddddd", "badboy", "小时候就很皮", "YueES", "badboy", "小时候就很皮", "愚人为善", "高冷逗比", "夜袭寡妇村R", "骑鱼的猫", "把妹大男神", "辣条队长", "我的便当姐在哪", "不装逼还是朋友", "死皮赖脸", "就此嗝屁", "wifi是我情人",
          "此用户已成仙", "告白走神", "非洲小白脸", "没了对象省了流量", "离谱搞笑", "五行缺钱", "回眸一刀", "情场浪子", "奇思歪想", "你傻缺啊", "梦里称王", "自由过火", "帅你一脸", "思乡情怯", "辣条总裁", "装逼成瘾", "傻狍子", "豪門尐乞丐", "萌面抄人", "日后再说", "我想浪会", "隔壁老王",
          "lvira", "小龙人", "小哪吒"],
        randomDollName: ["变身布朗熊", "抖音社会表", "趴趴大嘴鳄", "变身面包超人", "呆萌小松鼠", "熊本熊", "皇冠玉桂狗", "年糕犬", "傻笑胖仓鼠", "夏日美人鱼", "围巾波波兔", "柴犬趴趴狗", "波点HelloKitty", "丑萌小恐龙", "围巾波波兔", "夏目猫老师", "史迪仔", "香珠史迪仔", "傻笑胖仓鼠", "趴趴大嘴鳄", "夏目猫老师"],
        randomList: [],
        swiperOption: {
          loop: true,
          direction: 'vertical',
          slidesPerView: "2",
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
        rollingList: [],
        fromRoute: '',
        showLotteryRemain: false,
        ifFoolsDay: false,
        showStopE: false
      }
    },

    updated() {
      if (innerWidth < 370) {
        $("#img_top").css("height", "40px ")
        $("#img_top").css("width", "60px")
        $("#img_top").css("top", "-35px")
        $("#img_top").css("marginLeft", "-30px")
      }
    },

    mounted: function () {

      //下拉加载
      $(window).on('scroll.home', () => {

        window.setTimeout(() => {
          let top = document.documentElement.scrollTop + document.body.scrollTop;
          if (this.$route.path == "/index") {
            this.$store.commit('SET_SCROLL_TOP', top);
          }
        }, 500);

        if (this.loading || !this.haveData) {
          return;
        }

        if ((200 + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
          this.fetchData();
        }

      });

    },

    beforeDestroy: function () {
      $(window).off('.home');
    },

    beforeRouteEnter(to, from, next) {
      next(vm => vm.fromRoute = from);
    },

    // 离开路由
    beforeRouteLeave(to, from, next){
      if(isMini()){
        wx.miniProgram.navigateTo({url: '../jump/jump'});
        return;
      }
      next();
    },

    created() {
      if (commonControl.getDateYMD(0) >= '2018-04-01' && commonControl.getDateYMD(0) <= '2018-04-03') {
        this.ifFoolsDay = true;

        let yyb = window.localStorage.getItem("LOTTERY_REMAIN");
        if (yyb == 1) {
          window.localStorage.setItem("LOTTERY_REMAIN", 0);
          this.showLotteryRemain = true;
        }
      }

      if (!this.haveData) {
        return;
      }

      this.index = 1;

      this.loading = true;

      if (innerWidth < 360) {
        this.fontSize = 12;
        this.fontNum = 5;
        this.fontLength = 5
      }

      if (innerWidth < 361) {
        this.fontSize = 12;
        this.fontNum = 5;
        this.fontLength = 6
      }

      request.post('/api/v1/app/index?svc=live&cmd=avrooms', {index: this.index, size: 10}).then(res => {
        if (res && res.code == 0) {
          let notice = res.data.notice;
          if (notice && notice.show) {
            layer.msg(notice.message);
          }

          if (res.data.avRooms.length < 10) {
            this.haveData = false;
          }

          if (this.index == 1) {
            this.bannerList = res.data.banners;
          }
          for (var item of res.data.avRooms) {
            this.dollList.push(item);
          }
          this.loading = false;

          setTimeout(() => {
            var scrollTop = this.$store.getters.scrollTop;
            this.waitInterval = setInterval(() => {
              var top = document.documentElement.scrollTop + document.body.scrollTop;
              if (top < scrollTop) {
                window.scrollTo(0, scrollTop);
              } else {
                clearInterval(this.waitInterval);
              }

            }, 100)

          }, 100)
        } else {
          this.loading = false;
          layer.msg("对不起，服务器繁忙，请稍后再试!");
        }
        this.$nextTick(() => {
          $(".flexslider").flexslider({
            slideshowSpeed: 4000
          });
        })
        //     防止数据返回过慢，本地加载的虚假数据
        var ramdomSortTime = []
        for (var i = 0; i < 4; i++) {
          ramdomSortTime[i] = Math.ceil(Math.random() * 9)
        }
        for (var i = 0; i < 4; i++) {
          this.randomList.push({
            imgUrl: require("../asset/img/random/" + Math.ceil(Math.random() * 50) + ".jpg"),
            name: this.randomName[Math.ceil(Math.random() * 70)],
            dollName: this.randomDollName[Math.ceil(Math.random() * 20)],
            time: ramdomSortTime.sort()[i] + "分钟前"
          });
        }
      });

      request.post('/api/v1/app/index?svc=game&cmd=slider', {}).then(res => {
        if (res.success) {
          this.rollingList = res.data.list;
        }
      });

      this.role = this.$store.getters.userInfo.role;
    },

    methods: {

      closeLogin1() {
        this.practiceArenaRule = false;
      },

      enterRoom(item) {


        if (isMini()) {
          wx.miniProgram.navigateTo({url: '../jump/jump'});
          return;
        }

        if (item.status == 0 && this.$store.getters.userInfo.role == "USER") {
          if (commonControl.getDateYMD(0) >= '2018-04-28' && commonControl.getDateYMD(0) <= '2018-04-28') {
            this.showStopE = true;
          } else {
            layer.msg("该房间正在维护中");
          }
          return;
        }


        let roomNum = item.roomNum;
        this.$router.push('/live/index?roomNum=' + roomNum);
      },

      fetchData() {
        if (!this.haveData) {
          return;
        }
        this.index++;

        this.loading = true;
        request.post('/api/v1/app/index?svc=live&cmd=avrooms', {index: this.index, size: 10}).then(res => {
          if (res && res.code == 0) {
            if (res.data.avRooms.length < 10) {
              this.haveData = false;
            }
            for (var item of res.data.avRooms) {
              this.dollList.push(item);
            }
            this.loading = false;
          } else {
            this.loading = false;
            layer.msg("对不起，服务器繁忙，请稍后再试!");
          }
        })
      },

      statClick() {
        request.post('/api/v1/share/success/stat', {statType: '首页引导充值'}).then(res => {

        })
      },

      closeInform() {
        window.localStorage.setItem("showStopE" + this.currentDate, "1.1")
        this.showStopE = false;
      },
    }
  };
</script>

