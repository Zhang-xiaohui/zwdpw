<template>
	<div class="CorrectComposition">
		<mt-header class="header" fixed title="批改作文">
	        <mt-button @click="goBack" slot="left"  icon="back"></mt-button>
	    </mt-header>
	    <div class="article-content">
	    	<div class="stu-msg-top">
		    	<div class="stu-message">
	        		<div class="msg-right">
	        			<p>{{waitData.authorName}}</p>
	        			<p class="grade-color"><span>{{waitData.gradeName}}</span><span>{{waitData.className}}</span></p>
	    			</div>		
	        	</div>
	        	<div class="article-date">
	        		<!-- <p>{{waitData.time}}</p> -->
	        		<p>{{waitData.date}}</p>
	    		</div>
    		</div>
    		<div class="article-text">
    			<h1 class="headline">{{waitData.title}}</h1>
	            <!--<textarea class="article-content-text" v-html="waitData.content" readonly ></textarea>-->
				<div v-if="waitData.type" class="article-content">
	            	<img v-for="(imgitem, index) in waitData.imgList" class="img-task" :src='imgitem'/>
	            </div>
				<vue-html5-editor v-else class="article-content-text" :content="waitData.content" :auto-height="true" :z-index='0'></vue-html5-editor>
				<!-- <div class="article-content" v-html='item.content'></div> -->
	            <div class="article-lable">
					<span class='article-span' @click='article(1)'>好句</span>
					<span class='article-span' @click='article(2)'>修改</span>
					<span class='article-span' @click='article(3)'>错别字</span>
					<!--<div class='article-lable-bom'></div>-->
				</div>
    		</div>
    		<div class="score">
				<div class="score-title">名师点评</div>
				<div class="score-select">
					<div class="score-code">得分</div>
					<div class="items-container">
						<div class="score-line">
							<div class="score-grade-c"></div>
						</div>
						<ul class="score-category">
							<li class="category-item" v-for="(item, i) in scoreData" :key='i' @click="selectGrade(item.code)" >{{item.codeName}}</li>
						</ul>
					</div>
				</div>
			</div>
					
			<div class="navbar">
				<div class="score-title">作文评价</div>
				<div class="page-part">
					<div class="select-list-item list-active">内容</div>
					<div class="select-list-item">语言</div>
					<div class="select-list-item">结构</div>
					<div class="select-list-item">字体</div>
				</div>
				<div id="wrapper">
					<div id="scroller">
						<ul id="js-replace-class">
							<li class="grade-item" v-for="(item, i) in gradeContentData" :key='i' @click="addItem( item.id, item.level.level, item.content)">
								<h1>{{item.level.level}}</h1>
								<div><img class="interval-img" src="../../static/img/hui.png"></div>
								<p class="css-p">{{item.content}}</p>
							</li>
						</ul>
					</div>
				</div>

				<div class="select-warn">
					<div class="select-title">Ⓘ选择以上维度，给作文一个满意的评价吧!</div>
					<div class="evaluate-items">
						<div class="eval-list-item" v-for = "(item, i) in evaluate">
							<span class="item-title">{{item.category}}</span><span>{{item.grade}}</span>：<span>{{item.content}}</span><img class="item-delete" @click="deleteEvaluateItem(i)" src="../../static/img/shanchu.png" />
						</div>
					</div>
				</div>
				
			</div>
			
			<div class="summarize">
				<div class="score-title">作文总评</div>
				<div class="summarize-text">
					<textarea class="submit-content" placeholder="请为这篇文章点评..." v-model="message"></textarea>
				</div>
				<button class="submit-btn" @click="handleSubmitBtn">提交</button>
			</div>
			<div class='correcting' v-if="correcting">
				<div class="correctingBox">
					<div class="correctingCon">
						<p class='correcting-font'>{{correctingTitle}}</p>
						<textarea class="correcting-text" :placeholder="placeholder">{{correctingText}}</textarea>
						<button class="correctingNo" @click="correctingno">取消</button>
						<button class="correctingOk" @click="correctingok">确认</button>
					</div>
				</div>
			</div>
    	</div>
	</div>
