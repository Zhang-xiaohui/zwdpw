<template>
	<div class='con-box'>
		 <div  class='class-con-box' v-for="(item,i) in alreadyData" :key="item.id">
            <div class='showcheckbox'>
                <input type="checkbox" :id="item.id" name='taskCheck' class="chk_1" /> 
                <label :for="item.id"></label> 
            </div>
                <div class='class-con-box-top'>
                    <p class='class-con-p-left'>{{item.title}}</p>
                    <p class='class-con-p-right'>
                        <span class="sp-style">{{item.taskName}}</span>
                        <span>{{item.createTime}}</span>
                    </p>
                </div>
                <div class='class-con-box-content'>
                    <div class="article-content" v-html='item.content'></div>
                </div>
                <div class='taskNums'>
                    <span>共<i>{{item.completeNum}}</i>人，<i class='red'>{{item.incompleteNumber}}</i>人提交</span>
                </div>
                <router-link :to="{ path: '/taskdetails', query:{id:item.id}}">
                    <button class='check'>查看完成情况</button>
                </router-link>
                <div class='clear'></div>
        </div>
	    <div class="new-task" @click='handleLinkTo'>
            <div class="new-task-box">
                <img class="new-task-icon" src="../../static/img/tianjia.png" />
            </div>
        </div>
    </div>
</template>

<script>
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
                time: '',
                idList: []
    		}
    	},
        props: ["alreadyData"],
		methods:{

            handleLinkTo() {
                this.$router.push({ path:'/createclasswork',query: {  } })
            }
		}
	}
</script>

<style scoped>
.con-box{
    background: #fff;
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
    line-height: 1rem;
}
.sp-style{
    display: block;
}
.class-con-p-right{
    display: block;
    float: right;
    color: #a1a1a1;
    width: 3rem;
    text-align: center;
    height:1rem;
}
.waitfont{
    display:block;
    width:100%;
    height: 100%;
    text-align: center;
    line-height: 1rem;
}
.check{
    float: right;
    height: .8rem;
    border: 1px solid #418aff;
    background: #fff;
    color: #418aff;
    border-radius: 1.2rem;
    margin-top: .5rem;
    width: 3.5rem;
    line-height: .8rem;
    text-align: center;
}
  .class-con-box-content{
	display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
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
.taskNums{
    float: left;
    height: 1rem;
    line-height: 1.95rem;
    color:#959595;
}
.red{
    color:red;
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
</style>