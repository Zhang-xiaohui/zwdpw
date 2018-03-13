<template>
	<div class="contribute">
	   <CompositionTabContribute />
	</div>
</template>

<script>
import CompositionTabContribute from '../components/CompositionTabContributeTwo'
	export default{
		name:'contribute',
		components :{ CompositionTabContribute },
		data(){
			return{
				"compositionTab":{
			    	  	title:'投稿',
			    	  	data:[]
			    	},
			}
		},
		created:function(){
	        this.$store.state.titleName =this.compositionTab.title;
	        this.$store.state.backUrl = "/home";
	       
	        this.$store.state.more = null;
    },
	}
</script>