</template>
<script>
import { Checklist, DatetimePicker,Toast, Navbar, TabItem } from 'mint-ui';
import  * as getId from '../../static/guid.js'
export default {
	updated() { 
        $(".img-task").css({
        	"display":'block',
            "width": '8.7rem'
        })
    },

	data() {
		return{
			correcting:false,
			correctingTitle:'',
			placeholder:'',
			isSend:false,
			selected:'1',
			categoryList: [],
			scoreData: [],
			name: 'carrousel',
			gradeContentData:[],
			evaluate: [],
			selectIndex: 0,
			scoreNum:[],
			level:[],
			newData:{},
			selectedText:'',
			correctingText:'',
			selectN:'',
			correctingH:'',
			correctingX:'',
			correctingC:'',
			idList:[],
			selectGradeItem:[],
			scoreItem:'',
			hangleImgItems:'',
			itemList:"内容",
			waitData:{ },
			gradeContent:[],
			composionId:'',
			message:'',
			postil:[]
		}
	},
	mounted() {
		$(".img-task").css({
        	"display":'block',
            "width": '8.7rem'
        })
		this.loaded()
		let that=this
		$(".page-part").on('click', '.select-list-item', function(e) {
			$(this).siblings().removeClass('list-active').end().addClass('list-active');
			this.selectIndex = $(this).index();
			$(".grade-item").removeClass('grade-active');
			that.gradeContentData = that.gradeContent[$(this).index()];
			that.itemList = $(this).text();
		});
		$("#js-replace-class").on('click', 'li', function() {
			$(this).siblings().removeClass('grade-active').end().addClass('grade-active');
		})
		$('.score-category').on("click", "LI", function(){
			$(this).siblings().removeClass('active').end().addClass('active');
			$('.score-grade-c').css('width', $(this).index()+"rem");
			$(this).attr('ref', 'inner')
		})
		$(".toolbar").css({'display':'none'})
		$(".article-content-text").removeClass('vue-html5-editor')
		$(".content").focus(function(){
			document.activeElement.blur();
		});
		// window.onReceiveData=function(title,selectText){
		// 	alert(title+","+selectText+"！这是直接调用！")
		// }
		// $(".article-content-text").bind('contextmenu', function(e) {
		// 	e.preventDefault();
		// })
		// window.ontouchstart = function(e) { 
		// 	e.preventDefault(); 
		// };
		// let press = $api.domAll('.article-content-text');
		// let hspans='<span class="Highlight" style="background: #cfe2ff;">'
		// let hspane='</span>'
		window.onReceiveData=function(title,selectText){
			// alert(title+","+selectText)
			let hspans='<span class="Highlight" style="background: #cfe2ff;">'
			let hspane='</span>'
			let str=selectText
			that.selectedText=str
			let newStr=hspans+str+hspane  //把文字用span高亮包裹
			// alert(that.waitData.content)
			that.postil.push({
	        	"tagId":jxd.utils.guid.get32(),
	        	"content":str
	        })
			that.waitData.content=that.waitData.content.replace(str,newStr) //加高亮的span替换原内容
			//自定义弹出事件 弹出不同的框
			if(title=='好句'){
				that.article(1)
			}else if(title=='修改'){
				that.article(2)
			}else if(title=='错别字'){
				that.article(3)
			}
		}
		// let select=window.onReceiveData()
		// let str=select["selectedData"];
		// let title=select["title"];
		// let newStr=hspans+str+hspane  //把文字用span高亮包裹
		// that.waitData.content=that.waitData.content.replace(str,newStr) //加高亮的span替换原内容
		// if(title=='好句'){
		// 	that.article(1)
		// }else if(title=='修改'){
		// 	that.article(2)
		// }else if(title=='错别字'){
		// 	that.article(3)
		// }
		// let time=0
		// new Hammer(press[0]).on('press', function(ev) {
		// 	ev.preventDefault()
		// 	let str=ev.target.innerHTML
		// 		time = setTimeout(function(){  
		// 			let selction = window.getSelection();
		// 			// console.log(selction)
		// 			let selseStr=str.slice(selction.anchorOffset,selction.focusOffset)
		// 			// console.log(selction)
		// 			// let str = "iid0000ffr";
		// 			// let substr = str.match(/id(\S*)ff/);
		// 			// console.log(str.slice(0,selction.anchorOffset))
		// 			let newStr=str.slice(0,selction.anchorOffset)+hspans+selseStr+hspane+str.slice(selction.focusOffset,str.length)
		// 			// console.log(newStr)
		// 			that.waitData.content=that.waitData.content.replace(str,newStr)
		// 			// console.log(str.slice(selction.focusOffset,str.length))
		// 			that.selectedText=selseStr
		// 		}, 2000);//这里设置长按响应时间  
		// 	if(ev.center.x>=204){
		// 		var x=204
		// 	}else if(ev.center.x<=142){
		// 		var x=142
		// 	}else{
		// 		var x=ev.center.x
		// 	}
		// 	$(".article-lable").css({"display":"block","left":(x-138)+'px',"top":(ev.center.y-230)+'px'})
		// });
		// new Hammer(press[0]).on('tap', function(ev) {
		// 	$(".article-lable").css({"display":"none"})
		// 	clearTimeout(time); 
		// });
		
	},

	created(){
		let url = this.$store.state.url; 
		let that = this; 
		//长按
		// window.onReceiveData=function(title,selectedData){
		// 	alert("created"+","+title+","+selectedData)
		// 	// var select={"title":title,"selectedData":selectedData};
		// 	// return select;
		// }
		this.$http.get(url+'/teacher1/task/getComposionDetailById',{
            params:{ 'id': that.$route.query.id }
        }).then(response => { 
        	let data = response.body.dto
    		let time = data.createTime,
	    		startY=new Date(time).getFullYear(),
                startM=new Date(time).getMonth()+1,
                startD=new Date(time).getDate(),
                startH=new Date(time).getHours(),
                startS=new Date(time).getMinutes(),
                Dtime = startY+"-"+startM+"-"+startD,
                Ttime = startH+":"+startS,
                newMsg = {}
            	if(data.content == ""){
            		this.hangleImgItems = data.pics;
            		let imgList = data.pics

            		newMsg ={
	                	'taskId': data.taskId,
	                	'id': data.id,
	                	'authorName': data.authorName,
	                	'gradeName': data.gradeName,
	                	'className': data.className,
	                	"title":data.name,
	                	'time':Ttime,
	                	'date':Dtime,
	                	'imgList':imgList,
	                	'type':true
               		}
            	}else{
            		newMsg ={
	                	'taskId': data.taskId,
	                	'id': data.id,
	                	'authorName': data.authorName,
	                	'gradeName': data.gradeName,
	                	'className': data.className,
	                	"title":data.name,
	                	'time':Ttime,
	                	'date':Dtime,
	                	'content': data.content,
	                	'type':false
               		}
            	}        
			this.composionId=data.id
        	this.waitData = newMsg
        })

		//查询评价
		this.$http.get(url+'/teacher1/task/listEvaluate',{
            //params:{}
        }).then(response => { 
		 	let dataOld=response.body.dto
        	let categoryList=dataOld.splice(0,1)[0];
         	this.categoryList = categoryList;
         	let spOne = dataOld.concat();
        	let title=[]
        	for (var i = 0; i < spOne.length; i++) {
	    		spOne[i].splice(0,1)
	    	};
	    	let newArr = eval(spOne)
	    	for (var i = 0; i < newArr.length; i++) {
	    		title.push(newArr[i])
	    	}
	    	this.gradeContentData = title[0]
	    	this.gradeContent = title
		})

		//点评
		
		/*this.$http.get(url+'/teacher/task/commentOnComposion',{
            // params:{}
        }).then(response => { 		
	    	let data = response.body.dto;
		})*/

		this.$http.get(url+'/teacher1/task/scoreList',{
            params:{}
        }).then(response => { 
      		let data = response.body.dto;      		
      		this.scoreData = eval(data);
	 	})

      this.$store.state.showTopNav = false;
      this.$store.state.showBottomNav = false;
	//   this.newData={'content':this.waitData.content}
      // this.gradeContentData=this.gradeContent[0];
      // this.evaluate = JSON.parse()
    },


	methods: {
		goBack() {
			this.$router.go(-1)
		},
		//打分
		selectGrade(index) {
			this.scoreNum.push(index);

    		let score = this.scoreNum.pop();
    		this.scoreItem = score;

    	},

		loaded() {
			new IScroll('#wrapper', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
		},
		deleteEvaluateItem(i) {
			this.evaluate.splice(i,1);
		},
		addItem(id, grade, text) {
			let obj = {id: id, category: this.itemList, grade: grade, content: text};
			this.selectGradeItem.push(obj);
			let itemArr = this.selectGradeItem

			for (var i = 0; i < itemArr.length; i++) {
				for(var j = 0; j < i; j++){
					if(itemArr[j].category == itemArr[i].category){
						itemArr.splice(j, 1)
					}
				}				
			}
			this.evaluate = itemArr;
			// for (var i = 0; i < itemArr.length; i++) {
			// 	this.idList.push(itemArr[i].id)
			// }


			// console.log(this.idList);
						
			/*let str = this.evaluate
			localStorage.correctMsg = JSON.stringify(str);*/
		},
		article(n){
			// $(".article-lable").css({"display":"none"})
			this.correcting=true
			this.selectN=n
			if(n==1){
				this.correctingTitle='好句'
				this.placeholder='说说这段文字好在哪里...'
				this.correctingText=''
			}else if(n==2){
				this.correctingTitle='修改'
				this.placeholder='请填写正确的语句以及错误的原因...'
				this.correctingText=''
			}else if(n==3){
				this.correctingTitle='错别字'
				this.placeholder='请更正错别字...'
				this.correctingText=''
			}
			//alert(this.selectedText)
		},
		articleSpan(n,t){
			this.correcting=true
			if(n===1){
				this.correctingTitle = '好句'
				this.correctingText = t
				return false
			}else if(n === 2){
				this.correctingTitle='修改'
				this.correctingText=t
				return false
			}else if(n === 3){
				this.correctingTitle='错别字'
				this.correctingText=t
				return false
			}
		},
		correctingno(){
			this.correcting=false
			let select=this.selectedText
			// console.log(this.waitData.content)
			let str='<span class="Highlight" style="background: #cfe2ff;">'+select+'</span>'
			let newStr=select
			this.waitData.content=this.waitData.content.replace(str,newStr)
			// console.log(str+','+newStr)
		},
		correctingok(){
			let n=this.selectN
			if(n==1){
				// this.correctingH=this.correctingText
				let select=this.selectedText
				let text=$(".correcting-text").val()
				// console.log(select)
				let that=this
				$(".Highlight:contains('" + select + "')").attr({"type":"1","text":text})
				let str='<span class="Highlight" style="background: #cfe2ff;">'+select+'</span>'
				let newStr='<span class="Highlight" style="background: #cfe2ff;" type="1" text="'+text+'">'+select+'</span>'
				this.waitData.content=this.waitData.content.replace(str,newStr)
				$(".content").on('touchstart', ".Highlight:contains('" + select + "')"  ,function () {      
					that.articleSpan(1, text)
				});
			}else if(n==2){
				
				// this.correctingX=this.correctingText
				let select=this.selectedText
				let text=$(".correcting-text").val()
				// console.log(select)
				let that=this
				let str='<span class="Highlight" style="background: #cfe2ff;">'+select+'</span>'
				let newStr='<span class="Highlight" style="background: #cfe2ff;" type="2" text="'+text+'">'+select+'</span>'
				this.waitData.content=this.waitData.content.replace(str,newStr)
				$(".content").on('touchstart', ".Highlight:contains('" + select + "')"  ,function () {   
					that.articleSpan(2,text)
				});
			}else{
				
				// this.correctingC=this.correctingText
				let select=this.selectedText
				let text=$(".correcting-text").val()
				// console.log(select)
				let that=this
				let str='<span class="Highlight" style="background: #cfe2ff;">'+select+'</span>'
				let newStr='<span class="Highlight" style="background: #cfe2ff;" type="3" text="'+text+'">'+select+'</span>'
				this.waitData.content=this.waitData.content.replace(str,newStr)
				$(".Highlight:contains('" + select + "')").attr({"type":"3","text":text})
				$(".content").on('touchstart', ".Highlight:contains('" + select + "')"  ,function () {    
					that.articleSpan(3,text)
				});
			}
			this.correcting=false
		},

		handleSubmitBtn() {
			console.log(this.postil)
			let url = this.$store.state.url;
			let that = this;
			let idArr = this.evaluate;
			for (var i = 0; i < idArr.length; i++) {
				this.idList.push(idArr[i].id)
			}
			let data = {}
			if( this.waitData.type ) {
				data = {
				    // "composionId": this.composionId,
				    // "composionContent": this.hangleImgItems,
				    // "score": this.scoreItem,
				    // "message": this.message,
				    // "itemId": this.idList
				    "jxfzZxxxCorrectDO": {
			            "composionId": this.composionId,
			            "suggest":this.message,
			            "content": this.hangleImgItems,
			            "scole":  this.scoreItem
			        },
			        // "jxfzZxxxAnnotationDO":this.postil,
			        "itemId": this.idList
				}
			}else{
				data = {
				    // "composionId": this.composionId,
				    // "composionContent": this.waitData.content,
				    // "score": this.scoreItem,
				    // "message": this.message,
				    // "itemId": this.idList
				    "jxfzZxxxCorrectDO": {
			            "composionId": this.composionId,
			            "suggest":this.message,
			            "content": this.waitData.content,
			            "scole":  this.scoreItem
			        },
			        // "jxfzZxxxAnnotationDO":this.postil,
			        "itemId": this.idList
				}
			}
			
			let msg = JSON.stringify(data);
			// $.ajax({
   //              type : "POST",
   //              url : url + '/teacher1/task/commentOnComposion',
   //              data: msg,
   //              async: false,
   //              dataType : "json",
   //              traditional: true,
   //              xhrFields: {
   //                  withCredentials: true
   //              },
   //              crossDomain: true,
   //              success : function (data) {
   //                  if( data.code == 1 ){
   //                      let ToastTip = "点评成功"
   //                      Toast({
			// 				message: ToastTip,
			// 				duration: 2000
   //                      });
   //                      that.$router.push({path:'/teachertask'})
   //                  }
   //              }
   //          });
			$.ajax({
                type : "POST",
                url : url + '/teacher1/task/commentOnComposion',
                data: {"json":msg},
                async: false,
                dataType : "json",
                traditional: true,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success : function (data) {
                    if( data.code == 1 ){
                        let ToastTip = "点评成功"
                        Toast({
							message: ToastTip,
							duration: 2000
                        });
                        that.$router.push({path:'/teachertask'})
                    }
                }
           });
		}
	} 

}

</script>

<style scoped>

.header{
	background-color: #428AFF;
	height:1.25rem;
}
.article-content{
	padding:.3rem;
	overflow: hidden;
	margin-top:1.2rem;
}
.article-content-text{
	/*user-select: text;*/
	border-bottom: 1px dashed #ccc;
	padding-bottom: .3rem;
	text-indent:2em;
	border-top:0;
	border-left:0;
	border-right:0;
}
.img-left{
	float:left;
}
.msg-right{
	text-align: center;
	float:right;
}
.stu-message{
	float:left;
	overflow: hidden;
}
.head-portrait{
	width: 1rem;
	height: 1rem;
	border-radius: .3rem;
}
.article-date{
	text-align: center;
	float:right;
}
.grade-color{
	color:#fea405;
}
.stu-msg-top{
	overflow: hidden;
}
.article-text{
	position:relative;
	margin-top: .3rem;
}
.article-date{
	text-align: center;
	float:right;
}
.navbar{
	margin-top:.4rem;
}
.headline{
	margin-top:.4rem;
	font-weight: bold;
	font-size: 16px;
	text-align: center;
}
.select-rank{
	margin-top: .5rem;
}
.select-rank-box{
	width:2rem;
	height:2rem;
	border-radius: .1rem;
	background: #ccc;
	float:left;
	margin-left: .2rem;
}
.page-part{
	height: 1.2rem;
	box-shadow: 0px 1px 10px #ccc;
	margin-top:.2rem;
	overflow: hidden;
	display: flex;
	justify-content: space-between;
}
.page-part:first-child{
	color:#428aff;
	border-bottom:2px solid #428fff;
}
.select-list-item{
	width:25%;
	float:left;
	text-align: center;
	line-height: 1.2rem;
	box-sizing: border-box;
}
.list-active{
	color:#428aff;
	border-bottom:2px solid #428fff;
}
.summarize{
	margin-top:.5rem;
}
.submit-content{
	margin-top:.3rem;
	min-height: 3rem;
	width: 100%;
	background: #eee; 
	border-radius: .3rem;
	border:none;
	text-indent: 1em;
	padding-top: .2rem;
	overflow: hidden;
	resize:none;
}
.submit-btn{
	border:none;
	width:100%;
	height:1rem;
	background: #428aff;
	color:#ffffff;
	border-radius: .2rem;
	margin-top:.3rem;
}
.score{
	margin-top:.3rem;
}
.score-title{
	font-weight: bold;
}
.select-title{
	color:#fca405;
}
.select-warn{
	margin-top:.3rem;
}
.eval-list-item{
	margin-top:.2rem;
	padding:.2rem;
	box-shadow: 0px 1px 10px #ccc;
	border-radius: .3rem;
	position:relative;
}
.item-title{
	color:#fca405;
	margin-right:.3rem;
}
.item-delete{
	width: .4rem;
	height:.4rem;
	position:absolute;
	top:.2rem;
	right:.2rem;
}
.grade-item{
	list-style:none;
	height:2.8rem;
	width:2.8rem;
	border-radius: .3rem;
	margin-left:.2rem;
	box-shadow:0px 1px 10px #eee;
	text-align: center;
	float:left;
	padding-top:.1rem;
}
.interval-img{
	width:1.3rem;
	height:.1rem;
	margin-bottom:.1rem;
	margin-top: .2rem;
}
#wrapper {
	margin-top: .5rem;
	position: relative;
	z-index: 1;
	height:3rem;
	width: 100%;
	overflow: hidden;
	-ms-touch-action: none;
}

