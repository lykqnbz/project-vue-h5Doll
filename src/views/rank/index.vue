<template>
  <div class="rank" :style="{minHeight:wrap_height+'px'}">
    <div class="rank_top">
      <div @click="swiperChange(1)" class="catch_active">
        <p>大神榜</p>
        <span></span>
      </div>
      <div @click="swiperChange(2)">
        <p>玩家秀</p>
        <span></span>
      </div>
    </div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide id="swiper_1">
        <div class="ranklist">
          <li v-for="(item,index) in rankList">
            <div class="rk_list_div">
              <div class="rklist_num">{{index+1}}</div>
              <div class="rklist_icon"><img :src="item.headimgurl"></div>
              <div class="rklist_name">{{item.nickname}}</div>
            </div>
            <div class="rklist_zhiS">{{item.successNum}}</div>
            <div class="rklist_bai">被膜拜{{item.worshipNum}}次</div>
            <div class="rklist_mb" :class="{'rklist_mb':!worshiped, 'rklist_mb_1':worshiped }" :style="{height:wrap_width*0.12+'px'}" @click="worship(item)"></div>
          </li>
        </div>
      </swiper-slide>
      <swiper-slide id="swiper_2">
        <ul class="playShow">
          <li v-for="item in postList">
            <div class="playShowCon">
              <div class="playSC_top">
                <div>
                  <img :src="item.headimgurl">
                  <span>{{item.nickname}}</span>
                </div>
                <div>
                  <p v-show="item.accountId==$store.getters.userInfo.userId" @click="deletePost(item)">删除</p>
                </div>
              </div>
              <div class="playSC_cen">
                <div>
                  <p>{{item.title}}</p>
                  <img v-show="item.admire" src="../../asset/img/praise@3x.png">
                  <img v-show="item.top>0" src="../../asset/img/Group 20@3x.png">
                </div>
                <div>
                  <p>
                    {{item.content}}
                  </p>
                </div>
              </div>
              <div class="playSC_pic " :class="{'picOnlyOne': item.imgList.length==1}"><!-- 只有一只追加类名 picOnlyOne  -->
                <img v-for="img in item.imgList" :src="img + '?imageView2/1/w/200/h/200'" @click="showImg(img)">

              </div>
              <div class="playSC_bot">
                <div>
                  <img v-for="(admir,index) in item.admirers" :src="admir.headimgurl" v-show="index<5">
                </div>
                <div :class="{'AlrGiveLike': item.selfAdmire}">  <!-- 已点赞追加类名 AlrGiveLike  -->
                  <img @click="admirHandle(item)" v-show="!item.selfAdmire" src="../../asset/img/giveLike1@3x.png">
                  <img @click="admirHandle(item)" v-show="item.selfAdmire" src="../../asset/img/giveLike2@3x.png">
                  <p>{{item.admireNum}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class='loading1' v-show="loading"><img src='../../asset/img/loading-0.gif'/></div>
      </swiper-slide>
    </swiper>
    <div @click="navToEdit" id="edit" style="position: fixed;bottom:7rem;right:0.5rem;z-index: 9;display: none;">
      <img style="width: 3.73rem;height: 3.73rem;" src="../../asset/img/editor@3x.png">
    </div>


    <div class="prompt_overlay_img" v-if="imgShow" @click="imgShow=false">
      <div class="prompt_img" :style="{maxHeight:wrap_width*1.152+'px'}">
        <img id="imgShow" :src=imgUrl>
      </div>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue';
  import request from '@/api/request';
  import '@/asset/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import {isMini} from "../../utils/main";


  Vue.use(VueAwesomeSwiper)

  export default {
    data() {
      return {
        wrap_height: innerHeight,
        wrap_width: innerWidth,
        header_height: screen.height * 0.072,
        i_height: innerHeight * 0.9,
        rankList: [],
        selfPosition: '',
        selfNum: 0,
        worshiped: true,
        imgShow: false,
        index: 0,
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
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
        have_data: true,
        loading: false,
        postList: [],
        currentIndex: 0,
        scrollTop1: 0,
        scrollTop2: 0,
        imgUrl: '',
      }
    },

    created() {


      $("body").css("background-image", 'linear-gradient(to bottom right, #41D3E5 , #98FF92)')
      if (this.$route.query.post) {
        if (!this.have_data) {
          return;
        }
        this.index++;

        this.loading = true;

        request.post('/api/v1/app/index?svc=show&cmd=moments', {
          size: 10,
          index: this.index
        }).then(res => {

          if (res) {
            if (res.data.posts.length < 10) {
              this.have_data = false;
            }
            for (var item of res.data.posts) {
              this.postList.push(item);
            }
            this.loading = false;
          } else {
            this.loading = false;
            layer.msg("对不起，服务器繁忙，请稍后再试!");
          }
          this.swiperChange(2);
        })
      } else {
        this.worshipHandle();
      }


      //      if (window.localStorage.getItem("worshiped"+commonControl.getDateYMD(0)) != "1.1") {
      //        this.worshiped=false;
      //      }


      $("body").css("background-image", 'linear-gradient(to bottom right, #41D3E5 , #98FF92)')

    },
    beforeDestroy() {
      $("body").css("background-image", 'none')
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }

    },
    mounted() {
      $("body").css("background-image", 'linear-gradient(to bottom right, #41D3E5 , #98FF92)')

      this.swiper.on('slideChange', () => {
        switch (this.swiper.activeIndex) {
          case 0:
            this.scrollTop2 = document.documentElement.scrollTop + document.body.scrollTop;
            this.currentIndex = 0;

            $(".rank_top div").eq(0).addClass("catch_active");
            $(".rank_top div").eq(1).removeClass("catch_active");
            $("#edit").css("display", "none")
            window.scrollTo(0, this.scrollTop1);
            if (this.rankList.length == 0) {
              this.worshipHandle();
            }
            break;
          case 1:
            this.scrollTop1 = document.documentElement.scrollTop + document.body.scrollTop;
            this.currentIndex = 1;

            $(".rank_top div").eq(1).addClass("catch_active");
            $(".rank_top div").eq(0).removeClass("catch_active");
            $("#edit").css("display", "block")
            window.scrollTo(0, this.scrollTop2);
            if (this.postList.length == 0) {
              this.postHandle();
            }

            break;
        }
      });

      $(window).on('scroll.rank', () => {
        if (this.loading || !this.have_data) {
          return;
        }
        if ((200 + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
          if (this.currentIndex == 1) {
            this.postHandle();
          }

        }
      });
    },
    methods: {
      swiperChange(page) {
        switch (page) {
          case 1:
            this.scrollTop2 = document.documentElement.scrollTop + document.body.scrollTop;

            this.currentIndex = 0;
            this.swiper.slideTo(0, 500, false);
            window.scrollTo(0, this.scrollTop1);
            $(".rank_top div").eq(0).addClass("catch_active");
            $(".rank_top div").eq(1).removeClass("catch_active");

            if (this.rankList.length == 0) {
              this.worshipHandle();
            }

            break;
          case 2:
            this.scrollTop1 = document.documentElement.scrollTop + document.body.scrollTop;
            this.currentIndex = 1;
            this.swiper.slideTo(1, 500, false);
            window.scrollTo(0, this.scrollTop2);
            $(".rank_top div").eq(1).addClass("catch_active");
            $(".rank_top div").eq(0).removeClass("catch_active");
            ;
            if (this.postList.length == 0) {

              this.postHandle();
            }
            break;
        }
      },
      worshipHandle() {
        request.post('/api/v1/app/index?svc=account&cmd=totalrank', {}).then(res => {
          if (res.success) {
            this.rankList = res.data.topList;
            this.worshiped = res.data.worshiped;

            console.log(res.data)
            if (res.data.selfPosition < 100) {
              this.selfPosition = res.data.selfPosition
            } else {
              this.selfPosition = Math.floor(res.data.selfPosition / 100) * 100 + "+";
            }
            this.selfNum = res.data.selfNum;
          }
        })
      },
      postHandle() {
        if (!this.have_data) {
          return;
        }
        this.index++;
        console.info(this.index)

        this.loading = true;

        request.post('/api/v1/app/index?svc=show&cmd=moments', {
          size: 10,
          index: this.index
        }).then(res => {

          if (res) {
            if (res.data.posts.length < 10) {
              this.have_data = false;
            }
            for (var item of res.data.posts) {
              this.postList.push(item);
            }
            this.loading = false;
          } else {
            this.loading = false;
            layer.msg("对不起，服务器繁忙，请稍后再试!");
          }
        })
      },
      worship(item) {
        if (!this.worshiped) {
          request.post('/api/v1/app/index?svc=account&cmd=worship', {worshipId: item.id}).then(res => {
            layer.msg(res.msg);
            this.worshiped = true;
            window.localStorage.setItem("worshiped" + commonControl.getDateYMD(0), "1.1")
            if (res.code == 0) {

              //              this.$set(item, 'successNum', 0);
              item.worshipNum = item.worshipNum + 1;
            }
          })
        }
      },
      admirHandle(item) {
        request.post('/api/v1/app/index?svc=show&cmd=admire', {postsId: item.id}).then(res => {
          item.selfAdmire = !item.selfAdmire;
          if (item.selfAdmire) {
            item.admireNum = item.admireNum + 1;
            if (!item.admirers) {
              item.admirers = [];
            }
            item.admirers.unshift({
              accountId: this.$store.getters.userInfo.userId, nickname: this.$store.getters.userInfo.nickname,
              headimgurl: this.$store.getters.userInfo.headimgurl
            })
          } else {
            item.admireNum = item.admireNum - 1;
            if (item.admirers) {
              var admirVar = {};
              for (var admir of item.admirers) {
                if (admir.accountId == this.$store.getters.userInfo.userId) {
                  admirVar = admir;
                  break;
                }
              }
              var index = item.admirers.indexOf(admirVar)
              if (index !== -1) {
                item.admirers.splice(index, 1)
              }
            }
          }

        })
      },
      deletePost(item) {
        request.post('/api/v1/app/index?svc=show&cmd=deleteposts', {postsId: item.id}).then(res => {
          var index = this.postList.indexOf(item)
          if (index !== -1) {
            this.postList.splice(index, 1)
          }
        })
      },
      showImg(imgUrl) {
        this.imgUrl = imgUrl;
        this.imgShow = true;
        console.log(imgUrl.clientWidth)
      },

      navToEdit() {
        console.log("123123123123");
        if (this.$store.getters.userInfo.origin == 'tourist') {
          if (isMini()) {
            wx.miniProgram.navigateTo({url: '../jump/jump'});
            return;
          } else {
            this.$router.push({path: '/tourist/index', query: {}});
            return;
          }
        } else {
          this.$router.push('/rank/edit');
        }
      }
    }

  }
  ;
</script>
