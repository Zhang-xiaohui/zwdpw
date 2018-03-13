<template>
  <div class="compositionTab">
    <div class="nav" style="margin-top: 0.25rem;
    height: 1.5rem;
    position: relative;
    float: left;
    width: 100%;">
       <!--<div class="page-tab-titlel">
        <mt-navbar v-model="active">
      <mt-tab-item @click.native.prevent="selectFont()" style="border-right: 1px solid #a0a0a0;" value="tab-container1" id="tab-container1">
        <i class="iconfont">&#xe619;</i>
        <div class="font">
          文字作答
        </div>
      </mt-tab-item>
      <mt-tab-item @click.native.prevent="selectPic()" value="tab-container2" id="tab-container2">
        <i class="iconfont">&#xe600;</i>
        <div class="font">
          图片作答
        </div>
      </mt-tab-item>
      </mt-navbar>
      </div>-->
      <div class="tabs">
			 <div class="tab "  @click="toggleTab('FontUploadingReply')"><div class="compO" v-bind:class="{response: this.isA}"><i class="iconfont">&#xe619;</i><div>文字上传</div></div></div>
			 <div class="tab " @click="toggleTab('ImggReply')"><div class="compT" v-bind:class="{response: this.isB}"><i class="iconfont">&#xe600;</i><div>图片上传</div></div></div>
			</div>
    </div>
    <!--<div class="page-tab-container">-->
      <!--<mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <FontUploadingReply v-on:title="title"/>-->
          <FontUploadingReply :is="currentTab" keep-alive></FontUploadingReply>
        <!--</mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">

          	<ImggReply v-on:title="title"/>


        </mt-tab-container-item>
      </mt-tab-container>-->
    <!--</div>-->
  </div>
</template>

<script>
import FontUploadingReply from '../components/FontUploadingReply'

// import ImgUploading from '../components/ImgUploading'
import ImggReply from '../components/ImggReply'
export default {
  name: 'CompositionTab',
  components : { FontUploadingReply,ImggReply },
  data() {
    return {    
//    active: 'tab-container1', 
      currentTab: 'FontUploadingReply',
      isB:'',
      isA:true
    };
  },
  methods:{
  	  toggleTab: function(tab) {
  	  	console.log();
   this.currentTab = tab; // tab 为当前触发标签页的组件名
   if(tab == 'FontUploadingReply'){
   	this.isA=true;
   	this.isB=false;
   }else if(tab == 'ImggReply'){
   	this.isA=false;
   	this.isB=true;
   }
  },
	  	title(n){
	  		this.$emit('title',n)
	  	},
  		selectFont(){
  			this.active = 'tab-container1'
  			this.$store.state.isA=1;
  			console.log(this.$store.state.isA)
  		},
  		selectPic(){
  			this.active = 'tab-container2'
  			this.$store.state.isA=2
  			console.log(this.$store.state.isA)
  		},
  }
};
</script>

<style scoped>
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
  /*.page-tab-title{
    position: fixed;
    z-index: 100;
    width: 100vw;
    background: #FFFFFF;
  }*/
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
      /*margin-top: 1.2rem;*/
    }
    .mint-navbar{
    height: 1.25rem;
    border-top: 1px solid #CCCCCC;
    }
    .mint-cell{
      background-size: 100% 0px;
    }
    .mint-tab-item,.mint-navbar .mint-tab-item.is-selected{
    	  margin-bottom: -.2rem;
    }
    .tabs{
    	width: 100%;
    	height: 1.5rem;
    	position: relative;
    	text-align: center;
    }
    .tabs .tab{
    	float: left;
    	width: 50%;
    }
    .compO,.compT{
    	border: 1px solid #CCCCCC;
    	border-bottom: 2px solid #CCCCCC;
    padding-bottom: 1em;
    padding-top: 1em;
    }
    .compO{
    	border-left: none;
    }
    .compT{
    	border-right: none;
    }
    .compositionTab{
    position: relative;
    float: left;
    }
    .response{
    	border-bottom: 2px solid #26a2ff;
    color: #26a2ff;
    }
    .responseL{
    	border-bottom: 1px solid #CCCCCC;
    color: #000000;
    }
</style>
