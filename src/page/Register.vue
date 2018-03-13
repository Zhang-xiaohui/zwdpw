<template>
	<div class="password">
		<div class="img-logo">
			<img :src="logoSrcL" />
		</div>
		<h2>
			{{title}}
		</h2>
		<div class="type">(请选择您的用户类型)</div>
		<div class="user-type">
			<router-link class="router-more" :to="{path:'teacher'}">
			   <div><mt-button type="primary" size="normal" class="grou">教师</mt-button></div>
			</router-link>
			<router-link class="router-more" :to="{path:'student'}">
			   <div><mt-button type="primary" size="normal" class="grou">学生</mt-button></div>
			</router-link>
		</div>
	</div>
</template>
<style>
.password{
	height: 100vh;
		 background:-moz-linear-gradient(top, #428AFF, rgba(0, 0, 255, 0.5));  
		 background:-webkit-gradient(linear, 0 0, 0 bottom, from(#428AFF), to(#4d63ff));  
}
.img-logo img{
		left: 50%;
    margin-top: 3.5rem;
    height: 2.5rem;
    width: 2.5rem;
    position: relative;
    margin-left: -1.25rem;
	}
	h2{
		text-align: center;
		width: 100%;
		font-size: .6rem;
		color: #FFFFFF;
		letter-spacing: .5rem;
		margin-top: .8rem;
	}
	.type{
		width: 100%;
		text-align: center;
		color: #FFFFFF;
	}
	.user-type{
		text-align: center;
	}
	.user-type div{
		margin-top: .5rem;
	}
	.grou{
		background: #f0ad4e;
	}
</style>
<script>
import logoSrcL from '../../static/img/logo.png';
	export default{
		name:"forgetpassword",
		created:function(){
      this.$store.state.backUrl = "home";
      this.$store.state.titleName = "注册";
//    this.$store.state.selectedTab = "loading";
      this.$store.state.more = null;
      this.$store.state.moreUrl = null;
      window.scrollTo(0,0);
      console.log("created");
    },
    mounted:function(){
//  	this.$store.state.selectedTab = "home";    
      this.$store.state.showBottomNav=false;   
    },
    data(){
    	   return{
    	   	title:'作文评点网欢迎您',
    	   	logoSrcL:logoSrcL
    	   }
      }
	}
</script>