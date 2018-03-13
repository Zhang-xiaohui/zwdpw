<template>
	<div class="detail">
		<div class="title-active">
		   <h3>{{title}}</h3>
		</div>
		<div class="time">
			活动时间：{{starttime}}至{{endtime}}
		</div>
		<div class="img-one" v-html="content">
			<!--<img :src="img">-->
				{{content}}
		</div>
		<div>
		<!--<router-link class="router-more" :to="{path:'contribute',query:{id:id,title:title}}"></router-link>-->			
		<mt-button type="primary" size="large" class="contributeBtn" v-if="typeTag" @click="panduan()">投稿</mt-button>
		</div>
	</div>
</template>

<script type="text/javascript">
import { MessageBox } from 'mint-ui';
//var container = require('../assets/container.jpg');
	export default{
		name : "detail",
	    
		
		data () {
			return{
				title : "",
				starttime : "",
				endtime:"",
//				img:container,
				content : "",
				id:'',
				typeTag:''
			}
		},
		created:function(){
			
			var vm = this;
			console.log(this.$route.query.id)
			vm.id=this.$route.query.id
			 let url=this.$store.state.url
        	vm.$http.get(url+'activity/activityDetail',{
				params:{
					id:this.$route.query.id,
				}
				}).then(response => { 
					console.log(response)
					let alldata=response.body.dto
					this.title = alldata.name;
					let startY=new Date(alldata.startTime).getFullYear()
					let startM=new Date(alldata.startTime).getMonth()+1
					let startD=new Date(alldata.startTime).getDate()
					this.starttime = startY+"-"+startM+"-"+startD
					let endY=new Date(alldata.endTime).getFullYear()
					let endM=new Date(alldata.endTime).getMonth()+1
					let endD=new Date(alldata.endTime).getDate()
					this.endtime = endY+"-"+endM+"-"+endD
					this.content = alldata.content;
					this.typeTag = alldata.type==1;
				})
		},
		methods:{
			panduan(){
				if(!localStorage.getItem("userType")){
					MessageBox.confirm('请先登录').then(action => {
					this.$router.push("/loading")
					});
				}else{
					// this.$router.push("/contribute",query:{id:id,title:title})
					this.$router.push({path: '/contribute', query:{id:this.id,title:this.title}});
				}
			}
		}
	}
</script>
<style>
	.title-active{
		font-size: 1.2em;
		text-align: center;
		
	}
	.title-active h3{
		    margin-top: 1em;
    margin-bottom: 1em;
    display: inline-block;
    font-weight: 600;
    font-size: .6rem;
	}
	.time{
    padding-bottom: 1em;
    padding-left: 0.5rem;
	}
	.img-one{
		padding:.5rem;
		font-size: .4rem;
		text-align: justify;
	}
	.img-one img{
		width: 100%;
	}
	.contributeBtn{
		width:9rem;
		margin-left:.5rem;
	}
</style>