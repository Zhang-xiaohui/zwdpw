<template>
	<div class="message">
		<div class='msg-item'>
			<span class="css-color">{{ContainerDataB.name}}</span>:
			<span class="css-color">{{ContainerDataB.content}}</span>
		</div>
	</div>
</template>
<script >
	export default {
		name: "message",
		props: ["ContainerDataB"]
	}
</script>
<style scoped>
	.message{
		    padding-left: .5rem;
    padding-right: .5rem;
	}
  .msg-item{
  	padding:.2rem .2rem;
  	background: #fffcfc;
  	border-radius: .3rem;
  	margin-top:.2rem;
  	box-shadow: 0 1px 3px 1px #ccc;
  }
  .css-color{
  	color:#4f91fe;
  }
</style>