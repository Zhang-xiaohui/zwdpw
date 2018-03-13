<template>
  <div class="library-list">
    <div id="composition-label" ref="wrapper" :style="{ height: wrapperHeight+ 'px','-webkit-overflow-scrolling': scrollMode }">
      <mt-loadmore 
        topPullText="继续下拉刷新"
        topDropText="松手刷新"
        topLoadingText="加载中..."
        bottomPullText="加载更多"
        bottomLoadingText="加载中..."
        :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <div class="composition-taglist">
          <div class="composition-tag" v-for="(item,i) in TabContainerDataL.list" key="i">
            <router-link
              :to="{ path: 'bookDetail',query:{id:item.id,type:2}}"
            >
              <div class="mint-cell-title">
                <label class="mint-checklist-label">
                  <span class="mint-checkbox-label">
                    <LibraryContainer :ContainerData="item" />
                  </span>
                </label>
              </div>
            </router-link>
          </div>
        </div>
      </mt-loadmore>  
    </div>
  </div>
</template>

<script>
  import LibraryContainer from "../components/LibraryContainer";
  import { Indicator,Toast } from 'mint-ui';

  export default {
    name: 'library-list',
    data () {
      return {
        TabContainerDataL:{
              list:[]
        },
        pageIndex:1,
        allLoaded: false,
        wrapperHeight: 0,
        scrollMode:"auto"
      }
    }, 
    components: { LibraryContainer},
    created:function(){
    			console.log(this.$store.state.selectPath)
         this.$store.state.titleName=this.$store.state.ArticleType
         this.$store.state.selectedTab = "library";
          this.$store.state.more = "search";
          this.$store.state.moreUrl = "searchBook";
          this.$store.state.showTopNav = true;
//        this.$store.state.selectPath = "bookCategory";
         window.scrollTo(50,0)
         console.log(this.$store.state.selectLib)
         let url=this.$store.state.url
        this.$http.get(url+'library/list',{
						params:{
							scale:this.$route.query.scale,
              resType: this.$store.state.selectLib,
              ageDetail: this.$route.query.ageDetail,
              indexPage:1,
              pageSize:10,
						}
					}).then(response => { 
            console.log(response)
            if(response.body.dto==null){
              this.TabContainerDataL.list=[]
              let instance = Toast('无数据');
              setTimeout(() => {
                instance.close();
              }, 2000);
              Indicator.close();
            }else{
              let alldata=response.body.dto.list
            let newdata=[]
						for(let i=0;i<alldata.length;i++){
								newdata.push(
									{"id":alldata[i].id,"name":alldata[i].name,"coverPic":alldata[i].coverPic,"summary":alldata[i].summary,"price":alldata[i].price,"comPrice":alldata[i].comPrice}
							)
						}
            
            this.TabContainerDataL.list=newdata
            Indicator.close();
            }
						
					})
    },
    beforeMount:function(){
      var self = this;
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    },
    destroyed:function(){
      // this.$store.state.titleName = "分类";
      // this.$store.state.selectedTab = "library";
      // this.$store.state.moreUrl = "bookCategory";
    },
    mounted() {
      this.$store.state.titleName=this.$store.state.ArticleType
         this.$store.state.selectedTab = "qualityReading";
          this.$store.state.more = "search";
          this.$store.state.moreUrl = "searchBook";
          this.$store.state.selectPath='/bookCategory'
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },  
    methods:{
      loadTop(){
        var self = this;
        console.log("loadTop");
        self.loadData(1).then(function(value) {
            let alldata=value.list
            let newdata=[]
						for(let i=0;i<alldata.length;i++){
								newdata.push(
								{"id":alldata[i].id,"name":alldata[i].name,"coverPic":alldata[i].coverPic,"summary":alldata[i].summary,"price":alldata[i].price,"comPrice":alldata[i].comPrice}
							)
						}
            self.TabContainerDataL.list=newdata
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
          $(".library-list .mint-loadmore .mint-loadmore-content").css("marginTop",0)
        }, function(e) {
          console.log(e);
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
          $(".library-list .mint-loadmore .mint-loadmore-content").css("marginTop",0)
        });
      },

      loadBottom() {
        console.log("loadBottom");
        var self =this;
      self.loadData(self.pageIndex).then(function(value) {
          console.log(value)
        self.pageIndex++
          if(value.list){
          let alldata=value.list
						for(let i=0;i<alldata.length;i++){
								self.TabContainerDataL.list.push(
									{"id":alldata[i].id,"name":alldata[i].name,"coverPic":alldata[i].coverPic,"summary":alldata[i].summary,"price":alldata[i].price,"comPrice":alldata[i].comPrice}
							)
						}
          }else{
            self.allLoaded = true;
          }
          self.$refs.loadmore.onBottomLoaded();
        }, function(e) {
          console.log(e);
          self.$refs.loadmore.onBottomLoaded();
        });
      },

      loadData(pageNum){
        console.log(pageNum)
        var vm = this;
        let url=vm.$store.state.url
        vm.loading = true;
        return new Promise(function(resolve, reject) {
          $.ajax({
            type : "GET",
            data : {
              scale:vm.$route.query.scale,
              resType: vm.$route.query.code,
              ageDetail: vm.$route.query.ageDetail,
              indexPage:pageNum,
              pageSize:10,
            },
            url : url+'library/list',
            dataType : "json",
            success : function (data) {
              // console.log(data)
              resolve(data.dto)
            },
            error : function (error) {
              reject(error);
            }
          });
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.library-list{
  margin-top: 1.2rem;
  border-top: 8px solid #E2E2E2;
}
.library-list .mint-checkbox-core{
  visibility:hidden;
}
.library-list .LibraryContainer{
  height: 4rem;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.list-title{
  margin-bottom: 1vh;
  font-weight: 500;
  font-size: 2.5vh;
  border-left:3px solid #408AFF;
  height: 5vh;
  padding-left: 6px;
}
.composition-taglist{
    margin: 1em auto;
    padding-bottom: 1rem;
}
.composition-tag{
    margin: 1em 0;
    border-bottom: 0.2rem solid #e2e2e2;
}
</style>
<style>
  .library-list .mint-button-text{
    color:red;
  }
</style>
