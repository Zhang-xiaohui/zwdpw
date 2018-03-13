<template>
  <div class="tab">

      <!--<CompositionLabel 
        :compositionData="compositionData" 
      />-->

      <CompositionTab/>
      
  </div>
</template>

<script>
	import CompositionTab from "../components/CompositionTab";
	import BottomChecked from "../components/BottomChecked"

	export default{
		name:'tab',
		components: { CompositionTab,BottomChecked },
		data(){
			return{
				
				"compositionTab":{
			    	  	title:'我的收藏',
			    	  	data:[]
			    	 },
			}
		},
		mounted:function(){
        this.$store.state.titleName ='我的收藏';
        this.$store.state.backUrl = "/me";
        this.$store.state.selectedTab = "me";
        this.$store.state.more = null;
        this.$store.state.showBottomNav = false;
        this.$store.state.showTopNav = true;
        this.$store.state.moreTitle = "编辑";
        this.$store.state.moreUrl = null;
        this.$store.state.selectPath = "me";
         window.scrollTo(0,0);
        var self =this;
        this.$store.state.moreFtn = function(){
            self.$store.state.moreTitle = "取消";
            if($(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display") == "inline-block"){
        	    	    $(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display","none");
        	    	    $(".buy-bottom").css("display","none")
        	    	    $(".buy").css("margin-bottom","5em")
                $(".composition-tag").css("margin-left",".3rem")
                $(".composition-name").css("margin-left","0em")
        	    	   self.$store.state.moreTitle = "编辑";
        	    }else{
        	    	    $(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display","inline-block");
        	    	    $(".buy").css("margin-bottom","10em")
                $(".composition-tag").css("margin-left",".6rem")
                $(".composition-name").css("margin-left","-1.5em")
        	    	    $(".buy-bottom").css("display","block")
        	    	   self.$store.state.moreTitle = "取消";
        	    };
        }
   },
   methods(){
   	this.$store.state.titleName ='我的收藏';
   },
   destroyed:function(){
	  	this.$store.state.moreTitle = null
	  },
       methods: {
      loadTop(){
        
      },
      allLoaded(){

      },
//    loadMore() {
//      this.loading = true;
//      setTimeout(() => {
//        let last = this.compositionTab.data[this.compositionTab.data.length - 1];
//        for (let i = 1; i <= 3; i++) {
//          this.compositionTab.data.push(last);
//        }
//        this.loading = false;
//      }, 2500);
//    }
    }
	}
</script>
<style>
	.buy-bottom{
		position: fixed;
	    z-index: 100;
	    background: #FFFFFF;
	    bottom: 0rem;
	    width: 100%;
	    /*margin-left: -12px;*/
	    /*height: 5em;*/
	    display: none;
	}
</style>