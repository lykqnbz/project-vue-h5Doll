<template>
    <div class="myinvite" :style="'height:'+ inputinvite_height +'px;'" >
      <header class="header"  :style="'height:'+ header_height +'px;'">
        <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return.png"></router-link></div>
        <div class="h_centen">
          输入邀请码
        </div>
      </header>
      <!--<div class="invite_top">-->
      <!--<img src="../../../asset/img/topCartoon.png" style="width:85px;height:60px;">-->
      <!--<p>完成以后双方都有奖励哦~</p>-->
      <!--<input type="text" name="number" placeholder="填写好友给你的邀请码"   @focus="bottomShow=false" @blur="bottomShow=true" v-model="inviteCode">-->
      <!--<div class="num_sure" @click="invite">提交</div>-->
      <!--</div>-->
      <!--<p class="hint" :style="'font-size:'+hint_fonts +'px;'">小提示：你也可以邀请朋友获得更多奖励哦~</p>-->
      <!--<img class="invite_bottom" src="../../../asset/img/bottomCartoon.png"  v-show="bottomShow">-->

      <div class="nw_inputinvite_top">
        <div :style="{height:myinvite_width*0.65+'px',width:myinvite_width*0.613+'px'}">
              <input type="number" name="number"  placeholder="填写好友给你的邀请码"   @focus="bottomShow=false" @blur="bottomShow=true" v-model="inviteCode">
              <label @click="invite">提交</label>
              <span>你也可以邀请朋友一起玩哦~</span>
        </div>
        <img src="../../../asset/img/invite/introduce@3x.png">
      </div>

      <div class="nw_myinvite_bot" v-show="bottomShow">
        <img src="../../../asset/img/bottomCartoon.png">
      </div>
    </div>
</template>
<script>
  import request from '@/api/request';
  export default {
    data() {
      return {
        header_height: screen.height * 0.06,
        inputinvite_height: innerHeight,
        hint_fonts:14,
        inviteCode:'',
        bottomShow:true,
        myinvite_height: innerHeight,
        myinvite_width: innerWidth,
      }
    },
    watch:{
      inviteCode:function(){
        if(isNaN(this.inviteCode)) {
          this.inviteCode = '';
        }
      }
    },
    created() {
      if (screen.width < 350) {
        this.hint_fonts = 12
      }
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })
    },
    methods:{
      invite(){
        if(this.inviteCode =='' || this.inviteCode==null) {
          layer.msg("请输入邀请码~");
          return null;
        }
        request.post('/api/v1/app/index?svc=account&cmd=inputinvite', {inviteCode:this.inviteCode}).then(res=>{
          if (res.code==0) {
            layer.msg("被邀请成功,奖励已发放~")
          } else{
            layer.msg(res.msg)
          }
        })
      },
    }
  }
  ;
</script>
