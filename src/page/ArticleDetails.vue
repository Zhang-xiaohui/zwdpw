<template>
  <div class="article-details">
  	<!--<header class="mint-header header is-fixed" style="height: 1.25rem;background: #428AFF;">
  		<div class="mint-header-button is-left">
  			<button class="mint-button mint-button--default mint-button--normal" @click="detail();">
  				<span class="mint-button-icon">
  					<i class="mintui mintui-back"></i>
  				</span> 
  				<label class="mint-button-text"></label>
  			</button>
  		</div> 
  		<h1 class="mint-header-title">
  			{{this.$route.query.title}}
  		</h1> 
  		<div class="mint-header-button is-right">
  			<button class="mint-button mint-button--default mint-button--normal" id="top-navigation-right">
  				<span class="mint-button-icon">
  					<i class="mintui mintui-collect"></i>
  				</span> 
  				<label class="mint-button-text">
					
				</label>
  			</button>
  		</div>
  	</header>-->
    <div class="composition-tag" >
      <h2 class='composition-name'>{{TabContainerData.msgname}}</h2>
      <span class='author'>{{TabContainerData.bname}}</span>
      <span class='class'>{{TabContainerData.class}}</span>  
      <div class="label-body" v-html="TabContainerData.body">
        {{TabContainerData.body}}
      </div>    
      <div class="label-foot">
        <span lable-tab>标签:</span>
        <span class="label">
          <router-link 
            v-for="(it,i) in keyWords" 
            class="router-css" 
            :to="{ path: 'repertoryOne', query:{keyWord:it,title:it,dis:dis}}"
            >
            <span class="list-url" @click="toRepertoryOne(it)" >{{it}}</span>
          </router-link>
          <router-link 
            v-for="(its,index) in cRegion" 
            class="router-css" 
            :to="{ path: 'repertoryOne', query:{cRegion:its.cRegion,title:its.cRegion,dis:dis}}"
            >
            <span class="list-url" @click="toRepertoryOne(its)" >{{its.cRegion}}</span>
          </router-link>
          <router-link 
            v-for="(its,index) in ageDetail" 
            class="router-css" 
            :to="{ path: 'repertoryOne', query:{ageDetail:its.ageDetail,title:its.ageDetail,dis:dis}}"
            >
            <span class="list-url" @click="toRepertoryOne(its)" >{{its.ageDetail}}</span>
          </router-link>
          <router-link 
            v-for="(its,index) in cType" 
            class="router-css" 
            :to="{ path: 'repertoryOne', query:{cType:its.cType,title:its.cTypeTxt,dis:dis}}"
            >
            <span class="list-url" @click="toRepertoryOne(its)" >{{its.cTypeTxt}}</span>
          </router-link>
          <router-link 
            v-for="(its,index) in style" 
            class="router-css" 
            :to="{ path: 'repertoryOne', query:{style:its.style,title:its.styleTxt,dis:dis}}"
            >
            <span class="list-url" @click="toRepertoryOne(its)" >{{its.styleTxt}}</span>
          </router-link>
          <router-link 
            v-for="(its,index) in type" 
            class="router-css" 
            :to="{ path: 'repertoryOne', query:{type:its.type,title:its.typeTxt,dis:dis}}"
            >
            <span class="list-url" @click="toRepertoryOne(its)" >{{its.typeTxt}}</span>
          </router-link>
        </span>
        </span>
      </div>  
    </div>
  </div>
</template>

