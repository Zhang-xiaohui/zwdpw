<template>
	<div class="teacher">
		<div class="mint-msgbox-input">
			<div><p class="notice">带“*”的为必填项</p></div>
			<div>
				<label><span class="must">*</span>账户名</label>
				<input type="text" class="input-text" placeholder="请输入用户名" name="username" /><br>
				<span class='state1' id="u1"></span>
			</div>
			<div>
				<label><span class="must">*</span>密码</label>
				<input type="password" class="input-text" placeholder="请输入密码" name="password" /><br>
				 <span class='state1' id="u2"></span>
			</div>
			<div>
				<label><span class="must">*</span>确认密码</label>
				<input type="password" class="input-text" placeholder="请再次输入密码" name="repass"/><br>
				<span class='state1' id="u3"></span>
			</div>
			<div>
				<label><span class="must"></span>学校</label>
				<input type="text" class="input-text" name="school" /><br />
				<span class='state1'></span>
			</div>
			<div>
				<label><span class="must"></span>邮箱</label>
				<input type="email" class="input-text" name="email" />
				<label style="width: 48%;text-align: left;">此邮箱用来找回密码</label><br/>
				<span class='state1'></span>
			</div>
			<div>
			    <label><span class="must"></span>性别</label>
				<select name="sex">
					<option>保密</option>
					<option>男</option>
					<option>女</option>
				</select><br>
				<span class='state1'></span>
			</div>
			<div>
				<label>真实姓名</label>
				<input type="text" class="input-text" placeholder="请填写真实姓名" /><br/>
				
			</div>
			<div>
				<label>出生日期</label>
				<input type="date" class="input-text" />
			</div>
			<div>
				<label>手机</label>
				<input type="text" class="input-text" placeholder="请输入手机号" name="phone" /><br>
				<span class='state1'></span>
			</div>
			<div>
				<label>昵称</label>
				<input type="text" class="input-text" placeholder="请输入昵称" />
			</div>
			<div>
				<label></label>
				<mt-button type="primary" size="large" class="pri-tea" style="position: relative;left: -60px;" id="send">提交</mt-button>
			</div>
		</div>
	</div>
