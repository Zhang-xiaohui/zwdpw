<template>
    <div id='isWorkfalse'>
        <p class='isfalse-title'>课堂任务</p>
        <div class='isfalse-box'>
            <img src='../../static/img/tupian1.png'/>
            <p class='isfalse-font'>布置课堂任务，学生作答，评点作文</p>
            <p class='isfalse-font margintop'>快来体验吧！</p>
        </div>
        <button class='isfalse-button' @click="toCreateClassWork">+ 创建课堂任务</button>
    </div>
</template>
<script>

export default {
    name: 'is-workfalse',
    components: {},
    data () {
      return {
      }
    },	
    created:function(){
      this.$store.state.backUrl = null;
      this.$store.state.titleName = null;
      this.$store.state.showTopNav=false;
      this.$store.state.selectedTab = "schoolwork";
      window.scrollTo(0,0);
    },
    methods:{
        toCreateClassWork(){
            this.$router.push({path:'/createclasswork'})
        }
    }  
}
</script>
<style>
    #isWorkfalse{
        height:100%;
        background-color:#e3efff;
        overflow: hidden;
    }
    .isfalse-title{
        margin-top: 1rem;
        width: 100%;
        text-align: center;
        font-size: .5rem;
        color: #418bfd;
    }
    .isfalse-box{
        width: 8rem;
        height: 9rem;
        margin: 1rem;
        background: #fff;
        border-radius: 0.4rem;
        box-shadow: 0 7px 25px 4px #b4ceff;
    }
    .isfalse-box>img{
        width: 80%;
        margin: 10%;
    }
    .isfalse-font{
            text-align: center;
    color: #b4b4b4;
    font-size: .4rem;
    }
    .margintop{
        margin-top:.3rem;
    }
    .isfalse-button{
            border: 0;
    width: 80%;
    margin: 10%;
    height: 1.3rem;
    border-radius: 1rem;
    background: #428aff;
    color: #fff;
    }
</style>