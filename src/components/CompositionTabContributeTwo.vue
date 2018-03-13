<template>
  <div class="compositionTab">
    <div class="nav" style="margin-top: 1.25rem">
       <div class="page-tab-title">
        <mt-navbar v-model="active">
      <mt-tab-item @click.native.prevent="active = 'tab-container1'" style="border-right: 1px solid #a0a0a0;" value="tab-container1" id="tab-container1">
        <i class="iconfont">&#xe619;</i>
        <div class="font">
          文字上传
        </div>
      </mt-tab-item>
      <mt-tab-item @click.native.prevent="active = 'tab-container2' " value="tab-container2" id="tab-container2">
        <i class="iconfont">&#xe600;</i>
        <div class="font">
          图片上传
        </div>
      </mt-tab-item>
      </mt-navbar>
      </div>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
         
            <FontUploading />
            
          
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          
          
            
            
            <Imgg />
            
         
         
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import FontUploading from '../components/FontUploading'

// import ImgUploading from '../components/ImgUploading'
import Imgg from '../components/Imgg'
export default {
  name: 'CompositionTab',
  components : { FontUploading,Imgg },
  data() {
    return {
    
      active: 'tab-container1',
     
 
    };
  },
};
</script>

<style lang="css" scoped>
  .mint-tab-item{
    border-bottom: 1px solid #A0A0A0;
  }
  .mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0px;
  }
  .class-a{
    color: #F00000;
  }
  .class-b{
    color: #ff0;
  }
  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
  .page-tab-title{
    position: fixed;
    z-index: 100;
    width: 100vw;
    background: #FFFFFF;
  }
  .is-selected{
    float: left;
    width: 49.8%;
    text-align: center;
    border-bottom: 1px solid #a0a0a0;
  }
  .nav{
    padding: 0px;
  }
  .page-tab-container{
    clear: both;
    overflow-y: scroll;
  }
  .mint-tab-item{
    padding: .3em 0em;
  }
  .composition-tag{
    padding-bottom: 1em;
    padding-top: 1em;
        border-bottom: .2em solid #e2e2e2;
        height: 12em;
  }
   .font{
    font-size: .4rem;
    padding-top: .2rem;
   }
   .iconfont {
    font-family: "iconfont" !important;
    font-size: 1em;}
    .page-tabbar-tab-container{
      /*position: relative;
      top: 1.5rem;*/
      margin-top: 1.2rem;
    }
    .mint-navbar{
    height: 1.25rem;
    }
    .mint-cell{
      background-size: 100% 0px;
    }
</style>
