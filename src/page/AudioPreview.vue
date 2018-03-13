<template>
  <div class="audio-preview">
  <div>
    <audio 
      id="main-audio" 
      controls
    >
      <source src="static/aaaa.ogg" />
      <source src="static/aaaa.mp3" />
      <source src="static/aaaa.wav" />
    您的浏览器不支持本音频播放，请尝试其他浏览器    
    </audio>
  </div>
    <div class="music-player">
      <img class="album" src="static/img/image_png_00002.png"/>
      <div class="dash">
        <div @click="pauseOrPlay" class="controls fa-play">
        </div>
        <div class="info">
          <i><span name="current">0:00</span> / <span name="duration">0:00</span></i>
          <label>写作辅导</label>
          <small>作文点评网</small>
        </div>
      </div>
    </div>
    <div class="volume-box">
      <span class="volume-down" @click="volumeDown" ></span>
      <mt-range 
        class="volume-range"
        v-model="volumeValue"
        :min="0"
        :max="10"
        :step="1"
        :bar-height="3"
      ></mt-range>
      <span class="volume-up" @click="volumeUp" ></span>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';

  export default {
    name: 'audio-preview',
    components: {},
    created:function(){
      this.$store.state.backUrl = "back";
      this.$store.state.titleName = "查看音频";
      this.$store.state.more = null;
      window.scrollTo(0,0);
      console.log("created");
      if(true){
        this.$store.state.isOpen=true;
      }
    },

    mounted:function(){
      var self = this;
      this.$store.state.showBottomNav = false;
      var audio = $("#main-audio")[0];
      this.volumeValue=audio.volume*10;
      //付费控制
      var rotateDeg = 0
      audio.addEventListener('timeupdate', function() {
        //音量控制
        audio.volume=self.volumeValue/10;
        //旋转唱片
        if(!audio.paused){
          for(var i=0;i<=20;i++){
            rotateDeg+=0.01;
            $(".album").css("transform","rotate("+rotateDeg+"deg) ");
            $(".album").css("-ms-transform","rotate("+rotateDeg+"deg) ");/* IE 9 */
            $(".album").css("-moz-transform","rotate("+rotateDeg+"deg) ");/* Firefox */
            $(".album").css("-webkit-transform","rotate("+rotateDeg+"deg) ");/* Safari 和 Chrome */
            $(".album").css("-o-transform","rotate("+rotateDeg+"deg) ");/* Opera */
          }

        }

        //播放进度
        $(".info span[name='duration']").html(
            Math.floor(audio.duration/60)+":"+(audio.duration%60/100).toFixed(2).slice(-2)
          );
        $(".info span[name='current']").html(
          Math.floor(audio.currentTime/60)+":"+(audio.currentTime%60/100).toFixed(2).slice(-2)
        );

        if(audio.currentTime>=60 && !self.$store.state.isOpen){

          //暂停音频
          audio.pause();
          $(".controls").removeClass("fa-pause");
          $(".controls").addClass("fa-play");

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
    beforeUpdate:function(){

    },
    destroyed:function(){
      this.$store.state.showBottomNav = true;
      this.$store.state.isOpen = false;
    },
    data () {
      return {
        volumeValue:10
      }
    },    
    methods:{
      pauseOrPlay:function(){
        var audio = $("#main-audio")[0];
        if($("#main-audio")[0].paused){
          $(".controls").addClass("fa-pause");
          $(".controls").removeClass("fa-play");
          audio.play();
        }else{
          $(".controls").removeClass("fa-pause");
          $(".controls").addClass("fa-play");
          audio.pause();
        }
      },
      volumeDown:function(){
        var audio = $("#main-audio")[0];
        if(this.volumeValue>0){
          audio.volume-=0.1;
          this.volumeValue-=1;
        }
      },
      volumeUp:function(){
        var audio = $("#main-audio")[0];
        if(this.volumeValue<10){
          audio.volume+=0.1;
          this.volumeValue+=1;
        }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .audio-preview{

  }


  .music-player { 
    margin: 3rem auto 1rem auto;
    position: relative;
    width: 9rem;
    height: 9rem;
    overflow: hidden;
    background: #252C36;
    border-radius: 50%;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, .55);
    user-select: none;
  }

  .music-player > .album
  {
    width: 100%;
  }

  .music-player > .dash
  {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 8rem;
  }

  .music-player > .dash > a
  {
    display: block;
    position: absolute;
    top: 50px;
    left: 12px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
    font-size: 22px;
    text-decoration: none;
    color: #FFF;
    text-shadow: 0 1px 5px #000;
    transition: all .3s;
    opacity: .75;
  }

  .music-player > .dash > a:hover { opacity: 1 }
  .music-player > .dash > a.fa-volume-off + .volume-level > em { display: none }

  .music-player > .dash > .volume-level
  {
    position: absolute;
    top: 57px;
    left: 45px;
    width: 40px;
    height: 6px;
    padding: 1px;
    overflow: hidden;
    border: 1px solid #FFF;
    border-radius: 3px;
    box-shadow: 0 1px 5px #000, inset 0 1px 5px rgba(0, 0, 0, .5);
    cursor: pointer;
    transition: all .3s;
    opacity: .75;
  }

  .music-player > .dash > .volume-level > em
  {
    display: block;
    height: 6px;
    max-width: 100%;
    background: #FFF;
    box-shadow: 0 1px 5px #000;
    border-radius: 1.5px;
  }

  .music-player > .dash > .volume-level:hover { opacity: 1 }

  .music-player > .dash > .seeker
  {
    position: absolute;
    bottom: 7px;
    left: 50%;
    width: 400px;
    height: 203px;
    overflow: hidden;
    margin: 0 0 0 -200px;
  }

  .music-player > .dash > .seeker > .wheel
  {
    position: absolute;
    left: 8%;
    width: 8rem;
    height: 8rem;
    border: 18px solid #201B2B;
    border-radius: 100%;
  }

  .music-player > .dash > .seeker > .wheel > .progress
  {
    position: absolute;
    bottom: -25px;
    left: 58%;
    width: 9rem;
    height: 9rem;
    overflow: hidden;
    margin: 0 0 0 -196px;
    border-radius: 100%;
    transform-origin: 50% 50%;

    transform: rotate(145deg);
  }

  .music-player > .dash > .controls
  {
    width: 2rem;
    height: 2rem;
    margin: 2.5rem auto;
    border-radius: 100%;
    box-shadow: 0px 0px 0px 1rem black;
  }

  .music-player > .dash > .controls > span[href="#play"]
  {
    content: "";
    position: absolute;
    top: 0%;
    left: 50%;
    width: 88px;
    height: 88px;
    line-height: 58px;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    font-size: 32px;
    color: #FFF;
    margin: -29px 0 0 -44px;
   /* background: #F5696C;*/
    border-radius: 100%;
    transition: all .3s;
  }

  .music-player > .dash > .controls > span[href="#play"]:hover
  {
    box-shadow: 0 0 5px white;
    text-shadow: 0 0 5px #FFF;
  }

  .music-player > .dash > .info
  {
    position: absolute;
    bottom: 55px;
    left: 50%;
    width: 180px;
    margin: 0 0 0 -90px;
    text-align: center;
    font-family: Segoe UI, sans-serif;
    font-size: 12px;
    color: #FFF;
    cursor: default;
  }

  .music-player > .dash > .info > i
  {
    display: inline-block;
    padding: 0 10px;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    font-size: 13px;
    font-style: normal;
    background: #201F22;
    border-radius: 10px;
  }

  .music-player > .dash > .info > label
  {
    display: block;
    margin: 18px 0 5px;
  }

  .music-player > .dash > .info > small { font-size: 10px }

  .fa-play{
    /*background: url("static/css/play.png") no-repeat center;*/
    background-image: url("http://pic.qiantucdn.com/58pic/14/60/94/29B58PICaiw_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center");
    background-size: 100% 105%;
  }
  .fa-pause{
    /*background: url("static/css/pause.png") no-repeat center;*/
    background-image: url("http://pic.qiantucdn.com/58pic/15/47/45/55558PICaI3_1024.png!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center");
    background-size: 100% 100%;
  }

  .controls-pause{
    background-image: url("http://pic.qiantucdn.com/58pic/15/47/45/55558PICaI3_1024.png!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center");
  }

    audio::-webkit-media-controls-enclosure {
        overflow:hidden;
    }
    audio::-webkit-media-controls-panel {
        width: calc(100% + 30px);
    }
  .volume-box{
    text-align: center;
  }
  .volume-box span{
    margin:5px 0.1rem;

    width: 0.5rem;
    height: 0.5rem;
    display: inline-block;
    clear:both;
    background-size: 100% 100%;
  }
  .volume-box >.volume-range{
    width:60%;
    display: inline-flex;
  }
  .volume-box .volume-down{
    background-image: url("../../static/img/volume-up.png");
    box-shadow: inset -0.3rem 0px 0px 0rem white;
  }
  .volume-box .volume-up{
    background-image: url("../../static/img/volume-up.png");
  }
</style>
<style>
  .audio-preview .mt-range-progress{
    background-color: #FEA406
  }

  .audio-preview .mt-range-runway {
    border-top-color: #333;
  }
</style>