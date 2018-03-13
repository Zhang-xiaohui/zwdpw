<template>
  <div id="demo" class="hello">
    <div>
      username:<input v-model="username" />
       <button @click="submit">提交测试</button>
       输入的是<p>{{username}}</p>
    </div>
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>

    <mt-button slot="left"  v-on:click="clk">
           点击修改值
     </mt-button>
     <mt-button slot="left"  @click="clk(5)">
           点击修改值的另一种简写
     </mt-button>
     <p v-once>一次指定{{uid}}</p>
     <p>可以修改{{uid}}</p>
     <div v-html="myhtml"></div>
     <div>
       <p v-if="testIf">真 为true或存在,吐槽一下，为什么if else非要紧挨着！！</p> 
        <p v-else>假</p>
       <p v-show="testIf">显示</p>
     </div>
     <ul>
      li:
      <li v-for="(myVo,i) in mylist">
        {{myVo.name}}--key为{{i}}
      </li>
     </ul>
     <a v-bind:href="myhref">{{myhref}}</a>
     <p v-bind:class="{'class_red':uid>=1003}">超过1003颜色变化</p>
     <p v-bind:class="testClassRed">超过1004颜色变化</p>
     <p v-bind:style="[testStyleRed,{fontSize: fontSize + 'px' }]">超过1004颜色变化</p>

  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return{
      uid:1000,
      mylist:[
        {
          name:"1535"
        },{
          name:"fffff"
        }
      ],
      myhref:"https:www.baidu.com",
      myhtml:"<div>myhtml::wdwdwdwdwwd</div>" ,
      testIf:"true",
      fontSize:12,
      message:"wwww",
      username:""

    }
  },//要在当前组件中，el指定的范围中
  computed:{
    //testClassRed和testStyleRed也可以放进data里,但不具有实时计算能力
    testClassRed: function () {
      return {
        'class_red': this.uid>=1004
      }
    },
    testStyleRed:function(){
      return{
        backgroundColor:this.uid>=1004?"red":""
      }    
    }
  },
  methods:{
    clk:function(a){
      console.log("a",a);//当a不存在时，会解释成event对象
      console.log(this);
      this.uid++;
      this.testIf=!this.testIf;
      if(this.myhref=="https:www.taobao.com"){
        this.myhref="https:www.baidu.com";
      }else{
        this.myhref="https:www.taobao.com";
      }
    },
    submit:function(){
      console.log(this.username)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#demo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.class_red{
  background-color:red
}
.tabbar_icon{
  font-size: 3rem;
}

.tabbar_font{
  font-size: medium;
  margin: 5px;
}
.router-css{
  text-decoration:none;
  color: tomato;
}
</style>
