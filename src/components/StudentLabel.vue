<template>
	<div class="student-label">
		<!--<div class="composition-tag" v-for="(item,i) in compositionData" key="i">-->
			
				<div>
					<div>
					<h3 class="composition-name">{{ContainerData.NAME}}</h3>
					<span class="composition-time">{{ContainerData.TIME}}</span>
					</div>
					
						<div class="label-body" v-html='ContainerData.CONTENT'>
						</div>
					
					<div class="label-foot">
						<img class="author-img" :src="ContainerData.SRC"/>
						<span class="author-name" id="teacherId">{{ContainerData.CREATOR}}</span>
						<span class="comment">
							<router-link class="router-css" :to="{path:'replyTo' , query:{id:ContainerData.id,name:ContainerData.NAME,creator:ContainerData.CREATOR,time:ContainerData.TIME,content:ContainerData.CONTENT}}">
							    <mt-button type="primary" size="small">{{ContainerData.STATE}}</mt-button>
							</router-link>
						</span>
					</div>	
				</div>
			
		<!--</div>-->
	</div>
</template>
<script>
  export default {
    name: 'StudentLabel',
    props: ['ContainerData'],
    methods: {
    	toRepertoryOne:function(type){
	        this.$store.state.ArticleType=type;
	        console.log(type);
	    }
    }    
  }

</script>

<style scoped>
.student-label{
	width: 100%;
}
.mint-cell-wrapper{
		display: inline-block;
    padding: 1em 1em 0.5em 1em;
    background-image: none;
    border: 1px solid #e2e2e2;
    margin: .3rem;
    width: auto;
    box-shadow: 3px 3px 0px 0px #e2e2e2;
	}

.composition-tag{
	padding: 1em 1em 0.5em 1em;
    margin: 1em 0.3rem;
    box-shadow: 0px 4px 13px 6px #d9d9d9;
}
.composition-tag a{
	color:black;
}
.author-img{
	width: 9vw;
    border-radius: 100%;
    vertical-align: middle;
}
.author-name{
	    vertical-align: middle;
    font-weight: 600;
    font-size: 2.5vh;
}
.comment{
	font-size: 2.5vh;
    float: right;
    color: red;
    line-height: 7vh;
}

.label-body{
	font-size: 2.5vh;
    line-height: 1.7em;
	text-indent: 2em;
	text-overflow:ellipsis; 
	-o-text-overflow:ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
}
.label-foot{
	line-height: 60px;
	margin-top: 1em;
    border-top-style: dotted;
    border-color: #D2D2D2;
    border-width: 2px;
    padding-top: 0.5em;
    line-height: 5vh;
}


.composition-name{
    margin: 0 0 5px 0;
    font-size: 2.7vh; 
    font-weight: bolder;
    display: inline;
}
.composition-time{
	float: right;
}
</style>