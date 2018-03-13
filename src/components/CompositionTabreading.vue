<template>
  <div class="compositionTabreading">
    <div>
    	  <div class="com-a">
    	  	<router-link to="repertory">
	      <span class="composition">
	       <!--<i class="icon iconfont">&#xe611;</i>-->
	       <!--:src=""-->
	       <img src="../../static/img/tu3.png" class="com-img" />
	       <p>作文库</p>
	      </span>
	      </router-link>
      </div>
      <div class="com-a" style="position: absolute;left: 50%;">
      	<router-link to="bookCategory">
	      <span class="composition">
	      	<!--<i class="icon iconfont">&#xe66e;</i>-->
	      	<img src="../../static/img/wen3.png" class="com-img"/>
	      	<p>图书馆</p>
	      </span>
	     </router-link>
      </div>
    </div>
   
  </div>
</template>

<script>
import TabContainer from '../components/TabContainer';
var imgCom = "../../static/img/tu3.png";
var imgCom1 = "../../static/img/wen3.png";
export default {
  name: 'CompositionTabreading',
  components: { TabContainer },
  methods: {
      loadTop(){
        
      },
      allLoaded(){

      }
  },
  data() {
    return {
      active: 'tab-container1',
      tabO: '作文库',
      tabT: '图书馆',
      imgCom:'/static/img/tu3.744fa66.png',
      imgCom1:'/static/img/wen3.3cdb005.png'
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
  .tab-O{
  	position: relative;
  	top: .2rem;
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
  }
  .mint-tab-item{
  	padding: 17px 0px;
  }
  .composition-tag{
		padding-bottom: .5rem;
		margin-top: .5rem;
        border-bottom: .2em solid #e2e2e2;
        height: 4rem;
	}
	.compositionTabreading{
		margin-top: 1.25rem;
	}
	.composition{
		width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    padding-top: .5rem;
    padding-bottom: .5rem;
    float: left;
    text-align: center;
    border: 1px solid #CCCCCC;
    border-radius: 7px;
    box-shadow:3px 3px 3px #CCCCCC;
	}
	.iconfont{
		color: #418aff;
	}
	.com-a{
		width: 50%;
		position: absolute;
		float: left;
		margin-top: .3rem;
		height: 2rem;
	}
	.com-img{
		width: 15px;
	}
</style>
