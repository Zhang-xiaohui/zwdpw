<template>
	<div class='con-box'>		
		<div class='class-con-box' v-if="toggle" v-for="(item,i) in toreviewedData" :key="item.id">
			<router-link :to="{path:'/evaluated',query: {id: item.id}}" >
		        <div class='class-con-box-title'>
		        	<div class="stu-message">
		        		<div class="msg-right">
		        			<p>{{item.authorName}}</p>
		        			<p><span class="grade-color">{{item.gradeName}}</span><span class="grade-color">{{item.className}}</span></p>
	        			</div>
		        	</div>
		        	<div class="article-date">	
		        		<p>{{item.date}}</p>
		        		<p>{{item.time}}</p>
		        	</div>
		        </div>
		        <div class='class-con-box-content'>
		        	<h1 class="headline">{{item.title}}</h1>

					<div v-if="item.type" class="article-content">
	            		<img v-for="(imgitem, index) in item.content" :key="index" class="img-task" :src='imgitem'/>       	
	            	</div>
	            	<div v-else class="article-content" v-html="item.content"></div>
		        </div>
	        </router-link>
	    </div>
	    <div class="has-no-content" v-if="toggleNothing" >
	    	<img class="item-img" src="../../static/img/tu2.png" />
	    	<p>还没有评点的作文呦</p>
	    	<p>赶紧去给学生点评吧！</p>
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
		created() {
			console.log(this.toreviewedData)
		},
    	data() {
    		return {
    			"isSend":false,
				"selected":'1',
    		}
    	},
    	props: ["toreviewedData", "toggleNothing", "toggle"],
    	methods: {
    		handleLinkTo() {
                this.$router.push({ path:'/createclasswork'})
            }
    	}
	}
</script>

<style scoped>
ins, a {
    text-decoration: none;
    color: #333;
}
.con-box{
    background: #fff;
    padding: .3rem;
    margin-top: .1rem;
    position: relative;
    margin-bottom:1.4rem;
}
.class-con-box{
    min-height: 1rem;
    background: #fff;
    padding: 0.3rem;
    overflow:hidden;
    box-shadow: 0px 1px 10px #ccc;
    margin-top: .3rem;
}
.class-con-box-title{
	overflow:hidden;
}
.img-left{
	float:left;
}
.msg-right{
	text-align: center;
	float:right;
}
.stu-message{
	float:left;
}
.article-date{
	text-align: center;
	float:right;
}
.article-content{
	text-indent:2em ;
}
.headline{
	font-weight: bold;
	font-size: 16px;
	text-align: center;
}
.grade-color{
	color:#fea405;
}
.class-con-box-content{
	margin-bottom: .3rem;
}
.head-portrait{
	width: 1rem;
	height: 1rem;
	border-radius: .3rem;
}
.article-content{
	text-indent:2em ;
	display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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
.has-no-content{
	text-align: center;
	color:#999;
    margin-top: 1rem;
}
.item-img{
	height:4rem;
	width:4.4rem;
}
</style>