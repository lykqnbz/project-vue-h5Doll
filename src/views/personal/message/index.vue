<template>
  <div class="messages">
    <header class="header" :style="'height:'+ header_height +'px;'" >
      <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        系统消息
      </div>
    </header>
    <ul class="msg_top" :style="{height:+ header_height*0.9 +'px',transform:'translate(0,'+header_height+'px)'}">
        <li :style="'line-height:'+ header_height*0.9 +'px;'" :class="{msg_active:!feedback}" @click="feedback=false;">系统消息</li>
        <li :style="'line-height:'+ header_height*0.9 +'px;'" :class="{msg_active:feedback}" @click="feedback=true;">我的反馈</li>
    </ul>
    <div class="msg_list" v-show="!feedback" :style="{transform:'translate(0,'+header_height*0.9+'px)'}">
      <ul class="messages_list">
        <li v-for="item in messageList">
          <div class="msg_cen">
            {{item.content}}
          </div>
          <div class="msg_time">
            {{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}
          </div>
        </li>
      </ul>
    </div>
    <div class="list" v-for="item in messageList"  v-show="feedback" :style="{transform:'translate(0,'+header_height*0.9+'px)'}">
      {{item.content}}<div class="rightImg">
      <img  :class="{'next_true':item.show, 'next_false':!item.show}" @click="item.show=!item.show" src='../../../asset/img/next.png' >
    </div>
      <div class='detail' v-show="item.show">
        <span v-if="item.replyContent">{{item.replyContent}}</span>
        <span v-else>暂无回答</span>
      </div>
    </div>
    <div class='loading1' v-show="loading"><img src='../../../asset/img/loading-0.gif'/></div>
  </div>
</template>
<script>
  import request from '@/api/request';
  export default {
    data() {
      return {
        header_height: screen.height * 0.072,
        msg_height: innerHeight,
        index: 0,
        loading:false,
        haveData: true,
        messageList: [],
        feedback:false,
      }
    },
    mounted: function () {

      //下拉加载
      $(window).on('scroll.free', () => {
        if (this.loading || !this.haveData) {
          return;
        }
        if ((200 + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
          this.fetchData();
        }
      });

    },
    beforeDestroy(){
      $("body").css("background",'none')
    },
    watch: {
      feedback:function(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.index=0;
        this.messageList=[];
        this.haveData=true;
        if (this.feedback) {
          this.fetchFeedback();
        } else {
          this.fetchData();
        }
      }
    },
    created() {
      if (this.feedback) {
        this.fetchFeedback();
      } else {
        this.fetchData();
      }
    },
    methods: {
      fetchData() {
        if (!this.haveData) {
          return;
        }
        this.index++;

        this.loading = true;
        request.post('/api/v1/app/index?svc=account&cmd=message', {size: 10, index: this.index}).then(res => {
          console.info(res)
          if (res && res.code == 0) {
            if (res.data.messageList.length <= 0) {
              this.haveData = false;
            }
            for (var item of res.data.messageList) {
              this.messageList.push(item);
            }
            this.loading = false;
          } else {
            this.loading = false;
            layer.msg("对不起，服务器繁忙，请稍后再试!");
          }
        })
      },
      fetchFeedback() {
        if (!this.haveData) {
          console.info(45)
          return;
        }
        this.index++;

        this.loading = true;
        request.post('/api/v1/app/index?svc=account&cmd=myfeedback', {size: 10, index: this.index}).then(res => {
          if (res && res.code == 0) {
            if (res.data.feedbacks.length <= 0) {
              this.haveData = false;
            }
            for (var item of res.data.feedbacks) {
              item.show=false;
              this.messageList.push(item);
            }
            this.loading = false;
          } else {
            this.loading = false;
            layer.msg("对不起，服务器繁忙，请稍后再试!");
          }
        })
      }
    },
    showStyle(show){
      return show ? 'transform:rotate(90deg)' : 'transform:rotate(270deg)';
    },
  }
  ;
</script>
<style>
  .next_true{
    transform:rotate(90deg)
  }
  .next_false{
    transform:rotate(270deg)
  }
</style>