#scroller {
	position: absolute;
	z-index: 1;
	width: 15rem;
	text-size-adjust: none;
}

#scroller ul {
	list-style: none;
	width: 100%;
	padding: 0;
	margin: 0;
}

#scroller li {
	height:2.8rem;
	width:2.8rem;
	float: left;
	overflow: hidden;
	text-align: center;
	box-shadow:0px 1px 10px #ccc;
}
.article-lable{
	display:none;
	position: absolute;
    top: 0;
    left: 0;
    /* margin-left: -4.5rem;*/
    height: 1.2rem;
    background: #fff;
    border-radius: .2rem;
	z-index: 9999;
	box-shadow: 0px 1px 10px #ccc;
}
.article-span{
	    line-height: 1.2rem;
    color: #2e2e2e;
        margin: 0px 0.82rem;
		font-size: .35rem;
}
.article-lable-bom{
	position: absolute;
    top: .8rem;
    left:3rem;
    width: 0;
    height: 0;
    border-left: .3rem solid transparent;
    border-right: .3rem solid transparent;
    border-top: .3rem solid #2e2e2e;
}
.grade-active{
	background: #428aff;
	color:#fffeff;
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
    height: 100%;
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
    width: 7.2rem;
    height: 3rem;
    margin: .4rem;
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
  .css-p{
  	margin-top:.2rem;
  }
.score-select{
	width:100%;
	height:1.8rem;
	margin-top:.3rem;
	box-shadow: 0px 1px 10px #ccc;
	border-radius: .3rem;
	overflow: hidden;
}
.score-code{
	float:left;
	text-align: center;
	line-height: 1.8rem;
	width:1.8rem;
	background: #438fff;
	font-size: 1.2em;
	color:#feffff;
}
.items-container{
	float:left;
	position:relative;
}
.score-line{
	position:absolute;
	top:.7rem;
	left:.3rem;
	width:7rem;
	height:.3rem;
	background: #d2d2d2;
	border-radius:.2rem;
}
.score-category{
	position:absolute;
	top:1.2rem;
	left:.3rem;
	width:7rem;
	overflow: hidden;
	display:flex;
	justify-content: space-between;
}
.category-item{
	float:left;
}
.active{
	color:#fea405;
}
.score-grade-c{
	position:absolute;
	top:0;
	left:0;
	height:.3rem;
	background: #438fff;
	border-radius:.2rem;
}
</style>