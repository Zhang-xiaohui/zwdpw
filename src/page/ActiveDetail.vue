<template>
	<div class="active" style="margin-top:1.5rem;margin-bottom: 1rem;">
	   <ActiveDetailsOne /> 
	</div>
</template>

</script>
<script>
import ActiveDetailsOne from "../components/ActiveDetailsOne"
	export default{
		name : 'active',
		components :{ ActiveDetailsOne },
		data(){
			return{
				
			
			"compositionTab":{
			    	  	title:'活动详情',
			    	  	data:[]
			    	},
			 
			    	}
		},
		created:function(){
         	this.$store.state.titleName =this.compositionTab.title;
        	this.$store.state.backUrl = "/home";
        	// this.$store.state.selectedTab = "home";
			this.$store.state.showBottomNav = false;
        	this.$store.state.more = null;
			
    	},
		
	}
</script>