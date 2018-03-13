<template>
	<div class="repertoryL">
		<div v-if="!this.$store.state.isStudent">
			<NoSchoolwork v-if="this.$store.state.isEmpty" />
			<SchoolworkManage />
		</div>
		<div v-else style="margin-bottom: 1.5em;">
			<div class="page-navbar">

				<mt-navbar class="page-part page-tab-title" v-model="selected">
					<mt-tab-item id="1" class="tabo" @click.native.prevent="selectData('01')">{{tabO}}</mt-tab-item>
					<mt-tab-item id="2" @click.native.prevent="selectData('02')">{{tabT}}</mt-tab-item>
					<mt-tab-item id="3" @click.native.prevent="selectData('03')">{{tabY}}</mt-tab-item>
				</mt-navbar>

				<!--<div>
		      <mt-cell class="page-part" title="当前选中" >{{ selected }}</mt-cell>
		    </div>-->

				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="1" class="sta">
						<!--<mt-cell v-for="n in 10" :title="'内容 ' + n" />-->
						<mt-cell v-for="(item,i) in TabContainerDataL.data" key="i" v-if="mate">
							<StudentLabel :ContainerData="item" />
						</mt-cell>
						<div v-if="this.$store.state.work">
							<NoWork/>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="2">
						<!--<mt-cell v-for="n in 4" :title="'测试 ' + n" />-->
						<mt-cell v-for="(item,i) in TabContainerDataL.data" key="i" >
							<!--style="display: inline-block;
						    padding: 1em 1em 0.5em 1em;
						    background-image: none;
						    border: 1px solid #e2e2e2;
						    margin: .3rem;
						    width: auto;
						    box-shadow: 3px 3px 0px 0px #e2e2e2;"-->
							<StudentLabeled :ContainerData="item" />
						</mt-cell>
						<div v-if="this.$store.state.work">
							<NoWork/>
						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="3">
						<!--<mt-cell v-for="n in 6" :title="'选项 ' + n" />-->
						<mt-cell v-for="(item,i) in TabContainerDataL.data" key="i">
							<StudentLabell :ContainerData="item" />
						</mt-cell>
						<div v-if="this.$store.state.work">
							<NoWork/>
						</div>
					</mt-tab-container-item>
				</mt-tab-container>
			</div>
		</div>
	</div>
</template>
<style>
	.repertoryL .mint-cell-wrapper {
		display: inline-block;
		padding: 1em 1em 0.5em 1em;
		background-image: none;
		border: 1px solid #e2e2e2;
		margin: .3rem;
		box-shadow: 3px 3px 0px 0px #e2e2e2;
	}
	
	.page-navbar {
		margin-top: 3rem;
	}
	
	.page-tab-title {
		position: fixed;
		top: 1.25rem;
		width: 100%;
		z-index: 999;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		margin-bottom: 0px;
	}
	
	.repertoryL {
		margin-top: 1.25rem;
	}
	
	.repertoryL .mint-cell-wrapper {
		width: 9.4rem;
	}
	
	.student-label {
		width: 100%;
	}
	
	.add-state {
		background: #CCCCCC;
	}
</style>
<script>
	import NoSchoolwork from "../components/NoSchoolwork";
	import SchoolworkManage from "../components/SchoolworkManage";
	import StudentLabel from "../components/StudentLabel";
	import StudentLabell from "../components/StudentLabell";
	import StudentLabeled from "../components/StudentLabeled";
	import NoWork from "../components/NoWork";
	import { MessageBox } from 'mint-ui';
	//	import {getMyDate} from '../../static/time.js'
	export default {
		name: 'repertory',
		components: {
			NoSchoolwork,
			SchoolworkManage,
			StudentLabel,
			StudentLabeled,
			NoWork,
			StudentLabell
		},
		created: function() {
			if(!localStorage.getItem("userType")) {
				this.$router.push({
					path: '/loading'
				})
			}
		},
		mounted: function() {
			this.$store.state.backUrl = null;
			this.$store.state.titleName = "课堂任务";
			this.$store.state.selectedTab = "schoolwork";
			this.$store.state.showTopNav = true;
			this.$store.state.showBottomNav = true;
			window.scrollTo(0, 0);
			console.log("mounted");
			$('.tabo').children().eq(1).click();
			console.log("mounted");
			if(localStorage.getItem("userType") == '') {
				this.$router.push({
					path: '/loading'
				})
			}
		},
		destroyed: function() {
			this.$store.state.titleName = null;
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
			selectData(type) {

				var vm = this;

				//			var type = $(".is-selected div:nth-child(2)").html()
				vm.$http.get(this.$store.state.url + 'student2/model/taskList', {
					params: {
						listType: type
					}
				}).then(function(datas) {
					// console.log(datas);
					var type = this.selected;	
                    if(datas.body.code == 1000){
                     	localStorage.clear() ;
//                  	 MessageBox.alert(datas.body.message).then(action => {
						  this.$router.push({
											path: '/loading'
										})
//						});
                    }else{
						if(datas.body.dto){
							var data = [];
							var list = datas.body.dto.list;
							this.$store.state.work = false;
							console.log(list)
							for(let i = 0; i < list.length; i++) {
								var content = list[i].content;
								var content1 = content.replace("<img","<img style='width:100%'");
								var record = {
									'id': list[i].id,
									'NAME': list[i].taskName,
									'TIME': this.getMyDate(list[i].publishTime),
									'CONTENT': content1,
									'SRC': list[i].portraitUrl,
									'CREATOR': list[i].creatorName,
									'STATE': list[i].composStatus
								}

								if(type == 1) {
									record.STATE = "作答";
								}
								data.push(record);
							}
							this.TabContainerDataL.data = data;
						}else{
							this.$store.state.work = true;
							this.TabContainerDataL.data=[]
						}
                    }

				}, (response) => {
					console.log("error");
				});
			}

		},
		data() {
			return {
				tabO: "未作答",
				tabT: "已作答",
				tabY: "已评点",
				mate: true,
				selected: '1',
				type: "",
				TabContainerDataL: {
					data: []
				},
				TabContainerDataLL: {
					data: []
				},
				TabContainerDataLL: {
					data: []
				}
			}
		},
	}
</script>