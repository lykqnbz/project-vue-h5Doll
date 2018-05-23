<template>
  <div class="feedback" :style="'height:'+ feedback_height +'px;'">
    <header class="header" :style="'height:'+ header_height +'px;'">
      <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        用户反馈
      </div>
      <div class="h_right" @click="feedback">提交</div>
    </header>
    <div class="fb_cen" :style="{transform: 'translate(0,'+header_height+'px)'}">
      <span style="color: #777">*个别情况下,我们需要与您沟通解决问题,建议反馈内容后面加下您的联系方式(微信号), 仅客服可见.也可联系客服微信:zzwawa666</span>
      <textarea class="fb_text" placeholder="在这里输入您要反馈的内容，如果是性能问题，请留下您的机型和系统版本" :style="'height:'+ fb_text_height +'px;'" v-model="content"></textarea>
      <p class="fb_title">200字内</p>

      <!--<div class="fb_img">-->
        <!--<img src="../../../asset/img/add_img.png" class="add_img">-->
        <!--<div class="user_con">-->
          <!--<img class="user_img" src="../../../asset/img/bg.png">-->
          <!--<img class="exit" src="../../../asset/img/but_exit.png">-->
        <!--</div>-->
        <!--<div class="user_con">-->
          <!--<img class="user_img" src="../../../asset/img/bg.png">-->
          <!--<img class="exit" src="../../../asset/img/but_exit.png">-->
        <!--</div>-->
        <!--<div class="user_con">-->
          <!--<img class="user_img" src="../../../asset/img/bg.png">-->
          <!--<img class="exit" src="../../../asset/img/but_exit.png">-->
        <!--</div>-->
        <!--<div class="user_con">-->
          <!--<img class="user_img" src="../../../asset/img/bg.png">-->
          <!--<img class="exit" src="../../../asset/img/but_exit.png">-->
        <!--</div>-->
        <!--<div class="user_con">-->
          <!--<img class="user_img" src="../../../asset/img/bg.png">-->
          <!--<img class="exit" src="../../../asset/img/but_exit.png">-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import request from '@/api/request';
  export default {
    data() {
      return {
        header_height: screen.height * 0.072,
        feedback_height:innerHeight,
        fb_text_height:innerHeight*0.28,
        content:''
      }
    },
    created() {
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })
    },
    methods:{
      feedback() {

        if (this.content=='') {
          layer.msg("请输入反馈内容");
        } else {
          request.post('/api/v1/app/index?svc=account&cmd=feedback', {content:this.content}).then(res=>{
            if (res && res.code==0) {
              layer.msg("反馈成功~~");
              this.$router.push({ path: '/personal/index',query:{} });
            } else {
              layer.msg(res.msg);
            }
          })
        }
      }
    }
  }
  ;
</script>
