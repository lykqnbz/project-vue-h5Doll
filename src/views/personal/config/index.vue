<template>
  <div class="setting"  :style="'min-height:'+ set_height +'px;'">
    <header class="header" :style="'height:'+ header_height +'px;'" >
      <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        系统设置
      </div>
    </header>
    <ul class="setting_list" :style="{transform: 'translate(0,'+(header_height+10)+'px)'}">
      <li>
        <div class="list_name">背景音乐</div>
        <div id="set_but_1_1" :class="{'but_open1':video, 'but_close1':!video}" @click="changeButton_1()">
          <div id="set_but_1_2" :class="{'but_open2':video, 'but_close2':!video}" ></div>
        </div>
      </li>
      <li>
        <div class="list_name">音效</div>
        <div id="set_but_2_1" :class="{'but_open1':voice, 'but_close1':!voice}" @click="changeButton_2()">
          <div id="set_but_2_2" :class="{'but_open2':voice, 'but_close2':!voice}" ></div>
        </div>
      </li>
    </ul>
    <!--退出登录-->
    <!--<div class="sure_button" >-->
       <!--退出登录-->
    <!--</div>-->
  </div>

</template>
<script>
  import request from '@/api/request';
  export default {
    data() {
      return {
        header_height: screen.height * 0.072,
        set_height: innerHeight,
        video:true,
        voice:true
      }
    },
    created() {
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })
      if (window.localStorage.getItem('system_video')) {
        if (window.localStorage.getItem('system_video') =='false'){
          this.video =false
        } else {
          this.video = true;
        }

      }
      if (window.localStorage.getItem('system_voice')) {
        if (window.localStorage.getItem('system_voice') =='false'){
          this.voice =false
        } else {
          this.voice = true;
        }
      }
    },
    methods: {
      changeButton_1(){
//
        this.video =!this.video;
        window.localStorage.setItem("system_video", this.video);
//
//        var but_1_1=document.getElementById("set_but_1_1");
//        var but_1_2=document.getElementById("set_but_1_2");
//        but_1_1.className=(but_1_1.className=="but_close1")?"but_open1":"but_close1";
//        but_1_2.className=(but_1_2.className=="but_close2")?"but_open2":"but_close2";
      },
      changeButton_2() {

        this.voice =!this.voice;
        window.localStorage.setItem("system_voice", this.voice);
//        var but_2_1=document.getElementById("set_but_2_1");
//        var but_2_2=document.getElementById("set_but_2_2");
//        but_2_1.className=(but_2_1.className=="but_close1")?"but_open1":"but_close1";
//        but_2_2.className=(but_2_2.className=="but_close2")?"but_open2":"but_close2";
      },
    }
  }
  ;
</script>
