<template>
  <div class="home-swipe">
    <mt-swipe :auto="4000" class="home-swipe"  >
    	<mt-swipe-item v-for="(item,i) in swipeData" :key="item.id">
    		<router-link :to="{ path:'activeDetail' , query:{id:item.id}}">
      		<img class="slide-img" v-bind:src="item.pictureUrl" alt="111111"/>
        </router-link>
    	</mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  import { Toast ,Indicator} from 'mint-ui';
  export default {
    name: 'home-swipe',
     data () {      
      return {
        "swipeData":[],
      }
    },  
    beforeMount(){
      if(this.swipeData.length==0){
        this.loadData();
        // Indicator.close();
      }
    },
    methods: {
      loadData(){
        var vm = this;
        let url=this.$store.state.url

        vm.$http.get(url+'activity/listActivity').then(response => { 
					// 处理第一次返回的 response 
						console.log(response.body.dto)
            vm.swipeData=response.body.dto
					})
          // $.ajax({
          //   type : "GET",
          //   url : url+'activity/listActivity',
          //   dataType : "json",
          //   success : function (data) {
          //     console.log(data)
          //   }
          // }); 
        // return new Promise(function(resolve, reject) {
        //   //接口
        //   $.ajax({
        //     type : "GET",
        //     url : url+'activity/listActivity',
        //     dataType : "json",
        //     success : function (data) {
        //       resolve(data);
        //     },
        //     error : function (e) {
        //       reject(e);
        //     }
        //   }); 
        // });

      },
    //   setData(){
    //     var self = this;
    //     Indicator.open({
    //       text: '加载中...',
    //       spinnerType: 'fading-circle'
    //     });
    //     this.loadData().then(function (data) {
    //       console.log(data)
    //       var urlList = [
    //         {"pictureUrl":"http://img2.imgtn.bdimg.com/it/u=16411067,2870135103&fm=26&gp=0.jpg"},
    //         {"pictureUrl":"http://img2.imgtn.bdimg.com/it/u=16411067,2870135103&fm=26&gp=0.jpg"}
    //       ]
    //       self.$store.commit('setSwipeData',urlList);


    //       if(data.code==1){
    //         //self.urlList=data.dto;
    //       }else{
    //         Toast({
    //           message: data.message||"请求异常",
    //           position: 'bottom',
    //           duration: 5000
    //         });
    //       }
    //       Indicator.close();
    //     }, function (error) {
    //         console.log(error);
    //         Toast({
    //           message: "请求异常",
    //           position: 'bottom',
    //           duration: 5000
    //         });
    //         Indicator.close();
    //     });
    //   }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home-swipe{
    height: 22vh;
  }
  .slide-img{
    width: 100vw;
    height:100%;
  }
</style>
<style>
  .mint-swipe-indicators{
    border-radius: 15px;
    border-width: 1px;
    background-color: rgba(0,0,0,.5);
  }
  .mint-swipe-indicator .is-active{
    background-color: white;
    opacity: 1;
  }
  .mint-swipe-indicator{
    background: #a9acb1;
    opacity: 1;
    margin: 0 5px;
  }

</style>
