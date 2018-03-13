 <!--页面主体底部导航栏-->
<template>
	<div>
		<div class="composition-tag" v-for="(item,i) in compositionData" :key="item.id">
			<router-link
				:to="{ path: 'articleDetails', query:{id:item.id,dis:'1',com:'1'}}"
			>
				<div>
					<h3 class="composition-name">{{item.name}}</h3>
					<div class="label-body">
						{{item.content}}
					</div>		
					<div class="label-foot">
						<img class="author-img" :src="item.authorHeadSrc"/>
						<span class="author-name">{{item.author}}</span>
						<span class="comment">好评率：{{item.favrate}}%</span>
					</div>	
				</div>
			</router-link>
		</div>
	</div>
</template>
<script>
  export default {
    name: 'composition-label',
    props: ['compositionData'],
    methods: {
    }    
  }

</script>

<style scoped>


.composition-tag{
	padding: 1em 1em 0.5em 1em;
    margin: 1em 0.3rem;
    box-shadow: 0px 4px 13px 2px #d9d9d9;
}
.composition-tag a{
	color:black;
}
.author-img{
	width: 9vw;
	height: 9vw;
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
    color: #BA3644;
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
	color:#717171;
}
.label-foot{
	line-height: 60px;
	margin-top: 1em;
    border-top-style: dotted;
    border-color: #a1a1a1;
    border-width: 2px;
    padding-top: 0.5em;
    line-height: 5vh;
}


.composition-name{
    margin: 0 0 5px 0;
    font-size: 2.7vh; 
    font-weight: bolder;
	color:#0b0b0b;
}
</style>
