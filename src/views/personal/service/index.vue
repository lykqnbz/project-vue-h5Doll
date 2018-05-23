<template>

  <div class="service">
    <header class="header"  :style="{height: header_height +'px'}" >
      <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        联系客服
      </div>
    </header>
  </div>
</template>
  <script>
    import request from '@/api/request';
    export default {
      data() {
        return {
          header_height: screen.height * 0.06,
          icon_height: innerHeight * 0.9,
        }
      },
      methods:{
      },
      created() {
        this.$store.commit('updateLoadingStatus', {
          isLoading: false
        })
      },
    }
    ;
  </script>
