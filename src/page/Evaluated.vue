<template>
	<div class="CorrectComposition">
		<mt-header class="header" fixed title="名师点评">
	        <mt-button @click="goBack" slot="left"  icon="back"></mt-button>
	    </mt-header>
	    <div class="article-content">
	    	<div class="stu-msg-top">
		    	<div class="stu-message">
	        		<div class="msg-right">
	        			<p>{{evaluateMsg.name}}</p>
	        			<p class="grade-color"><span>{{evaluateMsg.grade}}</span><span>{{evaluateMsg.className}}</span></p>
	    			</div>
	        	</div>
	        	<div class="article-date">
	        		<p>{{evaluateMsg.date}}</p>
	    		</div>
    		</div>
    		<div class="article-text">
    			<div class="headline">
    				<span>{{evaluateMsg.title}}</span>
    				<span class="score-grade">{{scoreItems.score}}</span>
				</div>  
				<div v-if="evaluateMsg.type" class="article-content">
            		<img class="img-task" :src='evaluateMsg.content'/>       	
            	</div>
	            <div v-else class="article-content-text" v-html='evaluateMsg.content'></div>
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
			<div class="composition-evaluate">
	    		<div class="evaluate-title">作文评价</div>
	    		<!-- <div class="evaluate-content">
	    			<table v-for="(item, i) in evaluateDTOs" :key="i">
	    				<tr class="score-item">
	    					<td class="score-category">{{item.demission}}</td>
	    					<td class="score-content"><span>{{item.level}}</span>：<span>{{item.content}}</span></td>
	    				</tr>
	    			</table>
	    		</div> -->
	    		<div class="pd">
					<table class="r-table" width="100%">
						<tr v-for="(item, i) in evaluateDTOs" :key="item.id">
							<td class="content-r">{{item.demission}}</td>
							<td>
								{{item.level}},{{item.content}}
							</td>
						</tr>
					</table>
				</div>
	    	</div>
			
			<div class="composition-evaluate">
				<div class="evaluate-title">名师点评</div>
				<div class="evaluate-content evaluate-css">
					<div class="evaluate-text" v-html='scoreItems.remark'></div>
					<div class="submit-date"><span class="css-sp-m">{{scoreItems._date}}</span></div>
				</div>
			</div>
			<div class="leave-massage">
				<div class="msg-title">作文留言<span>(100)</span></div>
				<div class="msg-style"> 
					<input type="text" class="msg-input" placeholder="说说你的看法" maxlength="100" />
					<button class="msg-btn" @click="handlesubmitContent" >提交</button>
				</div>
			</div>
			<div class="leave-massage-list">
				<ul class="msg-items">
					<li v-for="(item, i) in leaveMassage" :key="i" class="msg-item">
						<span class="css-color">{{item.muserName}}</span>：<span>{{item.content}}</span>
					</li>
				</ul>
			</div>
    	</div>
    	
	</div>
</template>

<script>
import { Checklist,DatetimePicker,Toast } from 'mint-ui';

