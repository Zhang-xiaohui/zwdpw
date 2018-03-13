<template>
  <div class="video-preview">
    <div class="videobox">
      <video v-if="this.$store.state.isOpen"
        class="main-video"
        controls 
        preload="auto" 
        poster="static/videoImg.png"
        data-setup='{"example_option":true}'
      >
        <source src="static/01.webm" type="video/webm" />
        <source src="static/01.mp4" type="video/mp4" />
        <source src="static/01.ogv" type="video/ogg" />
        您的浏览器不支持本视频播放，请尝试其他浏览器
      </video>
      <video v-else
        class="main-video"
        controls 
        preload="auto" 
        poster="static/videoImg.png"
        data-setup='{"example_option":true}'
      >
        <source src="static/02.webm" type="video/webm" />
        <source src="static/02.mp4" type="video/mp4" />
        <source src="static/02.ogv" type="video/ogg" />
        您的浏览器不支持本视频播放，请尝试其他浏览器
      </video>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'video-preview',
    components: {},
    created:function(){
      this.$store.state.backUrl = "back";
      this.$store.state.titleName = "查看视频";
      this.$store.state.more = null;
      window.scrollTo(0,0);
      console.log("created");
      if(true){
        this.$store.state.isOpen=true;
      }
    },
    mounted:function(){
      const self = this;
      this.$store.state.showBottomNav = false;

      var video=document.getElementsByClassName("main-video")[0];

      //付费控制
      video.addEventListener('timeupdate', function() {
        var currentPos = video.currentTime; 
        if(currentPos>=60 && !self.$store.state.isOpen){
          video.pause();
          MessageBox({
            message: '当前资源为付费资源，支付'+0.44+'元后可浏览所有内容?',
            showCancelButton: true,
            confirmButtonText:"立即支付",
            cancelButtonText:"取消",
            closeOnClickModal:false
          }).then(
            function(action){
              if(action=="confirm"){
                alert("跳到支付页");
              }
            }
          );
        }
      });

    },
    destroyed:function(){
      this.$store.state.showBottomNav = true;
      this.$store.state.isOpen = false;
    },
    data () {
      return {
      }
    },    
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .video-preview {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    -webkit-user-select: none; 
    user-select: none;
    overflow: hidden;
  }

  .videobox {
    width: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    margin-top: 1.25rem;
    z-index: 150;
    position: absolute;
    height: 50vh;
  }
  .main-video{
    z-index: 150;
    position: absolute;
  }
  video {
    width: 100vw;
    display: block;
  }

  video::-webkit-media-controls-enclosure {
      overflow:hidden;
  }
  video::-webkit-media-controls-panel {
      width: calc(100% + 35px);
  }

</style>
<style>
  .mint-msgbox{
    border-radius: 15px;
    z-index: 20000;
  }
  .mint-msgbox-wrapper{
    z-index: 20000
  }
  .mint-msgbox-wrapper .v-modal{
    z-index: 19000
  }
</style>