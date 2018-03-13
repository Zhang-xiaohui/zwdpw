<template>
	<div class="uploading">
		<div class="msgtitle">
		   <div class="title-font">
			 <h3>{{msgtitle}}</h3>
		   </div>
		   <div class="input-font">
		   	<form id="art">
				 <input placeholder="请输入作文标题" type="text" class="mint-field-core" v-model="username" @change="titleChange(username)">
				 <ul>
				 	<li v-for="err in errors" v-text='err.join("")'></li>
				 </ul>
			 </form>
		   </div>
		</div>
		<div class="msgtitle">
			<div class="title-font">
			  <h3 style="padding-top: .5em;">{{msgeetitle}}</h3>
			</div>
			<div class="input-font">
			<form>
				<vue-html5-editor class="editor" :content="contents" :auto-height="false" :z-index='0' :height="150"></vue-html5-editor>
				
			</form>
			</div>
			<div class="con">
				<mt-button type="primary" size="large" class="contribute" :disabled="invalid" @click="contributeFont">提交</mt-button>
            </div>
            
		</div>
		
	</div>
</template>

<script type="text/javascript">
import { MessageBox,Button,Field,Toast } from 'mint-ui';

	export default{
		name : 'uploading',
		components:[Field,Button],
		data () {
			return{
				msgtitle : "作文标题",
				msgeetitle : "作文正文",
				username:'',
				contents:'',
			}
		},
		mounted:function(){
			// var inputTextBox = $('.mint-field-core');
//			 this.times=setInterval(function(){
//				// inputTextBox.scrollIntoView(false);
//				document.querySelector('.input-font').scrollIntoView(false);
//			},200)
		},
//		destroyed:function(){
//			clearInterval(this.times)
//		},
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
	    
	   methods:{
//		   	focus:function(){
//				document.querySelector('.mint-field-core').scrollIntoView(false);
//			   },
			titleChange:function(n){
				this.$emit('title',n);
				this.$store.state.temporaryStorage = n
			},
	   	      contributeFont:function(){
	   	      	  var vm = this;
					//    let url=this.$store.state.url
					console.log(vm.$route.query.id)
	   	      	  console.log($(".content").html());
	   	      	  if($(".content").html() == ''){
	   	      	  	let instance = Toast('作文内容不能为空');
						setTimeout(() => {
						  instance.close();
						}, 2000);
						return false;
	   	      	  }
					let url=this.$store.state.url 
					let data={
		                'name':vm.username,
		      	  		'content':$(".content").html(),
		      	  		'status':"004002",
						'objId':vm.$route.query.id
		            }
	   	      	  vm.$http.get(url+'student2/model/answer',{
	   	      	  	params:{
						"composion":JSON.stringify(data),
	   	      	  		"type": "01",
	   	      	  	}
	   	      	  }).then(function(data){
	   	      	  	    console.log(data);
                         if(data.body.code==1){
                         	MessageBox.alert("作答成功").then(action => {
								vm.$router.push({ path:'/schoolwork'})
							});
                         }else if( data.code == 1000 ){
                         	localStorage.clear()
	                        let ToastTip = "请重新登录"
	                        Toast({
	                          message: ToastTip,
	                          duration: 2000
	                        });

	                        vm.$router.push({path:'/loading'})
	                    }
                         
//                       MessageBox('', data.body.message);
						
	   	      	  },(response) =>{
					console.log(response)
	   	      	  })
//				$.ajax({
//              type : "GET",
//              url : url + 'student2/model/answer',
//              data:{
//              		"composion":JSON.stringify(data),
//	   	      	  	"type": "01",
//              },
//              async: false,
//              dataType : "json",
//              xhrFields: {
//                  withCredentials: true
//              },
//              crossDomain: true,
//              success : function (data) {
//              		console.log(data)
//              }})
	   	      }
	   }
	}
</script>
<style>
#art{
	width:9rem
}
	.uploading{
		margin-top: 1em;
	    position: relative;
	    float: left;
	}
	.uploading h3{
		
		font-size: 1.5em;
		font-weight: normal;
	}
	.msgtitle{
		z-index:1;
	}
	.editor{
		padding-left: 0px;
		text-indent:2em;
		/*padding-top: .3rem;
		padding-bottom: .3rem;
		padding-left: .15rem;
		padding-right: .15rem;*/
	}
	.console{
		width: 10em;
	}
	.mint-field-core{
		border: 1px solid #ccc;
		width: 97%;
	    height: 3em;
	    margin-top: .2rem;
	    margin-bottom: .2rem;
	    background: #eeeeee;
	    padding-left: .3rem;
	}
	.title-font,.input-font{
		margin-left: .5rem;
		margin-right: .5rem;
	}
	.title-font{
		margin-left: .5rem;
		margin-right: .5rem;
	}
	.con{
	    margin-bottom: 1rem;
		margin-top:.5rem;
	}
	.toolbar ul{
		display:none;
	}
	.contribute{
		margin: .5rem auto;
		width: 89%;
		/*margin-top:1.4rem;*/
	}
</style>