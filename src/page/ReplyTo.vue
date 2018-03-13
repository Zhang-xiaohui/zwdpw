<template>
	<div class="replyto">
		<mt-header class="header" fixed title="未完成">
			<mt-button @click="Back" slot="left" icon="back"></mt-button>
			<mt-button @click="temporary" slot="right">暂存</mt-button>
		</mt-header>
		<div v-for="(item,i) in ContainerData.data" key="i">
			<AssignTask :TabContainerData="item" />
		</div>
		<div class="ans">
			<h3>作答</h3>
		</div>
		<div>
			<CompositionTabContribute @title="title"/>
		</div>
	</div>
</template>
<style scoped>
	.header {
		background: #408AFF;
		height: 1.25rem;
	}
	
	.ans h3 {
		padding-left: .5rem;
		border-left: 5px solid #418aff;
	}
	
	.ans {
		height: .5rem;
	}
	/*.replyto .page-tab-title{
		position: relative !important;
    z-index: 0 !important;
    width: 100vw;
    background: #FFFFFF;
  
    border-top: 1px solid #A0A0A0;
	}*/
	
	.mint-button--large {
		width: 90%;
	}
</style>
<script>
	import AssignTask from "../components/AssignTask"
	import CompositionTabContribute from "../components/CompositionTabContribute"
	import {MessageBox} from "mint-ui"
	export default {
		name: "replyTo",
		components: {
			AssignTask,
			CompositionTabContribute
		},
		created: function() {
			this.$store.state.backUrl = "aaa";
			this.$store.state.titleName = "未作答";
			this.$store.state.selectedTab = "schoolwork";
			this.$store.state.more = "load";
			this.$store.state.moreUrl = "loading";
			this.$store.state.moreTitle = "暂存";
			this.$store.state.showTopNav = false;
			this.$store.state.showBottomNav = false;
			window.scrollTo(0, 0);

		},
		data() {
			return {
				username:'',
				ContainerData: {
					data: []
				},
			}
		},
		mounted: function() {
			var vm = this;
//			var id = this.$route.query.id;
			var name = this.$route.query.name;
			var creator = this.$route.query.creator;
			var createTime = this.$route.query.time;
			var content = this.$route.query.content;
			var data = [];
			var msg = {
					"msgname": name,
					"bname": creator,
					"time": this.getMyDate(createTime),
//					"type": dto.cntentType,
					"body": content
				}
				data.push(msg);

				this.ContainerData.data = data;
//			vm.$http.get(this.$store.state.url + 'student2/model/taskList', {
//				params: {
//					taskId: id,
//				}
//			}).then(function(datas) {
//				var vm = this;
//				var content = this.$route.query.content;
//				console.log(datas);
//				var dto = datas.body.dto;
//				var data = [];
//
//				var msg = {
//					"msgname": dto.taskName,
//					"bname": dto.taskTeacher,
//					"time": this.getMyDate(dto.createTime),
//					"type": dto.cntentType,
//					"body": dto.content
//				}
//				data.push(msg);
//
//				this.ContainerData.data = data;
//			}, (response) => {
//				console.log("error");
//			});

		},
		methods: {
			title(n){
				console.log(n)
				this.username=n
			},
			Back() {
				this.$router.go(-1);
			},
			temporary() {
//				console.log(this.data)
				let title=this.$store.state.saveTitle
				var imgL = [];
				var j = 0;
				for(var i = 0; i < $(".img").length; i++) {
					imgL[j] = $($(".img")[i]).attr("src");
					++j;

				}
				var vm = this;
				//if(this.$store.state.isA==1) 1 :wenzi 2 tupian{}
				var type;
				var content;
				console.log("isA:" + this.$store.state.isA);
				if(this.$store.state.isA == 1) {
					type ="01";
					content = $(".content").html()
				} else if(this.$store.state.isA == 2) {
					type = "02";
					content = imgL
				}
				console.log("type:" + type);
                let url=this.$store.state.url;
				let data={
					'name' : vm.$store.state.temporaryStorage,
					'content' : content,
					'objId':vm.$route.query.id,
					'status':"004001"
				}
             $.ajax({
					type: "post",
					url: url+'student2/model/answer',
					data: {
//						'taskId': vm.$route.query.id || "",
//	   	      	  		'name':vm.$route.query.name,
						"composion":JSON.stringify(data),
	   	      	  		'type' : type,
					},
					dataType: "json",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data) {
						console.log(data)
						if(data.code==1){
//							MessageBox('', data.message);
                        
						MessageBox.alert('操作成功').then(action => {
						  vm.$router.push('/schoolwork')
						});
						}
					}
				});
			},
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
			handleSubmit() {
				alert(11111);
			}
		},
		destroyed: function() {
			this.$store.state.moreTitle = null
		},
	}
</script>