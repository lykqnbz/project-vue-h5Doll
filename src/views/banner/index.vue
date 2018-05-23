<template>

  <div class="banner">
    <header class="header"  :style="{height: header_height +'px'}" >
      <div class="h_left"><router-link to="/index"><img src="../../asset/img/return.png"></router-link></div>
      <div class="h_centen">
        {{banner.name}}
      </div>
    </header>
    <iframe ref="iframe" :src="banner.url"  class="banner_class" :style="{height: banner_height +'px',width:banner_width+'px',transform: 'translate(0,'+header_height+'px)'}"   style="border: none;" ></iframe>
    <!--<header class="header"  :style="{height: header_height +'px'}" >-->
      <!--<div class="h_left"><router-link to="/index"><img src="../../asset/img/return.png"></router-link></div>-->
      <!--<div class="h_centen">-->
        <!--{{banner.name}}-->
      <!--</div>-->
    <!--</header>-->
    <!--<iframe ref="iframe" :src="banner.url"  class="banner_class" :style="{height: banner_height +'px',width:banner_width+'px'}"   style="border: none;" ></iframe>-->
  </div>
</template>
  <script>
    import request from '@/api/request';
    export default {
      data() {
        return {
          header_height: screen.height * 0.072,
          icon_height: screen.height * 0.9,
          banner_width:innerWidth,
          banner_height:innerHeight,
          bannerId:'',
          banner:{}
        }
      },
      created(){

        this.bannerId = this.$route.query.bannerId;
        console.info(this.bannerId)
        request.post("/api/v1/app/index?svc=config&cmd=bannerbyid", {bannerId :this.bannerId }).then(res => {
          if (res && res.code == 0) {
          this.banner= res.data.banner
          }
        });
      },
      methods:{
      }
    }
    ;
  </script>
