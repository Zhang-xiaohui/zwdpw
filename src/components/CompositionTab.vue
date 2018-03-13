<template>
  <div class="compositionTab">
    <div class="nav" style="margin-top: 1.2rem">
    	 <div class="page-tab-title">
    	 	<mt-navbar v-model="active">
      <mt-tab-item @click.native.prevent="tabcontainer1" style="border-right: 1px solid #a0a0a0;" value="tab-container1" id="tab-container1">{{tabO}}</mt-tab-item>
      <mt-tab-item @click.native.prevent="tabcontainer2" value="tabcontainer2" id="tab-container2">{{tabT}}</mt-tab-item>
      </mt-navbar>
      </div>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active" :swipeable='true'>
        <mt-tab-container-item id="tab-container1">
            	<mt-cell>
            	  <!--<div>
            	  	    <label class="mint-checklist-label">
						<span class="mint-checkbox">
							<input type="checkbox" class="mint-checkbox-input in" name="text" /> 
								<span class="mint-checkbox-core" style="display: none;">
								</span>
						</span> 
					</label>
					</div>-->
              <TabContainer :TabContainerData="TabContainerData" />
              
              
          	</mt-cell>
          	<div class="buy-bottom">
			    <BottomChecked v-on:tabcontainer1="tabcontainer1"/>
			</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2" style="margin-top:1.5rem;margin-bottom: 2.1rem;">
          <!--<mt-cell>-->
           <div>
           	       
					</div>
          	<div class="composition-tag" v-for="(item,i) in TabContainerDataL.data" key="i" style="margin-left: .3rem;margin-right: .3rem;">
          		
          		<div>
          		<label class="mint-checklist-label" style="float: left;
    height: 2rem;
    width: 0.3rem;
    position: relative;
    top: 1.8rem;left: -.38rem;">
						<span class="mint-checkbox">
							<input type="checkbox" class="mint-checkbox-input" ref="check" name="text" :id="item.id" :tableName="item.tableName" /> 
								<span class="mint-checkbox-core" style="display: none;">
								</span>
						</span> 
					</label>
					</div>
				<router-link
              :to="{ path: 'bookDetail',query:{id:item.id,type:3}}"
            >
          	   <LibraryContainer :ContainerData="item" />
          	   </router-link>	
          	</div>
	         
          <!--</mt-cell>-->
          <div class="buy-bottom">
			    <BottomCheckedBook v-on:tabcontainer2="tabcontainer2"/>
			</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import TabContainer from '../components/TabContainer';
