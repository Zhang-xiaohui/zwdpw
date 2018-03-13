<template>
	<div class="imgg imguploading" id="imgg">
	<div class="msgtitle">
			<div class="title-font">
			   <h3>{{msgtitle}}</h3>
			</div>
			<div class="input-font" id="app" style="margin-right: .8rem;">
				  <form id="art">
				   <!--<mt-field placeholder="请输入作文标题" type="text" class="mint-field-core" v-model="username"  :value.sync="username" :state="errors.username ? 'error': username ? 'success': ''"></mt-field>  -->
				   <input placeholder="请输入作文标题" type="text" class="mint-field-core" v-model="username" @change="titleChange(username)">
				   <!--<input type="submit" :disabled="invalid">-->
					<ul>
				  	<li v-for="err in errors" v-text='err.join("")'></li>
				  </ul>   
				  </form>
			</div>
		</div>
		<div class="image-list">
		<div class="list-default-img" v-show="isPhoto" @click.stop="addPic">
			<img src="../assets/camera1.png" style="height: 2rem;" class="img-urll"/>
			<div style="font-size: .4rem;">请选择或者拍照上传照片</div>
			<input id="pic" type="file" accept="image/*" multiple @change="onFileChange"  style="display: none;">
		</div>
		
		<ul class="list-ul" v-show="isPhoto">
			<li class="list-li" v-for="(iu, index) in imgUrls" v-model="imgList">
				<a class="list-link" @click='previewImage(iu)'>
					<img :src="iu" class="img">
					<!--<input type="file" name="" id="" style="display: none;" />-->
				</a>
				<span class="list-img-close" @click='delImage(index)'>×</span>
			</li>
			<li class="list-li-add">
				<span class="add-img" @click.stop="addPic"></span>
			</li>
		</ul>
	</div>
	<!--<div class="image-list">
		<div class="list-default-img" v-show="isPhoto" @click.stop="alertPic">
			<img src="../assets/camera1.png" style="height: 2rem;" class="img-urll"/>
			<div style="font-size: .4rem;">请选择或者拍照上传照片</div>
			<input id="pic" type="file" accept="image/*" multiple @change="onFileChange"  style="display: none;">
		</div>
		<mt-popup v-model="popupVisible4" position="bottom" class="mint-popup">
			<div class="list-one"  @click.stop="addPic">
				相册
				<input id="album" type="file" accept="image/*" multiple @change="onFileChange"  style="display: none;">
			</div>
			<div class="list-two">
				<div id="pic" @click="getImage()">拍照</div>
			</div>
			<div class="list-three" @click="popupVisible4 = false">
				取消
			</div>
		</mt-popup> 
		<ul class="list-ul" v-show="isPhoto">
			<li class="list-li" v-for="(iu, index) in imgUrls" v-model="imgList">
				<a class="list-link" @click='previewImage(iu)'>
					<img :src="iu" class="img">
					<input type="file" name="" id="" style="display: none;" />
				</a>
				<span class="list-img-close" @click='delImage(index)'>×</span>
			</li>
			<li class="list-li-add">
				<span class="add-img" @click.stop="addPic"></span>
			</li>
		</ul>
	</div>
	-->
    <div class="add-preview" v-show="isPreview" @click="closePreview">
		<img :src="previewImg">
	</div>
	<div class="tougao">
		    <mt-button type="primary" size="large" class="contribute" style="margin:auto;width: 89%;"  @click="handleSubmit" :disabled="invalid">提交</mt-button>
		</div>
	</div>
</template>

