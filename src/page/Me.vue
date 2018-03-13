<template>
	<div class="Me">
		<MeMiddle/>
		<MeBottom/>
	</div>
</template>

<script type="text/javascript">
	import MeMiddle from "../components/MeMiddle"; 
	import MeBottom from "../components/MeBottom"; 
	import { MessageBox } from 'mint-ui';
	export default {
    name: 'Me',
    components: { MeMiddle,MeBottom },
    data () {
      return {
      }
    },
    mounted:function(){
        this.$store.state.backUrl = null;
        this.$store.state.titleName = "我的";
        this.$store.state.showTopNav=true;
        this.$store.state.selectedTab = "me";
        this.$store.state.more = null;
        this.$store.state.showBottomNav=true;
        window.scrollTo(0,0);
        let uname = localStorage.getItem("account");
         	if(!uname){
         		
//       		MessageBox('提示', '请先登录');
            MessageBox.alert('请先登录').then(action => {
              this.$router.push("/loading")
            });
         		
         	}
    },
//  mounted:function(){
//    if(!localStorage.getItem("userType")){
//        this.$router.push({path:'/loading'})
//      }
//  },
    methods: {

    }
    
  }
</script>
<style scoped>
	.Me{
		background: #e2e2e2;
		z-index: -1;
		text-align: center;
		font-size: .8em;
	}
</style>