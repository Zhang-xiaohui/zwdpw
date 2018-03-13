<template>
	<div class="information">
		<mt-header class="header" fixed title="基本信息">
			 <mt-button @click="Back" slot="left"  icon="back"></mt-button>
                <mt-button @click="temporary" slot="right">完成</mt-button>
		</mt-header>
		<!--<div class="list-default-img" v-show="isPhoto" @click.stop="addPic">-->
		<!--<img src="../assets/camera1.png" style="height: 2rem;" class="img-urll"/>-->
		<!--<a class="list-link" @click='previewImage(iu)'>
					<img v-bind:src="imgUrls" class="img-urll">-->
		<!--<input type="file" name="" id="" style="display: none;" />-->
		<!--</a>-->
		<!--<div style="font-size: .4rem;">更换头像</div>
			<input type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange"  style="display: none;">-->

		<!--</div>-->
		<div id="demo">
			<!-- 遮罩层 -->
			<div class="container" v-show="panel">
				<div>
					<img id="image" :src="url" alt="Picture">
				</div>

				<button type="button" id="button" @click="crop">确定</button>

			</div>

			<div style="padding:20px;">
				<div class="show">
					<div class="picture" id="picture" :style="'backgroundImage:url('+imgUrls+')'">
					</div>
				</div>
				<div style="margin-top:20px;">

					<div class="change-img">更换头像</div>
					<input type="file" id="change" accept="image/gif,image/jpeg,image/jpg,image/png" @change="change($event)" class="head-img" ref="avatarInput">

				</div>

			</div>
		</div>
        <div class="jian">(带<span class="red">*</span>为可修改内容)</div>
		<mt-field label="姓名" v-model="name" disabled style="background: #FFFFFF;"></mt-field>
		<a class="mint-cell mint-field">
			<div class="mint-cell-left"></div>
			<div class="mint-cell-wrapper">

				<div class="mint-cell-title">
					<span class="mint-cell-text">
				性别
			</span>
				</div>
				<div class="mint-cell-value">
					<select id='sex'>
						<option value='男'>男</option>
						<option value='女'>女</option>
					</select>
				</div>
				<span class="red">*</span>
			</div>
		</a>
		<mt-field label="学校" v-model="school" disabled style="background: #FFFFFF;"></mt-field>
		<mt-field label="年级" v-model="grade" disabled style="background: #FFFFFF;"></mt-field>

		<!--<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>-->
		<mt-field label="手机号码" id="tel" type="tel" v-model="phone">
			<span class="red">*</span><br />
				  
		</mt-field>
		<mt-field label="邮箱" id="email" type="email" v-model="email">
			<span class="red">*</span>
		</mt-field>
		<!--<mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field>
<mt-field label="数字" placeholder="请输入数字" type="number" v-model="number"></mt-field>
<mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>-->
		<mt-field label="备注" placeholder="500字" type="textarea" rows="4" v-model="introduction" id="beizhu">
			<span class="red">*</span>
		</mt-field>
	</div>
