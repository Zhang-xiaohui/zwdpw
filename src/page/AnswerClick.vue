<template>
	<div class="answerclick">
	    <div v-for="(item,i) in ContainerData.data" key="i">
    	   <AssignTask :TabContainerData="item"/>
		</div>
		<div class="ans">
			<h3>我的作答</h3>
		</div>
		<div v-for="(item,i) in ContainerDataAA.data" key="i">
		   <div class="acontainer">
			  <div style="text-align: center;">
				<h3 class="atitle">{{item.atitle}}</h3>
				<div class="atime">{{item.atime}}</div>
			  </div>
			  <div class="acontainera" v-html='item.acontent'>
				
			  </div>
		    </div>
		</div>

		<div class='correcting' v-if="correcting">
			<div class="correctingBox">
				<div class="buyTop">
					<span class='buyClose' @click="closecorrecting">X</span>
					<i class="buyLine"></i>
				</div>
				<div class="correctingCon">
					<p class='correcting-font'>{{correctingTitle}}</p>
					<textarea class="correcting-text">{{correctingText}}</textarea>
				</div>
			</div>
		</div>
	</div>
		
</template>

<script>
import AssignTask from "../components/AssignTask"
	export default{
		name:"answerclick",
		components: { AssignTask },
	created:function(){
		 
    },
    destroyed: function() {
			this.$store.state.titleName = null;
		},
    data(){
      return {
      	content:"",
        ContainerData:{
        	 data:[
        	]
        },
        ContainerDataAA:{
        	data:[
        	]
        },
        selected:'1',
		id:1,
		correcting:false,
		correctingTitle:'',
		correctingText:''
    }    
  },
    mounted:function(){
    	  this.$store.state.showTopNav = true;
	      this.$store.state.backUrl = "aaa";
	      this.$store.state.titleName = "已作答";
	      this.$store.state.selectedTab = "schoolwork";
	      this.$store.state.showBottomNav = false;
	      this.$store.state.selectPath = "schoolwork"
	      window.scrollTo(0,0);
	      console.log("mounted");
    	    var vm = this;
    	    var id = this.$route.query.id;
    	    var content = this.$route.query.content;
    	    
    	    var content1 = content.replace("<img","<img style='width:90%'");
    	    console.log(content);
			var data = [];
				var msg = {
					"msgname" : this.$route.query.name,
				    "bname" : this.$route.query.teacherName,
					"time" : this.getMyDate(this.$route.query.time),
					"body" :this.$route.query.content
				}
				
				data.push(msg);
				
				this.ContainerData.data=data;
    	    vm.$http.get(this.$store.state.url + 'student2/model/answerInfo', {
				params: {
					objId:id,

				}
			}).then(function(datas) {
				console.log(datas)
				console.log(datas.body.dto.pics)
				var vm = this;
				var data1 = [];
				var content=''
				if(datas.body.dto.pics.length>0){
					let src=datas.body.dto.pics
					for(let i=0;i<src.length;i++){
						if(src[i]){
							content=content+'<img src="'+src[i]+'" style="width:100%"/>';
						}
					}
				}else{
					content=datas.body.dto.composion.content
				}
				// 	if(dto.type==1){
				// 		let src=dto.content.split(',')
				// 		for(let i=0;i<src.length;i++){
				// 			if(src[i]){
				// 				content=content+'<img src="'+src[i]+'" style="width:100%"/>';
				// 			}
				// 		}
				// 	}else{
				// 		content=dto.content
				// 	}
					
				var msga = {
					"atitle" : datas.body.dto.composion.name,
					"atime" : this.getMyDate(datas.body.dto.composion.createTime),
					"acontent":content
				}
				
				data1.push(msga);
				this.ContainerDataAA.data=data1;
			}, (response) => {
				console.log("error");
			});
    	   
   },
   updated:function(){
		let that=this
    	let select=$(".Highlight").text();
    	let type=$(".Highlight").attr('type')
		let text=$(".Highlight").attr('text')
    	console.log(select)
		$(".Highlight:contains('" + select + "')").on('click',function () {      
			that.articleSpan(type,text)
		})
		// $(".content").on('click', ".Highlight:contains('" + select + "')"  ,function () {      
		// 	that.articleSpan(type,text)
		// });
	},
    methods:{
	    getMyDate(str){  
        var oDate = new Date(str),  
        oYear = oDate.getFullYear(),  
        oMonth = oDate.getMonth()+1,  
        oDay = oDate.getDate(),  
//          oHour = oDate.getHours(),  
//          oMin = oDate.getMinutes(),  
//          oSen = oDate.getSeconds(),  
        oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay);//最后拼接时间  
        return oTime;  
    	}, 
    
        //补0操作  
        getzf(num){  
            if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
            return num;  
        },
    	closecorrecting() {
    		this.correcting = false;
    	},
    	articleSpan(n,t){
			console.log(n+","+t)
			this.correcting=true
			if(n==1){
				this.correctingTitle='好句'
				this.correctingText=t
				return false
			}else if(n==2){
				this.correctingTitle='修改'
				this.correctingText=t
				return false
			}else if(n==3){
				this.correctingTitle='错别字'
				this.correctingText=t
				return false
			}
		},
	   }
	}
</script>

<style>
	.answerclick{
		margin-top: 1.25rem;
	}
	.answerclick .composition-tagL{
		border-bottom: 1px dashed #CCCCCC;
	}
	.ans h3{
		padding-left: .5rem;
        border-left: 5px solid #418aff;
	}
	.ans{
		height: .5rem;
		margin-top: .3rem;
	}
	.correcting{
         position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
  }
    .correctingBox{
        position: relative;
    width: 8rem;
        height: 6rem;
    top: 3rem;
    left: 1rem;
  }
   .correctingCon{
           position: absolute;
    top: 1.2rem;
    height: 78%;
    width: 100%;
    background: #fff;
    border-radius: 0.1rem;
  }
  .correcting-font{
	  height: 1rem;
    background: #8b9bb4;
    text-align: center;
    line-height: 1rem;
    font-size: .5rem;
    color: #fff;
  }
  .correcting-text{
	        resize: none;
    width: 7.3rem;
    height: 3rem;
    margin: .3rem;
    overflow-y: auto;
  }
  .correctingNo{
	  margin-left: 1rem;
    border: 0;
    width: 1.8rem;
    height: .7rem;
    color: #fff;
  }
  .correctingOk{
	     margin-left: 2.3rem;
    border: 0;
    width: 1.8rem;
    height: .7rem;
    color: #fff;
	background:#428aff;
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
  .acontainera{
  	word-break: break-word;
  	margin: .2rem .3rem;
  }
  .acontainera img{
  	width: 100%;
  }
  .atitle{
  	margin-bottom: .2rem;
  }
</style>