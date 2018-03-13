<template>
	<div class="MeBottom">
		<div class="myAll">
			<router-link class="router-css" to="collect">
				<div class="myBuy myBor">
					<img src="../assets/favorite.png" />
					<div>我的收藏</div>
				</div>
			</router-link>
			<router-link class="router-css" to="buy">
				<div class="myBuy myBor">
					<img src="../assets/order.png" />
					<div>我的购买</div>
				</div>
			</router-link>
			<router-link class="router-css" to="set">
				<div class="myBuy">
					<img src="../assets/sz.jpg" />
					<div>设置</div>
				</div>
			</router-link>
			
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'MeBottom',
		data(){
			return{
				
			}
		}
	}
</script>
<style scoped>
	.MeBottom{
		background: #FFFFFF;
        float: left;
        width: 100%;
        position: absolute;
	}
	.myAll{
		width: 100%;
		float: left;
		border-bottom: 1px solid #ccc;
	}
	.myBor{
		border-right: 1px solid #CCCCCC;
	}
	.myBuy{
		float: left;
		width: 32%;
		padding-top: 1.5em;
		padding-bottom: 1.5em;
	}
	.myBuy img{
		width: 2em;
		height: 2em;
	}
	.router-css{
		color: #101010;
	}
</style>