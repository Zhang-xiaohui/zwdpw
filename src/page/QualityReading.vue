<template>
  <div class="library-list">
    <div id="composition-label">
      <mt-loadmore 
        topPullText="继续下拉刷新"
        topDropText="松手刷新"
        topLoadingText="loading......"
        bottomPullText="加载更多"
        bottomLoadingText="加载中。。。"
        bottomAllLoaded=allLoaded
        :top-method="loadTop" 
        :bottom-method="loadMore" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore"
      >
        <div class="composition-taglist">
          <div class="composition-tag" v-for="(item,i) in TabContainerDataL.data" key="i">
            <router-link
              :to="{ path: 'bookDetail',query:{id:item.id}}"
            >
              <div class="mint-cell-title">
                <label class="mint-checklist-label">
                  <span class="mint-checkbox-label">
                    <LibraryContainer :ContainerData="item" />
                  </span>
                </label>
              </div>
            </router-link>
          </div>
        </div>
      </mt-loadmore>  
    </div>
  </div>
</template>

<script>
  import LibraryContainer from "../components/LibraryContainer";
  export default {
    name: 'library-list',
    components: { LibraryContainer},
    mounted:function(){
         this.$store.state.backUrl = "";
         this.$store.state.titleName = "分类作文";
         this.$store.state.selectedTab = "library";
         this.$store.state.more = "search";
         this.$store.state.moreUrl = "bookCategory";
         window.scrollTo(0,0);
    },
    destroyed:function(){
      this.$store.state.more = null;
      
    },
    data () {
      return {
        "TabContainerDataL":{
          "data":[
            {
              "id":1223455,
              "imgUrl":"static/img/book.6072edc.jpg",
              "titleL":"名师教你读课文",
              "content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
              "price":"￥100",
              "yprice":"原价：￥150"
            },
            {
              "id":1223455,
              "imgUrl":"static/img/book.6072edc.jpg",
              "titleL":"名师教你读课文",
              "content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
              "price":"￥100",
              "yprice":"原价：￥150"
            },
            {
              "id":1223455,
              "imgUrl":"static/img/book.6072edc.jpg",
              "titleL":"名师教你读课文",
              "content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
              "price":"￥100",
              "yprice":"原价：￥150"
            },
            {
              "id":1223455,
              "imgUrl":"static/img/book.6072edc.jpg",
              "titleL":"名师教你读课文",
              "content":"  有时候我觉得自己像一只小小鸟想要飞却怎么样也飞不高也许有一天我栖上了枝头却成为猎人的目标我飞上了青天才发现自己从此无依无靠每次到了夜深人静的时候我是一只小小鸟我是一只小小鸟我总是睡不着我怀疑是不是只有我的明天没有变得更好未来会怎样究竟有谁会知道幸福是否只是一种传说我永远都找不到我是一只小小小小鸟想要飞呀飞却飞也飞不高我寻寻觅觅寻寻觅觅一个温暖的怀抱这样的要求算不算太高",
              "price":"￥100",
              "yprice":"原价：￥150"
            },
          ]
        }
      }
    },    
    methods:{
      toMore(title){
        this.$store.state.titleName = title;
        this.$store.state.backUrl = "/"
      },
      loadTop(){
        
      },
      allLoaded(){

      },
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.TabContainerDataL.data[this.TabContainerDataL.data.length - 1];
          for (let i = 1; i <= 3; i++) {
            this.TabContainerDataL.data.push(last);
          }
          this.loading = false;
        }, 2500);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.library-list{
  margin-top: 1.25rem;
  border-top: 8px solid #E2E2E2;
}
.library-list .mint-checkbox-core{
  visibility:hidden;
}
.library-list .LibraryContainer{
  height: 4rem;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.list-title{
  margin-bottom: 1vh;
  font-weight: 500;
  font-size: 3vh;
  border-left:7px solid #408AFF;
  height: 5vh;
  padding-left: 6px;
}
.composition-taglist{
    margin: 1em auto;
}
.composition-tag{
    margin: 1em 0;
    border-bottom: 0.2rem solid #e2e2e2;
}
</style>
<style>
  .library-list .mint-button-text{
    color:red;
  }
</style>