<script>
  import { MessageBox,Toast } from 'mint-ui';
  export default {
    name: 'article-details',
    created:function(){
      let url=this.$store.state.url
      this.$store.state.more = "collect";
      this.$store.state.backUrl = "repertory";
      this.$store.state.moreUrl = null;
      this.$store.state.showBottomNav=false;
      this.$store.state.showTopNav = true;
// this.$store.state.selectPath=this.$router.fullPath
      
//    this.$store.state.titleName = this.$store.state.ArticleType;
//    this.$store.state.titleName = this.$route.query.styleTxt;
     // window.scrollTo(0,0);
      let ageDetail=[]
      let keyWords=[]
      let cRegion=[]
      let cType=[]
      let style=[]
      let type=[]
      if(this.$route.query.dis=="1"||this.$store.state.selectdis=="1"){
        this.dis=this.$store.state.selectdis
        this.$http.get(url+'composion/getById',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response)
            if(response.body.dto.collection){
              this.$store.state.collect = "★";
//            this.$store.state.collect = "../../static/img/star-on.png"
              this.$store.state.isCont=true
            }else{
                this.$store.state.collect = "☆"
//								this.$store.state.collect = "../../static/img/star-off.png"
                this.$store.state.isCont=false
            } 
            
              let alldata=response.body.dto
              if(response.body.dto.keyWord){
                keyWords=response.body.dto.keyWord.split(",")
              }
              if(alldata.ageDetail){
                ageDetail.push({"ageDetail":alldata.ageDetail})
              }
              if(alldata.cRegion){
                cRegion.push({"cRegion":alldata.cRegion}) 
              }
              if(alldata.style){
                style.push({"style":alldata.style,"styleTxt":alldata.styleTxt}) 
              }
              console.log(keyWords)
              this.keyWords=keyWords
              this.ageDetail=ageDetail
              this.cRegion=cRegion
              this.style=style
              let name=''
              if(alldata.author==''){
                name="佚名"
              }else{
                name=alldata.author
              }
              this.TabContainerData={
                "msgname":alldata.name,
                "bname":name,
                "class":alldata.ageDetail,
                "type":alldata.type,
                "body":alldata.content,
                "author":alldata.keyWord
              }
            })
          }
      if(this.$route.query.dis=="2"||this.$store.state.selectdis=="2"){
        this.dis=this.$route.query.dis
        this.$http.get(url+'composionSc/getById',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            if(response.body.dto.collection){
              this.$store.state.collect = "★";
              this.$store.state.isCont=true
            }else{
                this.$store.state.collect = "☆"
                this.$store.state.isCont=false
            } 
             
              let alldata=response.body.dto
              if(response.body.dto.keyWord){
                keyWords=response.body.dto.keyWord.split(",")
              }
              if(alldata.cType){
                cType.push({"cType":alldata.cType,"cTypeTxt":cTypeTxt}) 
              }
              if(alldata.style){
                style.push({"style":alldata.style,"styleTxt":alldata.styleTxt}) 
              }
              console.log(keyWords)
              this.cType=cType
              this.keyWords=keyWords
              this.style=style
              let name=''
              if(alldata.author==''){
                name="佚名"
              }else{
                name=alldata.author
              }
              this.TabContainerData={
                "msgname":alldata.name,
                "bname":name,
                "class":alldata.ageDetail,
                "type":alldata.type,
                "body":alldata.content,
                "author":alldata.keyWord
              }
            })
          }
      if(this.$route.query.dis=="3"||this.$store.state.selectdis=="3"){
            this.dis=this.$route.query.dis
        this.$http.get(url+'composionJf/getById',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            if(response.body.dto.collection){
              this.$store.state.collect = "★";
              this.$store.state.isCont=true
            }else{
                this.$store.state.collect = "☆"
                this.$store.state.isCont=false
            } 
            
              let alldata=response.body.dto
              if(response.body.dto.keyWord){
                keyWords=response.body.dto.keyWord.split(",")
              }
              if(alldata.cType){
                cType.push({"cType":alldata.cType,"cTypeTxt":cTypeTxt}) 
              }
              if(alldata.type){
                type.push({"type":alldata.type,"typeTxt":typeTxt}) 
              }
              console.log(keyWords)
              this.cType=cType
              this.type=type
              this.keyWords=keyWords
              let name=''
              if(alldata.author==''){
                name="佚名"
              }else{
                name=alldata.author
              }
              this.TabContainerData={
                "msgname":alldata.name,
                "bname":name,
                "class":alldata.ageDetail,
                "type":alldata.type,
                "body":alldata.content,
                "author":alldata.keyWord
              }
            })
          }
      if(this.$route.query.dis=="4"||this.$store.state.selectdis=="4"){
            this.dis=this.$route.query.dis
        this.$http.get(url+'composionZt/getById',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
             if(response.body.dto.collection){
              this.$store.state.collect = "★";
              this.$store.state.isCont=true
            }else{
                this.$store.state.collect = "☆"
                this.$store.state.isCont=false
            } 
            
              let alldata=response.body.dto
              if(response.body.dto.keyWord){
                keyWords=response.body.dto.keyWord.split(",")
              }
              if(alldata.cRegion){
                cRegion.push({"cRegion":alldata.cRegion}) 
              }
              if(alldata.cType){
                cType.push({"cType":alldata.cType,"cTypeTxt":cTypeTxt}) 
              }
              console.log(keyWords)
              this.keyWords=keyWords
              this.cRegion=cRegion
              this.cType=cType
              let name=''
              if(alldata.author==''){
                name="佚名"
              }else{
                name=alldata.author
              }
              this.TabContainerData={
                "msgname":alldata.name,
                "bname":name,
                "class":alldata.ageDetail,
                "type":alldata.type,
                "body":alldata.content,
                "author":alldata.keyWord
              }
            })
          }
      console.log("created"); 
    },
    destroyed:function(){
      this.$store.state.showBottomNav = true;
      this.$store.state.titleName = null;
      this.$store.state.ArticleType = null;
    },
    mounted:function(){
//    this.$store.state.selectPath=this.$route.fullPath
//    if( this.$route.query.title){
//      this.$store.state.titleName =this.$route.query.title
//      this.$store.state.ArticleType =this.$route.query.title;
//    }else{
//       this.$store.state.titleName=this.$store.state.ArticleType
//    }
if( this.$route.query.title){
        this.$store.state.titleName =''
        this.$store.state.ArticleType ='';
      }else{
         this.$store.state.titleName=''
      }
      let url=this.$store.state.url
      this.$store.state.collectTag = true;
      // this.$store.state.collect = "☆";//★或☆
      this.$store.state.collectfunction = function(){
        if(!localStorage.getItem("userType")){
          MessageBox.confirm('请先去登录再执行此操作').then(action => {
            this.$router.push({path:'/loading'})
          }); 
        }else{
        this.$store.state.collect = this.$store.state.collect == "☆"?"★":"☆";
        
        if(this.$store.state.collect== "★"){
          // console.log(this.$store.state.collect)
          if(this.$route.query.dis=="1"){
             this.$http.get(url+'composion/composionCollection',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            // console.log(response) 
            
            })
          }
           if(this.$route.query.dis=="2"){
             this.$http.get(url+'composionSc/composionCollection',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            
            })
          }
           if(this.$route.query.dis=="3"){
             this.$http.get(url+'composionJf/composionCollection',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            
            })
          }
           if(this.$route.query.dis=="4"){
             this.$http.get(url+'composionZt/composionCollection',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            
            })
          }
        }else if(this.$store.state.collect== "☆"){
        console.log(this.$store.state.collect)
          if(this.$route.query.dis=="1"){
             this.$http.get(url+'composion/composionCollectionCancel',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
           
            })
          }
           if(this.$route.query.dis=="2"){
             this.$http.get(url+'composionSc/composionCollectionCancel',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            
            })
          }
           if(this.$route.query.dis=="3"){
             this.$http.get(url+'composionJf/composionCollectionCancel',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            
            })
          }
           if(this.$route.query.dis=="4"){
             this.$http.get(url+'composionZt/composionCollectionCancel',{
              params:{
                id:this.$route.query.id,
              }
            }).then(response => { 
            // 处理第一次返回的 response
            console.log(response) 
            
            })
          }
        }
        var ToastTip = this.$store.state.collect == "★"?"收藏成功":"取消收藏"
        Toast({
          message: ToastTip,
          duration: 3000
        });
        }
      }.bind(this);
    },
    destroyed:function(){
      this.$store.state.collect = "";
    },
    data(){
        return {
          TabContainerData:{},
          ageDetail:[],
          cType:[],
          cRegion:[],
          dis:[],
          keyWords:[],
          style:[],
          type:[]
      }    
    },
    methods:{
      toRepertoryOne:function(name){
          this.$store.state.ArticleType=name;
          console.log(name);
       },
        showAlertView:function(a,b){
          alert(a,b)
        },
        detail:function(){
        	if(this.$route.query.com == "1"){
        		console.log(this.$route.query.com);
      	     this.$router.push("/home")
      }else if(this.$route.query.com == "2"){
      	     this.$router.push(this.$store.state.backurl)
//console.log(this.$store.state.backurl)
      };
        }
    }
  
}
</script>

