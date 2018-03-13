<template>
	<div class="remark">
		<div v-for="(item,i) in ContainerData.data" key="i">
			<AssignTask :TabContainerData="item" />
		</div>
		<div class="ans">
			<h3>我的作答</h3>
		</div>
		<div class="grade">{{score}}</div>
		<div >
			<div class="acontainer">
			  <div>
				<h3 class="atitle">{{ContainerDataAA.atitle}}</h3>
				<div class="atime">{{ContainerDataAA.atime}}</div>
			  </div>
			  <div class="acontainera" v-html="ContainerDataAA.acontent">
			  </div>
		    </div>
		</div>
		<div class="pj">
			<mt-badge size="large" color="#fea405">作文评价</mt-badge>
		</div>
		<div class="pd">
			<table class="r-table" width="100%">
				<tr v-for="(item, i) in evalList" :key="i">
					<td class="content-r">{{item.demision}}</td>
					<td>
						{{item.level}},{{item.content}}
					</td>
				</tr>
			</table>
		</div>
		<div class="ans">
			<h3>名师点评</h3>

		</div>
		<div class="pd">
			<p>{{ContainerDataAA.contentP}}<span class="ti">{{timeP}}</span></p>

		</div>
		<div class="ans">
			<h3>作文留言（100）</h3>

		</div>
		<div class="pd">
			<input type="text" placeholder="说说你的看法" class="way" v-model="info"  />
			<mt-button type="primary" size="small" @click="submit()">确定</mt-button>
		</div>
		<div v-for="(item,i) in ContainerDataBB.data" key="i">
			<Message :ContainerDataB="item"/>
		</div>
		<div class='correcting' v-if="correcting">
			<div class="correctingBox">
				<div class="correctingCon">
					<p class='correcting-font'>{{correctingTitle}}</p>
					<textarea class="correcting-text">{{correctingText}}</textarea>
					<button class="correctingOk" @click="correctingok">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.label-body[data-v-e80b37ca]{
	color: #000 !important;
}
.composition-tagL{
	border-bottom: .2em solid #e2e2e2;
    margin-top: 1.25rem;
}
.ans h3{
		padding-left: .5rem;
		border-left: 5px solid #418aff;
	}
	
	.ans {
		height: .5rem;
		margin-top: .3rem;
	}
	
	.grade {
		font-size: .6rem;
		font-weight: bold;
		color: #f00;
		border: 1px solid #fff;
		width: 1.2rem;
		height: 1.2rem;
		border-radius: .6rem;
		/*background: #daecff;*/
		background: -webkit-gradient(linear, 0 0, 0 bottom, from(#ffffff), to(#daecff));
		right: .5rem;
		position: absolute;
		    text-align: center;
    line-height: 1.2rem;
	}
	
	
	.remark {
		margin-bottom: 1rem;
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
	
	.way {
		padding: .2rem;
		border: 1px solid #ccc;
		border-radius: 3px;
		width: 78%;
	}
	
	.mint-msgbox-content {
		max-height: 3rem;
		overflow-y: scroll;
	}
	.atitle,.atime{
	  text-align: center;
	}
	.acontainera{
	  text-indent:.6rem;
	  padding: .5rem;
	  word-break: break-word;
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
  .correctingOk{
	         margin-left: 3.2rem;
    border: 0;
    width: 1.8rem;
    height: .7rem;
    color: #fff;
    background: #428aff;
  }
</style>
<script>
	import AssignTask from "../components/AssignTask"
	import Message from "../components/Message"
	import {
		MessageBox
	} from 'mint-ui';
	export default {
		name: 'remark',
		components: {
			AssignTask,
			Message
		},
		created:function(){
			this.$store.state.showBottomNav=false;
			var vm = this;
				var data = [];
				var msg = {
					"msgname" : this.$route.query.name,
				    "bname" : this.$route.query.teacherName,
					"time" : this.getMyDate(this.$route.query.time),
					"body" :this.$route.query.content
				}
				data.push(msg);
				vm.ContainerData.data = data;
			//中部接口
			vm.$http.get(this.$store.state.url + 'student2/model/answerInfo', {
				params: {
					objId:this.$router.history.current.query.id,

				}
			}).then(function(data) {
				if(data.body.code==1){
					let content=''
					if(data.body.dto.pics.length>0){
						let src=data.body.dto.pics
						for(let i=0;i<src.length;i++){
							if(src[i]){
								content=content+'<img src="'+src[i]+'" style="width:100%"/>';
							}
						}
					}else{
						content=data.body.dto.composion.content
					}
					var msg = {
						// "name":data.body.dto.composion.content,
						// "content":content
						"atitle": data.body.dto.composion.name,
						"atime": this.getMyDate(data.body.dto.composion.createTime),
						"acontent":content,
						"contentP":data.body.dto.suggest
					}
					this.score = data.body.dto.score;
					this.evalList = data.body.dto.evalList;
					this.composId=data.body.dto.composion.id
					this.ContainerDataAA = msg;
				}
			});
			vm.getMessage()
		},
		updated(){
			let text=$(".Highlight").attr("text"); 
			let type=$(".Highlight").attr("type"); 
			let that=this
			if(text){
				$(".Highlight").on('touchstart',function () { 
				that.articleSpan(type,text)
			});
			}
			
		},
		mounted: function() {
			this.$store.state.backUrl = "aa";
			this.$store.state.titleName = "已评点";
			this.$store.state.selectedTab = "schoolwork";
			let that=this
			window.scrollTo(0, 0);
			console.log("mounted");
			
			
			// vm.$http.get(this.$store.state.url + 'student/task/getAnswered', {
			// 	params: {
			// 		taskId: this.$router.history.current.query.id,
			// 	}
			// }).then(function(data) {
			// 	console.log(data);
			// 	this.evalList = data.body.dto.evalList;
			// 	this.score = data.body.dto.remark.score;
			// 	var composion = data.body.dto.composion;
			// 	var remark = data.body.dto.remark;
			// 	console.log(remark);
			// 	this.contentP = remark.content;
			// 	this.timeP = this.getMyDate(remark.createTime);
			// 	var data = [];
			// 	var msg = {
			// 		"atitle": composion.taskName,
			// 		"atime": this.getMyDate(composion.createTime),
			// 		"acontent": composion.content,
			// 		"id":composion.id
			// 	}
			// 	data.push(msg);
			// 	vm.ContainerDataAA.data = data;
			// }, (response) => {
			// 	console.log("error");
			// });
			// $(".acontainera span").click(function() {
			// 	MessageBox.alert('a.文章使用的叙述方式既能清晰说明事件过程，又增强了文章的吸引力b.文章能够根据内容性质选择叙述方式，有助于清楚的说明事件过程c.根据内容性质选择叙述方式，会帮助你清楚说明事件过程及其意义', '好句');
			// 	console.log("qwqwqw");
			// 	console.log($(this).attr("id"));
			// });
		},
		data() {
			return {
				correcting:false,
				correctingText:"",
				correctingTitle:'',
				timeP:"",
				contentP:"",
				levalA:"",
				levalB:"",
				levalC:"",
				levalD:"",
				info:"",
				// score:"A+",
				evalList:[],
				ContainerData: {
					data: []
				},
				ContainerDataAA: {
},
				ContainerDataBB:{

					data:[
	
					]

				},
			}
		},
		methods: {
			getMyDate(str) {
				var oDate = new Date(str),
					oYear = oDate.getFullYear(),
					oMonth = oDate.getMonth() + 1,
					oDay = oDate.getDate(),
					//          oHour = oDate.getHours(),  
					//          oMin = oDate.getMinutes(),  
					//          oSen = oDate.getSeconds(),  
					oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay); //最后拼接时间  
				return oTime;
			},

			//补0操作  
			getzf(num) {
				if(parseInt(num) < 10) {
					num = '0' + num;
				}
				return num;
			},
			submit(){
				
				var vm = this;
				let data={
		                "objId":this.$router.history.current.query.id,
						"content":vm.info,
		            }
				vm.$http.get(this.$store.state.url + 'student2/model/setMessage', {
					params: {
						"message":JSON.stringify(data),
					}
				}).then(function(datas) {
					console.log(datas.body.code)
					if(datas.body.code==1)
					MessageBox.alert('留言成功').then(action => {
						vm.info=''
						vm.getMessage()
					});
				}, (response) => {
					console.log("error");
				});
			},
			getMessage(){
				let vm=this
				vm.$http.get(this.$store.state.url + 'student2/model/getMessage', {
					params: {
						composId:this.$router.history.current.query.id,
					}
				}).then(function(data) {
					console.log(data)
					if(data.body.dto.list){
					var message = data.body.dto.list;
					console.log(data);
					var data = [];
					for(var i = 0;i < message.length;i++){
						var msg = {
							"name":message[i].sname,
							"content":message[i].content
						}
						data.push(msg);
						this.ContainerDataBB.data = data;
					}
					}
				}, (response) => {
					console.log("error");
				});
			},
			articleSpan(n,t){
				this.correcting=true
				if(n==1){
					this.correctingTitle = '好句'
					this.correctingText = t
					return false
				}else if(n == 2){
					this.correctingTitle='修改'
					this.correctingText=t
					return false
				}else if(n == 3){
					this.correctingTitle='错别字'
					this.correctingText=t
					return false
				}
			},
			correctingok(){
				this.correcting=false
			}
		}

	}
</script>