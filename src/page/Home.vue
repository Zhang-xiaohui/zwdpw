<template>
  <div class="home">
    <mt-loadmore :top-method="reloadData" ref="loadmore" topLoadingText="拼命加载中...">
    <HomeSwipe/>
    <div id="composition-label">
      <div class="composition-taglist">
        <div>
          <span class="list-title-new">最近更新</span>
          <router-link class="router-more" to="more" >
            <span @click="toMore('最近更新','New')">更多>></span>
          </router-link>    
        </div>
        <CompositionLabel :compositionData="compositionData" />
      </div>
    </div>
    <div id="composition-label">
      <div class="composition-taglist">
        <div>
          <span class="list-title-hot">本周热点</span>
          <router-link class="router-more" to="more" >
            <span @click="toMore('本周热点','Hot')">更多>></span>
          </router-link>    
        </div>
        <CompositionLabel :compositionData="compositionData2" />
      </div>
    </div>
  </mt-loadmore>
  </div>
</template>

<script>
  import HomeSwipe from "../components/HomeSwipe";
  import CompositionLabel from "../components/CompositionLabel";
  import { Indicator } from 'mint-ui';
  import {setCookie,getCookie} from '../../static/cookie.js'
  export default {
    name: 'home',
    components: { HomeSwipe, CompositionLabel},
    created:function(){
      this.$store.state.titleName = "首页";
      this.$store.state.showTopNav=true;
    },
    mounted:function(){
      console.log(this.$route.fullPath)
      this.$store.state.selectPath=this.$route.fullPath
      this.$store.state.showBottomNav = true;
      this.$store.state.backUrl = null;
      this.$store.state.titleName = "首页";
      this.$store.state.showTopNav=true;
      this.$store.state.selectedTab = "home";
      this.$store.state.more = "load";
      this.$store.state.moreUrl = "loading";
      let uname = localStorage.getItem("account");
//    alert(localStorage.getItem("account"));
//    if(!uname){
//    	this.$store.state.moreTitle = "登录";
//    }else{
//      this.$store.state.moreTitle = null
//    }
      
      
      window.scrollTo(0,0);

    },
    destroyed:function(){
	  	this.$store.state.moreTitle = null
	  },
    beforeMount(){
      var vm = this;
        let url=this.$store.state.url
        vm.$http.get(url+'composion/indexList',{
						params:{
							type:"New"
						}
					}).then(response => { 
					// 处理第一次返回的 response 
						console.log(response)
            // vm.$store.commit('setRecentUpdates',response.body.dto);
            vm.compositionData=response.body.dto
					return this.$http.get(url+'composion/indexList',{
            params:{
              type:"Hot"
            }
					})}).then(response => { 
					// 处理第二次返回的 response 
          vm.compositionData2=response.body.dto
					console.log(response)
          // vm.$store.commit('setHotSpotThisWeek',response.body.dto);
					})
          //活动刷新
          vm.$http.get(url+'activity/listActivity').then(response => { 
						console.log(response.body.dto)
            this.$store.state.swipeData=response.body.dto
					})
    },
    data() {      
      return {
        "compositionData":[],
        "compositionData2":[]
      }
    },    
    methods:{
      toMore(title,decide){
        this.$store.state.titleName = title;
        this.$store.state.backUrl = "load",
        this.$store.state.more = null,
        this.$store.state.decide = decide
      },
      //加载书籍
      loadData(){
        var vm = this;
        let url=this.$store.state.url
        vm.$http.get(url+'composion/indexList',{
						params:{
							type:"hot"
						}
					}).then(response => { 
					  //处理第一次返回的 response 
						console.log(response)
            vm.$store.commit('setRecentUpdates',response.body.dto);
					return this.$http.get(url+'composion/indexList',{
						params:{
							type:"Hot"
						}
					})}).then(response => { 
					// 处理第二次返回的 response 
					console.log(response)
          vm.$store.commit('setHotSpotThisWeek',response.body.dto);
					})
          vm.$http.get(url+'activity/listActivity').then(response => { 
					// 处理第一次返回的 response 
						console.log(response.body.dto)
            this.$store.state.swipeData=response.body.dto
					})
      },
      //渲染数据
      setData(){
        var self = this;
        // Indicator.open({
        //   text: '加载中...',
        //   spinnerType: 'fading-circle'
        // });
        this.loadData()
        // this.loadData().then(function (data) {
        //   console.log(data)
        //     // self.$store.commit('setRecentUpdates',data.valueByList[1]);
        //     // self.$store.commit('setHotSpotThisWeek',data.valueByList[1]);
            // Indicator.close();
        // }, function (error) {
        //     Indicator.close();
        // });
         Indicator.close();
      }
      ,
      reloadData(){
        // var self = this;
        this.loadData()
        setTimeout(() => {
                this.$refs.loadmore.onTopLoaded();
              }, 2000);
        // Promise.all([self.setData(), self.$refs["homeSwipe"].setData()]).then(function (result) {
        //   self.$refs["loadmore"].onTopLoaded();
        // });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  margin-top: 1.25rem;
  margin-bottom: 4em;
}
.list-title-new{
  margin-bottom: 1vh;
  font-weight: 500;
  font-size: 3vh;
  border-left:7px solid #408AFF;
  height: 5vh;
  padding-left: 6px;
}
.list-title-hot{
  margin-bottom: 1vh;
  font-weight: 500;
  font-size: 3vh;
  border-left:7px solid #F7A909;
  height: 5vh;
  padding-left: 6px;
}

.composition-taglist{
  margin: 1em auto;
}

.router-more{
  font-size: 2.5vh;
  height: 0;
  float: right;
  margin-right: 10px;
  top: 5px;
  position: relative;
  text-decoration:none;
  color: #B8B8B8; 
  font-weight: 400;
}

</style>
