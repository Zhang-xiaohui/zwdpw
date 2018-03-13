<template>
	<div class="tab">

		<!--<CompositionLabel 
        :compositionData="compositionData" 
      />-->

		<CompositionTabreading/>
		<div class="bj">
			<h3>编辑推荐</h3>
		</div>
		<div style="position: absolute;top: 4.6rem;margin-bottom: 1.5rem;">
			<div class="composition-tag" v-for="(item,i) in ContainerData.data" :key="item.id">
				<router-link
              :to="{ path: 'bookDetail',query:{id:item.id,type:1}}"
            >
				  <LibraryContainer :ContainerData="item" />
               </router-link>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.composition-tag {
		padding-bottom: 1em;
		padding-top: 1em;
		border-bottom: .2em solid #e2e2e2;
		float: left;
		margin-left: 10px;
		margin-right: 10px;
	}
	
	.bj {
		position: relative;
		top: 2.5rem;
		height: .4rem;
		padding-left: .2rem;
		border-left: 6px solid #418aff;
	}
	
	.composition-tag {
		padding-bottom: 1em;
		padding-top: 1em;
		/* border-bottom: .2em solid #e2e2e2; */
		border: 1px solid #e2e2e2;
		border-radius: 4px;
		float: left;
		margin-left: 15px;
		margin-right: 15px;
		padding-left: 5px;
		padding-right: 5px;
		margin-bottom: .4rem;
		box-shadow: 3px 3px 0px 0px #e2e2e2;
		width: 90vw;
	}
</style>
<script>
	import CompositionTabreading from "../components/CompositionTabreading";
	import LibraryContainer from "../components/LibraryContainer";
	var imgUrl = require('../assets/book.jpg')
	export default {
		name: 'tab',
		components: {
			LibraryContainer,
			CompositionTabreading
		},
		data() {
			return {

				"compositionTab": {
					title: '精品阅读',
					//			    	  	data:[],
				},
				"ContainerData": {
					data: []
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
				//				},

			}
		},
		created: function() {
			this.$store.state.titleName = this.compositionTab.title;
			this.$store.state.backUrl = null;
			this.$store.state.showTopNav = true;
			this.$store.state.showBottomNav = true;
			this.$store.state.selectedTab = "qualityReading";
			this.$store.state.more = null;
			this.$store.state.selectLib="01"
		},
		mounted: function() {
			this.$store.state.titleName = this.compositionTab.title;
			this.$store.state.backUrl = null;
			this.$store.state.showTopNav = true
			this.$store.state.selectedTab = "qualityReading";
			this.$store.state.more = null;
			this.$store.state.selectLib="01"
			console.log(this.$route.fullPath)
			this.$store.state.selectPath=this.$route.fullPath
			let url = this.$store.state.url;
			var vm = this;
			vm.$http.get(url + 'boutiqueRead/docList', {
				params: {}
			}).then(function(data) {
				console.log(data)
				if(data.body.dto) {
					var dataArray = []
					$(data.body.dto.list).each(function(index, datas) {
						var record = {
							'id': datas.id,
							'name': datas.name,
							'summary': datas.summary,
							'coverPic': datas.coverPic,
							'comPrice':datas.comPrice,
							'price':datas.price
						};
						dataArray.push(record);
					});
					console.log(dataArray)
					this.ContainerData.data = dataArray;
				} else {
					this.ContainerData.data = []
				}
			}, (response) => {
				console.log("error");
			});
		},
		methods: {
			loadTop() {

			},
			allLoaded() {

			},
			//    loadMore() {
			//      this.loading = true;
			//      setTimeout(() => {
			//        let last = this.compositionTab.data[this.compositionTab.data.length - 1];
			//        for (let i = 1; i <= 3; i++) {
			//          this.compositionTab.data.push(last);
			//        }
			//        this.loading = false;
			//      }, 2500);
			//    }
		}
	}
</script>