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
              placeholder="搜索作文..." 
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
        <TabContainer v-if="TabContainerData" :TabContainerData="TabContainerData" />
      </mt-loadmore> 
    </div>
  </div>
  
</template>

<script>
  import RepertoryCategory from "../components/RepertoryCategory";
  import TabContainer from "../components/TabContainer";
  import { Toast } from 'mint-ui';
  export default {
    name: 'search-repertory',
    components: {RepertoryCategory,TabContainer},
    data () {
      return {
        TabContainerData:{
          "data":[]
        },
        pageIndex:1,
        allLoaded: false,
        wrapperHeight: 0,
      }
    }, 
    created:function(){
        // console.log(this.$store.state.selectdis)
    },
    mounted:function(){
       this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      //  console.log(this.wrapperHeight)
      //// window.scrollTo(0,0);        
      //禁用顶部导航
      this.$store.state.showTopNav = false;
      //底部导航
      this.$store.state.selectedTab = "repertory";    
      this.$store.state.showBottomNav=false;
      $(".TabContainer").css("marginBottom",10)     
    },
    updated:function(){
      console.log("updated");
      // this.lightSearched();
    },
    destroyed:function(){
      this.$store.state.showTopNav = true;
      this.$store.state.showBottomNav = true;
    },   
    methods:{
      routerBack:function(){
        this.$router.back();
      },
      lightSearched:function(){
        var inputValue = document.getElementById("searchInput").value;
        console.log(inputValue);
        //高亮显示
        $(".repertory-body").textSearch(inputValue,{"markColor":"red"});
      },
      toSearch:function(){
        let dis=this.$store.state.selectdis
        let url=this.$store.state.url
        this.pageIndex=1
        this.allLoaded = false;
        var inputValue = document.getElementById("searchInput").value;
        if(inputValue==''){
          let ToastTip = "搜索内容不能为空！"
          Toast({
            message: ToastTip,
            duration: 3000
          });
        }else{
          this.$http.get(url+'composionByQuery/queryList',{
            params:{
              searchBy: inputValue,
              tableName: "0"+dis,
              pageSize: "10",
              pageIndex: "1",
            }
          }).then(response => { 
          // 处理第一次返回的 response 
          console.log(response)
          if(response.body.message=="无数据"){
             let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
          }else{
            let alldata=response.body.dto.list
            let newdata=[]
            for(let i=0;i<alldata.length;i++){
                newdata.push(
                {"id":alldata[i].id,"msgname":alldata[i].name,"bname":alldata[i].author,"type":alldata[i].id,"class":alldata[i].age_detail,"body":alldata[i].content,"author":alldata[i].key_word}
              )
            }
            this.TabContainerData.data=newdata
          }
            
          })
        }
        
      },
      loadData(pageNum){
        let dis=this.$store.state.selectdis
        let url=this.$store.state.url
        var inputValue = document.getElementById("searchInput").value;
        let self = this;
        console.log("loadData");
        return new Promise(function(resolve, reject) {
          console.log("loadData.....");
          $.ajax({
            type : "GET",
            data : {
              searchBy: inputValue,
              tableName: "0"+dis,
              pageSize: "10",
              pageIndex: pageNum,
            },
            url : url+'composionByQuery/queryList',
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
      loadTop(){
         var self = this;
        console.log("loadTop");
        self.loadData(1).then(function(value) {
          console.log(value);
            let alldata=value.list
            let newdata=[]
            for(let i=0;i<alldata.length;i++){
                newdata.push(
                {"id":alldata[i].id,"msgname":alldata[i].name,"bname":alldata[i].author,"type":alldata[i].id,"class":alldata[i].age_detail,"body":alldata[i].content,"author":alldata[i].key_word}
              )
            }
            self.TabContainerData.data=newdata
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
          $(".more .mint-loadmore .mint-loadmore-content").css("marginTop",0)
        }, function(e) {
          console.log(e);
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
          $(".more .mint-loadmore .mint-loadmore-content").css("marginTop",0)
        });
      },
      loadBottom() {
        console.log("loadBottom");
        var self =this;
        // if(self.pageIndex!==1){
          self.pageIndex++
          self.loadData(self.pageIndex).then(function(value) {
            
          // return false
          console.log(value);
            if(value){
              let alldata=value.list
              for(let i=0;i<alldata.length;i++){
                  self.TabContainerData.data.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":alldata[i].author,"type":alldata[i].id,"class":alldata[i].age_detail,"body":alldata[i].content,"author":alldata[i].key_word}
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
        // }
          
       
      }
    }
  }
</script>

<style scoped>
  .search-title{
    width:100%;
    height: 1.25rem;
    display:flex;
    display:-webkit-flex;
    display:-moz-flex;
    display:-ms-flex;
    display:-o-flex;
  }
  .repertory-body{
    background-color: #fff;
        padding-top: 1rem;
    overflow: scroll;
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