export default {
	data() {
		return{
			selected:'1',
			id:1,
			evaluateMsg: {},
			evaluateDTOs: [],
			message: '',
			correcting:false,
			scoreItems:{},
			composId:'',
			correctingTitle:'',
			correctingText:'',
			leaveMassage:[]
		}
	},

	created:function(){
		let that = this;
		let url=this.$store.state.url;
		this.$store.state.showTopNav=false;
		this.$store.state.showBottomNav = false;
		// this.$http.get(url+'/teacher1/task/listEvaluate',{
		//     params:{ 'id': that.$route.query.id }
		// }).then(response => {
		// 	// console.log(response.body.dto.evaluateDTOs)
		// 	this.evaluateDTOs = response.body.dto;
		// 	this.message = response.body.dto;
		// });

		this.$http.get(url+'/teacher1/task/getComposionDetailById',{
		    params:{ 'id': that.$route.query.id }
		}).then(response => {
			this.evaluateDTOs = response.body.dto.evaluateDTOs;
			let data =response.body.dto;
			let msg = response.body.dto;
			this.composId = data.id;
			this.leaveMassage = response.body.dto.message;
			let timeS = msg.createTime,
				_startY=new Date(timeS).getFullYear(),
                _startM=new Date(timeS).getMonth()+1,
                _startD=new Date(timeS).getDate(),
                _startH=new Date(timeS).getHours(),
                _startS=new Date(timeS).getMinutes(),
                _Dtime = _startY+"-"+_startM+"-"+_startD,
                _Ttime = _startH+":"+_startS

			let time = data.createTime,
				startY=new Date(time).getFullYear(),
                startM=new Date(time).getMonth()+1,
                startD=new Date(time).getDate(),
                startH=new Date(time).getHours(),
                startS=new Date(time).getMinutes(),
                Dtime = startY+"-"+startM+"-"+startD,
                Ttime = startH+":"+startS;

            let imgItems = {};
        	// let imgItem = data.content.toString()

        	// let imgUrl = imgItem.replace(/,$/gi, "")

            if( data.content == "" ){
            	let imgList = data.pics
            	imgItems = {
            		id:data.id,
	            	taskId:data.taskId,
	            	name:data.authorName,
					grade:data.gradeName,
					className:data.className,
					time:Ttime,
					date:Dtime,
					title:data.name,
					content:imgList,
					state:1,
					type:true
            	}
            }else{
            	imgItems = {
            		id:data.id,
	            	taskId:data.taskId,
	            	name:data.authorName,
					grade:data.gradeName,
					className:data.className,
					time:Ttime,
					date:Dtime,
					title:data.name,
					content:data.content,
					state:1,
					type:false
            	}
            }

            this.evaluateMsg = imgItems

            this.scoreItems = {
            	_time:_Ttime,
				_date:_Dtime,
				remark:msg.remark,
				score:msg.score,
				teacherId:msg.teacherId

            }

		})


    },
    mounted() {
        $(".img-task").css({
        	"display":'block',
            "width": '8.7rem'
        })
    },
	updated:function(){
		$(".img-task").css({
        	"display":'block',
            "width": '8.7rem'
        })
		let that=this
    	let select=$(".Highlight").text();
    	let type=$(".Highlight").attr('type')
		let text=$(".Highlight").attr('text')
		$(".Highlight:contains('" + select + "')").on('click',function () {      
			that.articleSpan(type,text)
		})
		// $(".content").on('click', ".Highlight:contains('" + select + "')"  ,function () {      
		// 	that.articleSpan(type,text)
		// });
	},

	methods: {
		goBack() {
			this.$router.go(-1)
		},
		closecorrecting() {
			this.correcting = false
		},
		articleSpan(n,t){
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
		handlesubmitContent() {
			let url=this.$store.state.url;
			let that = this;
			let data = {
				'objId': that.composId,
		    	'content': $(".msg-input").val()
			}
			// console.log(JSON.stringify(data))
			// this.$http.get(url+'/teacher/task/saveMessage',{
			//     params: JSON.stringify(data)
			// }).then(response => { 
			// 	console.log(response)
			// })
			$.ajax({
                type : "GET",
                url : url +'/teacher1/task/saveMessage',
                data: data,
                async: false,
                dataType : "json",
                traditional: true,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success : function (data) {
                    if( data.code == 1 ){
                        let ToastTip = "发布成功"
                        Toast({
                          message: ToastTip,
                          duration: 2000
                        });
                        $(".msg-input").val("");
                        that.$http.get(url+'/teacher1/task/getComposionDetailById',{
						    params:{ 'id': that.$route.query.id }
						}).then(response => {
							that.leaveMassage = response.body.dto.message;
							console.log(that.leaveMassage)
						})
                    }else if( data.code == 1000 ){
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
	margin-top:1.8rem;
}
.article-content-text{
	margin-top:.5rem;
	border-bottom: 1px dashed #ccc;
	padding-bottom: .3rem;
	text-indent:2em
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
	margin-top: .3rem;
	position:relative;
}
.article-date{
	text-align: center;
	float:right;
}
.headline{
	font-weight: bold;
	font-size: 16px;
	text-align: center;
	margin-bottom:.3rem;
	position:relative;
}
.score-grade{
	position:absolute;
	right:.5rem;
	color:#e21a0a;
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
.evaluate-title{
	width:1.8rem;
	line-height:.6rem;
	background-color:#fea405;
	text-align: center;
	border-radius: .2rem;
	color:#e0ffff;
}
.composition-evaluate{
	margin-top: .35rem;
}
.evaluate-content{
	box-shadow: 0px 1px 10px #ccc;
	margin:.35rem 0; 

}
.score-category{
	margin-right: .2rem;
	background: #fea405;
	padding:.2rem .3rem;
	width:1rem;
}
.score-item{
	box-sizing: border-box;
	border-bottom:1px dashed #eee7ef;
	overflow: hidden;
}
.last-item{
	border:none;
}
.score-content{
	display: block;
	float:right;
	padding:.2rem .3rem;
	width:7rem;
}
.evaluate-css{
	padding: .5rem .4rem;
	color:#197bff;
	position:relative;
}
.evaluate-text{
	margin-bottom: .4rem;
}
.submit-date{
	position:absolute;
	bottom:.1rem;
	right:.3rem;
	color:#666;
}
.msg-input{
	width:7rem;
	height:.8rem;
	border-radius:.2rem;
	border:1px solid #ccc;
	background: #eee;
	padding-left: 0.2rem;
}
.msg-btn{
	height:.8rem;
	width:1.5rem;
	background:#428aff;
	border:none;
	border-radius: .2rem;
	margin-left:.2rem;
	color:#e0ffff;
}
.msg-style{
	margin-top:.5rem;
}
.msg-title{
	line-height:1.5rem;
	border-bottom:1px solid #ccc;
}

.isSendOk{
        width: 7rem;
    margin-left: .5rem;
    height: 1rem;
    border: 0;
    border-radius: 0.2rem;
    background: #418aff;
    margin-top: .4rem;
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
  .css-sp-m{
  	margin-right:.2rem;
  }
  .leave-massage-list{
  	margin-top:.5rem;
  }
  .msg-items{
	border-top:1px #ccc dashed;
  }
  .msg-item{
  	width:9rem;
  	padding:.2rem .2rem;
  	background: #fffcfc;
  	border-radius: .3rem;
  	margin-top:.2rem;
  	box-shadow: 0 1px 3px 1px #ccc;
  }
  .css-color{
  	color:#4f91fe;
  }
  .pj,
	.pd {
		padding-left: .5rem;
		padding-right: .5rem;
	}

	
	.r-table {
		/*border: 1px solid #ccc;
		border-radius: 8px;
    width: 92%;
    padding: 0.2rem;

    display: inline-block;*/
		margin-top: .5rem;
	}
	
	.r-table td {
		padding: .2rem;
		/*display: inline-block;*/
		border: 1px solid #888888;
		/*width: 5%;*/
	}
	
	.content-r {
		background: #fea405;
		color: #FFFFFF;
	}
	
	.pd p {
		border: 1px solid #FFFFFF;
		border-radius: 5px;
		padding: .2rem .3rem;
		box-shadow: 0px 0px 3px 3px #efefef;
		margin-top: .2rem;
		color: #eb0000;
		line-height: .5rem;
	}
	
	.ti {
		float: right;
		color: #888;
	}
</style>