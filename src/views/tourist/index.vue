<template>
  <div  >
   <img style="width:100%" src="http://static.88888888888888.com/wawaji/youke_small.png"/>
  </div>
</template>

<script>
  import request from '@/api/request';
  import wx from 'weixin-js-sdk'

  export default {
    data() {
      return {
      }
    },

    beforeRouteEnter(to, from, next) {
      next(vm => vm.fromRoute = from);
    },

    created() {
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })
    },
    methods: {},
    mounted() {

    },
    updated() {
    },
  }
  ;
</script>