<script>
import { MessageBox,Button,Field,Toast,Popup  } from 'mint-ui';
	export default {
		name:"imgg",
        components:[Field,Button],
		data: function () {
			return {
				user:null,
				msgtitle : "作文标题",
				msgeetitle : "长传图片",
				required : true,
				imgUrls: [],
				username:'',
				imgList:[],
				urlArr: [],
				title : '',
				isPhoto: true,
				btnTitle: '',
				isModify: false,
				previewImg:'',
				isPreview: false,
				popupVisible4:false,
			}
		},
		vuerify:{
			username:[
			'required',
			{test: /^.{0,20}$/,
            message: '长度不能超过20'}],
           
			
		},
		computed: {
			    errors () {
			    	return this.$vuerify.$errors
			    },
			
			    invalid () {
			    	return this.$vuerify.invalid
			    }
			  },
		methods: {
			// getImage(){
			// 		var cmr = plus.camera.getCamera();
			// 		let that=this
			// 		cmr.captureImage(function(p){
			// 			// alert('成功：'+p);
			// 			plus.io.resolveLocalFileSystemURL(p, function(entry){
			// 				// createItem(entry);
			// 				// alert(entry.toLocalURL())
			// 				that.FileUp(entry.toLocalURL())
			// 			}, function(e){
			// 				alert('读取拍照文件错误：'+e.message);
			// 			});
			// 		}, function(e){
			// 			alert('失败：'+e.message);
			// 		}, {filename:'_doc/camera/',index:1});
			// 	},
			// FileUp: function(n) {
			// 	var files = n
			// 	if(!files.length) return;
			// 	if($(".list-li").length>2){
            //      	MessageBox('提示', '最多上传三张图片');
            //      	return false;
            //      }
			// 	this.createImagePic(files);
			// },
			// createImagePic: function(file) {
			// 	let vm = this;
			// 	lrz(file, { width: 480 }).then(function(rst) {
			// 		vm.imgUrls.push(rst.base64);
			// 		return rst;
			// 	})
			// 	vm.popupVisible4=false
			// 	console.log(vm.imgUrls)
				
			// },
			titleChange:function(n){
				this.$emit('title',n);
			},
			toggleAddPic: function() {
				let vm = this;
				if(vm.imgUrls.length >= 1) {
					vm.isPhoto = false;
				} else {
					vm.isPhoto = true;
				}
			},
			alertPic: function(e) {
				let vm = this;
				vm.popupVisible4=true
			},
			addPic: function(e) {
				let vm = this;
				// vm.popupVisible4=false
				$('#pic').trigger('click');
				return false;
			},
			onFileChange: function(e) {
				var files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
			    
                 if($(".list-li").length>2){
                 	MessageBox('提示', '最多上传三张图片');
                 	return false;
                 }
                 this.createImage(files, e);
			},
			createImage: function(file, e) {
				let vm = this;
				lrz(file[0], { width: 480 }).then(function(rst) {
					vm.imgUrls.push(rst.base64);
					return rst;
				}).always(function() {
				//清空文件上传控件的值
				e.target.value = null;
				});
				vm.popupVisible4=false
			},
			delImage: function(index) {
				let vm = this;
//				let btnArray = ['取消', '确定'];
//				mui.confirm('确定删除该图片?','提示', btnArray, function(e) {
//					if (e.index == 1) {
//						vm.imgUrls.splice(index, 1);
//					}
//				})
				MessageBox({
					message: '确定删除该图片?',
					showCancelButton: true,
					confirmButtonText:"确定",
					cancelButtonText:"取消",
					closeOnClickModal:false
				}).then(
					function(action){
						// if (e.index == 1) {
							vm.imgUrls.splice(index, 1);
						// }
						
					}
				)

			},
			previewImage: function(url){
				let vm = this;
				vm.isPreview = true;
				vm.previewImg = url;
			},
			closePreview: function(){
				let vm = this;
				vm.isPreview = false;
				vm.previewImg = "";
			},
			saveImage: function(){
				let vm = this;
				let urlArr = [],
				imgUrls = this.imgUrls;

				for(let i = 0; i < imgUrls.length; i++) {
					if(imgUrls[i].indexOf('file') == -1) {
						urlArr.push(imgUrls[i].split(',')[1]);
					}else {
						urlArr.push(imgUrls[i]);
					}
				}

				//数据传输操作
			},
			handleSubmit () {
//		      if (this.$vuerify.check()) {
//		        MessageBox(`投稿成功 ${this.username}`) // eslint-disable-line
//		      }
              var imgL = [];
              var j = 0;
              for(var i =0;i < $(".img").length;i++){ 
                imgL[j] = $($(".img")[i]).attr("src");
                ++j;
              }
//            	imgL.push($(".img").each(function(){
//				    $(this).attr("src")
//				  }))
              
              var vm = this;
		      if(!$("li").hasClass("list-li")){
		      	let instance = Toast('必须上传照片');
						setTimeout(() => {
						  instance.close();
						}, 2000);
		      	return false;
		      }
		        
//	   	      	  console.log(vm.$route.query.id)
	   	      	  let url=this.$store.state.url  
//	   	      	  vm.$http.post(url+'student/task/saveAnswer',{
//	   	      	  	params:{
//	   	      	  		'taskId': vm.$route.query.id || "",
//	   	      	  		'taskName':vm.$route.query.name,
//	   	      	  		'title' : vm.username,
//	   	      	  		'content' : JSON.stringify(imgL),
//	   	      	  		'type' : 1,
//	   	      	  		'status' : 0
//	   	      	  	}
//	   	      	  }).then(function(data){
//	   	      	  	console.log(data);
//	   	      	  	code:1,
//	   	      	  	MessageBox('', data.body.message);
////	   	      	  	MessageBox.alert('操作成功').then(action => {
////						vm.$router.push({ path:'/activeDetail',query: { id: vm.$route.query.id } })
////					});
//                   
//	   	      	  })
//			console.log(JSON.stringify(imgL))
						
  	  		let data={
                'name' : vm.username,
      	  		'content' : JSON.stringify(imgL),
      	  		'objId':vm.$route.query.id,
      	  		'status' : "004002",
            }
             $.ajax({
					type: "POST",
					url: url+'student2/model/answer',
					data: {
						"composion":JSON.stringify(data),
	   	      	  		'type' : "02",
					},
					dataType: "json",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data) {
						console.log(data)
						if(data.code==1){
							MessageBox.alert('作答成功').then(action => {
								vm.$router.push({ path:'/schoolwork'})
							});
						}else if( data.code == 1000 ){
			                  localStorage.clear()
			                  let ToastTip = "请重新登录"
			                  Toast({
			                    message: ToastTip,
			                    duration: 2000
			                  })

			                  that.$router.push({path:'/loading'})
			              }
//						$("#msg").html(data.code + "——" + data.message);
//                       code:1,
//	   	      	  		MessageBox('', data.body.message);
					}
				});
		    }
    }
