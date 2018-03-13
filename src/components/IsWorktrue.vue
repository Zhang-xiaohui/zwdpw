<template>
    <div id='isWorktrue'>
        <mt-header class="header" fixed title="课堂任务">
            <mt-button @click="Back" slot="left"  icon="back"></mt-button>
            <mt-button id = "js-toggle" @click="edit" slot="right">{{editTitle}}</mt-button>
        </mt-header>
        <div class='class-navbar'>
            <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1"  @click.native.prevent="clear">待发布</mt-tab-item>
                <mt-tab-item id="2"  @click.native.prevent="clear">已发布</mt-tab-item>
                <mt-tab-item id="3"  @click.native.prevent="clear">待点评</mt-tab-item>
                <mt-tab-item id="4"  @click.native.prevent="clear">已点评</mt-tab-item>
            </mt-navbar>
        </div>
        <div class='class-con'>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <WaitList :waitData="waitData" @updateTaskReleased='updateTaskReleased' v-if="selected==1?true:false"/>  
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <Already :alreadyData='alreadyData' v-if="selected==2?true:false"/>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <Toreview :toggle_="toggle_" :toggleNothing_="toggleNothing_" :toreviewData="toreviewData" v-if="selected==3?true:false"></Toreview>        
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <Toreviewed :toggle="toggle" :toggleNothing="toggleNothing" :toreviewedData="toreviewedData" v-if="selected==4?true:false"></Toreviewed>
                </mt-tab-container-item>
            </mt-tab-container>                                     
        </div>
        <div class='isShowAll' v-if="isShowAll">
            <div class="isShowAllBox">
                <div class="isShowAllLeft">
                    <input type="checkbox" id="checkboxall" class="chk_1" /> 
                    <label for="checkboxall" @click="allTask" class='checkAll'></label> 
                    <span class='allFont'>全部</span>
                </div>
                <div class="isShowAllRight">
                   <button class="delTask" @click="delTask">删除</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Checklist, DatetimePicker, Toast } from 'mint-ui';
