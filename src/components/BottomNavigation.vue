<!--页面主体底部导航栏-->
<template>
	<div id="bottom-navigation">

		<mt-tabbar fixed :value="this.$store.state.selectedTab">
			<mt-tab-item id="home">
				<router-link class="router-css" to="home">
					<span>
              <i class="icon iconfont">&#xe60c;</i>
              <p class="tabbar_font">首页</p>
            </span>
				</router-link>
			</mt-tab-item>
			<mt-tab-item id="schoolwork">
				<router-link class="router-css" :to="this.$store.state.identity==0 ? 'schoolwork' : 'teachertask'">
					<span>
              <i class="icon iconfont"@click='select()'>&#xe611;</i>
              <p class="tabbar_font" @click='select()'>课堂任务</p>
            </span>
				</router-link>
			</mt-tab-item>
			<mt-tab-item id="qualityReading">
				<router-link class="router-css" to="readingStyle">
					<span>
              <i class="icon iconfont">&#xe66e;</i>
              <p class="tabbar_font">精品阅读</p>
            </span>
				</router-link>
			</mt-tab-item>
			<mt-tab-item id="me">
				<router-link class="router-css" to="me">
					<span>
              <i class="icon iconfont">&#xe61e;</i>
              <p class="tabbar_font">我的</p>
            </span>
				</router-link>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
    import {MessageBox} from "mint-ui"
	export default {
		name: 'bottom-navigation',
		data: function() {
			return {}
		},
		created: function() {
//			let a=this.getCookie('userType')
			let a=localStorage.getItem("userType")
			console.log(a);
			// if(localStorage.getItem("userType")!==''){
			// 	this.$router.push({path:'/loading'})
			// }
			if(a == "001010"){
				this.$store.state.identity = 1
			}else if(a == "001011"){
				this.$store.state.identity = 0
			}
		},
		mounted:function(){
			let a=localStorage.getItem("userType")
			if(a == "001010"){
				this.$store.state.identity = 1
			}else if(a == "001011"){
				this.$store.state.identity = 0
			}
//			else{
//				MessageBox.alert('操作成功').then(action => {
//this.$router.push("home");
//});
//			}
		},
		methods: {
			select(){
				if(!localStorage.getItem("userType")){
					MessageBox('提示', '请先登录');
				}
				this.$store.state.select='1'
			},
			getCookie(c_name){
				if (document.cookie.length>0){
					let c_start=document.cookie.indexOf(c_name + "=")
					if (c_start!=-1){ 
						c_start=c_start + c_name.length+1 
						let c_end=document.cookie.indexOf(";",c_start)
						if (c_end==-1) c_end=document.cookie.length
							return unescape(document.cookie.substring(c_start,c_end))
						} 
					}
				return ""
			}
		}
	}
</script>

<style scoped>
	#bottom-navigation {
		height: 1rem;
		z-index: 1000;
	}
	
	.tabbar_icon {
		font-size: 3rem;
	}
	
	.tabbar_font {
		font-size: 0.4rem;
		margin-top: 5px;
	}
	
	.router-css {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: #9d9d9d;
	}
	
	.icon {
		font-size: 1.5em;
	}
</style>
<style>
	#bottom-navigation .mint-tabbar.is-fixed {
		z-index: 105;
	}
	
	.mint-tabbar {
		border-top: 1px solid #eaeaea;
	}
	
	.mint-tab-item {
		text-decoration: none;
	}
	
	.mint-tab-item.is-selected {
		text-decoration: none;
	}
	
	.mint-tab-item-label {
		font-size: 0.4rem;
	}
	
	.mint-tabbar .is-selected .mint-tab-item-label .router-css {
		color: #408AFF !important;
	}
</style>