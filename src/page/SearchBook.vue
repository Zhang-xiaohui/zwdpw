<template>
  <div class="search-repertory">
    <div class="search-repertory-head">
      <span class="search-title">
        <span class="router-css">
          <span @click="routerBack" class="mint-button-icon">
              <i class="mintui mintui-back"></i>
            </span>
        </span>
        <div class="mint-searchbar">
          <div class="mint-searchbar-inner">
            <i class="mintui mintui-search white"></i>
            <input 
              id="searchInput" 
              type="search" 
              :placeholder="titletext" 
              class="mint-searchbar-core"
            />
          </div> 
          <a class="mint-searchbar-cancel" style="display: none;">取消</a>
          
        </div>
        <span  @click="toSearch" class="search-button">搜索</span>
      </span>
    </div>
    <div class="repertory-body" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
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
           <div class="composition-tag" v-for="(item,i) in TabContainerData" key="i">
            <router-link
              :to="{ path: 'bookDetail',query:{id:item.id}}"
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
import { Toast } from 'mint-ui';
    import LibraryContainer from "../components/LibraryContainer";
  export default {
    name: 'search-book',
    components: {LibraryContainer},
    created:function(){
        
        console.log(this.$store.state.selectLib)
        if(this.$store.state.selectLib=="01"){
          this.titletext="搜索图书..."
        }else if(this.$store.state.selectLib=="02"){
           this.titletext="搜索视频..."
        }else{
          this.titletext="搜索音频..."
        }
    },
    mounted:function(){
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;       
      //禁用顶部导航
      this.$store.state.showTopNav = false;
      //底部导航
      this.$store.state.selectedTab = "repertory";    
      this.$store.state.showBottomNav=false; 
      // window.scrollTo(100,500);
      $(".mint-loadmore").css("marginTop",35)
    },
    updated:function(){
      console.log("updated");
      // if(this.TabContainerData.data.length>3){
        // $(".mint-loadmore").css("marginTop",35)
      // }
    },
    destroyed:function(){
      this.$store.state.showTopNav = true;
      this.$store.state.showBottomNav = true;
    },
    data () {
      return {
        TabContainerData:[],
        titletext:'',
        pageIndex:1,
        allLoaded: false,
        wrapperHeight: 0,
      }
    },    
    methods:{
      routerBack:function(){
        this.$router.back();
      },
      // lightSearched:function(){
      //   var inputValue = document.getElementById("searchInput").value;
      //   console.log(inputValue);
      //   //高亮显示
      //   $(".repertory-body").textSearch(inputValue,{"markColor":"red"});
      // },
      toSearch:function(){
        let dis=this.$store.state.selectLib
        let url=this.$store.state.url
        var inputValue = document.getElementById("searchInput").value;
        if(inputValue==''){
          let instance = Toast('搜索内容不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
        }else{
        console.log(dis+","+inputValue)
        this.$http.get(url+'libraryBySearch/queryList',{
						params:{
							searchBy:inputValue,
              resType: dis,
              pageSize: "10",
              pageIndex: '1',

						}
					}).then(response => { 
					// 处理第一次返回的 response 
          console.log(response)
						if(response.body.dto==null){
              let instance = Toast('无数据');
              setTimeout(() => {
                instance.close();
              }, 2000);
              this.TabContainerData=[]
            }else{
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                  newdata.push(
                  {"id":alldata[i].id,"name":alldata[i].name,"coverPic":alldata[i].coverPic,"summary":alldata[i].summary,"price":alldata[i].price,"comPrice":alldata[i].comPrice}
                )
              }
              this.TabContainerData=newdata
            }
            // console.log(this.TabContainerData)
          })
        }
      },
       loadTop(){
         var self = this;
        console.log("loadTop");
        self.loadData(1).then(function(value) {
          console.log(value);
           let alldata=value.list
            let newdata=[]
						for(let i=0;i<alldata.length;i++){
								newdata.push(
								{"id":alldata[i].id,"name":alldata[i].name,"coverPic":alldata[i].coverPic,"summary":alldata[i].summary,"price":alldata[i].price,"comPrice":alldata[i].comPrice}
							)
						}
            self.TabContainerData=newdata
            self.allLoaded = false;
            self.pageIndex=1
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
          $(".more .mint-loadmore .mint-loadmore-content").css("marginTop",0)
          $(".mint-loadmore").css("marginTop",0)
        }, function(e) {
          console.log(e);
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
          $(".more .mint-loadmore .mint-loadmore-content").css("marginTop",0)
          $(".mint-loadmore").css("marginTop",0)
        });
      },
      loadBottom() {
        console.log("loadBottom");
        var self =this;
          self.loadData(self.pageIndex).then(function(value) {
            self.pageIndex++
          console.log(value);
            if(value){
              let alldata=value.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                  self.TabContainerData.push(
                  {"id":alldata[i].id,"name":alldata[i].name,"coverPic":alldata[i].coverPic,"summary":alldata[i].summary,"price":alldata[i].price,"comPrice":alldata[i].comPrice}
                )
              }
            }else{
               let instance = Toast('已经到底啦~~');
                setTimeout(() => {
                  instance.close();
                }, 2000);
              self.allLoaded = true;
            }
            self.$refs.loadmore.onBottomLoaded();
          }, function(e) {
            console.log(e);
            self.$refs.loadmore.onBottomLoaded();
          });
      },
      loadData(pageNum){
        let dis=this.$store.state.selectLib
        let url=this.$store.state.url
        var inputValue = document.getElementById("searchInput").value;
        let self = this;
        console.log("loadData");
        return new Promise(function(resolve, reject) {
          console.log("loadData.....");
          $.ajax({
            type : "GET",
            data : {
              searchBy:inputValue,
              resType: dis,
              pageSize: "10",
              pageIndex:pageNum,
            },
            url : url+'libraryBySearch/queryList',
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
      
      },
    }
  }
</script>

<style scoped>
.repertory-body{
  overflow: scroll;
  padding-top: 1.5rem;
}
  .search-title{
    width:100%;
    height: 1.25rem;
    display:flex;
    display:-webkit-flex;
    display:-moz-flex;
    display:-ms-flex;
    display:-o-flex;
  }
  .search-repertory-head{
    background-color: #428AFF;
    position: fixed;
    z-index: 100;
    width: 100vw;
  }
  .router-css{
    line-height: 1.25rem;
    color: white;
    margin-left:10px;
  }
  .mintui {
    font-size: 16px;
        width: .6rem;
  }
.composition-tag{
  margin: 1em 10px;
  box-shadow: 0px 0px 20px 0px #d9d9d9;
}
  .mintui-back:before {
    content: "\E600";
  }
  .mint-searchbar{
    padding-left: 0;
    height: 0.7rem;
    background-color: #428AFF;
    display: inline-block;
    -webkit-flex:6; 
  }
  .mint-button-icon {
    vertical-align: baseline;
    display: inline-block;
  }
  .mint-searchbar-inner{
    border-radius: 3rem;
    background-color: #8DBAFE;
        padding: 2px 6px;
  }
  .mint-searchbar-core{
    background-color: #8DBAFE;
    font-size: 0.35rem;
     width:84%;
  }
  .search-repertory{ 
        overflow: hidden;
  }
  .search-button{
        line-height: 1.25rem;
    font-size: 0.45rem;
    color: white;
    -webkit-flex: 1;
  }
    ::-webkit-input-placeholder { /* WebKit browsers */  
    color:    #fff;  
}  
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
   color:    #fff;  
   opacity:  1;  
}  
::-moz-placeholder { /* Mozilla Firefox 19+ */  
   color:    #fff;  
   opacity:  1;  
}  
:-ms-input-placeholder { /* Internet Explorer 10+ */  
   color:    #fff;  
}  
.white{
  color:    #fff;  
}
</style>
