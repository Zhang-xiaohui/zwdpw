<template>
  <div class="repertory">
    <div id="top-navigation">
        <mt-header class="header" fixed :title="this.$store.state.titleName">
        <mt-button v-if="this.$store.state.backUrl"  @click="routerBack" slot="left"  icon="back"></mt-button>
        <template v-if="this.$store.state.more||this.$store.state.moreTitle" >
            <router-link v-if="this.$store.state.moreUrl" :to="this.$store.state.moreUrl" slot="right" >
                <mt-button :icon="this.$store.state.more">{{this.$store.state.moreTitle}}</mt-button>
            </router-link>
            <router-link :to="this.$store.state.moreUrl" slot="right" ></router-link>
        </template>
        </mt-header>
   </div>
    <LibraryCategory/>
  </div>
</template>

<script>
  import LibraryCategory from "../components/LibraryCategory";
  
  export default {
    name: 'library',
    components: {LibraryCategory},
    created:function(){
      this.$store.state.backUrl = "readingStyle";
      this.$store.state.titleName = "分类";
      this.$store.state.selectedTab = "library";
      this.$store.state.showBottomNav = false;
      this.$store.state.showTopNav = false;
      this.$store.state.more = "search";
      this.$store.state.moreUrl = "searchBook";
      this.$store.state.selectPath='/readingStyle'
     // window.scrollTo(0,0);
      console.log("created");
    },
    data () {
      return {
      }
    },    
    methods:{
      routerBack:function(){
//      this.$router.back();
var path=this.$store.state.selectPath
   		this.$router.push(path);
      },
      toSearch(title){
        this.$store.state.titleName = "搜索";
        this.$store.state.backUrl = "readingStyle"
        this.$store.state.more = null
      }

    },
    // destroyed:function(){
    //   this.$store.state.moreTitle = null
    //   this.$store.state.moreUrl=null
    // },
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
