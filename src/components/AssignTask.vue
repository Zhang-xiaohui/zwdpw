<template>
	<div class="assigntask">
		<div class="composition-tagL">
			<h3 class="composition-name">{{TabContainerData.msgname}}</h3>
			<div class="info">
				<span class="author">{{TabContainerData.bname}}</span>
				<span class="class">{{TabContainerData.time}}</span>
			</div>
			<div class="label-body" v-html="TabContainerData.body"></div>
			<!--<div class="label-foot">
				<span lable-tab>{{TabContainerData.titlef}}</span><span class="label">{{TabContainerData.ftime}}</span>

			</div>-->
		</div>
	</div>
</template>
<script>
	export default {
		name: "assigntask",
		props: ["TabContainerData"],
	}
</script>
<style scoped>
	.assigntask {
		margin-top: 1.25rem;
	}
	
	.composition-name {
		padding-top: .5rem;
		padding-bottom: .5rem;
		text-align: center;
		color: #270e2a;
	}
	
	.article-details {
		margin-bottom: 0;
		margin-top: 1.5rem;
		font-size: 16px
	}
	
	.red {
		color: red;
	}
	
	.study-tag {
		box-shadow: 0px 0px 20px 0px #d9d9d9;
		color: red;
		padding: 10px;
		margin: 0.7rem 0;
	}
	
	.author {
		position: relative;
		font-size: 1.2em;
		left: 3em;
	}
	
	.class {
		font-size: 1.2em;
		float: right;
		position: relative;
		right: 3em;
	}
	
	.info {
		margin-bottom: .5em;
		line-height: 1.2em;
	}
	
	.mint-cell:last-child {
		background-size: 100% 1em;
	}
	
	.mint-cell-wrapper {
		margin-bottom: 3.5em;
	}
	
	.label-body {
		color: #270e2a;
		line-height: 1.7em;
		text-indent: 2em;
		-o-text-overflow: ellipsis;
	}
	.label-body img{
		width: 100%;
	}
	.label-foot {
		margin-top: .8em;
	}
	
	.composition-tag {
		min-height: 85vh;
		padding: 0 .5rem;
		border-top: 5px solid #E2E2E2;
		padding-bottom: 1em;
		border-bottom: .2em solid #e2e2e2;
	}
	
	.mint-cell-value {
		position: relative;
		bottom: 2em;
	}
	
	.composition-tagL {
		padding: 0 .5rem;
		border-top: 5px solid #E2E2E2;
		padding-bottom: 1em;
		/*border-bottom: .2em solid #e2e2e2;*/
	}

</style>