<template>
  <div class="search-repertory">

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
        <TabContainer v-if="TabContainerData" :TabContainerData="TabContainerData" v-bind:dis="dis"/>
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
    data(){
			return{
        TabContainerData:[],
        dis:"",
        pageIndex:1,
        allLoaded: false,
        wrapperHeight: 0,
      }
    },
    components: {RepertoryCategory,TabContainer},
    created:function(){
      this.dis=this.$route.query.dis;
      let url=this.$store.state.url
      this.$store.state.showBottomNav = false;
      this.$store.state.showTopNav = true;
      this.$store.state.selectPath = "repertory";
      this.$store.state.titleName =this.$store.state.ArticleType;
      if( this.$route.query.title){
        this.$store.state.titleName =this.$route.query.title
      }
      this.$store.state.selectedTab = "repertory";
      this.$store.state.more = "search";
      this.$store.state.moreUrl = "searchRepertory";
      if(this.$route.query.ageDetail&&this.$route.query.dis=="1"){
        this.$http.get(url+'composion/listByTag',{
              params:{
                ageDetail:this.$route.query.ageDetail,
              }
            }).then(response => { 
            // 处理第一次返回的 response
              if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              console.log(alldata)
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"0","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.ageDetail&&this.$route.query.dis=="4"){
        this.$http.get(url+'composionZt/listByTag',{
              params:{
                ageDetail:this.$route.query.ageDetail,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"3","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
       if(this.$route.query.cRegion&&this.$route.query.dis=="1"){
        this.$http.get(url+'composion/listByTag',{
              params:{
                cRegion:this.$route.query.cRegion,
              }
            }).then(response => { 
            // 处理第一次返回的 response
              if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"0","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.cRegion&&this.$route.query.dis=="4"){
        this.$http.get(url+'composionZt/listByTag',{
              params:{
                cRegion:this.$route.query.cRegion,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"3","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.keyWord&&this.$route.query.dis=="1"){
        this.$http.get(url+'composion/listByKeyWord',{
              params:{
                keyWord:this.$route.query.keyWord,
              }
            }).then(response => { 
            // 处理第一次返回的 response
              if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"0","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.keyWord&&this.$route.query.dis=="2"){

        this.$http.get(url+'composionSc/listByKeyWord',{
              params:{
                keyWord:this.$route.query.keyWord,
              }
            }).then(response => { 

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"1","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.keyWord&&this.$route.query.dis=="3"){

        this.$http.get(url+'composionJf/listByKeyWord',{
              params:{
                keyWord:this.$route.query.keyWord,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"2","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.keyWord&&this.$route.query.dis=="4"){

        this.$http.get(url+'composionZt/listByKeyWord',{
              params:{
                keyWord:this.$route.query.keyWord,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"3","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.type&&this.$route.query.dis=="3"){

        this.$http.get(url+'composionJf/listByTag',{
              params:{
                type:this.$route.query.type,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"2","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.style&&this.$route.query.dis=="1"){

        this.$http.get(url+'composion/listByTag',{
              params:{
                style:this.$route.query.style,
              }
            }).then(response => { 
            // 处理第一次返回的 response

              if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"0","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.style&&this.$route.query.dis=="2"){

        this.$http.get(url+'composionSc/listByTag',{
              params:{
                style:this.$route.query.style,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"1","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.cType&&this.$route.query.dis=="2"){

        this.$http.get(url+'composionSc/listByTag',{
              params:{
                cType:this.$route.query.cType,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"1","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.cType&&this.$route.query.dis=="3"){

        this.$http.get(url+'composionJf/listByTag',{
              params:{
                cType:this.$route.query.cType,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"2","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.cType&&this.$route.query.dis=="4"){

        this.$http.get(url+'composionZt/listByTag',{
              params:{
                cType:this.$route.query.cType,
              }
            }).then(response => { 

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"tableName":"3","author":keyWord}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
      }
      if(this.$route.query.code&&this.$route.query.dis=="1"){
        this.$http.get(url+'composion/listComposionByCodeType',{
              params:{
                ageScale:this.$route.query.ageScale,
                code:this.$route.query.code,
                type:this.$route.query.type,
                page:1,
                rows:10,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"author":keyWord,"tableName":"0"}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
          }
      if(this.$route.query.code&&this.$route.query.dis=="2"){
        this.$http.get(url+'composionSc/listComposionByCodeType',{
              params:{
                ageScale:this.$route.query.ageScale,
                code:this.$route.query.code,
                type:this.$route.query.type,
                page:1,
                rows:10,
              }
            }).then(response => { 

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].cTypeTxt){
                  keyWord.push(alldata[i].cTypeTxt)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"author":keyWord,"tableName":"1"}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
          }
        if(this.$route.query.code&&this.$route.query.dis=="3"){
        this.$http.get(url+'composionJf/listComposionByCodeType',{
              params:{
                ageScale:this.$route.query.ageScale,
                code:this.$route.query.code,
                type:this.$route.query.type,
                page:1,
                rows:10,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].cTypeTxt){
                  keyWord.push(alldata[i].cTypeTxt)
                }
                if(alldata[i].typeTxt){
                  keyWord.push(alldata[i].typeTxt) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"author":keyWord,"tableName":"2"}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
          }
          if(this.$route.query.code&&this.$route.query.dis=="4"){
        this.$http.get(url+'composionZt/listComposionByCodeType',{
              params:{
                ageScale:this.$route.query.ageScale,
                code:this.$route.query.code,
                type:this.$route.query.type,
                page:1,
                rows:10,
              }
            }).then(response => { 
            // 处理第一次返回的 response

            if(response.body.dto.total==0){
                let ToastTip = "没有找到你想要的数据!"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
              }
              let alldata=response.body.dto.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].cTypeTxt){
                  keyWord.push(alldata[i].cTypeTxt)
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"author":keyWord,"tableName":"3"}
                )
              }
              this.TabContainerData={
                "data":newdata
              };
            })
          }

        if(this.TabContainerData.data.length>3){
          $(".mint-loadmore").css("marginTop",30)
        }
    },
    updated:function(){
      console.log("updated");
      if(this.TabContainerData.data.length>3){
        $(".mint-loadmore").css("marginTop",30)
      }
    },
    destroyed:function(){
      this.$store.state.showTopNav = true;
//    this.$store.state.titleName = null;
    },
    beforeMount:function(){
      $(".search-repertory").css("marginTop",0)
      
    },
    mounted:function(){
    	this.$store.state.backurl=this.$router.currentRoute.fullPath
      if( this.$route.query.title){
        this.$store.state.titleName =this.$route.query.title
        this.$store.state.ArticleType =this.$route.query.title;
      }else{
         this.$store.state.titleName=this.$store.state.ArticleType
      }
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      // $(".mint-loadmore").css("marginTop",50)
      
      // if(this.TabContainerData.data.length>1){
      //   $(".mint-loadmore-content").css("marginTop",50)
      // }
      
    },   
    methods:{
      loadData(pageNum){
        let url=this.$store.state.url
        let self = this;
        if(self.$route.query.ageDetail&&self.$route.query.dis=="1"){
           return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                   ageDetail:self.$route.query.ageDetail,
                   page:pageNum,
                   rows:10
              },
              url : url+'composion/listByTag',
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
      if(self.$route.query.ageDetail&&self.$route.query.dis=="4"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                    ageDetail:self.$route.query.ageDetail,
                     page:pageNum,
                   rows:10
              },
              url : url+'composionZt/listByTag',
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
       if(self.$route.query.cRegion&&self.$route.query.dis=="1"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                    cRegion:self.$route.query.cRegion,
                     page:pageNum,
                   rows:10
              },
              url : url+'composion/listByTag',
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
      if(self.$route.query.cRegion&&self.$route.query.dis=="4"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                    cRegion:self.$route.query.cRegion,
                     page:pageNum,
                   rows:10
              },
              url : url+'composionZt/listByTag',
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
      if(self.$route.query.keyWord&&self.$route.query.dis=="1"){
         return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                    keyWord:self.$route.query.keyWord,
                     page:pageNum,
                   rows:10
              },
              url : url+'composion/listByKeyWord',
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
      if(self.$route.query.keyWord&&self.$route.query.dis=="2"){
         return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                    keyWord:self.$route.query.keyWord,
                     page:pageNum,
                   rows:10
              },
              url : url+'composionSc/listByKeyWord',
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
      if(self.$route.query.keyWord&&self.$route.query.dis=="3"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                    keyWord:self.$route.query.keyWord,
                     page:pageNum,
                   rows:10
              },
              url : url+'composionJf/listByKeyWord',
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
      if(self.$route.query.keyWord&&self.$route.query.dis=="4"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                    keyWord:self.$route.query.keyWord,
                     page:pageNum,
                   rows:10
              },
              url : url+'composionZt/listByKeyWord',
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
      if(self.$route.query.type&&self.$route.query.dis=="3"){
       return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                   type:self.$route.query.type,
                    page:pageNum,
                   rows:10
              },
              url : url+'composionJf/listByTag',
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
      if(self.$route.query.style&&self.$route.query.dis=="1"){
       return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                   style:self.$route.query.style,
                    page:pageNum,
                   rows:10
              },
              url : url+'composion/listByTag',
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
      if(self.$route.query.style&&self.$route.query.dis=="2"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                   style:self.$route.query.style,
                    page:pageNum,
                   rows:10
              },
              url : url+'composionSc/listByTag',
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
      if(self.$route.query.cType&&self.$route.query.dis=="2"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                   cType:self.$route.query.cType,
                    page:pageNum,
                   rows:10
              },
              url : url+'composionSc/listByTag',
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
      if(self.$route.query.cType&&self.$route.query.dis=="3"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                   cType:self.$route.query.cType,
                    page:pageNum,
                   rows:10
              },
              url : url+'composionJf/listByTag',
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
      if(self.$route.query.cType&&self.$route.query.dis=="4"){
        return new Promise(function(resolve, reject) {
            $.ajax({
              type : "GET",
              data : {
                   cType:self.$route.query.cType,
                    page:pageNum,
                   rows:10
              },
              url : url+'composionZt/listByTag',
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
      if(self.$route.query.code&&self.$route.query.dis=="1"){
        return new Promise(function(resolve, reject) {
          $.ajax({
            type : "GET",
            data : {
                ageScale:self.$route.query.ageScale,
                code:self.$route.query.code,
                type:self.$route.query.type,
                page:pageNum,
                rows:10,
            },
            url : url+'composion/listComposionByCodeType',
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
      if(self.$route.query.code&&self.$route.query.dis=="2"){
        return new Promise(function(resolve, reject) {
        $.ajax({
            type : "GET",
            data : {
                ageScale:self.$route.query.ageScale,
                code:self.$route.query.code,
                type:self.$route.query.type,
                page:pageNum,
                rows:10,
            },
            url : url+'composionSc/listComposionByCodeType',
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
      if(self.$route.query.code&&self.$route.query.dis=="3"){
        return new Promise(function(resolve, reject) {
        $.ajax({
            type : "GET",
            data : {
                ageScale:self.$route.query.ageScale,
                code:self.$route.query.code,
                type:self.$route.query.type,
                page:pageNum,
                rows:10,
            },
            url : url+'composionJf/listComposionByCodeType',
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
      if(self.$route.query.code&&self.$route.query.dis=="4"){   
          return new Promise(function(resolve, reject) {  
          $.ajax({
            type : "GET",
            data : {
                ageScale:self.$route.query.ageScale,
                code:self.$route.query.code,
                type:self.$route.query.type,
                page:pageNum,
                rows:10,
            },
            url : url+'composionZt/listComposionByCodeType',
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
      },
      loadTop(){
         var self = this;
        self.loadData(1).then(function(value) {
           let alldata=value.list
              let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                newdata.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"author":keyWord,}
                )
              }
              self.TabContainerData={
                "data":newdata
              };
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
          $(".search-repertory").css("marginTop",0)
        }, function(e) {
          self.$refs.loadmore.onTopLoaded();
          //防止锚点错位
         $(".search-repertory").css("marginTop",0)
        });
      },
      loadBottom() {
        var self =this;
        // let pageIndex=self.pageIndex++;
        self.loadData(self.pageIndex).then(function(value) {
          self.pageIndex++
         if(self.pageIndex>2){
          if(value.list){
            if(value.pages==1){
            //  $(".repertory-body").css("paddingTop",0)
             self.allLoaded = true;
            }else{
              let alldata=value.list
              // let newdata=[]
              for(let i=0;i<alldata.length;i++){
                let keyWord=[]
                if(alldata[i].keyWord){
                  keyWord=alldata[i].keyWord.split(",")
                }
                if(alldata[i].ageDetail){
                  keyWord.push(alldata[i].ageDetail)
                }
                if(alldata[i].styleTxt){
                  keyWord.push(alldata[i].styleTxt) 
                }
                if(alldata[i].cRegion){
                  keyWord.push(alldata[i].cRegion) 
                }
                let author=''
                if(alldata[i].author==''||alldata[i].author=='无'){
                  author="佚名"
                }else{
                  author=alldata[i].author
                }
                self.TabContainerData.data.push(
                  {"id":alldata[i].id,"msgname":alldata[i].name,"bname":author,"class":alldata[i].ageDetail,"body":alldata[i].content,"author":keyWord,}
                )
              }
            }
          }else{
            self.allLoaded = true;
          }
          }
          self.$refs.loadmore.onBottomLoaded();
        }, function(e) {
          self.$refs.loadmore.onBottomLoaded();
        });
      }
    }
  }
</script>

<style scoped>
.mint-loadmore{
  
}
.repertory-body .mint-loadmore .mint-loadmore-content {
    margin-bottom: 2rem;
    margin-top: 50px;
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
  .router-css{
    line-height: 1.25rem;
    color: white;
    margin-left:10px;
  }
  .mintui {
    font-size: 20px;
    width: 5vh;
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
      overflow: scroll;
      margin-top: 30px;
  }
  .repertory-body{
  }
  .search-button{
        line-height: 1.25rem;
    font-size: 0.45rem;
    color: white;
    -webkit-flex: 1;
  }
</style>
