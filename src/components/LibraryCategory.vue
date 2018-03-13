<template>
	<div class="libraryCategory">
		<mt-navbar v-model="selectedOne" class="category-one">
			<span
				v-for="(item,i) in categoryOne"
				class="selected-list" @click="clickCategoryOne(item.parentCode)"
			>
				<mt-tab-item class="category-item"
				  	:id="item.id"
				  	key="i"
			  	>
			  		{{item.value}}
				</mt-tab-item>
			</span>
		</mt-navbar>
		<mt-navbar v-model="selectedTwo" class="category-two" >
			<span class="selected-list" 
				v-for="(item,i) in categoryTwo"
			>
			  	<mt-tab-item 
				  	:id="item.id"
				  	key="i"
			  	>
				  	<span style="line-height: 1rem;">{{item.value}}</span>
			  		<span class="mint-button-icon icon-rotate" @click="clickCategoryTwo(i,item.id)">
			  			<i class="mintui mintui-back"></i>
			  		</span>
				</mt-tab-item>
				
			</span>
			
		</mt-navbar>
		<div id="icon-rotate-down" class="icon-rotate-down">
		  			<span v-for="it in categoryTwoChildren" @click="clickCategoryTwoChildren(it.value,it.id)">
		  				{{it.value}}
		  			</span>
		  	</div>
			

		<div class="category-three">
			<div 
				class="category-three-list" 
				v-if="!!categoryThree" 
				v-for="(items, i) in categoryThree"
			>
				<h3 class="category-three-type">{{items.name}}</h3>
				<div class="list-box">
				
					<router-link 
						v-for="(it,i) in items.data" 
						class="router-css" 
						
						:to="{ path: 'libraryList', query: { code:it.id,scale:scale,ageDetail:ageDetail }}"
						>
						<span class="list-url" @click="toLibraryOne(it.name)" >{{it.name}}</span>
					</router-link>
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
	export default{
		name:'libraryCategory',
		data(){
			return{
				scale:'10',
				ageDetail:'',
				selectedOne:"1",
				selectedTwo:"1",
				categoryOne:[
					{"parentCode":"01","value":"图书","id":"1"},
					{"parentCode":"02","value":"视频","id":"2"},
					{"parentCode":"03","value":"音频","id":"3"}
				],
				categoryTwo:[
					{
						"id":"10",
						"value":"小学",
						"children":[
							{
								"id":"11",
								"value":"一年级"
							},
							{
								"id":"12",
								"value":"二年级"
							},
							{
								"id":"13",
								"value":"三年级"
							},
							{
								"id":"14",
								"value":"四年级"
							},
							{
								"id":"15",
								"value":"五年级"
							},
							{
								"id":"16",
								"value":"六年级"
							}
						]
					},
					{
						"id":"20",
						"value":"初中",
						"children":[
							{
								"id":"21",
								"value":"七年级"
							},
							{
								"id":"22",
								"value":"八年级"
							},
							{
								"id":"23",
								"value":"九年级"
							}
						]
					},
					{
						"id":"30",
						"value":"高中",
						"children":[
							{
								"id":"31",
								"value":"高一"
							},
							{
								"id":"32",
								"value":"高二"
							},
							{
								"id":"33",
								"value":"高三"
							}
						]
					}
				],
				categoryTwoChildren:[],
				selectTag:null,
				categoryThree:[],
			}
		},
		created(){
			console.log("created1111");
		},
		beforeMount(){
			let a='01'
			this.clickCategoryOne(a);
		},

		methods:{
			toLibraryOne:function(name){
				this.$store.state.ArticleType=name;
				console.log(name);
			},
			clickCategoryTwo:function(i,id){
				this.scale=id
				console.log(id)
				//控制二级子菜单
				if($(".category-two .mint-tab-item.is-selected .icon-rotate").hasClass("icon-rotate-open")){
					$("#icon-rotate-down").animate({"min-height":"0"});
					setTimeout('$("#icon-rotate-down").css("display","none");',350)

				}else{
					$("#icon-rotate-down").css("display","block");
					$("#icon-rotate-down").animate({"min-height":"30px"});
				}

				//除去其他二级tab的class
				$(".category-two .mint-tab-item").not(".is-selected").children(".mint-tab-item-label").children(".icon-rotate").removeClass("icon-rotate-open");
				//切换本二级tab的
				if($(".category-two .mint-tab-item.is-selected .icon-rotate").hasClass("icon-rotate-open")){
					$(".category-two .mint-tab-item.is-selected .icon-rotate").removeClass("icon-rotate-open");
				}else{
					this.categoryTwoChildren = this.categoryTwo[i].children;
					$(".category-two .mint-tab-item.is-selected .icon-rotate").addClass("icon-rotate-open");
				}
			},
			clickCategoryTwoChildren:function(value,id){
				console.log(id)
				this.ageDetail=id
				if(this.selectTag){
					$(".select-tag").html(this.selectTag);
					$(".select-tag").removeClass("select-tag");
				}
				this.selectTag = $(".category-two .mint-tab-item.is-selected .mint-tab-item-label span:first").html();
				$(".category-two .mint-tab-item.is-selected .mint-tab-item-label span:first").html(value);
				$(".category-two .mint-tab-item.is-selected .mint-tab-item-label span:first").addClass("select-tag");
				//隐藏下拉框
				$("#icon-rotate-down").animate({"min-height":"0"});
				setTimeout('$("#icon-rotate-down").css("display","none");',350)


			},
			clickCategoryOne:function(obj){
				console.log(obj)
				this.$store.state.selectLib=obj
				let url=this.$store.state.url
				var vm = this;
				
        	   vm.$http.get(url+'library/getChildMenu',{
          	params:{
             parentCode: obj
             
           }
          }).then(function(data){
//        	console.log(vm.categoryThree);
          	console.log( data);
			var data = data.body.dto;
          	var categoryThree = [];
			  if(data[0].childMenus.length==0){
				  categoryThree = []
				  for(let i=0;i<data.length;i++){
					  categoryThree.push({
						  data:[{
							  id:data[i].code,
							  name:data[i].name
						  }]
					  })
				  }
				  this.categoryThree=categoryThree
				  console.log(categoryThree)
			  }else{
				$.each(data, function(index,d){
          		var code = d.name;
          		var id = d.code;
          		d.data = d.childMenus;
          		delete d['childMenus'];
          		$.each(d.data, function(index, childMenu){
          		var	childName = childMenu.name;
          		childMenu.id = childMenu.code;
          		delete childMenu['code']
//        		console.log(childMenu);
          		})
          		
          		categoryThree.push(d);
          	})
          	console.log(categoryThree);
          	this.categoryThree=categoryThree
			  }

          },(response) =>{
            console.log("error");

          });
		},
		
			
		}
	}
