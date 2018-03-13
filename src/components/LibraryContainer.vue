<template>
	<div class="LibraryContainer">
		<img :src="ContainerData.coverPic" class="img-url" />
		<div class="library">
			<h3 class="title-lib">{{ContainerData.name}}</h3>
			<p class="p-lib">{{ContainerData.summary}}</p>
			<h2 class="price-lib">￥{{ContainerData.comPrice}}</h2>
			<h2 class="yprice">原价：￥{{ContainerData.price}}</h2>
		</div> 
	</div>
</template>

<script>

	export default {
    name: 'LibraryContainer',
    props: ['ContainerData'],
	
  }
</script>
<style scoped>
	.img-url{
		width: 3.5rem;
    height:4rem!important;
	    display: inline-block;
	    float: left;
	}
	.library{
		margin-left: 4rem;
		position: relative;
		height: 100%;
	}
	.p-lib{
		color: #707070;
		line-height: 2em;
		text-overflow:ellipsis; 
		-o-text-overflow:ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		letter-spacing: .2em;
	}
	.title-lib{
		color: #2f2f2f;
		padding-top: .5em;
		padding-bottom: .5em;
		font-size: .5rem;
		overflow: hidden;
	    word-wrap: break-word;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.price-lib{
		color: #f00;
		letter-spacing: .1em;
		padding-top: .5em;
		padding-bottom: .5em;
		font-size: .5rem;
		font-weight: bold;
		display: inline-block;
	}
	.yprice{
		float: right;
		margin-right: 10px;
		display: inline-block;
	    padding-top: 1.3em;
		text-decoration:line-through;
		color:#000;
		font-size: .3rem;
	}
	.composition-tag{
		padding-bottom: 1em;
		padding-top: 1em;
        border-bottom: .2em solid #e2e2e2;
       
	}
	.mint-cell:last-child{
		background-size: 100% 0px;
	}
</style>