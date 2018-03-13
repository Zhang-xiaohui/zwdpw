<template>
  <div class="repertory">
    <div id="top-navigation">
        <mt-header class="header" fixed :title="this.$store.state.titleName">
        	<!--v-if="this.$store.state.backUrl"-->
            <mt-button   @click="routerBack" slot="left"  icon="back"></mt-button>
            <template v-if="this.$store.state.more||this.$store.state.moreTitle" >
                <router-link v-if="this.$store.state.moreUrl" :to="this.$store.state.moreUrl" slot="right" >
                    <mt-button :icon="this.$store.state.more">{{this.$store.state.moreTitle}}</mt-button>
                </router-link>
                <router-link :to="this.$store.state.moreUrl" slot="right" ></router-link>
            </template>
        </mt-header>
   </div>
    <RepertoryCategory/>
  </div>
</template>

<script>
  import RepertoryCategory from "../components/RepertoryCategory";
  
  export default {
    name: 'repertory',
    components: {RepertoryCategory},
    created:function(){
      this.$store.state.showTopNav = false;
      this.$store.state.backUrl = "readingStyle";
      this.$store.state.titleName = "作文库";
      this.$store.state.more = "search";
      // this.$store.state.moreUrl = "searchRepertory";
      this.$store.state.showBottomNav=false;
     // window.scrollTo(0,0);
      // console.log(this.$store.state.titleName);
    },
    data () {
      return {
      }
    },    
    methods:{
     routerBack:function(){
        this.$router.push("readingStyle")
      },

    },
    beforeMount:function(){
    },
    // destroyed:function(){
    //      this.$store.state.more = null;
    //      this.$store.state.moreUrl = null;
    //      this.$store.state.titleName = null;
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .repertory{
    margin-top: 55px;
    margin-bottom: 4em;
  }
   .header{
    background-color: #428AFF;
    height:1.25rem;
    z-index:999;
  }
  .navigation-right{
    font-size: 32px;
      color:#FDA405
  }
</style>