</script>
<style scoped>
	.libraryCategory{
		background: #FFFFFF;
		padding-top: 2.5rem;
	} 
	.selected-list{
		width: 33.3%; 
		height:auto;
	}

	.category-one{
		z-index: 100;
		background-color: #FFDC9C;
	    border-top: 5px solid #E2E2E2;
	    position: fixed;
	    top: 1rem;
	    width: 100%;
	    height: 1.3rem;
		color:#494949;
	}
	.category-two{
		padding-top: 10px;
		padding-bottom: 10px;
		z-index: 100;
		position: fixed;
	    top: 2.6rem;
	    width: 100%;
	}
	.icon-rotate-down{
		    top: 4rem;
    position: fixed;
    background: white;
    z-index: 100;
		display: none;
		box-shadow: 0px 0px 20px 0px #d9d9d9;
		margin: 0.2rem 0.5rem;
		border-radius: .2rem;

	}
	.icon-rotate-down span{
		margin: 0.2rem;
	    width: 26vw;
	    font-size: 0.4rem;
	    display: inline-block;
		text-align: center;
		
	}
	.icon-rotate-open{
		transform:rotate(90deg) !important;
		-ms-transform:rotate(90deg) !important; /* Internet Explorer */
		-moz-transform:rotate(90deg) !important; /* Firefox */
		-webkit-transform:rotate(90deg) !important; /* Safari 和 Chrome */
		-o-transform:rotate(90deg) !important; /* Opera */
	}
	.icon-rotate{
		color:#969696;
		transform:rotate(-90deg);
		-ms-transform:rotate(-90deg); /* Internet Explorer */
		-moz-transform:rotate(-90deg); /* Firefox */
		-webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
		-o-transform:rotate(-90deg); /* Opera */
	}
	.category-three-type{
		font-size: 0.5rem
	}
	.category-item{ 
    	position: relative;
	} 
	.category-item:after{ 
	    position: absolute;
	    top: 0.2rem;
	    height: calc(100% - 1.2em);
	    left: 0;
	    content: '';
	    border-left: solid #fff 1px;
	    margin-left: -1px;
	}
	.router-css{
		text-decoration:none;
		color: #9d9d9d;
		font-size: 0.4rem;
	}  	
	.category-three{
		margin: 0.5rem;
	}
	.list-box{
		margin-left: 0.5rem;
	}
	.list-url{
		display: inline-block;
    	width: 33%;
    	line-height:1rem;
	}
</style>
<style>
	.libraryCategory .category-one .mint-tab-item {
		font-size: 18px;
	}
	.libraryCategory .category-one .mint-tab-item.is-selected {
	    border-bottom: 0px;
	    color: #ff5a00;
	    margin-bottom: 0;
	}

	.libraryCategory .category-two .mint-tab-item {
		border: 2px solid white;
		border-radius: 9px;
		font-size: 18px;
		padding: 0;
		margin:0 8px;
	}
	.libraryCategory .category-two .mint-tab-item.is-selected {
		border: 2px solid #26a2ff;
		margin-bottom: -2px;
	}
</style>