</template>
<style>
    .red{
    	color: #F00000;
    }
    .jian{
    	margin-left: .2rem;
    }
    .header{
    	  background: #408AFF;
    	  height: 1.25rem;
    }
	.information {
		margin-top: 1.25rem;
	}
	
	.list-default-img {
		text-align: center;
		background: #f5f2f7;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	
	.img-urll {
		height: 2rem;
		border: 1px solid #ccc;
		border-radius: 2rem;
		padding: 0.2rem;
		margin-top: .2rem;
	}
	
	.head-img {
		width: 100%;
		position: relative;
		top: -.6rem;
		height: .6rem;
		opacity: 0;
	}
	
	.change-img {
		text-align: center;
	}
	.mint-field-core{
		background: #FFFFFF;
	}
</style>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	#demo #button {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 80px;
		height: 40px;
		border: none;
		border-radius: 5px;
		background: white;
	}
	
	#demo .show {
		width: 100px;
		height: 100px;
		overflow: hidden;
		position: relative;
		border-radius: 50%;
		border: 1px solid #d5d5d5;
		margin: auto;
	}
	
	#demo .picture {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	#demo .container {
		z-index: 99;
		position: fixed;
		padding-top: 60px;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 1);
	}
	
	#demo #image {
		max-width: 100%;
	}
	
	.cropper-view-box,
	.cropper-face {
		border-radius: 50%;
	}
	/*!  
 * Cropper.js v1.0.0-rc  
 * https://github.com/fengyuanchen/cropperjs  
 *  
 * Copyright (c) 2017 Fengyuan Chen  
 * Released under the MIT license  
 *  
 * Date: 2017-03-25T12:02:21.062Z  
 */
	
	.cropper-container {
		font-size: 0;
		line-height: 0;
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		direction: ltr;
		-ms-touch-action: none;
		touch-action: none
	}
	
	.cropper-container img {
		/* Avoid margin top issue (Occur only when margin-top <= -height) */
		display: block;
		min-width: 0 !important;
		max-width: none !important;
		min-height: 0 !important;
		max-height: none !important;
		width: 100%;
		height: 100%;
		image-orientation: 0deg
	}
	
	.cropper-wrap-box,
	.cropper-canvas,
	.cropper-drag-box,
	.cropper-crop-box,
	.cropper-modal {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	.cropper-wrap-box {
		overflow: hidden;
	}
	
	.cropper-drag-box {
		opacity: 0;
		background-color: #fff;
	}
	
	.cropper-modal {
		opacity: .5;
		background-color: #000;
	}
	
	.cropper-view-box {
		display: block;
		overflow: hidden;
		width: 100%;
		height: 100%;
		outline: 1px solid #39f;
		outline-color: rgba(51, 153, 255, 0.75);
	}
	
	.cropper-dashed {
		position: absolute;
		display: block;
		opacity: .5;
		border: 0 dashed #eee
	}
	
	.cropper-dashed.dashed-h {
		top: 33.33333%;
		left: 0;
		width: 100%;
		height: 33.33333%;
		border-top-width: 1px;
		border-bottom-width: 1px
	}
	
	.cropper-dashed.dashed-v {
		top: 0;
		left: 33.33333%;
		width: 33.33333%;
		height: 100%;
		border-right-width: 1px;
		border-left-width: 1px
	}
	
	.cropper-center {
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		width: 0;
		height: 0;
		opacity: .75
	}
	
	.cropper-center:before,
	.cropper-center:after {
		position: absolute;
		display: block;
		content: ' ';
		background-color: #eee
	}
	
	.cropper-center:before {
		top: 0;
		left: -3px;
		width: 7px;
		height: 1px
	}
	
	.cropper-center:after {
		top: -3px;
		left: 0;
		width: 1px;
		height: 7px
	}
	
	.cropper-face,
	.cropper-line,
	.cropper-point {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		opacity: .1;
	}
	
	.cropper-face {
		top: 0;
		left: 0;
		background-color: #fff;
	}
	
	.cropper-line {
		background-color: #39f
	}
	
	.cropper-line.line-e {
		top: 0;
		right: -3px;
		width: 5px;
		cursor: e-resize
	}
	
	.cropper-line.line-n {
		top: -3px;
		left: 0;
		height: 5px;
		cursor: n-resize
	}
	
	.cropper-line.line-w {
		top: 0;
		left: -3px;
		width: 5px;
		cursor: w-resize
	}
	
	.cropper-line.line-s {
		bottom: -3px;
		left: 0;
		height: 5px;
		cursor: s-resize
	}
	
	.cropper-point {
		width: 5px;
		height: 5px;
		opacity: .75;
		background-color: #39f
	}
	
	.cropper-point.point-e {
		top: 50%;
		right: -3px;
		margin-top: -3px;
		cursor: e-resize
	}
	
	.cropper-point.point-n {
		top: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: n-resize
	}
	
	.cropper-point.point-w {
		top: 50%;
		left: -3px;
		margin-top: -3px;
		cursor: w-resize
	}
	
	.cropper-point.point-s {
		bottom: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: s-resize
	}
	
	.cropper-point.point-ne {
		top: -3px;
		right: -3px;
		cursor: ne-resize
	}
	
	.cropper-point.point-nw {
		top: -3px;
		left: -3px;
		cursor: nw-resize
	}
	
	.cropper-point.point-sw {
		bottom: -3px;
		left: -3px;
		cursor: sw-resize
	}
	
	.cropper-point.point-se {
		right: -3px;
		bottom: -3px;
		width: 20px;
		height: 20px;
		cursor: se-resize;
		opacity: 1
	}
	
	@media (min-width: 768px) {
		.cropper-point.point-se {
			width: 15px;
			height: 15px
		}
	}
	
	@media (min-width: 992px) {
		.cropper-point.point-se {
			width: 10px;
			height: 10px
		}
	}
	
	@media (min-width: 1200px) {
		.cropper-point.point-se {
			width: 5px;
			height: 5px;
			opacity: .75
		}
	}
	
	.cropper-point.point-se:before {
		position: absolute;
		right: -50%;
		bottom: -50%;
		display: block;
		width: 200%;
		height: 200%;
		content: ' ';
		opacity: 0;
		background-color: #39f
	}
	
	.cropper-invisible {
		opacity: 0;
	}
	
	/*.cropper-bg {
		background-image: url(http://192.168.102.229:9080/files/portraits/2016/03/29/14671cb700be4dc2931a4a592ec5d64b.png);
	}*/
	
	.cropper-hide {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
	}
	
	.cropper-hidden {
		display: none !important;
	}
	
	.cropper-move {
		cursor: move;
	}
	
	.cropper-crop {
		cursor: crosshair;
	}
	
	.cropper-disabled .cropper-drag-box,
	.cropper-disabled .cropper-face,
	.cropper-disabled .cropper-line,
	.cropper-disabled .cropper-point {
		cursor: not-allowed;
	}
</style>
<script>
	import {MessageBox} from 'mint-ui';
	import {field} from 'mint-ui';
	import Cropper from 'cropperjs';
	var iu = require('../assets/camera1.png')
	export default {
		name: 'essentialInformation',
		data() {
			return {
				name: '张三',
				school: '北京四中',
				grade: '一年级',
				phone: '88888888',
				email: 'qq@qq.com',
				iu: iu,
				imgUrls: '',
				introduction: '',
				isPhoto: true,
				btnTitle: '',
				isModify: false,
				previewImg: '',
				isPreview: false,
				headerImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC',
				picValue: '',
				cropper: '',
				croppable: false,
				panel: false,
				url: ''
			}
		},
		created: function() {
//			this.$store.state.backUrl = "me";
//			this.$store.state.titleName = "基本信息";
//			this.$store.state.selectedTab = "me";
			this.$store.state.more = null;
//			this.$store.state.moreTitle = "完成";
			this.$store.state.showBottomNav = false;
			this.$store.state.showTopNav = false;
			var self = this;
			//      	  MessageBox('', '保存成功');
			let url = self.$store.state.url;
			self.$http.get(url + 'user/getUserInfo').then(function(data) {
				console.log(data)
				var datas = data.body.dto;
				var vm = this;
				vm.imgUrls = datas.imgUrl;
				$.each(datas, function(key, value) {
					if(key == 'sex') {
						$('#sex').val(value);
					}
					if(key in vm) {
						vm[key] = value;
					}
				});
				//"phone" : datas.phone;
				//this.TabContainerData = TabContainerData;

			}, (response) => {
				console.log("error");
			});
			//					}
			window.scrollTo(0, 0);
		},
		mounted() {
			//					debugger;
			//初始化这个裁剪框  
			var self = this;
			var image = document.getElementById('image');
			this.cropper = new Cropper(image, {
				aspectRatio: 1,
				viewMode: 1,
				background: false,
				zoomable: false,
				ready: function() {
					self.croppable = true;
				}
			});
		},
		methods: {
			getObjectURL(file) {
				var url = null;
				if(window.createObjectURL != undefined) { // basic  
					url = window.createObjectURL(file);
				} else if(window.URL != undefined) { // mozilla(firefox)  
					url = window.URL.createObjectURL(file);
				} else if(window.webkitURL != undefined) { // webkit or chrome  
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			},
			change(e) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				this.panel = true;
				this.picValue = files[0];

				this.url = this.getObjectURL(this.picValue);
				//每次替换图片要重新得到新的url  
				if(this.cropper) {
					this.cropper.replace(this.url);
				}
				this.panel = true;

			},
			crop() {
				this.panel = false;
				var croppedCanvas;
				var roundedCanvas;

				if(!this.croppable) {
					return;
				}
				// Crop  
				croppedCanvas = this.cropper.getCroppedCanvas();
				// Round  
				roundedCanvas = this.getRoundedCanvas(croppedCanvas);

				this.headerImage = roundedCanvas.toDataURL();
				this.postImg()

			},
			getRoundedCanvas(sourceCanvas) {

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var width = sourceCanvas.width;
				var height = sourceCanvas.height;

				canvas.width = width;
				canvas.height = height;

				context.imageSmoothingEnabled = true;
				context.drawImage(sourceCanvas, 0, 0, width, height);
				context.globalCompositeOperation = 'destination-in';
				context.beginPath();
				context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
				context.fill();

				return canvas;
			},
			Back(){
				this.$router.go(-1);
			},
			
			temporary() {
				var self = this;
				var email = self.email;
				var tel = self.phone;
				console.log(tel);
				var sex = $('#sex').val();
				var remark = self.introduction;
				var imgUrls = self.imgUrl;
				var reg = /^1[3|4|5|7|8][0-9]{9}$/;
				var regm = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				let url = self.$store.state.url;
				
				self.$http.get(url + 'user/updateUserInfo', {
					params: {
						sex: sex,
						phone: tel,
						email: email,
						remark: remark,
						imgUrl:imgUrls
					}
				}).then(function(data) {
					console.log(data);
					if(tel == ""){
						MessageBox('',"手机号码为必填项")
					}else if(!reg.test(tel)){
						MessageBox('',"手机号码格式不正确")
					}else if(email == ""){
						MessageBox('',"电子邮箱为必填项")
					}else if(!regm.test(email)){
						MessageBox('',"电子邮箱格式不正确")
					}else if(data.body.code==1){
						MessageBox('', data.body.message);
					}
					
						

				}, (response) => {
					console.log("error");
				});

			},
			postImg() {
				var self = this;
				//				let url = self.$store.state.url;
				var image = new FormData();

				var imgUrls = self.imgUrls;
                
				image.append('avatar', this.$refs.avatarInput.files[0])
				self.$http.post(self.$store.state.url + '/uploadPic.do?type=portraits', image, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(function(data) {
					var self = this;
					if(data.body.resultCode == 0){
						self.imgUrls = self.$store.state.url+data.body.url;
						self.imgUrl = data.body.url;
						MessageBox('提示', "上传成功");
					}
				}, (response) => {
					console.log("error");
				});
			}
		},
		destroyed: function() {
//			this.$store.state.moreTitle = "";
		}
	}
</script>