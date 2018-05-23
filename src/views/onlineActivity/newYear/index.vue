<template>
  <div class="yd_act">
      <img src="../../../asset/img/newYear/newYear_1.png">
      <img src="../../../asset/img/newYear/newYear_2.png">
      <img src="../../../asset/img/newYear/newYear_3.png">
      <img src="../../../asset/img/newYear/newYear_4.png">
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