</template>
<style>
.teacher{
	min-height: 100vh;
		 background:-moz-linear-gradient(top, #428AFF, rgba(0, 0, 255, 0.5));  
		 background:-webkit-gradient(linear, 0 0, 0 bottom, from(#428AFF), to(#4d63ff));  
}
.teacher .mint-msgbox-input{
	padding-top: 2rem;
	text-align: center;
	padding-bottom: 1rem;
}
.mint-msgbox-input div{
	padding-bottom: .2rem;
}
.mint-msgbox-input input{
	width: 65%;
	height: .7rem;
}
.mint-msgbox-input select{
	width: 68%;
    background: #fff;
    height: 1rem;
}
.mint-msgbox-input label{
	color: #FFFFFF;
	display: inline-block;
	width: 60px;
	text-align: right;
}
.must{
	color: #FF0000;
}
.notice{
	color: #FF0000;
}
.pri-tea{
	width: 20% !important;
	margin: auto;
	text-align: center;
	display: inline-block;
	background: #494949;
}
.mint-button-text{
	width: 40px !important;
}
.confirm li{
	color: #FF0000;
}
</style>
<style>
	.state1{
        color:#aaa;
      }
      .state2{
        color:#000;
      }
      .state3{
        color:red;
      }
      .state4{
        color:green;
      }
</style>
<script>
	export default{
		data(){
		   return{
		   	username:'',
		   	password:'',
		   }
		},
			created:function(){
      this.$store.state.backUrl = "home";
      this.$store.state.titleName = "注册";
//    this.$store.state.selectedTab = "loading";
      this.$store.state.more = null;
      this.$store.state.moreUrl = null;
      window.scrollTo(0,0);
      console.log("created");
    },
    mounted:function(){
//  	this.$store.state.selectedTab = "home";    
      this.$store.state.showBottomNav=false;  
      var ok1=false;
        var ok2=false;
        var ok3=false;
        var ok4=false;
      	$('input[name="username"]').focus(function(){
      		console.log("!!!");
          $(this).next().next().text('4-16位字符，字母开头，只包含字母数字下划线').removeClass('state1').addClass('state2');
        }).blur(function(){
          if(/^[a-z,A-Z]\W{4,16}&/ && $(this).val()!==""){
            $(this).next().next().text('输入成功').removeClass('state1').addClass('state4');
            ok1=true;
          }else{
            $(this).next().next().text('用户名应该为4-16位之间').removeClass('state1').addClass('state3');
          }
            
        });
        //验证密码
        $('input[name="password"]').focus(function(){
          $(this).next().next().text('').removeClass('state1').addClass('state2');
        }).blur(function(){
          if($(this).val().length < 8 || $(this).val().length >16 && $(this).val()!=''){
             $(this).next().next().text('密码应该为8-16位之间').removeClass('state1').addClass('state3');
          }
          else if(/^[0-9]{8,16}$/.test(this.value)||/^[a-zA-Z]{8,16}$/.test(this.value)){
          	$(this).next().next().text('密码必须是字母和数字组合').removeClass('state1').addClass('state3');
          }else{
            $(this).next().next().text('输入成功').removeClass('state1').addClass('state4');
            ok2=true;
          }
        });
         //验证确认密码
          $('input[name="repass"]').focus(function(){
          $(this).next().next().text('').removeClass('state1').addClass('state2');
        }).blur(function(){
          if($(this).val().length >= 8 && $(this).val().length <=16 && $(this).val()!='' && $(this).val() == $('input[name="password"]').val()){
            $(this).next().next().text('输入成功').removeClass('state1').addClass('state4');
            ok3=true;
          }else{
            $(this).next().next().text('输入的确认密码要和上面的密码一致,规则也要相同').removeClass('state1').addClass('state3');
          }
            
        });
        //验证学校
        $('input[name="school"]').focus(function(){
          $(this).next().next().text('').removeClass('state1').addClass('state2');
        }).blur(function(){
          if($(this).val().length <=50 && $(this).val()!==""){
            $(this).next().next().text('输入成功').removeClass('state1').addClass('state4');
            ok1=true;
          }else{
            $(this).next().next().text('学校名称不能超过50个字符').removeClass('state1').addClass('state3');
          }
            
        });
        //验证邮箱
        $('input[name="email"]').focus(function(){
          $(this).next().next().text('').removeClass('state1').addClass('state2');
        }).blur(function(){
          if($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)==-1){
            $(this).next().next().next().text('请输入正确的EMAIL格式').removeClass('state1').addClass('state3');
          }else{         
            $(this).next().next().next().text('输入成功').removeClass('state1').addClass('state4');
            ok4=true;
          }
            
        });
        //验证性别
        $('select[name="sex"]').focus(function(){
          $(this).next().next().text('').removeClass('state1').addClass('state2');
        }).blur(function(){
          if($(this).val()=="男" || $(this).val()=="女"){
            $(this).next().next().text('输入成功').removeClass('state1').addClass('state4');
            ok1=true;
          }else{
            $(this).next().next().text('请选择性别').removeClass('state1').addClass('state3');
          }
            
        });
        //验证学校
        $('input[name="phone"]').focus(function(){
          $(this).next().next().text('').removeClass('state1').addClass('state2');
        }).blur(function(){
          if(/^1[3,4,5,7,8]\d{9}$/.test(this.value)){
            $(this).next().next().text('输入成功').removeClass('state1').addClass('state4');
            ok1=true;
          }else{
            $(this).next().next().text('请输入以13、14、15、17、18开头的手机号且为11位').removeClass('state1').addClass('state3');
          }
        });
        $("#send").click(function(){
            //trigger 事件执行完后，浏览器会为submit按钮获得焦点
            if($('input[name="username"]').val()==""){
         	   $("#u1").text("此为必填项").addClass('state3');

            }
            if($('input[name="password"]').val()==""){
         	   $("#u2").text("此为必填项").addClass('state3');

            }
            if($('input[name="repass"]').val()==""){
         	   $("#u3").text("此为必填项").addClass('state3');

            }
        });
    },
    updated:function(){
    
    }
	}
</script>