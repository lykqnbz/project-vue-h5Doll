<template>
    <div>
      <router-view></router-view>
        <div  class="nav">
            <router-link tag="div" to="/index" class="nav_list " :class="{'nav_active': $route.path=='/index'}">
                <img src="../asset/img/home_1@3x.png" v-show=" $route.path=='/index'">
                <img src="../asset/img/home_2@3x.png"  v-show=" $route.path!='/index'">
                <span>首页</span>
            </router-link>
            <router-link tag="div" to="/rank/index" class="nav_list" :class="{'nav_active': $route.path.indexOf('/rank/')!=-1}">
              <img src="../asset/img/ph_2@3x.png" v-show=" $route.path=='/rank/index'">
              <img  :class="{'jump': isJump}" src="../asset/img/ph_1@3x.png"  v-show=" $route.path.indexOf('/rank/')==-1">
              <span>大神圈</span>
            </router-link>
            <router-link tag="div" to="/mydoll/index" class="nav_list" :class="{'nav_active': $route.path=='/mydoll/index'}">
                <img src="../asset/img/mydoll_1@3x.png"  v-show=" $route.path=='/mydoll/index'">
                <img src="../asset/img/mydoll_2@3x.png" v-show=" $route.path!='/mydoll/index'">
                <span>我的娃娃</span>
                <b :class="{'redD':ifShowRed}"></b>
            </router-link>
            <router-link tag="div" to="/personal/index" class="nav_list" :class="{'nav_active': $route.path=='/personal/index'}">
                <img src="../asset/img/my_1@3x.png"  v-show=" $route.path=='/personal/index'">
                <img src="../asset/img/my_2@3x.png" v-show=" $route.path!='/personal/index'">
                <span>我的</span>
            </router-link>
        </div>
    </div>
</template>
<script>
  import request from '@/api/request';

  export default {
    data() {
      return {
        ifShowDue:false
      }
    },
    created(){
      localStorage.removeItem("mydollRed_"+commonControl.getDateYMD(0));
    },
    computed:{
      isJump(){
        if (this.$route.path=='/rank/index' || this.$route.path=='/rank/edit') {
          window.localStorage.setItem("rank_"+commonControl.getDateYMD(0), "1.1");
        }
        if (window.localStorage.getItem("rank_"+commonControl.getDateYMD(0)) !='1.1') {
           return true;
        } else {
          return false;
        }
      },
      ifShowRed(){
          request.post('/api/v1/app/index?svc=game&cmd=overdue', {}).then(res => {
            if (res.code == 0) {
                this.ifShowDue=res.data.overdue;
            }
          })
        if(this.ifShowDue){
          if (this.$route.path=='/mydoll/index') {
            window.localStorage.setItem("mydollRed_"+commonControl.getDateYMD(0), "1.1");
          }
          if (window.localStorage.getItem("mydollRed_"+commonControl.getDateYMD(0)) !='1.1') {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }
  ;
</script>

