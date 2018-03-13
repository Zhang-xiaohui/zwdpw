<template>
	<div class='con-box'>
		<div class='class-con-box' v-for="(item,i) in waitData" :key="item.id">
			<div class='showcheckbox'>
				<input type="checkbox" :id="item.id" name='taskCheck' class="chk_1" /> 
				<label :for="item.id"></label> 
			</div>
			<div class='class-con-box-top'>
				<p class='class-con-p-left'>{{item.name}}</p>
				<p class='class-con-p-right'><span class='waitfont'>编辑中...</span></p>
			</div>
            <div class='class-con-box-content'>
			<!-- <div class='class-con-box-content' @click='handleLinkToDetails'> -->
				<div class="article-content" v-html='item.jxfzBkzybItemDO.content'></div>
			</div>
			<button class='send' @click="send(item)">发布任务</button>
			<div class='clear'></div>
		</div>
		<div class='isSend' v-if="isSend">
            <div class="isSendBox">
                <div class="isSendTop">
                    <span class='isSendClose' @click="closeisSend">X</span>
                    <i class="isSendLine"></i>
                </div>
                <div class="isSendCon">
                    <p class='p-font-1'>你确定要发布课堂任务吗？</p>
                    <p class='p-font-2'>发布课堂任务后，你所带班级的所有学生将收到，作答后提交给你批改</p>
                    <button class="isSendOk" @click="isSendok(this.selectData)">确认</button>
                </div>
            </div>
        </div> 
	    <div class="new-task" @click='handleLinkTo'>
            <div class="new-task-box">
                <img class="new-task-icon" src="../../static/img/tianjia.png" />
            </div>
        </div>
    </div>
</template>

<script>
    import { Checklist,DatetimePicker,Toast } from 'mint-ui';
	export default {
        created() {
            
        },
        mounted() {
            $(".img-task").css({
                "display":'block',
                "width": '8.7rem'
            })
        },
        updated() {
            $(".img-task").css({
                "display":'block',
                "width": '8.7rem'
            })
        },
    	data() {
    		return {
    			isSend:false,
				selected:'1',
                selectData:''
    		}
    	},
        props: ["waitData"],
		methods:{
			closeisSend(){
				this.isSend=false
			},
			isSendok(){
                let that = this;
                let url=this.$store.state.url;
                let data = this.selectData;
                this.$emit('updateTaskReleased', data);
                this.isSend=false
			},
            // handleChangeItems() {
            //     let url=this.$store.state.url
            //     this.$http.get(url+'teacher/task/listNotReleasedTask').then(response => { 
            //         this.waitData = response.body.dto.list;
            //         // console.log(this.waitData)
            //     })
            // },
			send(n){
                this.selectData= n.id;
				this.isSend=true
			},
            handleLinkTo() {
                //debugger;
                this.$router.push({ path:'/createclasswork' })
            },
            // handleLinkToDetails() {
            //     this.$router.push({ path:'/WaitIssueDetails' })
            // }
		}
	}
</script>

<style scoped>

.con-box{
    padding: .3rem;
    margin-top: .1rem;
    position: relative;
    margin-bottom:1.4rem;
}
.class-con-box{
	position: relative;
    min-height: 1rem;
    background: #fff;
    padding: 0.3rem;
    box-shadow: 0px 1px 10px #ccc;
    margin: .3rem 0 .2rem 0;
}
.class-con-box-top{
    overflow: hidden;
    margin-bottom:.5rem;
}
.class-con-p-left{
    float: left;
    font-size: .5rem;
    font-weight: bold;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
}
.class-con-p-right{
    display: block;
    float: right;
    color: #a1a1a1;
    width: 2rem;
    text-align: center;
    height: 1rem;
}
.waitfont{
    display:block;
    width:100%;
    height: 100%;
    text-align: center;
    line-height: 1rem;
}
.send{
    width: 2rem;
    height: .7rem;
    border: 0;
    border-radius: .3rem;
    margin-top: .5rem;
    float:right;
    background: #418aff;
    color: #fff;
}
.class-con-box-content{
	display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-align: center;
  }
  .isSend{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
  }
  .isSendBox{
    position: relative;
    width: 8rem;
    height: 4.5rem;
    top: 5rem;
    left: 1rem;
  }
  .isSendClose{
    float: right;
    background: #FFF;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    text-align: center;
    line-height: 0.6rem;
  }
  .isSendLine{
    display: block;
    height: 0.6rem;
    width: 0.1rem;
    border-left: 1px dashed #fff;
    position: absolute;
    top: 0.6rem;
    left: 7.7rem;
  }
   .isSendCon{
    position: absolute;
    top: 1.2rem;
    height: 100%;
    width: 100%;
    background: #fff;
    border-radius: .3rem;
  }
  .p-font-1{
    padding: .4rem;
    text-align: center;
    font-size: 18px;
        font-weight: bold;
  }
  .p-font-2{
    padding:.2rem;
    font-size: 12px;
        text-indent: 25px;
  }
  .isSendOk{
        width: 7rem;
    margin-left: .5rem;
    height: 1rem;
    border: 0;
    border-radius: 0.2rem;
    background: #418aff;
    margin-top: .4rem;
  }
  .chk_1 { 
    display: none; 
  } 
 
.chk_1 + label { 
    width: .6rem;
    height: .6rem;
    border: 1px solid #ccc;
    border-radius: .5rem;
    display: inline-block;
    position: relative;  
        background: #fff;

} 
.chk_1 + label:active { 
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1); 
} 
 
.chk_1:checked + label { 
    background:#418aff; 
    border: 1px solid #92A1AC; 
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1); 
    color: #fff; 
} 
 
.chk_1:checked + label:after { 
    content: '\2714';
    position: absolute; 
    top: 0px; 
    left: 0px; 
    color: #FFF;
    width: 100%; 
    text-align: center; 
    font-size: 1.4em; 
    padding: 0 0 .02rem .02rem; 
    vertical-align: text-top; 
} 
.showcheckbox{
    display:none;
    width: .8rem;
    height: .8rem;
    position: absolute;
    top: 1.5rem;
    left: -0.75rem;
}
.clear{
	clear:both;
}
.new-task{
    position:fixed;
    bottom:4rem;
    right:.6rem;
    width:.9rem;
    height:.9rem;
    background:#404a58;
    border-radius:50%;
    text-align: center;
}
.new-task-icon{
    width:.4rem;
    height:.4rem;
    margin-top:.25rem;
}
.img-task{
    height:2rem;
}
.article-content{
    text-align:left;
}
</style>