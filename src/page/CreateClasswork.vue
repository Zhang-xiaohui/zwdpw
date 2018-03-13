<template>
    <div id="createclass">
        <mt-header class="header" fixed title="课堂任务">
	        <mt-button @click="Back" slot="left"  icon="back"></mt-button>
            <mt-button @click="temporary" slot="right">暂存</mt-button>
        </mt-header>
        <div class='createclass-con' v-if='isContext'>
            <div class='createclass-top create-margin'>
                <p class='create-p'>任务标题</p>
                <input class='createTitle' type='text' placeholder="请输入任务标题" v-model="createTitle" />
            </div>
            <div class='createclass-con create-margin'>
                <p class='create-p'>要求内容</p>
                <div class='create-context' @click='toCreateContext'>
                     <vue-html5-editor class='show-editor' :content="createContext"></vue-html5-editor>
                </div> 
            </div>
            <div class='create-student create-margin'>
                <p class='create-p'>人员选择</p>
                <mt-checklist
                    v-model="createClass"
                    :options="classList">
                </mt-checklist>
            </div>
            <div class='create-time create-margin'>
                <!-- <p class='create-p'>完成时间</p>
                <div class='showCreateTime'>{{createTime}}</div>
                <button @click="open('picker')" class='btnTime'><img class="css-gif-time" src="../../static/img/compile.gif"/></button>
                <mt-datetime-picker
                    ref="picker"
                    type="date"
                    v-model="pickerValue"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @confirm="handleChange">
                </mt-datetime-picker> -->
                 <div class="block">
                    <el-date-picker id="js-blur"  @focus="handleFocus" @change="handleChange"
                      v-model="value1"
                      type="date"
                      placeholder="选择完成时间">
                    </el-date-picker>
                  </div>
            </div>
            <button class='createOk' @click="send()">发布课堂作文</button>
        </div>
        <div v-else>
            <mt-header class="header" fixed title="要求内容">
                <mt-button @click="BackCreate" slot="left"  icon="back"></mt-button>
                <mt-button @click="contentsOK" slot="right">完成</mt-button>
  	        </mt-header>
            <div class='editorBox'>
                <vue-html5-editor class="editor" :content="contents" @change="updateData" :auto-height="false" :z-index='0' :height = "480" ></vue-html5-editor>
            </div>
            <mt-button class="btn-icon" @click.stop="addPic"><img class="css-gif" src="../../static/img/photo22.gif"/><input id="album" type="file" accept="image/*" multiple @change="onFileChange"  style="display: none;"></mt-button>
            <!--<mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
                <div class="list-one"  @click.stop="addPic">
                    相册
                    <input id="album" type="file" accept="image/*" multiple @change="onFileChange"  style="display: none;">
                </div>
                <div class="list-two">
                    <div id="pic" @click="getImage()">拍照</div>
                     <input id="pic" type="file" accept="image/*;capture=camera" @change="onFileChange" style="display: none;">
                    <input id="pic" type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange" style="display: none;">
                    <input id="pic" type="file" accept="image/*" capture="camera" @change="onFileChange" style="display: none;">
                </div>
                <div class="list-three" @click="popupVisible = false">
                    取消
                </div>
            </mt-popup> 
            -->
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
                    <button class="isSendOk" @click="isSendok">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Checklist,DatetimePicker,Toast, Picker  } from 'mint-ui';
