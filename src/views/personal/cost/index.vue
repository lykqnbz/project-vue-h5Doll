<template>
  <div class="costrecord"  :style="'min-height:'+ costrecord_height +'px;'">
    <header class="header" :style="'height:'+ header_height +'px;'">
      <div class="h_left"><img src="../../../asset/img/return.png" @click="$router.back()"></div>
      <div class="h_centen">
        娃娃币记录
      </div>
    </header>
    <ul class="record_list" :style="{transform: 'translate(0,'+header_height+'px)'}">
      <li v-for="bill in coinsBill">
        <div class="rl_left">
          <p>{{bill.description}}</p>
          <span>{{ bill.createTime | parseTime }}</span>
        </div>
        <div class="rl_right">
          <p v-text="(bill.coins == 0 ? '' : bill.income ? '+' : '-')  + bill.coins + '币'"></p>
        </div>
      </li>
    </ul>
    <div class='loading1' v-show="loading"><img src='../../../asset/img/loading-0.gif'/></div>
  </div>

</template>
<script>
  import request from '@/api/request';

  export default {
    data() {
      return {
        header_height: screen.height * 0.072,
        costrecord_height:innerHeight,
        index: 0,
        loading:false,
        haveData: true,
        coinsBill: [],
        fromRoute: {},
      }
    },

    beforeRouteEnter(to, from, next) {
      next(vm => vm.fromRoute = from);
    },

    created() {
      this.fetchData();
    },

    mounted: function () {

      //下拉加载
      $(window).on('scroll.cost', () => {
        if (this.loading || !this.haveData) {
          return;
        }
        if ((200 + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
          this.fetchData();
        }
      });

    },

    beforeDestroy: function () {
      $(window).off('.cost');
    },

    methods: {

      fetchData() {
        if (!this.haveData) {
          return;
        }
        this.index++;

        this.loading = true;
        request.post('/api/v1/app/index?svc=account&cmd=coinsbill', {size: 10, index: this.index}).then(res => {
          if (res && res.code == 0) {
            if (res.data.coinsBill.length < 10) {
              this.haveData = false;
            }
            for (var item of res.data.coinsBill) {
              this.coinsBill.push(item);
            }
            this.loading = false;
          } else {
            this.loading = false;
            layer.msg("对不起，服务器繁忙，请稍后再试!");
          }
        })
      }
    }
  };
</script>
