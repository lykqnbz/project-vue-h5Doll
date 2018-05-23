<template>
  <div class="yd_act">
      <img src="../../../asset/img/yd/H5-1.png">
      <img src="../../../asset/img/yd/H5-2.png">
      <img src="../../../asset/img/yd/H5-3.png">
      <img src="../../../asset/img/yd/H5-4.png">

    <router-link tag="div" class="ydbut" to="/recharge/index"></router-link>
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
