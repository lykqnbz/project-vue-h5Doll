<template>
  <div class="edit">
    <header class="header" :style="'height:'+ header_height +'px;'">
      <div class="h_left">
        <router-link to="/rank/index?post=true" replace><img src="../../asset/img/return@3x.png"></router-link>
      </div>
      <div class="h_centen">
        我的秀
      </div>
      <div class="h_right" @click="posted">
        发布
      </div>
    </header>
    <div class="editCon">
      <input type="text" maxlength="14" v-model="post.title" placeholder="　此处输入标题，最多14个字">
      <div></div>
      <textarea placeholder="　输入内容...." v-model="post.content">

      </textarea>
      <p class="fb_title">{{currentSize}}/140字</p>
    </div>
    <div class="editPic">
      <div class="editPicTop">
        <p>上传图片</p>
        <span>最多3张</span>
      </div>
      <div class="editPicBot">

        <div class="AlrUpLoad" v-for="img in post.imgList">
          <img :src="img">
          <span @click="deleteImg(img)"></span>
        </div>


        <div v-show="post.imgList.length<=2" class="NoUpLoad">
          <vue-file-upload
            :multiple="true"
            ref="vueFileUploader"
            :url="host+'/api/image/upload'"
            :autoUpload="true"
            :filters="filters"
            :events='cbEvents'
            :requestOptions="options">
            <span slot="label"></span>
          </vue-file-upload>
          <img  src="../../asset/img/add@3x.png">
        </div>


      </div>
    </div>


  </div>

</template>
<script>
  import request from '@/api/request';
  import VueFileUpload from 'vue-file-upload';
  export default {
    components: {
      'vue-file-upload': VueFileUpload
    },
    data() {

      return {
        warp_height: innerHeight,
        header_height: screen.height * 0.072,
        i_height: innerHeight * 0.9,
        post: {title: '', content: '', imgList: []},
        currentSize: 0,
        filters:[
          {
            name:"imageFilter",
            fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';

              if ('|jpg|png|jpeg|bmp|gif|'.indexOf(type) === -1) {
                layer.msg("只能上传图片")
              }
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
          }
        ],
        //事件回调
        cbEvents:{
          onCompleteUpload:(file,response,status,header)=>{
            console.info(response);
            this.post.imgList.push(response.data.filename)


            console.log("finish upload;")
          },
          onAddFileSuccess:(file)=>{

          },
          onProgressUpload:(file, progress) => {
          }
        },
        host:process.env.BASE_API,
        options: {
          formData:{},
          headers:{
            PLATFORM: "h5",
            TOKEN : window.localStorage.getItem("TOKEN")
          },
          responseType:'json',
          withCredentials:false
        }
      }
    },
    watch: {
      post: {
        handler(newValue, oldValue) {

          if (newValue.title.length > 14) {
            newValue.title = newValue.title.substring(0, 13);
          }
          if (newValue.content.length > 140) {
            newValue.content = newValue.content.substring(0, 139);
          }
          this.currentSize = newValue.content.length;
          if (newValue.imgList.length > 3) {
            newValue.imgList = newValue.imgList.slice(0, 3);
            layer.msg("最多3张图片")
          }
        },
        deep: true
      }
    },
    created() {
      this.$store.commit('updateLoadingStatus', {
        isLoading: false
      })

      $("body").css("background", "#f5f5f5")
    },
    methods:{
      posted(){
        console.info(123)
        if (this.post.title =='') {
          layer.msg("请输入标题");
          return ;
        }

        if (this.post.content =='') {
          layer.msg("请输入内容");
          return ;
        }

        if (this.post.imgList.length==0) {
          layer.msg("请上传图片");
          return ;
        }
        console.info(this.post)
        request.post('/api/v1/app/index?svc=show&cmd=posted', this.post).then(res=>{
          if (res.code==0) {
            this.$router.push({path: '/rank/index', query: {post:true}});
          } else {
            layer.msg(res.msg)
          }
        })
      },
      deleteImg(img){
        var index = this.post.imgList.indexOf(img)
        if (index !== -1) {
          this.post.imgList.splice(index, 1)
        }
      }
    }
  }
  ;
</script>
