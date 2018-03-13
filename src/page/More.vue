<template>
  <div>
    <div class="more page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight+ 'px','-webkit-overflow-scrolling': scrollMode }">
      <mt-loadmore 
        topPullText="继续下拉刷新"
        topDropText="松手刷新"
        topLoadingText="加载中..."
        bottomPullText="加载中..."
        bottomLoadingText="加载中..."
        :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <CompositionLabel 
          :compositionData="compositionData" 
        />
      </mt-loadmore>    
    </div>
  </div>
</template>

<script>
  import CompositionLabel from "../components/CompositionLabel";
  import { Indicator } from 'mint-ui';

  export default {
    name: 'more',
    components: { CompositionLabel},
    created:function(){
        this.$store.state.titleName =this.$store.state.titleName;
        this.$store.state.backUrl = "/";
        this.$store.state.selectedTab = "home";
        this.$store.state.more = null;
        // window.scrollTo(0,0);
        let url=this.$store.state.url
        this.$http.get(url+'composion/indexListPage',{
              params:{
                type:this.$store.state.decide,
                page:1,
                rows:5,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
              this.compositionData=response.body.dto.list
              this.scrollMode = "touch"; 
            })
    },
    data () {
      return {
        "compositionData":[],
        pageIndex:1,
        allLoaded: false,
        wrapperHeight: 0,
        scrollMode:"auto"
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
       loadData(pageNum){
         let url=this.$store.state.url
        var self = this;
        console.log("loadData");
        return new Promise(function(resolve, reject) {
          console.log("loadData.....");
          $.ajax({
            type : "GET",
            data : {
              type:self.$route.query.type,
              page:pageNum||self.pageIndex,
              rows:5
            },
            url : url+'composion/indexListPage',
            dataType : "json",
            success : function (data) {
              resolve(data.dto)
              console.log(data.dto)
            },
            error : function (error) {
              reject(error);
            }
          });

        });
      },
      loadTop(){
        var self = this;
        self.pageIndex++;
        console.log("loadTop");
        this.loadData(self.pageIndex).then(function(value) {
          self.compositionData=value.list;
          self.$refs.loadmore.onTopLoaded();
          Indicator.close();
          //防止锚点错位
          $(".more .mint-loadmore .mint-loadmore-content").css("marginTop",0)
        }, function(e) {
          console.log(e);
          self.$refs.loadmore.onTopLoaded();
          Indicator.close();
          //防止锚点错位
          $(".more .mint-loadmore .mint-loadmore-content").css("marginTop",0)
        });
      },
      loadBottom() {
        console.log("loadBottom");
        var self =this;
        self.pageIndex++;
        this.loadData(self.pageIndex).then(function(value) {
          if(value){
             if(value.list.length<5){
              self.allLoaded = true;
            }else{
              let alldata=value.list
              // let newdata=[]
              for(let i=0;i<alldata.length;i++){
                self.compositionData.push(
                  {"id":alldata[i].id,"name":alldata[i].name,"content":alldata[i].content,"authorHeadSrc":alldata[i].authorHeadSrc,"author":alldata[i].author,"favrate":alldata[i].favrate,}
                )
              }
            }
          }
          self.$refs.loadmore.onBottomLoaded();
          Indicator.close();
        }, function(e) {
          console.log(e);
          self.$refs.loadmore.onBottomLoaded();
          Indicator.close();
        });
      }
     
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .more{
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
</style>
<style>
  .more .mint-loadmore> .mint-loadmore-content {
    margin-bottom:2rem;
    margin-top:0rem;
  }
</style>