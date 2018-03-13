<template>
	<div id="MeMiddle">
		<div class="top">
			<div>
			    <img class="imgMe" v-bind:src="head" />
			</div>
			
			<div class="topContent">
				<div class="MeTitle">
				   <!--{{msg}}-->
				</div>
				<div class="MeHead">
					<router-link to="essentialInformation">
					    <img class="logo" v-bind:src="logoSrc" />
					</router-link>
			    </div>
			    <div class="ti">
			    	<div class="name">
			    	   {{name}}
			    </div>
			    <div class="profession">
			    	   <img class="pro" v-bind:src="student" />
			    	   <span class="stu">{{stu}}</span>
			    </div>
			    </div>
			    
		    </div>
		</div>
		<div class="hui"></div>
	</div>
</template>
<script type="text/javascript">
//var logoSrc = require('../assets/head.jpg')
var student = require('../assets/student.png')
var head = require('../assets/bei.png')
//var man = require('../assets/man.png')
//var woman = require('../asset/woman.png')
import { MessageBox } from 'mint-ui';
	export default{
		name:'MeMiddle',
		data(){
			return{
//				msg:'主页',
				logoSrc:null,
				student:student,
				head:head,
				name:'',
				stu:'',
//				man:man,
//				woman:woman,
//				note:{
//					backgroundImage: "url(" + require("../assets/head.jpg") + ")",
//					opcity:0.5,
//					backgroundRepeat: "no-repeat",
//					
//				}
			}
		},
		beforeMount(){
			var vm = this;
			let url=this.$store.state.url;	
			vm.$http.get(url+'user/getUserInfo',{
				
			params:{
//				
			}
			}).then((data) => {
				console.log(data);
				if(data.body.code == 1000){
					localStorage.clear() ;
//                  	 MessageBox.alert(data.body.message).then(action => {
						  this.$router.push({
											path: '/loading'
										})
//						});
				}else{
					var d = data.body.dto;
//				this.student = d.portraitUrl;
				this.name = d.name;
//				this.logoSrc = d.portraitUrl;
                if(d.sex == "男" && this.logoSrc == "" ){
                	   this.logoSrc = '../static/img/man.png' ;
                } 
                else if(d.sex == "女" && this.logoSrc == ""){
                	   this.logoSrc = '../static/img/woman.png';
                }else{
                	
                	   this.logoSrc = d.imgUrl;
                };
              
				if(d.userType == "001011"){
					this.stu = "学生"
				}else if(d.userType == "001010"){
					this.stu = "教师"
				}
				}
				
//				debugger;

			},
			    (response)=>{
//			    	debugger;
			    	console.log("error");
			    })
			
		}
	}
</script>
<style scoped>
	.top{
		background-color: #fff;
		height: 5rem;
		margin-top: 1.25rem;
		font-size: .9em;
	}
	.logo{
		width: 2rem;
	    height: 2rem;
	    border: 2px solid #8cb7fd;
	    border-radius: 1rem;
	}
	.name{
		color: #FFFFFF;
	}
	.pro{
		width: 1em;
		height: 1em;
		display: inline-block;
	}
	.stu{
		color: #FFFFFF;
	}
	.profession{
		/*display: inline-block;
	    padding: 0.3em 1.2em;
	    border: 1px solid #fff;
	    border-radius: 1.2em;
	    margin-top: 0.8em;*/
	   
	}
	.name{
		float: left;
		width: 50%;
	
	}
	.MeHead img{
		margin-top: .8em;
	}
	.topContent{
		position: relative;
        top: -15.5em;
        font-size: 1.2em;
	}
	.imgMe{
		height: 5rem;
        width: 100%;
        opacity: 1;
	}
	.MeTitle{
		/*margin-top: 1.4em;*/
		font-weight: bold;
		color: #FFFFFF;
		position: relative;
        top: .8em;
        margin-top: 0px;
        margin-bottom: 1em;
        font-size: 1.2em;
	}
	/*.hui{
		height: 1vh;
		background: #fff;
		width: 100%;
	}*/
	.ti{
		width: 53%;
		margin: 0px auto;
		padding-top: .3rem;
		position: absolute;
    left: 25%;
	}
</style>