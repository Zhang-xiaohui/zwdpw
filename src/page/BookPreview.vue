<template>
  <div id="bookPreview" class="bookPreview">
  <mt-header class="bookPreview-header" fixed title="">
         <mt-button @click="Back" slot="left"  icon="back" class='font-wa'></mt-button>
  </mt-header>
    <div id="preview">
      <div  
        v-for="(item,i) in BookPreviewData.page"  
        :style="{'background-image': 'url('+item + ')' }"
        :key="i"
      >
      </div>
    </div>
    
  </div>
</template>

<script>
  import TopNavigation from "../components/TopNavigation";
  import { MessageBox, Checklist,DatetimePicker,Toast  } from 'mint-ui';
  export default {
    name: 'bookPreview',
    components: { TopNavigation },
    data () {
      return {
        BookPreviewData:{
          // page:["http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/1.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/2.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/3.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/4.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/5.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/6.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/7.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/8.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/9.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/10.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/11.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/12.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/13.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/14.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/15.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/16.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/17.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/18.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/19.png", "http://123.56.186.12:8101/files/docs/2016/03/3/35223cfb67dc4ec8af9c4225279af55a/20.png"]
          page:[]
        },
        price:'',
        buy:false,
        id:'',
        name:'',
        type:'',
        // showBuyBook:false,
        selectPage:1,
      }
    },   
    beforeMount: function () {
      let url=this.$store.state.url
      let data={
        id:this.$route.query.id,
        type:this.$store.state.selectLib
      }
      let that=this
          //接口
          $.ajax({
            type : "GET",
            url : url+'library/probation',
            data:data,
            async: false,
            dataType : "json",
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success : function (data) {
             if(data.code == 1){
                if(data.dto.buy){
                  if(data.dto.processUrl.indexOf("/")>0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
                  {
                    let pages=data.dto.processUrl.substring(data.dto.processUrl.lastIndexOf("/")+1,data.dto.processUrl.length)
                    let num=parseInt(pages)
                    let newData=[]
                    for(let i=0;i<num;i++){
                      newData.push(" ")
                    }
                    that.BookPreviewData.page=newData
                  }
                }else{
                  let nums=20;
                   let data=[]
                    for(let i=0;i<20;i++){
                      data.push(" ")
                    }
                    that.BookPreviewData.page=data
                }
              }else if(data.code == 1000){
                  localStorage.clear()
                  let ToastTip = "请重新登录"
                  Toast({
                      message: ToastTip,
                      duration: 2000
                  });
                  that.$router.push({path:'/loading'})
              }
              
            }
          }); 
          
    },
    created:function(){
      this.$store.state.backUrl = "back";
      this.$store.state.titleName = "查看书籍";
      this.$store.state.showTopNav = false;
      this.$store.state.more = null;
     // window.scrollTo(0,0);
      this.id=this.$route.query.id
      this.name=this.$route.query.name
      this.price=this.$route.query.price
      this.type=this.$route.query.type
      
      this.load()
    },
    destroyed:function(){
      this.$store.state.showTopNav = true;
      this.$store.state.showBottomNav = true;
    },
    mounted:function(){
      this.$store.state.showTopNav = false;
      this.$store.state.showBottomNav = false;
      let url=this.$store.state.url
      let that=this
      that.$http.get(url+'bookmark/searchBookmark',{
        params:{
          docId:that.$route.query.id,
        }
      }).then(response => { 
        var page=response.body.dto
        // $('#preview').turn({
        //   display: 'single',
        //   acceleration: true,
        //   elevation: 1,
        //   turnCorners: "tl,tr",
        //   gradients: true,
        //   autoCenter: true,
        //   page:page
        // })
        $('#preview').turn({
        display: 'single',
        acceleration: true,
        elevation: 1,
        turnCorners: "tl,tr",
        gradients: true,
        autoCenter: true,
        page:page,//指定跳转某一页
        when: {
          turned: function(e, page) {
            that.selectPage=page
            console.log(page)
            if(that.buy==false){
              if(page==20){
                MessageBox({
                  message: '当前资源为付费资源，支付'+that.price+'元后可浏览所有内容?',
                  showCancelButton: true,
                  confirmButtonText:"立即支付",
                  cancelButtonText:"取消",
                  closeOnClickModal:false
                }).then(
                  function(action){
                        $.ajax({
                          url : url+'alipay/orderpay',
                          data: {
                            id: that.id,
                            name: that.name,
                            price:that.price,
                            type:that.type
                          },
                          type : "post",
                          dataType : 'json',
                          success : function(data) {
                            console.log(data)
                            window.location.href = data;
                          }
                        })
                    // that.showBuyBook=true
                  }
                );
              }
            }
          }
        }
      });
      })
      
      
    },
     
    methods:{
      Back:function(){
        this.$router.go(-1)
        let url=this.$store.state.url
        let num=this.selectPage
        console.log(num)
        this.$http.get(url+'bookmark/saveBookmark',{
          params:{
            docId:this.$route.query.id,
            num:num
          }
        }).then(response => { 
          console.log(response)
        })
      },
      closeBuyBook:function(){
        // this.showBuyBook=false
         let url=this.$store.state.url
      let data={
        id:this.$route.query.id,
        type:this.$store.state.selectLib
      }
      let that=this
          //接口
          $.ajax({
            type : "GET",
            url : url+'activity/listActivity',
            data:data,
            async: false,
            dataType : "json",
            success : function (data) {
              // console.log(data.dto.buy)
              if(data.dto.buy){
                $('#preview').turn({
                  display: 'single',
                  acceleration: true,
                  elevation: 20,
                  turnCorners: "tl,tr",
                  gradients: true,
                  autoCenter: true
                })
              }
            }
          }); 
      },
      load(){
        let url=this.$store.state.url
        this.$http.get(url+'library/probation',{
            params:{
              id:this.$route.query.id,
              type:this.$store.state.selectLib
            }
          }).then(response => { 
            console.log(response)
            let that=this
            that.buy=response.body.dto.buy
            if(response.body.dto.buy){
              if(response.body.dto.processUrl.indexOf("/")>0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
              {
                let pages=response.body.dto.processUrl.substring(response.body.dto.processUrl.lastIndexOf("/")+1,response.body.dto.processUrl.length)
                let nums=response.body.dto.processUrl.substring(response.body.dto.processUrl.indexOf("docs"),response.body.dto.processUrl.lastIndexOf("/"),response.body.dto.processUrl.length)
                let type=response.body.dto.processUrl.substring(response.body.dto.processUrl.lastIndexOf("."),response.body.dto.processUrl.length)
                let page=parseInt(pages)
                console.log(nums)
                console.log(page)
                console.log(type)
                let data=[]
                console.log("http://123.56.186.12:8101/files/"+nums)
                for(let i=1;i<=page;i++){
                  let num="http://123.56.186.12:8101/files/"+nums+"/"+i+type
                  data.push(num)
                  
                }
                that.BookPreviewData.page=data
              }
            }else{
              let nums=20;
              if(response.body.dto.processUrl.indexOf("/")>0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
              {
                let nums=response.body.dto.processUrl.substring(response.body.dto.processUrl.indexOf("docs"),response.body.dto.processUrl.lastIndexOf("/"),response.body.dto.processUrl.length)
                let type=response.body.dto.processUrl.substring(response.body.dto.processUrl.lastIndexOf("."),response.body.dto.processUrl.length)
                // let num=parseInt(nums)
                // console.log(type)
                let data=[]
                console.log("http://123.56.186.12:8101/files/"+nums)
                for(let i=1;i<21;i++){
                  let num="http://123.56.186.12:8101/files/"+nums+"/"+i+type
                  data.push(num)
                }
                that.BookPreviewData.page=data
                console.log(that.BookPreviewData.page)
                
              }
            }
            
          })
        
        
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bookPreview-header{
        color: #2f2f2f;
    z-index: 999;
    background: rgba(255,255,255,0);
    font-size: .4rem;
  }
  .bookPreview{
   background:#ccc;
  }
  #preview{
    width: 100vw;
    height:100vh;
  }
  #buyAg{
    z-index:999;
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
   .buyCon-font{
    padding: .5rem .6rem 0 0.6rem;
    font-size: 0.4rem;
  }
  .buyCon-price-font{
    padding: .5rem .6rem 0 0.6rem;
    font-size: 0.4rem;
    color:red;
  }

</style>
<style>
  .bookPreview .mint-header.header.is-fixed{
    z-index: 100;
    background-color: rgba(0, 0, 0, 0);
  }
  #preview .turn-page{
    background-color:#ccc;
    background-size:100% 100%;
  }
  .font-wa{
    font-weight: 600;
  }
</style>