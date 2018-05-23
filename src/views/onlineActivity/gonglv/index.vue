<template>
  <div class="yd_act">
      <img src="../../../asset/img/gonglv/1.jpg">
      <img src="../../../asset/img/gonglv/2.jpg">
      <img src="../../../asset/img/gonglv/3.jpg">
      <img src="../../../asset/img/gonglv/4.jpg">
  </div>
</template>
  <script>
    import request from '@/api/request';
    export default {
      data() {
        return {
          header_height: screen.height * 0.072,
          wrap_width:innerWidth,
          wrap_height:innerHeight,
        }
      },
      created(){

        this.$store.commit('updateLoadingStatus', {
          isLoading: false
        })
      },
      methods:{
      }
    }
    ;
  </script>
