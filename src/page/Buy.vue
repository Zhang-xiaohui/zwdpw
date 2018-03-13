<template>
	<div class="buy">
		<div class="page-checklist">
			<div class="bor-buy">
				<h3 class="buy-h">{{buy}}</h3>
			</div>
			<div>
				<div class="composition-tag" v-for="(item,i) in TabContainerDataL.data" key="i">
					<div class="mint-cell-title mint-cell-in">	
					<div>
						<label class="mint-checklist-label">
						<span class="mint-checkbox">
							<input type="checkbox" class="mint-checkbox-input" name="text" :value="item.id" /> 
								<span class="mint-checkbox-core">
								</span>
						</span> 
						</label>
					</div>
						<span class="mint-checkbox-label">
							<router-link :to="{ path: 'bookDetail',query:{id:item.id}}">
								<LibraryContainer :ContainerData="item" />
							</router-link>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="buy-bottom">
			<BottomCheck />
		</div>
	</div>
</template>

<script>
	import LibraryContainer from "../components/LibraryContainer"
	import BottomCheck from "../components/BottomCheck"

	export default {
		name: 'buy',
		components: {
			LibraryContainer,
			BottomCheck
		},
		data() {
			return {
				value1: [],

				TabContainerDataL: {
					//						
					//					{
					checked: "true",
					"data": [],
					//					"data":[
					//					{
					//                     "id":1,
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
					//					   	"id":'4',
					//					   "imgUrl":"/static/img/book.6072edc.jpg",
					//					    	"titleL":"名师教你读课文",
					//					    	"content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
					//					    	"price":"￥100",
					//					    	"yprice":"原价：￥150"
					//					   },
					//					],
					checkboxModel: ['1', '3', '4'],
					checked: ""
				},
				//				currentValue: this.value,
				buy: "图书",
				"compositionTab": {
					title: '我的购买',
					data: []
				},

			}
		},

		methods: {
			load: function() {
				var vm = this;
				let url = this.$store.state.url;
				vm.$http.get(url + 'my/buy', {
					params: {
						"pageSize": "10",
						"pageIndex": "1"

					}
				}).then(function(data) {
					//	  		debugger;
//					console.log(data)
					if(data.body.dto){
						var list = data.body.dto.list;

					//        		$.each(list, function(index,d){
					//	          		d.msgname = d.name;
					//	          		d.body = d.content;
					//	          		d.author = d.key_word;
					//	          		d.bname = d.author;
					//	          		d.Class = d.age_detail;
					//	          		d.data = d.data;
					//	           	})
					//				var data=[]
					//				for(let i=0;i<list.length;i++){
					//					data.push({
					//						'msgname':list[i].name,
					//		          		'body':list[i].content,
					//		          		'author':list[i].key_word,
					//		          		'bname':list[i].author,
					//		          		'Class':list[i].age_detail
					//					})
					//				}
					//              data = list;
					this.TabContainerDataL.data = list
						//      		    debugger;
					console.log(data)
						//        		this.TabContainerDataL = TabContainerDataL;
					}
					

				}, (response) => {
					console.log("error");
				});
			},
//			deleteBooks: function() {
//				var idArr = [];
//				$('input[name="text"]:checked').each(function() {
//					idArr.push($(this).attr("value"));
//				});
//				var vm = this;
//				let url = this.$store.state.url;
//				vm.$http.get(url + 'my/delete', {
//					params: {
//						"bookIds": idArr.toString()
//					}
//				}).then(function(data) {
//					debugger;
//
//					//				console.log(idArr);
//					//	  		  
//				}, (response) => {
//					console.log("error");
//				});
//
//			}
		},

		created: function() {
			this.load();
			console.log("created")

			this.$store.state.titleName = this.compositionTab.title;
			this.$store.state.backUrl = "/me";
			this.$store.state.selectedTab = "me";
			this.$store.state.more = null;
			this.$store.state.showBottomNav=false,
			this.$store.state.moreUrl = null;
			this.$store.state.moreTitle = "编辑";
			var self = this;
			this.$store.state.moreFtn = function() {
				self.$store.state.moreTitle = "取消";
				if($(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display") == "inline-block") {
					$(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display", "none");
					$(".buy-bottom").css("display", "none")
					$(".buy").css("margin-bottom", "5em")
					$(".LibraryContainer").css("top", "-.3rem")
					// $(".mint-checklist-label").css("padding-left","10px");
					$(".LibraryContainer").css({
						"width": "100%",
					    "float": "right"
					})
					self.$store.state.moreTitle = "编辑";
				} else {
					$(".mint-checkbox-core:not('.mint-checkbox-core:last')").css("display", "inline-block");
					$(".buy").css("margin-bottom", "10em")

					$(".buy-bottom").css("display", "block")
  					//$(".mint-checklist-label").css("left",".6rem");
					$(".LibraryContainer").css({
						"width": "92%",
					    "float": "right"
					})
                    $(".LibraryContainer").css("top", "-.4rem")
					self.$store.state.moreTitle = "取消";
				};

			}

		},

		destroyed: function() {
			this.$store.state.moreTitle = null
		},
		watch: {

			currentValue(val) {
				if(this.limit) val.pop();
				this.$emit('input', val);
			}
		},
	}
</script>
<style scoped>
	.buy {
		position: relative;
		top: 1.5rem;
		padding-left: 1em;
		padding-right: 1em;
		margin-bottom: 5em;
	}
	
	.mint-checkbox-core {
		display: none;
		left: -.1rem;
	}
	
	/*.mint-checklist-label {
		height: 4rem;
		position: relative;
	}*/
	.mint-cell-in{
		height: 4.2rem;
	}
	
	.buy-h {
		font-size: 1.5em;
		margin-top: .5em;
		margin-bottom: .5em;
	}
	
	.bor-buy {
		border-bottom: 1px solid #CCCCCC;
	}
	
	.LibraryContainer {
		width: 100%;
		/* float: right; */
		position: relative;
		top: -1em;
		height: 4rem;
	}
	
	.mint-checkbox {
		position: relative;
		top: 2rem;
		float: left;
		left: -.3em;
	}
	
	.#top-navigation {
		height: 5em;
	}
	
	.mint-checkbox-input {
		display: none;
	}
	
	.composition-tag {
		padding: 0.2rem 0rem;
		border-bottom: .2em solid #e2e2e2;
	}
	
	.buy-bottom {
		position: fixed;
		z-index: 100;
		background: #FFFFFF;
		bottom: 0rem;
		width: 100%;
		margin-left: -12px;
		height: 5em;
		display: none;
	}
</style>