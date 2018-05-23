<template>
  <div>
    <div class="loading_icon">
      <div class="loading bar">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
      <p class="loading_title">加载中</p>
    </div>
  </div>
</template>
<script>
  import request from '@/api/request';
  import  '@/asset/css/KDNWidget.css';
  import KDNWidget from '@/asset/js/KDNWidget.js';

  export default {
    data() {
      return {
        warp_height: innerHeight,
        header_height: screen.height * 0.072,
        i_height: innerHeight * 0.9,
        trackingNumber:"",
        trackingCompany:'',
        KDNWidget: '',
        param:[],
      }
    },
    created() {
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })
      this.trackingNumber =this.$route.query.num;
      this.trackingCompany =this.$route.query.name;
      this.trackingCompany= this.changeReferred(this.trackingCompany);

      KDNWidget.run({
        serviceType: "A",
        expCode: this.trackingCompany ,
        expNo:  this.trackingNumber,
      })
    },
    mounted(){

    },
    watch(){

    },
    methods: {
      changeReferred(name){
        switch (name){
          case '顺丰速运':return "SF";break;
          case '百世快递':return "HTKY";break;
          case '中通快递':return "ZTO";break;
          case '申通快递':return "STO";break;
          case '圆通速递':return "YTO";break;
          case '韵达速递':return "YD";break;
          case '邮政快递包裹':return "YZPY";break;
          case 'EMS':return "EMS";break;
          case '天天快递':return "HHTT";break;
          case '京东物流':return "JD";break;
          case '全峰快递':return "QFKD";break;
          case '国通快递':return "GTO";break;
          case '优速快递':return "UC";break;
          case '德邦':return "DBL";break;
          case '快捷快递':return "FAST";break;
          case '宅急送':return "ZJS";break;
          default:  this.trackingNumber=""; return '暂无快递公司信息，请联系客服';break;
        }
      }
    }
  }
  ;
</script>
