<template>
  <div class="book-detail">
  	<div class="mint-header header is-fixed">
		<div class="mint-header-button is-left">
			<button class="mint-button mint-button--default mint-button--normal" @click="back();">
				<span class="mint-button-icon">
					<i class="mintui mintui-back"></i>
				</span> 
				<label class="mint-button-text"></label>
			</button>
		</div>
		<h1 class="mint-header-title">图书详情</h1> 
		<div class="mint-header-button is-right"></div>
		</div>
    <div class="book-data">
    <mt-loadmore 
        topPullText="继续下拉刷新"
        topDropText="松手刷新"
        :top-method="loadTop" 
        ref="loadmore"
      >  
      <div class="book-base">
          <img :src="ContainerData.imgUrl" class="img-url" />
          <div class="book-base-body">
            <p class="title-lib">{{ContainerData.titleL}}</p>
            <div id="mark">
              <span id="ceas"></span>
              <span class="comment-number">{{this.ContainerData.evaluate}}人评价</span> 
            </div>
            <p class="author">作者：<span>{{ContainerData.author}}</span></p>
            <p class="publisher">出版方：{{ContainerData.publisher}}</p>
            <div>
               <span class="price-lib">￥{{ContainerData.yprice}}</span>
               <span class="yprice-lib">原价：<del class="yprice">{{ContainerData.price}}</del></span>
            </div>
          </div>
      </div>

      <div class="information-taggle">
         <span class="information-taggle-title">简介</span>
         <div id="synopsis-taggle-body" class="information-taggle-body">
           <p>{{ContainerData.content}}</p>
         </div>
         <div id="synopsis" class="show-all-taggle" @click="taggleClick('synopsis')">----查看全部----</div>
      </div>

      <div class="information-taggle">
         <span class="information-taggle-title">图书目录</span>
         <div id="catalog-taggle-body" class="information-taggle-body" v-if="catalogShow">
           <div v-for="item,i in catalog" key="i">
              <img :src="item.url" class="img-catalog" />
           </div>
         </div>
         <div id="catalog" class="show-all-taggle" @click="taggleClick('catalog')">----查看全部----</div>
      </div>

      <div class="information-taggle">
        <span class="information-taggle-title">图书评论</span>
        <div id="mark-body" class="mark-body">
          <span>评星打分：</span>
          <span id="newMark"></span>
        </div>
        <div id="comment-body" class="comment-body" v-for="item,i in comment" key="i">
            <div class="time">{{item.time}}</div>
            <div class="comment-content">
              {{item.content}}
            </div>
            <div class="cel">
              <span class='cel-box'>
                <img :src="item.authorImg" class="author-img">
                <span class="author-name">{{item.name}}</span>
              </span>
              <span class="button-box">
                <span @click="toReplyThis(item.userId,item.name)">回复</span>
                <span v-if="checkUser" @click="delMyCel(item.userId)" class="del">删除</span>
              </span>
            </div>
            <div class="reply">
              <div  v-for="it,index in item.commenChilds" key="index" class="replyChild">
                <span class="user-name"><span @click="toReplyThis(item.userId,item.name)">{{it.name}}</span><span class='huifu'>{{it.content}}</span></span>
              </div>
            </div>
        </div>
      </div>
      </mt-loadmore>
    </div>
    <div class="bottom-btn-box" v-if="isBuy">
      <span class="discuss" @click="bookcomment(ContainerData.id)"><img src="../../static/img/argument.png"/>评论</span>
      <span class="tag"></span>
      <span class="collect" style="margin-left: .3rem;" @click="bookCollection(ContainerData.id)"><img v-if='isCont' src="http://m.pingdianedu.com:8082/xblapp/page/static/img/star-on.png"/><img v-else src="http://m.pingdianedu.com:8082/xblapp/page/static/img/star-off.png"/>收藏</span>
     
        <span class="previews" style="margin-left: 2rem;" @click="probation(ContainerData.id,ContainerData.titleL,ContainerData.yprice)">立即阅读</span>
    </div>
    <div class="bottom-btn-box" v-else>
      <span class="discuss" @click="bookcomment(ContainerData.id)"><img src="../../static/img/argument.png"/>评论</span>
      <span class="tag"></span>
      <span class="collect" @click="bookCollection(ContainerData.id)"><img v-if='isCont' src="http://m.pingdianedu.com:8082/xblapp/page/static/img/star-on.png"/><img v-else src="http://m.pingdianedu.com:8082/xblapp/page/static/img/star-off.png"/>收藏</span>
     
        <span class="previews" @click="probation(ContainerData.id,ContainerData.titleL,ContainerData.yprice)">免费试读</span>
      <span class="buy" @click="buyBook(ContainerData.id,ContainerData.titleL,ContainerData.yprice,ContainerData.type)">立即购买</span>
    </div>
    <div id="reply-box">
      <input id="reply-input" v-model="content" />
      <span id="reply-button" @click="replyThis">提交</span>
    </div>
    <div id="replyUser-box">
      <input id="reply-input" v-model="content" />
      <span id="reply-button" @click="replyUser">提交</span>
    </div>
    <!--<div id="buyTrue" v-if="showBuyTrue">
      <div class="buyBox">
        <div class="buyTop">
          <span class='buyClose' @click="closeBuyTrue">X</span>
          <i class="buyLine"></i>
        </div>
        <div class="buyCon">
          <div class='buyImg'></div>
          <div class="buyOkFont">付款成功</div>
          <button class="buyOk">确认</button>
        </div>
      </div>
    </div>
    <div id="buyAg" v-if="showBuyAg">
      <div class="buyBox">
        <div class="buyTop">
          <span class='buyClose' @click="closeBuyAg">X</span>
          <i class="buyLine"></i>
        </div>
        <div class="buyCon">
          <div class='buyNoImg'></div>
          <div class="buyReFont">哦~~支付失败，请重新支付</div>
          <button class="buyRe"  @click="buyBook(ContainerData.id,ContainerData.titleL,ContainerData.yprice,ContainerData.type)">重新支付</button>
        </div>
      </div>
    </div>
    <div id="buyAg" v-if="showBuyBook">
      <div class="buyBox">
        <div class="buyTop">
          <span class='buyClose' @click="closeBuyBook">X</span>
          <i class="buyLine"></i>
        </div>
        <div class="buyCon">
        <p class='buyCon-font'>{{ContainerData.titleL}}</p>
        <p class='buyCon-price-font'>价格：{{ContainerData.yprice}}</p>
         <img class="q_code" :src='"http://192.168.102.229:9080/xblapp/alipay/orderpay?id="+ContainerData.id+"&name="+ContainerData.titleL+"&price="+ContainerData.yprice+"&type="+ContainerData.type' />
         </div>
      </div>
    </div>
    -->
    
  </div>
  
