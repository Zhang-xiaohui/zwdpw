<template>
	<div class="schoolworkManage">
		<mt-navbar v-model="selectedOne" class="category-one" >
			<span @click="getTaskData" class="selected-list" 
			>
			  	<mt-tab-item id="1" key="1" >
			  		<p>待发布</p>
				</mt-tab-item>
			</span>
			<span @click="getTaskData" class="selected-list" 
			>
				<mt-tab-item id="2" key="2" >
			  		<p>已发布</p>
				</mt-tab-item>
			</span>
			<span @click="getTaskData" class="selected-list" 
			>
				<mt-tab-item id="3" key="3" >
			  		<p>待评点</p>
				</mt-tab-item>
			</span>
			<span @click="getTaskData" class="selected-list" 
			>
				<mt-tab-item id="4" key="4" >
			  		<p>已评点</p>
				</mt-tab-item>
			</span>
		</mt-navbar>

	    <mt-tab-container 
	      	class="page-tabbar-tab-container" 
	      	v-model="selectedOne" 
	      	swipeable
	    >
	        <mt-tab-container-item v-for="id in categoryOne" :id="id">
				<div class="tasklist">
					<div class="task-tag" v-for="(item,i) in taskData" >
						<h3>{{item.title}}</h3> <span>{{item.status}}</span>
						<p>
							{{item.body}}
						</p>
						<button class="publish-task" @click="pubTask(item.id)">发布任务</button>
					</div>
				</div>
	        </mt-tab-container-item>
	    </mt-tab-container>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'schoolworkManage',
		data(){
			return{
				categoryOne:["1","2","3","4"],
				selectedOne:"1",
				taskData:[]

			}
		},
		created(){
			this.getTaskData();
		},
		mounted:function(){
			this.$store.state.moreTitle = null
		},
		computed:{
		},
		methods:{
			getTaskData:function(){
				console.log("getTaskData");
				let id=this.selectedOne||"1";
				console.log(id);
				this.taskData=[
					{
						"id":"1",
						"title":"美丽的一天",
						"status":"编辑中...",
						"body":"同学们好，接上级通知，作文统一命题；1.新年趣事2.特别的压岁钱3.过年真好任选一个题目要求；1.写一篇有真情实感的文章。2.记叙文，写出生动细节。3.不少于600字。希望大家认真完成，及时上传，谢谢sdsdsdsdsd"
					},
					{
						"id":"2",
						"title":"美丽的一天1",
						"status":"编辑中...",
						"body":"同学们好，接上级通知，作文统一命题；1.新年趣事2.特别的压岁钱3.过年真好任选一个题目要求；1.写一篇有真情实感的文章。2.记叙文，写出生动细节。3.不少于600字。希望大家认真完成，及时上传，谢谢sdsdsdsdsd"

					},{
						"id":"3",
						"title":"美丽的一天2",
						"status":"编辑中...",
						"body":"同学们好，接上级通知，作文统一命题；1.新年趣事2.特别的压岁钱3.过年真好任选一个题目要求；1.写一篇有真情实感的文章。2.记叙文，写出生动细节。3.不少于600字。希望大家认真完成，及时上传，谢谢sdsdsdsdsd"
				
					},{
						"id":"4",
						"title":"美丽的一天3",
						"status":"编辑中...",
						"body":"同学们好，接上级通知，作文统一命题；1.新年趣事2.特别的压岁钱3.过年真好任选一个题目要求；1.写一篇有真情实感的文章。2.记叙文，写出生动细节。3.不少于600字。希望大家认真完成，及时上传，谢谢sdsdsdsdsd"
					}
				]
			},
			beforeUpdate:function(){

			}
		}
	}
</script>
<style scoped>
	.schoolworkManage{
		background: #FFFFFF;
		padding-top: 3rem;
	} 
	.selected-list{
		width: 25%; 
		height:auto;
	}
	.category-one{
		z-index: 100;
		box-shadow: 0px 3px 6px 0px rgba(204, 204, 204, 0.96);
		border-bottom: 1px solid #b8bbbf;
		position: fixed;
	    top: 1.5rem;
	    width: 100%;
	}
	.category-item{ 
    	position: relative;
	} 
	.category-item:after{ 
	    position: absolute;
	    top: 0.2rem;
	    height: calc(100% - 1.2em);
	    left: 0;
	    content: '';
	    border-left: solid #f6f8fa 1px;
	    margin-left: -1px;
	}
	.router-css{
		text-decoration:none;
		color: #9d9d9d;
		font-size: 0.4rem;
	}  	
	.tasklist{
		margin: 0.5rem;
	}
	.worl-tag{
		padding: 1em 1em 0.5em 1em;
	    margin: 1em 0.3rem;
	    box-shadow: 0px 4px 13px 6px #d9d9d9;
	}
	.list-box{
		margin-left: 0.5rem;
	}
	.list-url{
		display: inline-block;
    	width: 33%;
    	line-height:1rem;
	}
</style>
<style>
	.category-one .mint-tab-item {
		font-size: 18px;
	}
	.category-one .mint-tab-item.is-selected {
	    border-bottom: 0px;
	    color: #FEA405;
	    margin-bottom: 0;
	}
	.category-one .mint-tab-item {
		font-size: 18px;
	}
	.category-one .mint-tab-item.is-selected {
		border-bottom: 1px solid #FEA405;
		margin-bottom: -2px;
	}
</style>