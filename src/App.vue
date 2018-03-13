<template>
  <div id="main">
    <!--页面主体-->
    <div v-if="this.$store.state.showTopNav">
      <TopNavigation/>
    </div>
    <router-view></router-view>
    <BottomNavigation v-if="this.$store.state.showBottomNav"/>
  </div>
</template>


<script>
  import TopNavigation from "./components/TopNavigation";
  import BottomNavigation from "./components/BottomNavigation";
  export default {
    name: 'main',
    components: { TopNavigation,BottomNavigation },
    mounted:function(){
      window.onReceiveData=function(title,selectedData){
        alert(title+","+selectedData)
      }
    }
  }
</script>

<style scoped>
  #main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
<style>
  a:hover {
    text-decoration: none;
  }
</style>
