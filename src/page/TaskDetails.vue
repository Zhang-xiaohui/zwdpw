<template>
    <div class='taskDetails'>
        <mt-header class="header" fixed title="任务详情">
            <mt-button @click="Back" slot="left"  icon="back"></mt-button>
        </mt-header>
        <div class='taskDetails-top'>
            <h2>{{articleDetail.title}}</h2>
            <span class='taskDetails-time'>{{articleDetail.completionTime}}</span>
        </div>
        <div class="taskDetails-content">
            <div class="article-content" v-html='articleDetail.content'></div>
        </div> 
        <div class='student'>
            <p class='student-top'>发布人员</p>
            <span v-for="(item, i) in articleDetail.taskTeacher" class='student-con'>{{item}}</span>
        </div>  
        <div class='time'>
            <p class='time-top'>完成时间</p>
            <span class='time-con'>{{articleDetail.createTime}}</span>
        </div> 
        <button class='completion-button' @click="toCompletion">查看完成情况</button>
    </div>
</template>
<script>
    export default {
        name: 'task-details',
        components: {},
        data () {
            return {
                articleDetail: {}
            }
        },
        mounted() {
            $(".img-task").css({
                "display":'block',
                "width": '9.4rem'
            })
        },
        updated() {
            $(".img-task").css({
                "display":'block',
                "width": '9.4rem'
            })
        },
        created() {
            this.$store.state.showBottomNav=false;
            let url=this.$store.state.url
            this.$http.get(url+'teacher1/task/taskDetail',{
                params:{ id:this.$route.query.id }
            }).then(response => { 
                let data = response.body.dto,
                    startY=new Date(data.planTimeEnd).getFullYear(),
                    startM=new Date(data.planTimeEnd).getMonth()+1,
                    startD=new Date(data.planTimeEnd).getDate(),
                    completionY=new Date(data.planTimeStart).getFullYear(),
                    completionM=new Date(data.planTimeStart).getMonth()+1,
                    completionD=new Date(data.planTimeStart).getDate(),
                    Stime = startY+"-"+startM+"-"+startD,
                    Ctime = completionY+"-"+completionM+"-"+completionD
                this.articleDetail = {
                    "id":data.id,
                    "title":data.name,
                    "taskTeacher":data.grades,
                    "createTime":Stime,
                    "content":data.jxfzBkzybItemDO.content,
                    "completionTime":Ctime,
                    "completeNum":40,
                    "incompleteNumber":0,
                    'creatorId':data.creatorId
                }
            })

        },	
        methods:{
            Back(){
                this.$router.go(-1)
            },
            toCompletion(){
                this.$router.push({path:'/completion', query: { creatorId: this.articleDetail.creatorId,
                                                                 id: this.articleDetail.id  } })
            }
        },
    }
</script>
<style>
.header{
	background-color: #428AFF;
	height:1.25rem;
}
.taskDetails-top{
    margin-top:1.8rem;
    overflow: hidden;
}
.taskDetails-top h2{
    font-size: .6rem;
    text-align: center;
    color:#151515;
}
.taskDetails-time{
    width: 100%;
    display: block;
    margin-top: .2rem;
    font-size: .4rem;
    text-align: center;
    color:#838383;
}
.taskDetails-content{
    margin: .4rem 0;
    padding-left:.3rem;
    padding-bottom: .6rem;
    color: #000;
    line-height: 1.7;
    border-bottom: 1px dashed #8c8a8a;
    text-align: center;
}
.student{
    margin-left: .4rem;
    padding: .5rem 0 0 0;
    font-size: .4rem;
    color: #151515;
}
.student-top{
    color: #151515;
    font-size: .46rem;
}
.student-con{
    display: block;
    width: 3rem;
    height: .8rem;
    line-height: .8rem;
    margin-top: .4rem;
    background: #404a58;
    text-align: center;
    border-radius: 2.4rem;
    color: #FFF;
}
.time{
    margin-left: .4rem;
    padding: .5rem 0;
    font-size: .4rem;
    color: #151515;
}
.time-top{
    color: #151515;
    font-size: .46rem;
}
.time-con{
    display: block;
    width: 3rem;
    height: .8rem;
    line-height: .8rem;
    margin-top: .4rem;
    background: #ffe4b4;
    text-align: center;
    border-radius: 2.4rem;
    color: #fea405;
}
.completion-button{
    width: 9rem;
    margin-left: .5rem;
    height: 1rem;
    background: #418aff;
    border: 0;
    border-radius: 0.2rem;
    color: #fff;
    margin-top: 2rem;
}
</style>   