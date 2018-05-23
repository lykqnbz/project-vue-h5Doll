<template>
  <div class="room_index">
    <header class="header" style="background: #72CB5D;padding: 1% 3.5%;" :style="'height:'+ header_height +'px;'">
      <router-link tag="div" class="h_left" to="/index" replace><img src="../../asset/img/return.png" style="width:10px;height:18px;">返回</router-link>
      <div class="h_centen">
        {{dollName}}
      </div>
      <div class="h_right">
        19币/次
      </div>
    </header>
    <section class="liveimage" style="padding: 0% 3.5% 5% 3.5%;width:93%">
      <ul class="room_list">
        <router-link tag="li"  v-for="item in roomList"  :key="item.roomNum" :to="'/live/index?roomNum='+item.roomNum" class="room_list_li border_ingame" >
          <img class="wawa_img" :src="item.cover">
          <div class="ifin">
            <p style="margin-left: 2%">{{item.roomNum}}机器</p>
            <span class="ifin_1" v-if="item.status==0">维护中</span>
            <span class="ifin_2" v-if="item.status==1 && item.gameStatus==0">空闲</span>
            <span class="ifin_3" v-if="item.status==1 && item.gameStatus==1">游戏中</span>
          </div>
        </router-link>
      </ul>
    </section>
  </div>

</template>
<script>
  import request from '@/api/request';
  export default {
    data() {
      return {
        header_height:screen.height*0.06,
        room_list_li_height:screen.height*0.32,
        dollId:'',
        roomList:[],
        dollName:'',
        price:''
      }
    },

    created() {
      this.dollId = this.$route.query.dollId;
      this.dollName = this.$route.query.dollName;
      this.price = this.$route.query.price;
      request.post('/api/v1/app/index?svc=live&cmd=dolldetail', {dollId:this.dollId}).then(res=>{
//        console.info(res)
        this.roomList = res.data.rooms;
      })

    },
    method(){

    }
  }
  ;
</script>