//			handle : function(){
//		    
//		      //接口
//		      $.ajax({
//		        type : "GET",
//		        //async:false,
//		        url : "http://192.168.102.2:8080/manage/contributions/saveContributions",
//		        dataType : "json",
//		        success : function (data) {
//		          
//		          
//		        },
//		        error : function (e) {
//		          console.log(e)
//		        }
//		      }); 
//		    }
//		},
		
	}
	
</script>
<style>
#canvas1{
	 width: 100%;
    height: 3rem;
	margin-top:.5rem;
}
	.list-ul{
		display: inline-block;
		float: left;
		margin-left: .5rem;
		
	}
	.mint-field-core{
		border: 0px;
		font-size: .3rem;
		
	}
	.mint-field-state{
		margin-left: 0px;
	}
	.mint-ui{
		font-size: .6rem;
	}
	.imguploading{
		margin-top: 1em;
	    position: relative;
	    float: left;
	}
	.list-li{
		float: left;
		margin-right: .3rem;
	}
	.title-font h3{
		font-size: 1.5em;
    font-weight: normal;
	}
	.list-default-img{
		text-align: center;
    margin-left: .5rem;
    margin-right: .5rem;
    background: #eee;
    margin-bottom: .3rem;
    margin-top: .3rem;
    padding-top: .3rem;
    padding-bottom: .3rem;
	}
	.list-link img{
		height: 3rem;
		width: 2.6rem;
	}
	.is-nolabel{
		padding: 0px;
	}
	.mint-cell-wrapper{
		padding: 0px;
	}
	.list-img-close{
		font-size: .6rem;
    font-weight: bold;
    color: #f00;
    position: relative;
    top: -2.5rem;
    margin-left: -.5rem;
    display: inline-block;
	}
	.add-preview{
		position: fixed;
    height: 100vh;
    background: #FFFFFF;
    top: 0px;
    z-index: 1000;
	}
	.add-preview img{
		width: 100vw;
		height: 100vh;
	}
	#art ul li{
		color: #F00000;
		padding-left: .2rem;
	}
	.mint-popup{
        width: 100%;
		height:21%;
      }
	  .list-one{
		width: 100%;
    height: 1.25rem;
    text-align: center;
    line-height: 1.25rem;
    font-size: 0.5rem;
    border-bottom: 1px solid #ccc;

	  }
	  .list-two{
		width: 100%;
    height: 1.25rem;
    text-align: center;
    line-height: 1.25rem;
    font-size: 0.5rem;
    border-bottom: 1px solid #ccc;
	  }
	  .list-three{
		width: 100%;
		height: 1.25rem;
		text-align: center;
		line-height: 1.25rem;
		font-size: 0.5rem;

	  }
</style>