<template>
	<div class="imguploading page-actionsheet">
		<div class="msgtitle">
			<div class="title-font">
			   <h3>{{msgtitle}}</h3>
			</div>
			<div class="input-font">
			   <input placeholder="请输入用户名" type="text" class="mint-field-core" maxlength="10" >
			</div>
		</div>
		<form>
		   <div class="imgUrl page-actionsheet-wrapper">
			    <img :src="imgUrl" style="position: absolute;left: 30%;z-index: 111;"/>
				<input type="file" value="文件4" accept="image/*" style="opacity: 0;position: absolute;left: 30%;z-index: 3333;width: 4rem;height: 4rem;" />
		   </div> 
		</form>
		
		  
		<div class="tougao">
		    <mt-button type="primary" size="large" class="contribute" style="margin: 0px auto;width: 89%;">投稿</mt-button>
		</div>
	</div>
	
</template>

<script type="text/javascript">

var imgUrl = require('../assets/camera.png')
	export default{
		name : "imguploading",
		data (){
			return{
				msgtitle : "作文标题",
				imgUrl : imgUrl,
				sheetVisible: false,
//				actions: [{
//		        name: '拍照',
//		        method: this.takePhoto
//		      }, {
//		        name: '从相册中选择',
//		        method: this.openAlbum
//		      }],
			}
		},
		methods:{

</script>

<style>
	.imguploading{
		margin-top: 1em;
	}
	.imguploading h3{
		
		font-size: 1.5em;
		font-weight: normal;
	}
	.msgtitle{
		background: #FFFFFF;
	}
	.imgUrl{
		text-align: center;
        margin-top: 2.5rem;
	}
	.imgUrl img{
		width: 4rem;
		height: 4rem;
	}
	.mint-tab-container-wrap{
		height: 83vh;
	}
	.tougao{
		position: fixed;
		width: 100%;
		bottom: 2rem;
	}
	.mint-button--default{
		color: #656b79;
	    background-color: #fff;
	    border: 1px solid #fff;
	    box-shadow: 0 0 1px #fff;
	    height: auto;
	}
	.mint-button::after{
		background: #FFFFFF;
	}
</style>