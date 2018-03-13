<template>
	<div class="student-label">
		<!--<div class="composition-tag" v-for="(item,i) in compositionData" key="i">-->

		<div>
			<div>
				<h3 class="composition-name">{{ContainerData.NAME}}</h3>
				<span class="composition-time">{{ContainerData.TIME}}</span>
			</div>

			<router-link class="router-css" :to="{ path:'AnswerClick' , query:{id:ContainerData.id,content:ContainerData.CONTENT,time:ContainerData.TIME,name:ContainerData.NAME,teacherName:ContainerData.CREATOR}}">
				<div class="label-body" ref="div1" v-html="ContainerData.CONTENT">
					{{ContainerData.CONTENT}}
				</div>
			</router-link>
			<div class="label-foot">
				<img class="author-img" :src="ContainerData.SRC" />
				<span class="author-name">{{ContainerData.CREATOR}}</span>
				<span class="comment">
					<!--<mt-button type="primary" size="small" v-if="ContainerData.type == '1'" @click.native="openConfirm">提交</mt-button>
					<span v-else>-->
					<!--<router-link class="router-css" to="answerClick">-->
						<mt-button type="primary" size="small" class="state add-state" v-if ="ContainerData.STATE == '004002'" disabled>{{ContainerData.STATE == '004002'?"已答":"提交"}}</mt-button>
						
						<mt-button type="primary" size="small" class="state" v-else-if ="ContainerData.STATE == '004001'" @click="openConfirm()">{{ContainerData.STATE == '004002'?"已答":"提交"}}</mt-button>
					<!--</router-link>-->
					<!--</span>-->
				</span>
			</div>
		</div>

		<!--</div>-->
	</div>
</template>
<script>
	import {
		MessageBox
	} from 'mint-ui';

	export default {
		name: 'StudentLabeled',
		props: ['ContainerData'],
		methods: {
			toRepertoryOne: function(type) {
				this.$store.state.ArticleType = type;
				console.log(type);
			},
			openConfirm() {
				//      MessageBox.confirm('提交作文后，会提交到你所在班级的老师进行批改，请耐心等待。', '你确定提交作业吗？');
				MessageBox.confirm('提交作文后，会提交到你所在班级的老师进行批改，请耐心等待。', '你确定提交作业吗？').then(action => {
					var vm = this;
					//  	    var id = this.$route.query.id;
					//  	    var content = this.$route.query.content;
					//debugger;
					console.log(vm.ContainerData.id);
					//      console.log(localStorage.getItem("id"));
					vm.$http.get(this.$store.state.url + 'student2/model/commiteComposion', {
						params: {
							objId:vm.ContainerData.id
						}
					}).then(function(data) {
						console.log(data);
						if(data.body.code == 1) {
							MessageBox.alert("提交成功", "提示");
							vm.ContainerData.STATE = '004002';
						}
					}, (response) => {
						console.log("error");
					});
				});
			},
		}
	}
</script>

<style scoped>
	.mint-cell-wrapper {
		display: inline-block;
		padding: 1em 1em 0.5em 1em;
		background-image: none;
		border: 1px solid #e2e2e2;
		margin: .3rem;
		width: auto;
		box-shadow: 3px 3px 0px 0px #e2e2e2;
	}
	
	.composition-tag {
		padding: 1em 1em 0.5em 1em;
		margin: 1em 0.3rem;
		box-shadow: 0px 4px 13px 6px #d9d9d9;
	}
	
	.composition-tag a {
		color: black;
	}
	
	.author-img {
		width: 9vw;
		border-radius: 100%;
		vertical-align: middle;
	}
	
	.author-name {
		vertical-align: middle;
		font-weight: 600;
		font-size: 2.5vh;
	}
	
	.comment {
		font-size: 2.5vh;
		float: right;
		color: red;
		line-height: 7vh;
	}
	
	.label-body {
		font-size: 2.5vh;
		line-height: 1.7em;
		text-indent: 2em;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
	
	.label-foot {
		line-height: 60px;
		margin-top: 1em;
		border-top-style: dotted;
		border-color: #D2D2D2;
		border-width: 2px;
		padding-top: 0.5em;
		line-height: 5vh;
	}
	
	.router-css {
		color: #888;
	}
	
	.composition-name {
		margin: 0 0 5px 0;
		font-size: 2.7vh;
		font-weight: bolder;
		display: inline;
	}
	
	.composition-time {
		float: right;
	}
</style>