import Toreview from './ToReview'
import Toreviewed from './Toreviewed'
import WaitList from './WaitList'
import Already from './Already'
export default {
    name: 'is-worktrue',
    components: {
        'Toreview': Toreview,
        'Toreviewed': Toreviewed,
        'WaitList':WaitList,
        'Already':Already
    },
    data () {
      return {
          isSend:false,
          isShowAll:false,
          editTitle:'编辑',
          selected: this.$store.state.select,
          waitData:[],
          alreadyData:[],
          toreviewData:[],
          toreviewedData:[],
          toggle:'',
          toggleNothing:'',
          toggle_:'',
          toggleNothing_:''
      }
    },
    created:function(){
        this.$store.state.backUrl = null;
        this.$store.state.showTopNav=false;
        this.$store.state.titleName = "课堂任务";
        this.$store.state.selectedTab = "schoolwork";
        window.scrollTo(0,0);

        let url=this.$store.state.url

        this.$http.get(url+'/teacher1/task/listTask',{
            params:{"status":"004001"} 
        }).then(response => { 
            this.waitData = response.body.dto.list;
      
        })

        this.$http.get(url+'/teacher1/task/listComposionNotComment' ).then(response => { 
            let data = response.body.dto;
            let l = data.length;
            if( l < 1 ){
                this.toggle_ = false;
                this.toggleNothing_ = true;
            }else{
                this.toggleNothing_ = false;
                this.toggle_ = true;
                let newMsg = [];
                for (var i = 0; i < data.length; i++) {
                    let time = data[i].createTime,
                        startY=new Date(time).getFullYear(),
                        startM=new Date(time).getMonth()+1,
                        startD=new Date(time).getDate(),
                        startH=new Date(time).getHours(),
                        startS=new Date(time).getMinutes(),
                        Dtime = startY+"-"+startM+"-"+startD,
                        Ttime = startH+":"+startS                 
                        if(data[i].content == ""){
                            let imgList = data[i].pics
                            // imgList.pop();
                            newMsg.push({
                            'taskId': data[i].taskId,
                            'id': data[i].id,
                            'authorName': data[i].author,
                            'gradeName': data[i].gradeName,
                            'className': data[i].className,
                            "title":data[i].name,
                            'time':Ttime,
                            'date':Dtime,
                            'content': imgList,
                            'type': true
                            })
                        }else{
                            newMsg.push({
                            'taskId': data[i].taskId,
                            'id': data[i].id,
                            'authorName': data[i].author,
                            'gradeName': data[i].gradeName,
                            'className': data[i].className,
                            "title":data[i].name,
                            'time':Ttime,
                            'date':Dtime,
                            'content': data[i].content,
                            'type': false
                            })
                        }
                        
                }
                this.toreviewData = newMsg
            }
            
        })

        this.$http.get(url+'/teacher1/task/listComposionComment' ).then(response => { 
            let data = response.body.dto;
            let newData=[]
            let l = data.length;
            if( l < 1 ){
                this.toggle = false;
                this.toggleNothing = true;
                
            }else{
                this.toggleNothing = false;
                this.toggle = true;

                
                for (var i = 0; i < data.length; i++) {
                    let time = data[i].createTime,
                    startY=new Date(time).getFullYear(),
                    startM=new Date(time).getMonth()+1,
                    startD=new Date(time).getDate(),
                    startH=new Date(time).getHours(),
                    startS=new Date(time).getMinutes(),
                    Dtime = startY+"-"+startM+"-"+startD,
                    Ttime = startH+":"+startS;
                 //    let imgList = data[i].content.split(",");
                    // imgList.pop();
                    if(data[i].content == ""){
                        
                        let imgList = data[i].pics
                        // imgList.pop();
                   
                        newData.push({
                        'taskId': data[i].taskId,
                        'id': data[i].id,
                        'authorName': data[i].author,
                        'gradeName': data[i].gradeName,
                        'className': data[i].className,
                        "title":data[i].name,
                        'time':Ttime,
                        'date':Dtime,
                        'content': imgList,
                        'type': true
                        })
                    }else{
                        newData.push({
                        'taskId': data[i].taskId,
                        'id': data[i].id,
                        'authorName': data[i].author,
                        'gradeName': data[i].gradeName,
                        'className': data[i].className,
                        "title":data[i].name,
                        'time':Ttime,
                        'date':Dtime,
                        'content': data[i].content,
                        'type': false
                        })
                    }

                    
                }
                this.toreviewedData=newData;
            }
        })

        this.$http.get(url+'/teacher1/task/listTask',{
            params:{"status":"004002"}
        }).then(response => { 
            let data= response.body.dto.list
            let newData=[]
            for(let i=0;i<data.length;i++){
                let startY=new Date(data[i].createTime).getFullYear()
                let startM=new Date(data[i].createTime).getMonth()+1
                let startD=new Date(data[i].createTime).getDate()
                let time = startY+"-"+startM+"-"+startD
                newData.push({
                    "id":data[i].id,
                    "title":data[i].name,
                    "createTime":time,
                    "content":data[i].jxfzBkzybItemDO.content,
                    "completeNum":data[i].total,
                    "incompleteNumber":data[i].completeNum,
                })
            }
            
            this.alreadyData=newData
        })
    },
    methods:{
        clear(){
            this.$store.state.select=this.selected
            if(this.selected == 3|| this.selected == 4) {
                $('#js-toggle').hide()
            }else{
                $('#js-toggle').show()
            }
            this.editTitle="编辑"
            $(".showcheckbox").hide()
            $(".class-con-box").css({"border-radius":"0","margin-left":"0"});
            let checklist = document.getElementsByName("taskCheck");
            for(let j = 0; j < checklist.length; j++) {
                checklist[j].checked = false;
            }
            this.isShowAll=false
        },
        Back(){
            this.$router.go(-1)
        },
        // handleChangeItems(){

        // },
        edit(){
            if(this.editTitle=="编辑"){
                this.editTitle="取消"
                this.isShowAll=true
                this.$store.state.showBottomNav=false;
                $(".showcheckbox").show()
                $(".class-con-box").css({"border-radius":".4rem","margin-left":".5rem"});
            }else{
                this.editTitle="编辑"
                $(".showcheckbox").hide()
                $(".class-con-box").css({"border-radius":"0","margin-left":"0"});
                this.isShowAll=false
                this.$store.state.showBottomNav=true;
            }
            
        },
        /**************************/
        // handleChangeWaitData() {
        //     let url=this.$store.state.url
        //     this.$http.get(url+'/teacher1/task/listTask', {
        //         params:{"status":"004001"} 
        //     }).then(response => { 
        //         this.waitData = response.body.dto.list;
        //     })
        // },
        allTask(){
            var checklist = document.getElementsByName("taskCheck");
            if(document.getElementById("checkboxall").checked) {
                for(var j = 0; j < checklist.length; j++) {
                    checklist[j].checked = false;
                }
            } else {
                for(var i = 0; i < checklist.length; i++) {
                    checklist[i].checked = true;
                }
            }
          
        },
        delTask(){
            let checked=$('input[name="taskCheck"]:checked')
            let id=[]
            for(let i=0;i<checked.length;i++){
                id.push(checked[i].id)
            }
            //删除任务
            let url=this.$store.state.url;
            /*this.$http.post(url+'teacher/task/deleteTasks',{
                params:{"id":JSON.stringify(id)}
            }).then(response => { 
                this.waitData = response.body.dto.list
            })*/
            if(id.length > 0){
                let that=this
                $.ajax({
                    type : "POST",
                    url : url + '/teacher1/task/deleteTasks',
                    data:{ "ids": id },
                    async: false,
                    dataType : "json",
                    traditional: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success : function (data) {
                    if( data.code == 1 ){
                        let ToastTip = "删除成功"
                        Toast({
                            message: ToastTip,
                            duration: 1000
                        });
                        that.editTitle="编辑"
                        $(".showcheckbox").hide()
                        $(".class-con-box").css({"border-radius":"0","margin-left":"0"});
                        that.isShowAll=false
                        that.$store.state.showBottomNav=true;
                        // location.reload()
                        let url=that.$store.state.url

                        // that.$http.get(url+'teacher/task/listNotReleasedTask').then(response => { 
                        //     that.waitData = response.body.dto.list;
                        // })

                        that.$http.get(url+'/teacher1/task/listTask', {
                            params:{"status":"004001"} 
                        }).then(response => { 
                            that.waitData = response.body.dto.list;
                      
                        })
                        
                        that.$http.get(url+'/teacher1/task/listTask',{
                            params:{"status":"004002"}
                        }).then(response => { 
                           let data= response.body.dto.list
                       
                           let newData=[]
                           for(let i=0;i<data.length;i++){
                            let startY=new Date(data[i].createTime).getFullYear()
                              let startM=new Date(data[i].createTime).getMonth()+1
                              let startD=new Date(data[i].createTime).getDate()
                              let time = startY+"-"+startM+"-"+startD
                              newData.push({
                                "id":data[i].id,
                                "title":data[i].name,
                                "createTime":time,
                                "content":data[i].jxfzBkzybItemDO.content,
                                "completeNum":data[i].total,
                                "incompleteNumber":data[i].notCompleteNum,
                              })
                            }
                            
                            that.alreadyData=newData
                        })

                    }
                    
                }
            });
            }else{
                let ToastTip = "请选择"
                Toast({
                    message: ToastTip,
                    duration: 1000
                });
            }     
        },

        updateTaskReleased(msg) {
            let that = this;
            let url=this.$store.state.url;
            $.ajax({
                    type : "GET",
                    url : url +'/teacher/task/updateTaskReleased',
                    data: { 'id': msg},
                    async: false,
                    dataType : "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success : function (data) {
                        if( data.code == 1 ){
                            let ToastTip = "发布成功"
                            Toast({
                                message: ToastTip,
                                duration: 2000
                            });
                            // that.$http.get(url+'teacher/task/listNotReleasedTask').then(response => { 
                            //     that.waitData = response.body.dto.list;
                            // })
                            that.$http.get(url+'/teacher1/task/listTask', {
                                params:{"status":"004001"} 
                            }).then(response => { 
                                that.waitData = response.body.dto.list;
                            });
                            that.$http.get(url+'/teacher1/task/listTask',{
                                params:{"status":"004002"}
                            }).then(response => { 
                                let data= response.body.dto.list
                                let newData=[]
                                for(let i=0;i<data.length;i++){
                                    let startY=new Date(data[i].createTime).getFullYear()
                                    let startM=new Date(data[i].createTime).getMonth()+1
                                    let startD=new Date(data[i].createTime).getDate()
                                    let time = startY+"-"+startM+"-"+startD
                                    newData.push({
                                        "id":data[i].id,
                                        "title":data[i].name,
                                        "createTime":time,
                                        "content":data[i].jxfzBkzybItemDO.content,
                                        "completeNum":data[i].total,
                                        "incompleteNumber":data[i].completeNum,
                                    })
                                }
                                that.alreadyData=newData
                            })

                        }else if( data.code == 1000 ){
                            localStorage.clear()
                            let ToastTip = "请重新登录"
                            Toast({
                                message: ToastTip,
                                duration: 2000
                            });
                            that.$router.push({path:'/loading'})
                        }     
                    }
                });
        }
    }	  
}
</script>
<style scoped>
.header{
	background-color: #428AFF;
	height:1.25rem;
}
.class-navbar{
       position: fixed;
top: 1.25rem;
width: 100%;
z-index: 999;
}
.mint-navbar .mint-tab-item.is-selected{
    color:#febb43;
    border-bottom: 3px solid #febb43;
}
.class-con{
   margin-top: 2.55rem;
    overflow: scroll;
background: #fff;
}
.isShowAll{
    position: fixed;
    bottom: 0rem;
    background: #fff;
    height: 1.25rem;
    width: 100%;
    border-top:1px solid #ccc;
}
.allFont{
    float:left;
    display: inline-block;
    width: 2.5rem;
    height: 1rem;
    line-height: 1rem;
    border-right:1px solid #ccc;
    font-size: .5rem;
    margin-top: .15rem;
    margin-left: .3rem;
}
.checkAll{
    float:left;
    margin-top: .3rem;
    margin-left: 1.5rem;
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
.isShowAllLeft{
    float:left;
    width:50%;
    margin-top: .1rem;
}
.isShowAllRight{
    float:left;
    width:50%;
    margin-top: .1rem;
}
.delTask{
    border: 0;
    background: #fff;
    font-size: .5rem;
    color: red;
    width: 100%;
    height: 1.1rem;
}
</style>