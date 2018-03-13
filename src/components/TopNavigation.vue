 <!--页面主体顶部导航栏-->
<template>
  <div id="top-navigation">
    <mt-header class="header" fixed :title="this.$store.state.titleName">
    	
			    <mt-button v-if="this.$store.state.backUrl"  @click="routerBack" slot="left"  icon="back"></mt-button>

			<template v-if="this.$store.state.more||this.$store.state.moreTitle" >
				<mt-button 
					id="top-navigation-right"
					class="navigation-right collect"
					slot="right" 
					v-if="this.$store.state.collect"
					@click="clickCollect"
				>
				<img v-if='this.$store.state.isCont' src="http://m.pingdianedu.com:8082/xblapp/page/static/img/star-on.png"/>
				<img v-else src="http://m.pingdianedu.com:8082/xblapp/page/static/img/star-off.png"/>
				</mt-button>
				<router-link 
				 v-if="this.$store.state.moreUrl"
				:to="this.$store.state.moreUrl" slot="right" 
				>
					<mt-button 
						:icon="this.$store.state.more"
					>
						{{this.$store.state.moreTitle}}
					</mt-button>
				</router-link>
				<mt-button 
					v-else
					id="top-navigation-right"
					slot="right" 
					:icon="this.$store.state.more"
					@click = "moreFtn"
				>
					{{this.$store.state.moreTitle}}
				</mt-button>
				
			</template>
			

  	</mt-header>
  </div>
</template>
<script>
// import { MessageBox,Toast } from 'mint-ui';
  export default {
    name: 'top-navigation',

//	methods:{
//		moreFtn:function(){
// 	 this.$store.state.moreFtn()
// 	},
// 	routerBack:function(){
// 		console.log(111)
// 		var path=this.$store.state.selectPath
// 		this.$router.push(path);
////   	this.$router.back();
// 	},
//		clickCollect:function(){
//			this.$store.state.collectfunction();
//   }
//	},

		data(){
			return{
				isCont:true
			}
		},
		mounted:function(){
			this.$store.state.isCont=this.$store.state.collect=="☆" ? true : false
		},
		methods:{
			moreFtn:function(){
					this.$store.state.moreFtn()
					},
					routerBack:function(){

//						this.$router.back();
console.log(this.$store.state.selectPath)
   		this.$router.push(this.$store.state.selectPath);

//						this.$router.back();

//						var path=this.$store.state.selectPath
// 		this.$router.push(path);
					},
			clickCollect:function(){
				// if(!localStorage.getItem("userType")){
        //   MessageBox.confirm('请先去登录再执行此操作').then(action => {
        //   this.$router.push({path:'/loading'})
        // }); 
        // }else{
				this.$store.state.isCont=this.$store.state.collect=="☆" ? true : false
				this.$store.state.collectfunction();
				// }
					}
		},


  }
</script>
<style>
	.header .mint-header-title{
		font-size: 0.46rem;
		height: 1.25rem;
    	line-height: 1.25rem;
	}
	.mintui {
		font-size: 20px;
	}
	.header .mint-button-text{
    	font-size: inherit;
    	margin-right:10px; 
  	}
		.header .mint-button-text img{
    	width: .6rem;
    margin-top: .35rem;
  	}
  	.header .mintui-search{
    vertical-align: super;
  }

</style>
<style scoped>
	.header{
		background-color: #428AFF;
		height:1.25rem;
		z-index:999;
	}
	.navigation-right{
		font-size: 32px;
    	color:#FDA405
	}
  </style>