</template>

<script>
  import RepertoryCategory from "../components/RepertoryCategory";
  import { MessageBox,Toast } from 'mint-ui';
  export default {
    name: 'book-detail',
    components: {RepertoryCategory},
    created:function(){
      this.$store.state.backUrl = "back";
      this.$store.state.showTopNav = false;
      if(this.$store.state.selectLib=="01"){
          this.$store.state.titleName = "图书详情";
        }else if(this.$store.state.selectLib=="02"){
          this.$store.state.titleName = "视频详情";
        }else if(this.$store.state.selectLib=="03"){
          this.$store.state.titleName = "音频详情";
        }
      this.$store.state.more = null;
     //window.scrollTo(0,0);
      this.isSuccess()
      let url=this.$store.state.url
        this.$http.get(url+'library/details',{
						params:{
							id:this.$route.query.id,
              resType:this.$store.state.selectLib
						}
					}).then(response => { 
            console.log(response.body.dto)
            this.isCont=response.body.dto.collection
            this.isBuy=response.body.dto.buy
            let alldata=response.body.dto.commenDOs
            this.id=response.body.dto.id
            if(response.body.dto.cataprocessUrl){
              let pages=response.body.dto.cataprocessUrl.substring(response.body.dto.cataprocessUrl.lastIndexOf("/")+1,response.body.dto.cataprocessUrl.length)
              let nums=response.body.dto.cataprocessUrl.substring(response.body.dto.cataprocessUrl.indexOf("docs"),response.body.dto.cataprocessUrl.lastIndexOf("/"),response.body.dto.cataprocessUrl.length)
              let type=response.body.dto.cataprocessUrl.substring(response.body.dto.cataprocessUrl.lastIndexOf("."),response.body.dto.cataprocessUrl.length)
              let page=parseInt(pages)
              let data=[]
              for(let i=1;i<=page;i++){
                let num="http://123.56.186.12:8101/files/"+nums+"/"+i+type
                data.push({
                  "url":num
                })
              }
              this.catalog=data
            }
           this.ContainerData={
              "id":response.body.dto.id,
              "imgUrl":response.body.dto.coverPic,
              "titleL":response.body.dto.name,
              "author":response.body.dto.author,
              "publisher":response.body.dto.press,
              "content":response.body.dto.summary,
              "price":response.body.dto.price,
              "yprice":response.body.dto.comPrice,
              "score":response.body.dto.score,
              "evaluate":response.body.dto.evaluate,
              "type":response.body.dto.resType,
            }
            let newdata=[]
            if(alldata){
              for(let i=0;i<alldata.length;i++){
                let year=new Date(alldata[i].createTime).getFullYear()
                  let mon=new Date(alldata[i].createTime).getMonth()+1
                  let day=new Date(alldata[i].createTime).getDate()
                  let hours=new Date(alldata[i].createTime).getHours()
                  let minutes=new Date(alldata[i].createTime).getMinutes()
                  let seconds=new Date(alldata[i].createTime).getSeconds()
                  this.time = year+"-"+mon+"-"+day+" "+hours+":"+minutes+":"+seconds
                newdata.push(
                  {"userId":alldata[i].id,"objType":alldata[i].objType,"objId":alldata[i].objId,"name":alldata[i].name,"account":alldata[i].account,"time":this.time,"content":alldata[i].content,"commenChilds":alldata[i].commenChilds,"authorImg":alldata[i].headUrl}
                )
              }
            }
            this.comment=newdata
            console.log(response.body.dto.evaluate)
            $("#replyUser-box").css("display","none");
            $("#ceas").raty({ readOnly: true, score: response.body.dto.evaluate });
            $("#newMark").raty({ readOnly: false, score: response.body.dto.score });
            let that=this
            $('#newMark').raty({
              click: function(score, evt) {
                console.log(score);
                that.score=score
                  that.$http.get(url+'score/save',{
                    params:{
                      resId:that.$route.query.id,
                      resType:that.$store.state.selectLib,
                      score:score
                    }
                  }).then(response => { 
                    console.log(response.body.message)
                    if(response.body.message=="评论成功"){
                      let ToastTip = response.body.message == "评论成功"
                      Toast({
                        message: ToastTip,
                        duration: 3000
                      });
                    }
                  })
              }
            });
					})

    },
    destroyed:function(){
      this.$store.state.showBottomNav = true;
      this.$store.state.backUrl = "back";
      this.$store.state.showTopNav = true;
//    this.$store.state.moreUrl = "libraryList";
      this.$store.state.titleName =this.$store.state.ArticleType
      this.$store.state.more = null;
    },
    mounted:function(){
//    console.log(this.$store.state.selectPath)
      this.$store.state.selectPath='/libraryList'
      console.log(this.$store.state.selectPath)
      this.$store.state.showBottomNav=false;
      this.$store.state.showTopNav = false;
      $.fn.raty.defaults.path = 'http://m.pingdianedu.com:8082/webapp/page/static/img';
      $("#ceas").raty({ readOnly: true, score: this.ContainerData.evaluate });
      $("#newMark").raty({ readOnly: false, score: this.score });
      $("#reply-box").css("display","none");

    },
    data () {
      return {
        catalogShow:false,
        "ContainerData":{},
        "information":{},
        "comment":[],
        content:"",
        showBuyAg:false,
        showBuyTrue:false,
        id:'',
        userId:'',
        score:'',
        name:'',
        showBuyBook:false,
        isCont:false,
        catalog:[],
        isBuy:true,
      }
    },   
    methods:{
      probation:function(id,titleL,yprice){
        if(this.$store.state.selectLib=="01"){
          this.$router.push({ path:'/bookPreview',query: { id: id,titleL:titleL,price:yprice,type:this.ContainerData.type } })
        }else if(this.$store.state.selectLib=="02"){
           this.$router.push({ path:'/VideoPreview',query: { id: id,titleL:titleL,price:yprice,type:this.ContainerData.type } })
        }else if(this.$store.state.selectLib=="03"){
           this.$router.push({ path:'/AudioPreview',query: { id: id,titleL:titleL,price:yprice,type:this.ContainerData.type } })
        }
      },
      back:function(){
        console.log(this.$route.query.type);
//      this.$router.push('/libraryList');

        this.$router.go(-1)
        if(this.$route.query.type=="1"){
        	console.log(this.$route.query.type);
        	this.$router.push('/readingStyle');
        }else if(this.$route.query.type=="2"){
        	console.log(this.$route.query.type);
        	this.$router.push('/libraryList');
        }else if(this.$route.query.type=="3"){
        		this.$router.push('/collect');
        }
      },
      bookcomment:function(id){
        this.id=id
        this.content=""
        $("#reply-box").css("display","block");
        $("#reply-input").focus();
        $(".bottom-btn-box").css("display","none");
        $("#reply-input").replyId=id;

        //评论框控制
        // $("#reply-input").blur(function(){
        //   if(!$("#reply-button").is(":focus")){
        //     $("#reply-box").css("display","none");
        //     $(".bottom-btn-box").css("display","block");
        //   }
        // });
        
      },
      bookCollection:function(id){
        console.log(id)
        if(this.isCont==true){
          let ToastTip = "已经收藏"
            Toast({
              message: ToastTip,
              duration: 2000
            });
        }else{
        let url=this.$store.state.url
        this.$http.get(url+'library/libraryCollection',{
						params:{
							id:id,
              resType:this.$store.state.selectLib
						}
					}).then(response => { 
            console.log(response)
            let ToastTip = response.body.message == "收藏成功"?"收藏成功":"取消收藏"
            this.isCont=true
            Toast({
              message: ToastTip,
              duration: 3000
            });
          })
        }
         
      },
      taggleClick:function(id){
        if(!$("#"+id+"-taggle-body").hasClass("show-all")){
          $("#"+id+"-taggle-body").addClass("show-all");
          $("#"+id).html("--------收起--------");
          this.catalogShow=true
        }else{
          $("#"+id+"-taggle-body").removeClass("show-all");
          $("#"+id).html("------查看全部------");
          this.catalogShow=false
        }
      },
      checkUser:function(){
        document.getElementById('input').focus()
      },
      replyThis:function(){
        console.log(this.id+","+this.content)
        if(this.content==''){
           let instance = Toast('回复内容不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
        }else{
        let url=this.$store.state.url
        this.$http.get(url+'commen/add',{
						params:{
							id:this.id,
              content:this.content
						}
					}).then(response => { 
            console.log(response)
            let that=this
            that.$http.get(url+'library/details',{
              params:{
                id:that.$route.query.id,
                resType:this.$store.state.selectLib
              }
            }).then(response => { 
              let alldata=response.body.dto.commenDOs
              let newdata=[]
              if(alldata){
                for(let i=0;i<alldata.length;i++){
                  let year=new Date(alldata[i].createTime).getFullYear()
                  let mon=new Date(alldata[i].createTime).getMonth()+1
                  let day=new Date(alldata[i].createTime).getDate()
                  let hours=new Date(alldata[i].createTime).getHours()
                  let minutes=new Date(alldata[i].createTime).getMinutes()
                  let seconds=new Date(alldata[i].createTime).getSeconds()
                  this.time = year+"-"+mon+"-"+day+" "+hours+":"+minutes+":"+seconds
                  newdata.push(
                    {"userId":alldata[i].id,"objType":alldata[i].objType,"objId":alldata[i].objId,"name":alldata[i].name,"account":alldata[i].account,"time":this.time,"content":alldata[i].content,"commenChilds":alldata[i].commenChilds}
                  )
                }
              }
              that.comment=newdata
            })
          })
        $("#reply-box").css("display","none");
        $(".bottom-btn-box").css("display","block");
        }
      },
      replyUser:function(){
        console.log(this.userId+","+this.content+','+this.name)
        let url=this.$store.state.url
        this.$http.get(url+'commen/add',{
						params:{
              id:this.id,
							replyObjId:this.userId,
              name:this.name,
              content:this.content
						}
					}).then(response => { 
            console.log(response)
            this.refresh()
          })
        $("#replyUser-box").css("display","none");
        $(".bottom-btn-box").css("display","block");
      },
      toReplyThis:function(id,name){
        console.log(name)
        this.userId=id
        this.name=name
        this.content=''
        $("#replyUser-box").css("display","block");
        $("#reply-input").focus();
        $(".bottom-btn-box").css("display","none");
        $("#reply-input").replyId=id;

        //评论框控制
        // $("#reply-input").blur(function(){
        //   if(!$("#reply-button").is(":focus")){
        //     $("#reply-box").css("display","none");
        //     $(".bottom-btn-box").css("display","block");
        //   }
        // });
      },
      delMyCel:function(id){
        let url=this.$store.state.url
        let that=this
        MessageBox.confirm('确定执行此操作?').then(function(){
          console.log("删除"+id);
          
        that.$http.get(url+'commen/delete',{
						params:{
              id:id,
						}
					}).then(response => { 
            console.log(response)
            that.refresh()
          })
        },function(){
          console.log("取消删除");
        });
      },
      isSuccess(){
        if(this.$route.query.payStatus){
          console.log(this.$route.query.payStatus)
          if(this.$route.query.payStatus=="success"){
            this.showBuyTrue=true
            this.showBuyAg=false
          }else if(this.$route.query.payStatus=="error"){
            this.showBuyTrue=false
            this.showBuyAg=true
          }
        }
      },
      buyBook:function(id,name,price,type){
        // this.showBuyTrue=true
        // console.log(id+"+"+name+"+"+price)
        if(!localStorage.getItem("userType")){
          MessageBox.confirm('请先去登录再执行此操作').then(action => {
          this.$router.push({path:'/loading'})
        }); 
        }else{
        let url=this.$store.state.url
        let that=this
         MessageBox({
            message: '您确定支付'+price+'元购买此商品?',
            showCancelButton: true,
            confirmButtonText:"立即支付",
            cancelButtonText:"取消",
            closeOnClickModal:false
          }).then(
            function(action){
              if(action=="confirm"){
                that.showBuyBook=true
                $.ajax({
                      url : url+'alipay/orderpay',
                      data: {
                        id: id,
                        name: name,
                        price:price,
                        type:type,
                      },
                      type : "post",
                      dataType : 'json',
                      success : function(data) {
                        console.log(data)
                        window.location.href = data;
                        // let json = {"payInfo":null,"afterurl":data}
                        // console.log(JSON.stringify(json))
                        // window.creativeJSCallbackForOther.openAlipay(JSON.stringify(json))
                      }
                })
              }
              
            }
          );
        }
      },
      // closeBuyTrue:function(){
      //   this.showBuyTrue=false
      // },
      // closeBuyAg:function(){
      //   this.showBuyAg=false
      // },
      // closeBuyBook:function(){
      //   this.showBuyBook=false
      // },
      refresh:function(){
        let url=this.$store.state.url
        this.$http.get(url+'library/details',{
						params:{
							id:this.$route.query.id,
              resType:this.$store.state.selectLib
						}
					}).then(response => { 
            let alldata=response.body.dto.commenDOs
            let newdata=[]
            if(alldata){
              for(let i=0;i<alldata.length;i++){
                 let year=new Date(alldata[i].createTime).getFullYear()
                  let mon=new Date(alldata[i].createTime).getMonth()+1
                  let day=new Date(alldata[i].createTime).getDate()
                  let hours=new Date(alldata[i].createTime).getHours()
                  let minutes=new Date(alldata[i].createTime).getMinutes()
                  let seconds=new Date(alldata[i].createTime).getSeconds()
                  this.time = year+"-"+mon+"-"+day+" "+hours+":"+minutes+":"+seconds
                newdata.push(
                  {"userId":alldata[i].id,"objType":alldata[i].objType,"objId":alldata[i].objId,"name":alldata[i].name,"account":alldata[i].account,"time":this.time,"content":alldata[i].content,"commenChilds":alldata[i].commenChilds,"authorImg":alldata[i].headUrl}
                )
              }
            }
            this.comment=newdata
					})
      },
      loadTop(){
        let self=this
        self.refresh()
         setTimeout(() => {
                self.$refs.loadmore.onTopLoaded();
              }, 2000);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-header.is-fixed{
		font-size: 0.46rem;
		height: 1.25rem;
    	line-height: 1.25rem;
    	background: #428AFF;
    	}
  #buyTrue{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0,0,0,0.3);
  }
  #buyAg{
     position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0,0,0,0.3);
  }
  .buyBox{
        position: relative;
    width: 8rem;
    height: 10.5rem;
    top: 4rem;
    left: 1rem;
  }
  .q_code{
        width: 100%;
  }
  .buyClose{
      float: right;
    background: #FFF;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    text-align: center;
    line-height: 0.6rem;
  }
  .buyLine{
        display: block;
    height: 0.6rem;
    width: 0.1rem;
    border-left: 1px dashed #fff;
    position: absolute;
    top: 0.6rem;
    left: 7.7rem;
  }
  .buyCon{
        position: absolute;
    top: 1.2rem;
    height: 100%;
    width: 100%;
    background: #fff;
    border-radius: 0.5rem;
  }
  .buyImg{
    width: 100%;
    height: 70%;
    margin-top: 6%;
    background-size: 100% 100%;
    background-image:url("../../static/img/zhifuchenggong.png")
  }
  .buyOkFont{
        height: 1rem;
    width: 100%;
    text-align: center;
    color: #1c59bb;
    font-size: 0.5rem;
  }
  .buyReFont{
     height: 1rem;
    width: 100%;
    text-align: center;
    color: #e4993f;
    font-size: 0.5rem;
  }
  .buyNoImg{
    
    width: 100%;
    height: 70%;
    margin-top: 6%;
    background-size: 100% 100%;
    background-image:url("../../static/img/zhifushibai.png")
  }
  .buyOk{
        width: 7rem;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
    height: 1.1rem;
    border-radius: 1.2rem;
    background: #d1e1fb;
    border: 1px solid #1c59bb;
    color: #1c59bb;
  }
  .buyRe{
        width: 7rem;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
    height: 1.1rem;
    border-radius: 1.2rem;
    background: #f9dd96;
    border: 1px solid #e4993f;
    color: #e4993f;
  }
  .buyCon-font{
    padding: .5rem .6rem 0 0.6rem;
    font-size: 0.4rem;
  }
  .buyCon-price-font{
    padding: .5rem .6rem 0 0.6rem;
    font-size: 0.4rem;
    color:red;
  }
  .img-url{
    width: 3.5rem;
    height:4rem!important;
    display: inline-block;
    float: left;
  }
  .comment-number{
    font-size: 12px;
    margin-left: 5px;
  }
  .book-detail{
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
  .book-data{
    border-top: 5px solid #E2E2E2;
        padding-bottom: .2rem;
  }
  .book-base{
    margin: 0.5rem;
    height: 4rem;
  }
  .information-taggle{
    margin-bottom: .2rem;
  }
  .information-taggle-title{
    margin-bottom: 1vh;
    font-weight: 500;
    font-size: 0.5rem;
    border-left:3px solid #408AFF;
    height: 5vh;
    padding-left: 10px;

  }
  .book-base-body{
    margin-left: 3.7rem;
  }
  .p-lib{
    color: #707070;
    height:1.5rem;
    line-height: 1.7em;
    text-overflow:ellipsis; 
    -o-text-overflow:ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    letter-spacing: .2em;
  }
  .title-lib{
    font-size: 16px;
    font-weight: 600;
    color: #2f2f2f;
    padding:.1rem 0;

  }
  .author-img{
    float:left;
    width: 35px;
    border-radius: 100%;
    vertical-align: middle;
  }
  .author-name{
        float: left;
    vertical-align: middle;
    margin-left: 5px;
    font-weight: 600;
    margin-top: .2rem;
  }
  .price-lib{
    display: inline-block;
    color: #f00;
    letter-spacing: .1em;
    padding-bottom: .5em;
    font-size: 15px;
    font-weight: bold;
    width: 40%;
  }
  .show-all-taggle{
    text-align: center;
    color: #FEBB4C;
    font-size: 15px;
  }
  .yprice-lib{
    font-size: 15px;
  }
  .cel{
    margin-top:10px;
    height:1.2rem;
  }
  .cel-box{
      position: absolute;
  }
  .cel form{
    position: fixed;
  }
  #ceas{
    vertical-align: sub;
  }
  #newMark{
    vertical-align: sub;
  }
  .mark-body{
    font-size: 15px;
    margin: 10px 15px;
    color:#AAAAAA;
  }
  
  .author{
    padding:.1rem 0;
    font-size: 15px;
    font-weight: 600;
  }
  .author span{
    color:#FEBB4C;
  }
  .publisher{
    color: #707070;
    padding:.1rem 0;
    font-size: 15px;
  }
  .information-taggle-body{
    color: #707070;
    margin: 10px 20px;
    line-height: 1.7em;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    letter-spacing: .2em;
  }
  .information-taggle-body.show-all{
    margin: 10px 20px;
    line-height: 1.7em;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 100;
    letter-spacing: .2em;
  }
  .comment-body{
        padding: .2rem .5rem;
    border-top: 1px solid #BFBFBF;
    font-size: .4rem;
  }
  .comment-body .time{
        color: #707070;
    text-align: right;
    margin: .1rem;
        font-size: 14px;
  }
  .information-taggle-body p{
    font-size: .4rem
  }
  .button-box{
            position: absolute;
    left: 7rem;
        margin-top: .15rem;
  }
  .button-box span{
    color: #FEBB4C;

  }
  .button-box .del{
    color: red
  }
  .comment-content{
    line-height: 1.5em;
    letter-spacing: .2em;
  }
  .reply{
    background-color: #EEEEEE;
    margin-top: 20px;
    padding-bottom:10px;
    border-radius: .2rem;
  }
  #reply-box{
    padding: 0.2rem;
    bottom: 0rem;
    position: fixed;
    width: 100vw;
    height: 1rem;
    background: #F7F7F7;
  }
  #replyUser-box{
    padding: 0.2rem;
    bottom: 0rem;
    position: fixed;
    width: 100vw;
    height: 1rem;
    background: #F7F7F7;
  }
  #reply-input{
    width: 70%;
    height: 0.6rem;
    border: 1px solid #C8C7CD;
    border-radius: 5px;
    font-size: 15px;
    padding: 5px 15px;
  }

  #reply-button{
    font-size: 0.5rem;
    padding: 7px;
    color: white;
    margin-left: 5px;
    background-color: #4D91FE;
    border-radius: 7px;
    vertical-align: middle;
  }
  .user-name{
        display: block;
    color: #4F91FE;
  }
  .replyChild{
    padding:10px 10px 0 10px;
  }
  .bottom-btn-box{
    width: 100%;
    background: white;
    bottom: 0;
    height: 1.25rem;
    position: fixed;
    border-top: 2px solid #E2E2E2;
    text-align: center;
    padding-top: 0.5rem;
    height: 1rem;
  }
  .bottom-btn-box span{
    letter-spacing: .2em;
    font-size: 0.4rem;
    margin: 0;
    padding: 7px 2%;

  }
  .bottom-btn-box img{
    width: 0.4rem;
    margin-right: 6px;
  }
  .bottom-btn-box .discuss{
    color:#4D91FE;
  }
  .bottom-btn-box .tag{
    border-left: 1px solid #969696;
    padding: 6px 0px;
    margin: 0;
  }
  .bottom-btn-box .collect{
    color:#FEA405;
  }
  .bottom-btn-box .previews{
    color:#4D91FE;
    padding: 6px 2%;
    border: 2px solid #4D91FE;
    border-radius: 7px;
    margin-left: 1vw;
  }
  .bottom-btn-box .previews:active {
    color:white;
    background-color:#4D91FE
  }
  .bottom-btn-box .buy{
    background-color: #DE0000;
    border: 1px solid #DE0000;
    color:white;
    border-radius: 7px;
    margin-left: 1vw;
  }
  .bottom-btn-box .buy:active {
    color:red;
    background-color:#FEBB4C;
  }
  .huifu{
    color:#000;
  }
  #catalog-taggle-body{
    height: 5rem;
    overflow-y: scroll;
  }
  .img-catalog{
    width:100%;
  }
</style>
<style>
  #newMark img{
    height:20px;
  }
   #ceas img{
    height:12px;
  }
</style>