<template>
	<div class="acontainer">
	  <div>
		<h3 class="atitle">{{ContainerDataA.atitle}}</h3>
		<div class="atime">{{ContainerDataA.atime}}</div>
	  </div>
	  <div class="acontainera" v-html="ContainerDataA.acontent">
		{{ContainerDataA.acontent}}
	  </div>
    </div>
</template>

<script>
import {MessageBox} from 'mint-ui';
	export default{
		name:"acontainer",
		props:["ContainerDataA"],
		mounted:function(){
			$(".acontainera span").click(function() {
				MessageBox.alert('a.文章使用的叙述方式既能清晰说明事件过程，又增强了文章的吸引力b.文章能够根据内容性质选择叙述方式，有助于清楚的说明事件过程c.根据内容性质选择叙述方式，会帮助你清楚说明事件过程及其意义', '好句');
				
			});
		}
	}
</script>
<style scoped>
.atitle,.atime{
	text-align: center;
}
.acontainera{
	text-indent:.6rem;
	padding: .5rem;
	word-break: break-word;
}
</style>