// import {plusReady} from '../../static/common.js' 
export default {
    name: 'create-classwork',
    components: {},
    data () {
      return {
        createTitle:'',
        createContext:'请输入要求内容',
        createClass:[],
        pickerVisible:false,
        pickerValue:'',
        createTime:'请选择完成时间',
        isContext:true,
        contents:'请输入要求内容',
        popupVisible:false,
        imgUrls:[],
        isSend:false,
        classList:[],
        time:'',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: ''
      }
    },	
    created:function(){
      this.$store.state.backUrl = false;
      this.$store.state.titleName = "课堂任务";
      this.$store.state.showTopNav=false;
      this.$store.state.selectedTab = "schoolwork";
      this.$store.state.showBottomNav=false;
      window.scrollTo(0,0);
     
    //   this.classList = [
    //         {
    //             label: '一年一班',
    //             value: '1'
    //         },
    //         {
    //             label: '一年二班',
    //             value: '2'
    //         },
    //         {
    //             label: '一年三班',
    //             value: '3'
    //         }
    //  ];
      let url=this.$store.state.url
      this.$http.get(url+'/teacher1/task/listMembers',{
            // params:{}
        }).then(response => { 
            console.log(response.body.dto)
            let l=response.body.dto.length
            let list=[]
            for(let i=0;i<l;i++){
                list.push({
                    label:response.body.dto[i].gradeName+response.body.dto[i].className,
                    value:response.body.dto[i].classId
                })
            }
            this.classList=list
        })
    },
    mounted() {
        $("#js-blur").focus(function(){
            document.activeElement.blur()
            console.log("mounted_prevent")
        })
    },
    updated() {
        $("#js-blur").focus(function(){
            document.activeElement.blur()
            console.log("mounted_prevent.xx")
        })
    },
    methods:{ 

    //   plusReady(){
    //     console.log("plusready");
    //   },
    //   getImage(){
    //         var cmr = plus.camera.getCamera();
    //         let that=this
    //         cmr.captureImage(function(p){
    //             // alert('成功：'+p);
    //             plus.io.resolveLocalFileSystemURL(p, function(entry){
    //                 // createItem(entry);
    //                 // alert(entry.toLocalURL())
    //                 that.FileUp(entry.toLocalURL())
    //             }, function(e){
    //                 alert('读取拍照文件错误：'+e.message);
    //             });
    //         }, function(e){
    //             alert('失败：'+e.message);
    //         }, {filename:'_doc/camera/',index:1});
    //     },
    open(picker) {
        this.$refs[picker].open();
    },
    BackCreate(){
      this.isContext=true
      this.$store.state.showTopNav=false
    },
    toCreateContext(){
        console.log(this.createContext)
        this.isContext=false
        this.$store.state.showTopNav=false;
        this.contents=''
    },
    handleFocus(){
        // $("#js-blur").focus(function(){
        //     document.activeElement.blur()
        // })
    },
    handleChange() {
        let date=this.value1.toString();
        let startY=new Date(date).getFullYear()
        let startM=new Date(date).getMonth()+1
        let startD=new Date(date).getDate()
        let hours=new Date(date).getHours()
        let minutes=new Date(date).getMinutes()
        let seconds=new Date(date).getSeconds()
        let time = startY+"-"+startM+"-"+startD
        let _time = startY+"-"+startM+"-"+startD+" "+hours+":"+minutes+":"+seconds
        this.createTime= time
        this.time = _time
        console.log(this.value1)
    },
      send(){
        let reg = /^.{1,20}$/;
        let reg_ = /^.{5,20}$/;
        if(this.createTitle==''||this.create=='请输入任务标题' || !reg.test(this.createTitle)){
            Toast({
                message: '请填写1~20个字符的标题。',
                position: 'bottom'
            });
        }else if(this.createContext==''||this.createContext=='请输入要求内容' || !reg_.test(this.createContext) ){
            Toast({
                message: '请填写5~2000字符的内容。',
                position: 'bottom'
            });
        }else if(this.createClass.length == 0){
            Toast({
                message: '请选择需要完成任务的班级',
                position: 'bottom'
            });
        }else if(this.createTime==''||this.createTime=='请选择完成时间'){
            Toast({
                message: '请选择完成时间',
                position: 'bottom'
            });
        }else{
            this.isSend=true
        }
        console.log(this.createClass)
      },
      addPic: function(e) {
            let vm = this;
            // vm.popupVisible4=false
            $('#album').trigger('click');
            
            return false;
        },
        // addPic1: function(e) {
        //     let vm = this;
        //     // vm.popupVisible4=false
        //     $('#pic').trigger('click');
            
        //     return false;
        // },
        // FileUp: function(n) {
        //     var files = n
        //     if(!files.length) return;
        //     this.createImagePic(files);
        // },
        // createImagePic: function(file) {
        //     let vm = this;
        //     lrz(file, { width: 480 }).then(function(rst) {
        //         vm.imgUrls.push(rst.base64);
        //         vm.contents=vm.contents+"<img class='img-task' src='"+rst.base64+"'/>"
        //         return rst;
        //     })
        //     vm.popupVisible=false
        //     console.log(vm.imgUrls)
            
        // },
        onFileChange: function(e) {
            var files = e.target.files || e.dataTransfer.files;
            if(!files.length) return;
            // alert(files)
            this.createImage(files, e);
        },
        createImage: function(file, e) {
            let vm = this;
            lrz(file[0], { width: 240 }).then(function(rst) {
                vm.imgUrls.push(rst.base64);
                vm.contents=vm.contents+"<img class='img-task' src='"+rst.base64+"'/>"
                return rst;
            }).always(function() {
            // 清空文件上传控件的值
                e.target.value = null;
            });
            vm.popupVisible=false
            console.log(vm.imgUrls)
            
        },
        updateData(data){
             console.log(data)
             this.contents=data
        },
        contentsOK(){
            console.log(this.contents)
            this.createContext=this.contents
            this.isContext=true
            this.$store.state.showTopNav=false
            $(".create-context").html(this.contents);
        },
        closeisSend(){
            this.isSend=false
        },
        isSendok(){
            let that = this;
            let url=this.$store.state.url
            // console.log(this.createClass)
            let classData=this.createClass
            let classNew=classData.join(',')
            
            let _time = this.time
            console.log(_time)
            // for(let i=0;i<classData.length;i++){
            //     classNew.push({
            //         grxxExternId:classData[i]
            //     })
            // }
            let data={
                "title":this.createTitle,
                "content":this.createContext,
                "rang":classNew,
                "finishTime":_time,
                "status": "004002"
            }
            // let _msg = JSON.stringify(data);
            console.log(data)
            $.ajax({
                type : "POST",
                url : url + 'teacher1/task/saveTask',
                data:data,
                async: false,
                dataType : "json",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success : function (data) {
                    console.log(data)
                    if( data.code == 1 ){
                        let ToastTip = "发布成功"
                        Toast({
                          message: ToastTip,
                          duration: 2000
                        });
                        that.$router.push({path:'/teachertask'})
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
            this.isSend=false
            
        },
        temporary(){
            if(this.createTitle==''||this.create=='请输入任务标题'){
                Toast({
                    message: '您的任务标题没填，请填写。',
                    position: 'bottom'
                });
            }else{
                let url=this.$store.state.url
                let classData=this.createClass
                let classNew=classData.join(',')
                // for(let i=0;i<classData.length;i++){
                //     classNew.push({
                //         grxxExternId:classData[i]
                //     })
                // }
                let _time = this.time
                console.log(_time)
                let data={
                    "title":this.createTitle,
                    "content":this.createContext,
                    "rang":classNew,
                    "finishTime":_time,
                    "status": "004001"
                }
                // let _msg = JSON.stringify(data);
                let that=this
                $.ajax({
                    type : "POST",
                    url : url + 'teacher1/task/saveTask',
                    data:data,
                    async: false,
                    dataType : "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success : function (data) {
                        if( data.code == 1 ){
                            let ToastTip = "暂存成功"
                            Toast({
                                message: ToastTip,
                                duration: 2000
                            });
                            that.$router.push({path:'/teachertask'})
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
            
        },
        Back(){
            this.$router.go(-1)
        }
        
    }  
}        
</script>
<style>
    #createclass{
        height: 15rem;
        overflow: hidden;
        padding-top:1.5rem;
    }
    .header{
		background-color: #428AFF;
		height:1.25rem;
	}
    .vue-html5-editor>.toolbar>.dashboard{
        border:0;
    }
    .vue-html5-editor>.toolbar>ul{
        border:0;
    }
    .vue-html5-editor>.content {
        padding: 10px;
            color: #757575;
    }
    .editor{
            border: 0;
    background: #f4f4f4;
    margin: 10px;
    }
    .mint-cell-wrapper{
        background:#fff;
    }
    .mint-cell {
        float:left;
        min-height:0;
    }
    .mint-checkbox-core{
        border-radius: 0;
        min-height:0.5rem;
    }
    .create-p{
    font-size: .4rem;
    }
    .create-margin{
        margin: .4rem 0 0 .4rem;
    }
    .createTitle{
           border: 0;
    background: #eeeeee;
    height: .8rem;
    width: 8.7rem;
    margin-top: .2rem;
    padding-left: .3rem;
    }
    .create-context{
            margin-top: .3rem;
    background: #eee;
    width: 8.4rem;
    height: 5rem;
    padding: 0.3rem;
    overflow-y: auto;
    }
    .create-time{
        margin-top: 1.7rem;
    }
    .showCreateTime{
            border: 1px solid #ccc;
    width: 3rem;
    height: .7rem;
    float: left;
        text-align: center;
    line-height: .7rem;
    }
    .btnTime{
        position: relative;
        display: block;
        width: 1rem;
        height: .75rem;
        margin-left: .1rem;
    }
    .css-gif-time{
        position:absolute;
        top:-.1rem;
        left:-.15rem;
        height:.8rem;
        width:1.2rem;
    }
    .createOk{
    margin-top: .5rem;
    width: 8rem;
    margin-left: 1rem;
    height: 1rem;
    border: 0;
    border-radius: 0.5rem;
    background: #418aff;
    color: #fff;
    }
    .mint-popup{
        width:100%;
    }
    .list-one{
            height: 1rem;
    border-bottom: 1px solid #b4b4b4;
    text-align: center;
    line-height: 1rem;
    font-size: .5rem;
    }
    .list-two{
            height: 1rem;
    border-bottom: 1px solid #b4b4b4;
    text-align: center;
    line-height: 1rem;
    font-size: .5rem;
    }
    .list-three{
            height: 1rem;
    border-bottom: 1px solid #b4b4b4;
    text-align: center;
    line-height: 1rem;
    font-size: .5rem;
    }
    .show-editor{
        background: #eee;
        border:0;
    }
    .isSend{
     position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0,0,0,0.3);
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
    border-radius: 0.5rem;
  }
  .p-font-1{
    padding: .3rem;
    text-align: center;
    font-size: .5rem;
        font-weight: bold;
  }
  .p-font-2{
    padding:.3rem;
    font-size: .2rem;
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
  .btn-icon{
    display: block;
    position:absolute;
    top:11rem;
    right:1.3rem;
    width:1.3rem;
    height:1.2rem;
    border-radius: 50%;
    text-align: center;
    background: #8b9bb4;
    overflow: hidden;
  }
  .css-gif{
    width:1.2rem;
    height:1.2rem;
    position:absolute;
    top:.05rem;
    left:.05rem;
  }
</style>
