<template>
  <div class="aboutus">
    <header class="header"  :style="'height:'+ header_height +'px;'" >
      <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        关于我们
      </div>
    </header>
    <section class="about_icon"   :style="{height:+ i_height +'px',transform:'translate(0,'+header_height+'px)'}">
        <div class="icon">
        <img src="../../../asset/img/logo.png">
        <p>版本号 V 1.4.2</p>
      </div>
      <div class="bottom">
        <p>分销，商务合作请联系我们：<br/>
        微信：amoymatthew<br/>
        <p>Copyright @2018</p>
        <p>厦门光媒科技有限公司</p>
      </div>
    </section>
  </div>

</template>
<script>
  import request from '@/api/request';
  export default {
    data() {
      return {
        warp_height:innerHeight,
        header_height: screen.height * 0.072,
        i_height: innerHeight * 0.9,
      }
    },
    created() {
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })
    },
  }
  ;
</script>
