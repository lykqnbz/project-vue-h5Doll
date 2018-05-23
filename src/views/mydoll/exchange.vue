<template>
  <div class="exchange" :style="{height:wrap_height+'px'}">
    <img class="ex_bg" :src="imgUrl" :style="{height:wrap_height*1.1+'px',width:wrap_height+'px'}">
    <div class="ex_bg_1" :style="{height:wrap_height+'px'}"></div>
    <header class="header" :style="'height:'+ header_height +'px;'">
      <div class="h_left">
        <img src="../../asset/img/return.png" @click="$router.back()">
      </div>
      <div class="h_centen">
        兑换娃娃
      </div>
    </header>

    <div class="exdoll">

      <swiper class="swiper-container" id="mySwiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide class="swiper-slide" :style="{height:wrap_width*1.283+'px'}" v-for="item in ruleList" :key="item.id">
          <div class="swiper-slide-n" :style="{height:wrap_width*1.183+'px'}">
            <div class="slideCon" :style="{height:wrap_width*1.1+'px'}">
              <div class="slideCon_top">
                <img :style="{height:wrap_width*0.6136+'px'}" :src="item.coverImg"/>
              </div>
              <div class="slideCon_cen">
                <p>{{item.changeDollName}}</p>
                <span>需要以下内容兑换<label v-if="item.limited">　剩余:{{item.enableNum}}</label>
                  <!--<br/>(点击图片可进入对应娃娃机)-->
                </span>
              </div>
              <ul class="slideCon_bot">
                <li v-for="doll in item.selectList" :class="{'slide_finish': doll.dollNum<=doll.existNum}">
                  <img :src="doll.coverImg">
                  <span>{{doll.existNum}}/{{doll.dollNum}}</span>
                </li>
              </ul>
            </div>
            <div v-if="item.finished">
              <div class="slide_nosure" v-if="item.limited && item.enableNum <= 0">已兑换完</div>
              <div class="slide_sure" v-else @click="exchange(item)">我要兑换</div>
            </div>
            <div class="slide_nosure" v-else>尚未集齐</div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue';
  import request from '@/api/request';
  import '@/asset/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import VueAwesomeSwiper from 'vue-awesome-swiper'

  Vue.use(VueAwesomeSwiper)
  export default {
    data() {
      return {
        header_height: screen.height * 0.072,
        wrap_height: innerHeight,
        wrap_width: innerWidth,
        imgUrl: '',
        swiperOption: {
          //          loop:true,
          slidesPerView: "auto",
          centeredSlides: !0,
          watchSlidesProgress: !0,
          paginationClickable: !0,
          pagination: ".swiper-pagination",
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          coverflow: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2,
            slideShadows: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            //clickable :true,
          },
        },
        ruleList: []
      }
    },
    created() {

      this.handleQuery();

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      },

    },

    mounted() {

      this.swiper.on('slideChangeTransitionStart', () => {
        var url = $(".swiper-slide-active .slideCon_top img")[0].src;
        this.imgUrl = url
      });

    },

    methods: {
      handleQuery() {
        request.post('/api/v1/app/index?svc=account&cmd=exchangerule', {}).then(res => {

          this.ruleList = res.data.changeRules.map(v => {

            let exist = true;

            for (let item of v.selectList) {
              if (item.existNum < item.dollNum) {
                exist = false;
                break;
              }
            }
            v.finished = exist;
            return v
          });

          console.warn(this.ruleList)
          if (this.ruleList.length > 0) {
            this.imgUrl = this.ruleList[0].coverImg;
          }

        })
      },
      exchange(item) {
        request.post('/api/v1/app/index?svc=account&cmd=exchange', {
          exchangeChoice: 4,
          changeRuleId: item.id
        }).then(res => {
          console.info(res)
          if (res.code == 0) {
            layer.msg("兑换大娃娃成功");
            this.handleQuery();

          } else {
            layer.msg(res.msg)
          }
        })
      }
    }
  };
</script>
<style>

</style>