<style scoped>
   .composition-name{
    padding-top: .5rem;
    padding-bottom: .5rem;
    font-weight: 900;
    font-size: x-large;
    text-align: center;
    color: #270e2a;
   }
   .article-details{
    margin-bottom: 0.6rem;
    margin-top: 1.2rem;
    font-size: 16px
   }
  .study-tag{
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px #d9d9d9;
    color:#DE0004;
    padding: 10px;
    margin:0.7rem 0;
  }
  .author{
    position: relative;
    font-size: 0.8em;
    left: 3em;
    color: #BBBBBB;
  }
  .class{
    font-size: 0.8em;
    float: right;
    position: relative;
    right: 3em;
    color: #BBBBBB;
  }
  .info{
    width: 80%;
    margin: 0 auto 1em;
    line-height: 1.2em;
  }
  .mint-cell:last-child{
    background-size: 100% 1em;
  }
  .mint-cell-wrapper{
    margin-bottom:3.5em;
  }
  .list-url{
    margin-right:.3rem;
  }
  .label-body{
    color: #270e2a;
    margin-top:.4rem;
    line-height: 1.7em;
    text-indent: 2em;
    -o-text-overflow: ellipsis;
  }
  .label-foot{
    margin-top: .8em;
  }
  .label-foot span{
    color:#2D8BFF
  }
  .composition-tag{
    min-height: 85vh;
    padding:0  .5rem;
    border-top: 5px solid #E2E2E2;
    padding-bottom: 1em;
  }
  .mint-cell-value{
    position: relative;
    bottom: 2em;
  }
</style>