import LibraryContainer from '../components/LibraryContainer';
import BottomChecked from '../components/BottomChecked';
import BottomCheckedBook from '../components/BottomCheckedBook';
var imgUrl = require('../assets/book.jpg')
export default {
  name: 'CompositionTab',
  components: { TabContainer,LibraryContainer,BottomChecked,BottomCheckedBook },
  data() {
    return {
    	
    	TabContainerData:{
    		"data":[]
    	},
//  	"TabContainerData":{
//					"data":[
//					    {
//					    	"msgname":"美丽的心",
//					    	"bname":"李大嘴",
//					    	"Class":"一年级",
//					    	"body":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"author":"小鸟 飞 怀抱"
//					    },
//					    {
//					    	"msgname":"美丽的心",
//					    	"bname":"李大嘴",
//					    	"Class":"一年级",
//					    	"body":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"author":"小鸟 飞 怀抱"
//					    },
//					    {
//					    	"msgname":"美丽的心",
//					    	"bname":"李大嘴",
//					    	"Class":"一年级",
//					    	"body":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"author":"小鸟 飞 怀抱"
//					    },
//					    {
//					    	"msgname":"美丽的心",
//					    	"bname":"李大嘴",
//					    	"Class":"一年级",
//					    	"body":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"author":"小鸟 飞 怀抱"
//					    },
//					]
//				},
	   	TabContainerDataL:{
	   		data:[]
	   	},
//					"data":[
//					{
//					   "id":1,
//					   "imgUrl":"/static/img/book.6072edc.jpg",
//					    	"titleL":"名师教你读课文",
//					    	"content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"price":"￥100",
//					    	"yprice":"原价：￥150"
//					   },
//					   {
//					   	"id":2,
//					   "imgUrl":"/static/img/book.6072edc.jpg",
//					    	"titleL":"名师教你读课文",
//					    	"content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"price":"￥100",
//					    	"yprice":"原价：￥150"
//					   },
//					   {
//					   	"id":3,
//					   "imgUrl":"/static/img/book.6072edc.jpg",
//					    	"titleL":"名师教你读课文",
//					    	"content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"price":"￥100",
//					    	"yprice":"原价：￥150"
//					   },
//					   {
//					   	"id":4,
//					   "imgUrl":"/static/img/book.6072edc.jpg",
//					    	"titleL":"名师教你读课文",
//					    	"content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
//					    	"price":"￥100",
//					    	"yprice":"原价：￥150"
//					   },
//					]
//					},
      active: 'tab-container1',
      tabO: '作文',
      tabT: '图书',
      currentValue: this.value,
    };
 },
	  beforeMount:function(){
//	  	debugger;
                
	  			this.tabcontainer1();
	  },
	  methods:{
	  	tabcontainer1:function(){
	  		this.$store.state.moreTitle = "编辑";
	  		$(":checkbox").attr("checked",false)
	  		var that=this
	  		$(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display","none");
    	    	    $(".buy-bottom").css("display","none")
    	    	    $(".buy").css("margin-bottom","5em")
    	    	    $(".composition-name").css("margin-left","0em")
	  		$(".mint-tab-container-item:first").css("display","block");
	  		var checklist = document.getElementsByName("text");
	  		
	  		for(var i = 0;i<checklist.length;i++){
	  			checklist[i].checked = false
	  		}
	  		$("#checkAll").checked = false;
	  			let url=this.$store.state.url;	
	  	return new Promise(function(resolve, reject) {
	  	that.$http.get(url+'collectionList/composionList',{
	  		params:{
//	  			userId: "336",
				pageSize: "10",
				pageIndex: "1"
	  		}
	  	}).then(function(data){
//	  		debugger;
                console.log(data)
                if(data.body.dto){
          		var list = data.body.dto.list;
				var data=[]
				for(let i=0;i<list.length;i++){
					data.push({
						'id':list[i].id,
						'tableName':list[i].tableName,
						'msgname':list[i].name,
		          		'body':list[i].content,
		          		'author':list[i].key_word,
		          		'bname':list[i].author,
		          		'Class':list[i].age_detail,
		          		'imgUrl':list[i].coverPic
					})
				}
				
          		this.TabContainerData.data=data;
          		console.log(data)
          		}else{
          			this.TabContainerData.data=[]
          		}
//        		this.TabContainerData = TabContainerData;
          		
          },(response) =>{
            console.log("error");
          });
        }),
        	that.$http.get(url+'collectionList/libraryList',{
	  		params:{
//				"userId": "336",
				"pageSize": "10",
				"pageIndex": "1"

	  		}
	  	}).then(function(data){
                console.log(data)
                if(data.body.dto){
          		var list = data.body.dto.list;
          		for(let i=0;i<list.length;i++){
//        		debugger;
				console.log("pirce:" + list[i].price);
				console.log("comPrice:" + list[i].comPrice);
				if(list[i].price == null && list[i].comPrice == null ){
          			list[i].price = 0;
          			list[i].comPrice = 0;
          		}else if(list[i].price == null){
          			list[i].price = list[i].comPrice;
          		}else if(list[i].comPrice == null ){
          			list[i].comPrice = list[i].price;
          		}
          	}
          	
				var data=[]
//				for(let i=0;i<list.length;i++){
//					data.push({
//						'msgname':list[i].name,
//		          		'body':list[i].content,
//		          		'author':list[i].key_word,
//		          		'bname':list[i].author,
//		          		'Class':list[i].age_detail
//					})
//				}
//        		this.TabContainerData.data=data
//        		console.log(data)
				this.TabContainerDataL.data=list
//        		this.TabContainerData = TabContainerData;
          	}else{
          		this.TabContainerDataL.data=[]
          	}
          },(response) =>{
            console.log("error");
          }); 
	  	},
		 tabcontainer2:function(){
	 	 	this.$store.state.moreTitle = "编辑";
	 	 	var that=this
    	    	    $(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display","none");
    	    	    $(".buy-bottom").css("display","none")
    	    	    $(".buy").css("margin-bottom","5em")
    	    	    $(".composition-name").css("margin-left","0em")
    	    	    var checklist = document.getElementsByName("text");
	  		for(var i = 0;i<checklist.length;i++){
	  			checklist[i].checked = false
	  		}
	  		$("#checkAll").checked = false;
	  		
	  		let url=this.$store.state.url;	 
	  	that.$http.get(url+'collectionList/libraryList',{
	  		params:{
//				"userId": "336",
				"pageSize": "10",
				"pageIndex": "1"

	  		}
	  	}).then(function(data){
                console.log(data)
                if(data.body.dto){
          		var list = data.body.dto.list;
          		for(let i=0;i<list.length;i++){
//        		debugger;
				console.log("pirce:" + list[i].price);
				console.log("comPrice:" + list[i].comPrice);
				if(list[i].price == null && list[i].comPrice == null ){
          			list[i].price = 0;
          			list[i].comPrice = 0;
          		}else if(list[i].price == null){
          			list[i].price = list[i].comPrice;
          		}else if(list[i].comPrice == null ){
          			list[i].comPrice = list[i].price;
          		}
          	}
          	
				var data=[]
//				for(let i=0;i<list.length;i++){
//					data.push({
//						'msgname':list[i].name,
//		          		'body':list[i].content,
//		          		'author':list[i].key_word,
//		          		'bname':list[i].author,
//		          		'Class':list[i].age_detail
//					})
//				}
//        		this.TabContainerData.data=data
//        		console.log(data)
				this.TabContainerDataL.data=list
//        		this.TabContainerData = TabContainerData;
          	}else{
          		this.TabContainerDataL.data=[]
          	}
          },(response) =>{
            console.log("error");
          }); 
		 },
		
	 },
	 watch: {

			currentValue(val) {
				if(this.limit) val.pop();
				this.$emit('input', val);
			}
		},
};
</script>

<style lang="css" scoped>
  .mint-tab-item{
  	border-bottom: 1px solid #A0A0A0;
  }
  .mint-navbar .mint-tab-item.is-selected{
  	margin-bottom: 0px;
  }
  .class-a{
  	color: #F00000;
  }
  .class-b{
  	color: #ff0;
  }
  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
  .page-tab-title{
  	position: fixed;
    z-index: 100;
    width: 100vw;
    background: #FFFFFF;
  }
  .is-selected{
  	float: left;
    width: 49.8%;
    text-align: center;
    border-bottom: 1px solid #a0a0a0;
  }
  .nav{
  	padding: 0px;
  }
  .page-tab-container{
  	clear: both;
  }
  .mint-tab-item{
  	padding: 17px 0px;
  }
  .composition-tag{
		padding-bottom: 1em;
		padding-top: 1em;
        border-bottom: .2em solid #e2e2e2;
        height: 4rem
	}
  
  .mint-checklist-label{
  	padding: 0px;
  }
</style>
