<template>
	<div class="TabContainer" style="width:100%;">
		
		<div class="composition-tag" v-for="(item,i) in TabContainerData.data" key="i">
			<div>
            	  	    <label class="mint-checklist-label mint-label-book" style="padding-left: 0px;">
						<span class="mint-checkbox">
							<input :id="item.id" :tableName="item.tableName" type="checkbox" class="mint-checkbox-input in" name="textt" /> 
								<span class="mint-checkbox-core" style="display: none;">
								</span>
						</span> 
					</label>
					</div>
		<router-link
			:to="{ path: 'articleDetails', query:{id:item.id,dis:parseInt(item.tableName)+1,com:2}}"
		>
		
			<div class="composition-box" @click="toRepertoryOne(item.type)">
				<span class="composition-name">{{item.msgname}}</span>
				<span class="info">
					<span class="author">{{item.bname}}</span>
					<span class="class">{{item.class}}</span>
				</span>
				<div class="label-body">
					{{item.body}}
				</div>		
				<div class="label-foot">
					<span lable-tab>标签:</span><span class="label" v-for="(it,i) in item.author" >{{it}}</span>
				</div>
			</div>	
		</router-link>
			
		</div>
	</div>
</template>

<script>
	export default {
		 data(){
			return{
				dis:""
			}
		},
	    name: 'TabContainer',
	    props: ['TabContainerData'],
	    methods:{
 			toRepertoryOne:function(type){
				this.$store.state.ArticleType=this.$store.state.ArticleType;
				console.log(this.$store.state.ArticleType);
			}
		},
		created:function(){
        	this.dis=this.$store.state.selectdis
			this.$store.state.more = "search";
			this.$store.state.moreUrl = "searchRepertory";
			this.$store.state.titleName = this.$store.state.ArticleType
		},
		mounted:function(){
			$(".mint-cell-value").css("width","100%");
		}
	}
	
</script>

<style scoped>
   	.composition-tag{
		    background-color: white;
    padding-bottom: 1em;
    border-radius: 10px;
    padding: 1em 1em 1em 1em;
    margin: 1em 0.3rem;
    box-shadow: 0px 4px 13px 6px #d9d9d9;
    /* margin-left: .4rem; */
    min-height: 3rem;
	}
   	.TabContainer{
	   	font-size: 16px;
	   	margin-top: 1.2rem;
	   	margin-bottom: 1.5rem;
   	}
   	.TabContainer a{
		color:black;
   	}
   	.composition-box{
   	}
	.composition-name{
		font-size: 1.2em;
		color: #4C83FF;
		display: inline-block;
	}
	.author{
	    font-size: 0.8em;
	    color:#BBBBBB;
	}
	.class{
		margin-left: 0.2rem;
	    font-size: 0.8em;
	    color:#BBBBBB;
	}
	.info{
	    text-align: right;
	    line-height: 1.2em;
	    float: right;
	}
	.mint-cell:last-child{
		background-size: 100% 1em;
	}
	.mint-cell-wrapper{
		margin-bottom:3.5em;
		padding: 0 .2em;
	}
	.label-body{
		margin-top: 0.3rem;
		width: 100%;
		color: #270e2a;
		line-height: 1.7em;
		text-indent: 2em;
		text-overflow:ellipsis; 
		-o-text-overflow:ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.label-foot{
		margin-top: .8em;
		overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	color: #a1a1a1;
	}
	.label{
		margin-left:.2rem;
	}
	.mint-cell-value{
		position: relative;
        bottom: 2em;
		
	}
	.mint-label-book{
		display: inline-block;
	    float: left;
	    position: relative;
	    top: 1.2rem;
	    left: -1.1rem;
	}
</style>