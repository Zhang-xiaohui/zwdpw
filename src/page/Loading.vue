<template>
	<div class="load">
		<mt-header class="header" fixed title="登录">
	        <mt-button @click="Back" slot="left"  icon="back"></mt-button>
       </mt-header>
		<div class="css-bg" style="height: 35vh;width: 100vw;"></div>
		<div class="mint-msgbox-input">
			<div class="dl">
				<img src="../assets/Mail Icon.png" class="icon-logo">
				<input class='inputTextBox' type="text" v-model="username" placeholder="请输入用户名">
			</div>
			<div class="dl">
				<img src="../assets/Password Icon.png" class="icon-logo">
				<input class='inputTextBox' type="password" v-model="passwordd" placeholder="请输入密码">
			</div>
		</div>
		<!--<div class="pwd">
			<div style="width: 100%;text-align: center;">
				<span class="dan-pwd"><input type="checkbox" class="mima">记住密码</span>

				<span class="dan-pwd"><a href="###">忘记密码？</a></span>

				<router-link class="router-more" :to="{path:'register'}">
					<a href="###">注册</a>
				</router-link>
			</div>
		</div>-->
		<div class="load-dl">	
			<mt-button type="primary" size="large" :disabled="invalid" @click="onLoad">登录</mt-button>			
		</div>
		<div class="contact">
			<p><span>联系我们：010-88333186</span><span>SERVICE@PINGDIANEDU.COM</span></p>
		</div>
	</div>

</template>
<style scoped>
	.load {
		/*height: 60vh;*/
		/*background: -moz-linear-gradient(top, #428AFF, rgba(0, 0, 255, 0.5));*/
		/*background: -webkit-gradient(linear, 0 0, 0 bottom, from(#428AFF), to(#4d63ff));*/
		/*background-image: url(../../static/img/zu2.png);*/
		/*background: #FFFFFF;*/
	}
	.header{
		background-color: #428AFF;
		height:1.25rem;
	}
	.mima {
		position: relative;
		top: 2px;
	}
	
	.ltitle {
		text-align: center;
		width: 100%;
		font-size: .6rem;
		color: #FFFFFF;
		letter-spacing: .5rem;
		margin-top: .3rem;
		position: relative;
	}
	
	.load-dl {
		margin-top: .5rem;
		margin-left:-.3rem;
	}
	
	.mint-button--large {
		    width: 78%;
    text-align: center;
    margin: 0px auto;
    position: fixed;
    left: 1.15rem;
    top: 12rem;
    background: #6591ff;
	}
	
	.mint-msgbox-input {
		width: 100%;
		margin-left:-.3rem;
		position:relative;
	}
	
	/*input:-webkit-autofill {
		background: #6591ff !important;
		-webkit-box-shadow: 0 0 0px 1000px #6591ff inset;
	}*/
	.mint-msgbox-input .dl{
		    margin-bottom: .5rem;
    margin-left: 0.98rem;
	}
	.mint-msgbox-input .dl input {
		width: 65%;
		height: 35px;
		background: #f6f6f6!important;
		border: 0px;
		padding-left: 1.2rem;
	}
	
	.icon-logo {
		height: .5rem;
		width: 0.6rem;
		position: relative;
		left: 1rem;
		/* padding-top: 0rem; */
		top: .1rem;
	}
	
	.dl {
		margin-bottom: .5rem;
	}
	
	.contact {
		position: fixed;
		bottom: .3rem;
		color: #aeaeae;
		font-size: .1rem;
		text-align: center;
		margin: 0px auto;
		width: 100%;
	}
	
	.pwd {
		width: 100%;
		text-align: center;
	}
	
	.dan-pwd {
		display: inline-block;
		margin-right: 1rem;
	}
	/*input:-webkit-autofill{
		-webkit-box-shadow: 0 0 0px 1000px #f6f6f6 inset;
	}*/
	.css-bg{
		margin-top: 1rem;
		background-image:url(../../static/img/login.png);
		background-size: cover;
	}
	.mint-msgbox-input input{
	-webkit-user-select:auto
	}
	input{  
		-webkit-user-select: auto;  
	}
</style>
<script>
	import { MessageBox } from 'mint-ui'	;
//	import {setCookie,getCookie} from '../../static/cookie.js'
	export default {
		name: 'loading',
		data() {
			return {
				username: '',
				passwordd: '',
				
			}
		},
		created: function() {
			this.$store.state.backUrl = false;
			this.$store.state.titleName = "登录";
			this.$store.state.showTopNav=false;
			// this.$store.state.selectedTab = "loading";
			this.$store.state.more = null;
			this.$store.state.moreUrl = null;
			window.scrollTo(0, 0);
			console.log("created");
		},
		methods: {
			Back:function(){
				this.$router.push('/home')
			},
			onLoad: function() {
//              this.$store.commit('setToken','true');     //改变token状态
//			      let redirect = decodeURIComponent(this.$route.query.redirect || '/');  //获取登录成功后要跳转的路由。
//			      this.$router.push({
//			        path: redirect
//			      })
				var vm = this;
				var urlpath = this.$store.state.url;
									

				vm.$http.get(urlpath + 'user/login', {
					params: {
						'account': this.username,
						'password': this.passwordd,
					}
				}).then(function(data) {
					console.log(data)
					if(data.body.code == 1){
						var message = data.body.message;
//						MessageBox('提示', message);
//                      this.showTishi = true;
						localStorage.setItem("account",this.username)
						localStorage.setItem("userType",data.body.dto.userType)
//                      setCookie('account',this.username,1000*60)
//                      setCookie('userType',data.body.dto.userType,1000*60)
                        setTimeout(function(){							
                        	   this.$router.push(this.$store.state.selectPath)
                        }.bind(this),1000)
						
					}else{
						var message = data.body.message;
						MessageBox('提示', message);			
					}
					//  	   	    	 resolve(data);
				}, (response) => {
					console.log("error");
				});
			}
		},
		mounted: function() {
			//  	this.$store.state.selectedTab = "home";
			this.$store.state.showTopNav=false;    
			this.$store.state.showBottomNav = false;
			if(localStorage.getItem("account")){
				this.$router.push('/home')
			}
			// this.times=setInterval(function(){
			// 	// inputTextBox.scrollIntoView(false);
			// 	document.querySelector('.inputTextBox').scrollIntoView(false);
			// },200)
			// $('.inputTextBox').bind('focus',function(){  
			// 	$('.contact').css({'position':'static','marginTop':'3.6rem'}); 
			// 	$('.mint-msgbox-input').css({'position':'static'});
			// 	$('.mint-button--large').css({'position':'absolute'});
		},
		vuerify: {
			username: 'required',
			passwordd: 'required',
		},
		computed: {
			errors() {
				return this.$vuerify.$errors
			},

			invalid() {
				return this.$vuerify.invalid
			}
		},
		destroyed: function() {
			this.$store.state.showTopNav = true;
			this.$store.state.showBottomNav = true;
		},
	}
</script>