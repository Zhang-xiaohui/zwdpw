<template>
	<div class="Set">
		<router-link class="router-css" to="changepassword">
			<div class="one">
				<img src="../assets/huangsemimaxiugai.png" class="img-pass"><span>密码修改</span>
			</div>
		</router-link>
		<div class="one" @click="dele">
			<img src="../assets/tuichu.png" class="img-pass"><span>退出</span>
		</div>
	</div>
</template>
<style scoped>
    .Set{
    	    margin-top: 1.25rem;
    }
	.img-pass{
		width: .5rem;
    margin-right: .3rem;
	}
	.one{
		padding: .5rem;
    border-bottom: 1px solid #ccc;
	}
	.one span{
		font-size: .6rem;
		letter-spacing: .1rem;
	}
</style>
<script type="text/javascript">
//import { setCookie,getCookie,delCookie } from '../../static/cookie.js';
import { MessageBox } from 'mint-ui';
	export default {
    name: 'Set',
    data () {
      return {
      }
    },
    created:function(){
        this.$store.state.backUrl = "me";
        this.$store.state.titleName = "设置";
        this.$store.state.selectedTab = "me";
        this.$store.state.more = null;
        window.scrollTo(0,0);
    },
    methods: {
         dele:function(){
         	let uname = localStorage.getItem("account");
         	if(!uname){
         		
         		MessageBox('提示', '请先登录');
         		
         	}else{
         		localStorage.clear() ;
         	   MessageBox.alert('注销成功').then(action => {
  this.$router.push("home")
});
         	}
         	
         }
    }
  }
</script>