<template>
	<div class="noSchoolwork">
		<div class="create-head">
		</div>
		<div class="create-schoolwork">
			<div class="add-page">
				<img src="static/img/tupian1.png"/>
			</div>
			<p>布置课堂任务，学生作答，评点作文</p>
			<p>快来体验吧！</p>
		</div>
		<div class="createSchoolwork" @click="addSchoolwork">
			<span class="add">+</span>
			<span class="create">创建课堂任务</span>
		</div>	
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'noSchoolwork',
		data(){
			return{
			}
		},
		created(){

		},
		mounted:function(){
			this.$store.state.moreTitle = null;
		},
		destroyed:function(){
	    },
		beforeUpdate(){

		},
		computed:{

		},
		methods:{
			addSchoolwork:function(){
				document.getElementsByClassName("noSchoolwork")[0].style.display="none";
				this.$store.state.moreTitle = "编辑";
				this.$store.state.moreFtn=function(){alert("ssss")}
			}
		}
	}
</script>
<style scoped>
	.noSchoolwork{
		z-index: 101;
	    position: fixed;
	    top: 0px;
	    width: 100%;
		height: 100vh;
		background: #428AFF;
		margin-top: 55px;
	}
	.create-head{
		height: 1rem;
	}
	.create-schoolwork{
		margin: 0 auto;
		width: 7rem;
		padding: 20px 0px;
		background: white;
		border-radius: 7px;
	}
	.create-schoolwork p{
		color:#9F9F9F;
		margin: 10px;
		text-align: center;
	}
	.add-page{
		text-align: center;
    	margin: 30px auto;
	}
	.add-page img{
		width: 6rem;
	}
	.createSchoolwork:active{
		background-color: #9F9F9F;
	}
	.createSchoolwork{
		font-size: small;
		margin: 50px auto;
	    background: white;
	    text-align: center;
	    width: 8rem;
	    color: #FEA914;
	    height: 1rem;
	    border-radius: 50px;
/*	    justify-content: center;
        align-items: center;
        display: flex;*/
	}
	.createSchoolwork .add{
		font-size: 32px;
		line-height: 39px;
	    display: inline-block;
	    height: 39px;
	    overflow: hidden;
	}
	.createSchoolwork .create{
	    font-size: 20px;
	    line-height: 39px;
	    height: 39px;
	    display: inline-block;
	    overflow: hidden;
	}
	
</style>