<template>
  <div class="library">
    <mt-loadmore :top-method="reloadData" ref="loadmore" topLoadingText="拼命加载中...">
      <div id="composition-label">
        <div class="composition-taglist">
          <div>
            <span class="list-title">编辑推荐</span>
          </div>
          <div class="composition-tag" v-for="(item,i) in this.$store.state.managerRecommended" key="i">
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
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import LibraryContainer from "../components/LibraryContainer";
  import { Indicator ,Loadmore} from 'mint-ui';

  export default {
    name: 'library',
    components: { LibraryContainer},
    created:function(){
      this.$store.state.showTopNav=true;
         this.$store.state.backUrl = "aaa";
//       this.$store.state.titleName = "图书馆";
         this.$store.state.selectedTab = "qualityReading";
         this.$store.state.moreTitle = "分类";
         this.$store.state.more = null;
         this.$store.state.moreUrl = "bookCategory";
//       this.$store.state.titleName = this.compositionTab.title;
        // window.scrollTo(0,0);
    },
    mounted:function(){
      this.$store.state.backUrl = "aaa";
         this.$store.state.titleName = "图书馆";
         this.$store.state.selectedTab = "qualityReading";
         this.$store.state.moreTitle = "分类";
         this.$store.state.more = null;
         this.$store.state.moreUrl = "bookCategory";
    },
    beforeMount:function(){
      if(this.$store.state.managerRecommended.length==0){
        this.setData();
      }
    },
    destroyed:function(){
      this.$store.state.moreTitle = null;
    },
    data () {
      return {
        "TabContainerDataL":{
          "dto": {
              "list": [
                 
              ]
          }
        }
      }
    },    
    methods:{
      //加载书籍
      loadData(){
        var vm = this;
        let url=this.$store.state.url
        return new Promise(function(resolve, reject) {
          vm.$http.get(url+'resEdit/list',{
          	params:{
            " pageSize ": "10",
            " indexPage ": "1",
           }
          }).then(function(data){
            console.log(data);
          	
            resolve(data.body);
          },(response) =>{
            console.log("error");
            reject(response);
          }); 
        });
      },
      reloadData(){
        var self = this;
        Promise.all([self.setData()]).then(function (result) {
          self.$refs["loadmore"].onTopLoaded();
        });
      },
      //渲染数据
      setData(){
        var self = this;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.loadData().then(function (data) {
            self.$store.commit('setManagerRecommended',data.dto.list);
            Indicator.close();
        }, function (error) {
            Indicator.close();
        });
      },
      toMore(title){
        this.$store.state.titleName = title;
        this.$store.state.backUrl = "/"
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.library{
  margin-top: 1.2rem;
  margin-bottom: 4em;
  border-top: 5px solid #E2E2E2;
}
.library .mint-checkbox-core{
  visibility:hidden;
}
.library .LibraryContainer{
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
  color: #000;
}
.list-title{
  margin-bottom: 1vh;
  font-weight: 500;
  font-size: 2.5vh;
  border-left:3px solid #408AFF;
  height: 5vh;
  padding-left: 6px;
}
.composition-taglist{
    margin: 1em auto;
}
.composition-tag{
  margin: 1em 10px;
  box-shadow: 0px 0px 20px 0px #d9d9d9;
}
</style>
<style>
  .library .mint-button-text{
    color:red;
  }
</style>
