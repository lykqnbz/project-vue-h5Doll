<template>
  <div class="logisticsQuery">
    <header class="header"  :style="'height:'+ header_height +'px;'" >
      <div class="h_left"><router-link to="/personal/index" replace><img src="../../../asset/img/return@3x.png"></router-link></div>
      <div class="h_centen">
        查看物流
      </div>
    </header>
    <div class='loading1' v-show="loading"><img src='../../../asset/img/loading-0.gif'/></div>
    <ul class="doll_query_list" :style="{transform: 'translate(0,'+header_height+'px)'}">
      <li v-for="(item,index) in logDollList">
          <div class="query_list_top">
            <div>
              <img src="../../../asset/img/other/logisticsInformation@3x.png">
              <span>{{item.trackingCompany}}</span>
              <p>{{item.trackingNumber}}</p>
            </div>
            <label :class="{'yesSend':item.trackingNumber!=null, 'noSend':item.trackingNumber==null }"></label>
          </div>
          <div class="query_list_cen">
              <div class="query_list_cen_left">
                  <img src="../../../asset/img/doll_img.jpg" :src="item.coverImg">
              </div>
              <div class="query_list_cen_right">
                <ul @click="ifShowMore(index)">
                  <li v-for="(item1,index1) in item.dollList" v-if="index1<3" class="clickLi">
                    <label>{{item1.dollName}}</label>
                    <span>X{{item1.num}}</span>
                  </li>
                  <ul v-if="item.dollList.length>3" class="clickLi">
                    <label @click="showMoreDoll=!showMoreDoll">……</label>
                    <span></span>
                  </ul>
                  <p v-for="(item2,index2) in item.dollList" v-if="index2>=3" class="clickLi" style="display: none;">
                    <label>{{item2.dollName}}</label>
                    <span>X{{item2.num}}</span>
                  </p>
                </ul>
                <span>{{item.totalNum}}</span>
              </div>
          </div>
          <div class="query_list_bot">
            <!--<router-link tag="span"  :to="{path: '/logistics/seekResults?num='+item.trackingNumber+'&name='+item.trackingCompany}">-->
                 <!--查看物流-->
            <!--</router-link>-->
            <span  @click="checkFinish(item.trackingCompany,item.trackingNumber)"  :class="{'nosend':item.trackingNumber==null}">
              查看物流
            </span>
          </div>
      </li>

    </ul>

    <div class='noContent1' v-show="!have_data && logDollList.length==0" :style="{height:wrap_height-70+'px'}">
      <img src="../../../asset/img/noDollButSend.png">
      <!--<br>-->
      <!--口袋里没有娃娃呢 ~(*>﹏<*)~-->
      <!--<router-link to="/index">-->
      <!--<div class='noContentBut'>去抓一个</div>-->
      <!--</router-link>-->
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
        wrap_height:innerHeight,
        header_height: screen.height * 0.072,
        i_height: innerHeight * 0.9,
        have_data:true,
        page: 0,
        loading: false,
        total: 0,
        logDollList: [],
        trackingNumber:"",
        trackingCompany:'',
        showMoreDoll: false,
      }
    },
    created() {
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })
      $("body").css("background", '#f5f5f5')

      this.next();
    },
    beforeDestroy() {
      $("body").css("background", 'none')
    },
    mounted: function () {
      $("body").css("background", '#f5f5f5')
    },
    methods: {

      next() {
        if (!this.have_data) {
          return;
        }
        this.page++;
        this.loading = true;

        request.post('/api/v1/app/index?svc=account&cmd=listtrace', {
          size: 10,
          index: this.page,
        }).then(res => {
          if(res){
            this.total = res.data.total;
            if (res.data.traceRecordList.length < 10) {
              this.have_data = false;
            }
            for (var item of res.data.traceRecordList) {
              this.logDollList.push(item);
            }
            this.loading = false;
          }else {
            this.loading = false;
            layer.msg("对不起，服务器繁忙，请稍后再试!");
          }
        })},
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
          default: return '暂无快递公司信息，请联系客服';break;
        }
      },
      checkFinish(name,num){
        if(num==null){return;}

        name=this.changeReferred(name);
        if(name=="暂无快递公司信息，请联系客服"){
          num="";
        }
        KDNWidget.run({
          serviceType: "A",
          expCode: name ,
          expNo:  num,
        })
      },
      ifShowMore(index) {
        if ($('.query_list_cen_right>ul').eq(index).hasClass('clickUl')) {
          $('.query_list_cen_right>ul').eq(index).removeClass('clickUl');
        } else {
          $('.query_list_cen_right>ul').eq(index).addClass('clickUl');
        }
      }
    }
  }
</script>
