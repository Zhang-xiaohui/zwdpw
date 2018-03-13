<template>
  <div id='teachertask'>
    <div v-if='isWork'>
        <IsWorktrue />
    </div>
    <div v-else>
        <IsWorkfalse />
    </div>
  </div>
</template>
<script>
  import IsWorkfalse from "../components/IsWorkfalse";
  import IsWorktrue from "../components/IsWorktrue";
  export default {
    name: 'teacher-task',
    components: {IsWorkfalse,IsWorktrue},
    created:function(){
      this.$store.state.backUrl = null;
      this.$store.state.showBottomNav=true;
      this.$store.state.titleName = "课堂任务";
      this.$store.state.selectedTab = "schoolwork";
      window.scrollTo(0,0);
      let url = this.$store.state.url;
			if(!localStorage.getItem("userType")){
          this.$router.push({path:'/loading'})
       }
      this.$http.get(url+'/teacher1/task/isTeacherHaveTask').then(response => { 
            let data = response.body.dto
            
            if( data ){
               this.isWork=true 
            }else{
              this.isWork=false 
            }
      })
    },
    mounted:function(){
      console.log(this.$route.fullPath)
      this.$store.state.selectPath=this.$route.fullPath
      if(!localStorage.getItem("userType")){
          this.$router.push({path:'/loading'})
        }
    },
    data () {
      return {
          isWork:true,
      }
    }	  
  }
</script>
<style>
	#teachertask{
        height: 15rem;
    }
    #teachertask>div{
        height:100%;
    }
</style>

