<template>
	<div class="ChangePassword">
		   <div class="change">
			<div class="mint-cell-wrapper">
				<div class="mint-wid">
					<span class="mint-cell-text"><img src="../assets/lansemima.png"></span> 
				</div> 
				<div class="mint-cell-value">
					<input placeholder="请输入旧密码" @blur="promptFirst" type="password" class="mint-field-core" v-model="oldPwd" id="oldPwd">
					<div class="mint-field-clear" style="display: none;">
						<i class="mintui mintui-field-error"></i>
					</div>
					<span class="mint-field-state is-default">
						<i class="mintui mintui-field-default"></i>
					</span> 
					
				</div>
			 </div>
			</div>
			<p class="js-prompt-1" ref="oldPwd" style="margin-left:2.2rem; color:red">*请输入旧密码</p>
			<div class="mint-cell-wrapper">
			<div class="mint-wid">
				<span class="mint-cell-text"><img src="../assets/lansemima.png"></span> 
			</div> 
			<div class="mint-cell-value">
				<input placeholder="请输入新密码" ref="newPwd" type="password" class="mint-field-core" v-model="newPwd" @blur="validate" id="newPwd">
				<div class="mint-field-clear" style="display: none;">
					<i class="mintui mintui-field-error"></i>
				</div>
				<span class="mint-field-state is-default">
					<i class="mintui mintui-field-default"></i>
				</span> 
			</div>
			</div>
			<p class="js-prompt" ref="passWord" style="margin-left:2.2rem; color:red">*请输入6~22位密码</p>
			<div class="mint-cell-wrapper">
			<div class="mint-wid">
				<span class="mint-cell-text"><img src="../assets/lansemima.png"></span> 
			</div> 
			<div class="mint-cell-value">
				<input placeholder="请再次输入新密码" @blur="promptSecond" type="password" class="mint-field-core" v-model="confirmPwd" id="confirmPwd">
				<div class="mint-field-clear" style="display: none;">
					<i class="mintui mintui-field-error"></i>
				</div>
				<span class="mint-field-state is-default">
					<i class="mintui mintui-field-default"></i>
				</span> 
			</div></div>
			<p class="js-prompt-2" ref="passWordSecond" style="margin-left:2.2rem; color:red">*密码与上次输入不一致</p>
			<div class="btn-change" @click="recompose">
			    <mt-button type="primary">确定</mt-button>
			</div>
	</div>
</template>
<style scoped>
    .change{
    	    margin-top: 1.25rem;
    }
	.mint-cell-wrapper{
		border-bottom: 1px solid #CCCCCC;
	}
	.mint-cell-text img{
		width: .5rem;
	}
	.mint-wid{
		width: 1rem;
		padding: .5rem;
	}
	.mint-field-core{
		font-size: .6rem;
	}
	.btn-change{
		width: 100%;
		text-align: center;
		margin-top: 1rem;
	}
	.mint-button--normal{
		width: 80%;
	}
	.js-prompt{
		display: none;
	}
	.js-prompt-2{
		display: none;
	}
	.js-prompt-1{
		display: none;
	}
</style>
<script type="text/javascript">
import { MessageBox } from 'mint-ui';
	export default {
    name: 'ChangePassword',
    data () {
      return {
      	oldPwd:"",
      	newPwd:"",
      	confirmPwd:""
      }
    },
    created:function(){
        this.$store.state.backUrl = "me";
        this.$store.state.titleName = "密码修改";
        this.$store.state.selectedTab = "me";
        this.$store.state.more = null;
        window.scrollTo(0,0);
    },
    methods: {
        recompose:function(){
        	  let url = this.$store.state.url;
        	  var vm = this;
        	  vm.$http.get(url + 'user/updateUserPwd', {
					params: {
						"oldPwd":this.oldPwd,
						"newPwd":this.newPwd,
						"confirmPwd":this.confirmPwd
					}
				}).then(function(data) {
					console.log(data);
					if(data.body.code == 1){
						var message = data.body.message;
						MessageBox('提示', message);
                     this.showTishi = true;
                     setCookie('account',this.username,1000*60)
                     setTimeout(function(){
                     	   this.$router.push('/home')
                     }.bind(this),1000)
						
				}else{	
						var message = data.body.message;
						MessageBox('提示', message);		
					}
					//  	   	    	 resolve(data);
				}, (response) => {
					console.log("error");
				});
			
        },
        promptFirst(){
        	if(this.oldPwd == ""){
        		this.$refs.oldPwd.style.display = "block"
        	}else{
        		this.$refs.oldPwd.style.display = "none"
        	} 
        },
        validate() {
        	let re = /^\w{6,22}$/;
        	if(re.test(this.newPwd)){
        		this.$refs.passWord.style.display = "none"
        	}else{
        		this.$refs.passWord.style.display = "block"
        	}
        },
        promptSecond() {
        	if(this.newPwd == this.confirmPwd){
        		this.$refs.passWordSecond.style.display = "none"
        	}else{
        		this.$refs.passWordSecond.style.display = "block"
        	}
        }
    }
  }
</script>