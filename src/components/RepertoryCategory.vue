<template>
	<div class="repertoryCategory">
		<mt-navbar v-model="selectedOne" class="category-one">
			<span
				@click="getCategoryThree(i)"
				v-for="(items,i) in categoryOne"
				class="selected-list"
			>
				<mt-tab-item class="category-item"
				  	:id="items.id"
				  	key="i"
			  	>
			  		{{items.name}}
				</mt-tab-item>
			</span>
		  	
		</mt-navbar>
		<mt-navbar v-model="selectedTwo" class="category-two" >
			<span @click="getCategoryThree(i)" class="selected-list" 
				v-for="(item,i) in categoryTwo"
			>
			  	<mt-tab-item 
				  	:id="item.id"
				  	key="i"
			  	>
			  		{{item.name}}
				</mt-tab-item>
			</span>
		</mt-navbar>

	    <mt-tab-container 
	      	class="page-tabbar-tab-container" v-model="selectedTwo" swipeable
	    >
	        <mt-tab-container-item v-for="(item,i) in categoryTwo" :id="item.id">
					<div class="category-three">
						<div 
							class="category-three-list" 
							v-if="!!categoryThree" 
							v-for="(items, i) in categoryThree"
						>
							<h3 class="category-three-type">{{items.type}}</h3>
							<div class="list-box">
							
								<router-link 
									v-for="(it,i) in items.data" 
									class="router-css" 
									
									:to="{ path: 'repertoryOne', query:{ageScale:it.ageScale,code:it.id,type:it.type,dis:it.dis}}"
									>
									<span class="list-url" @click="toRepertoryOne(it.name)" >{{it.name}}</span>
								</router-link>
							</div>
						</div>
					</div>
	        </mt-tab-container-item>
	    </mt-tab-container>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'repertoryCategory',
		data(){
			return{
				categoryOne:[
					{
						"id":"1",
						"name":"作文",
						"child":[
							{"id":"11","name":"低年级"},
							{"id":"12","name":"小学"},
							{"id":"13","name":"初中"},
							{"id":"14","name":"高中"}
						]
					},
					{
						"id":"2",
						"name":"素材",
						"child":[
							{"id":"21","name":"小学"},
							{"id":"22","name":"初中"},
							{"id":"23","name":"高中"}
						]
					},
					{
						"id":"3",
						"name":"技法",
						"child":[
							{"id":"31","name":"小学"},
							{"id":"32","name":"初中"},
							{"id":"33","name":"高中"}
						]
					},
					{
						"id":"4",
						"name":"真题",
						"child":[
							{"id":"41","name":"小学"},
							{"id":"42","name":"初中"},
							{"id":"43","name":"高中"}
						]
					}
				],
				selectedOne:"1",
				selectedTwo:"1",
				categoryThree:[],
				selected:'11',
				categoryThreeOld:[],
			}
		},
		created(){
			this.$store.state.selectdis="1";
			let url=this.$store.state.url
			// console.log(this.$store.state.url)
			let that=this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"013"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014001","type":"STYLE","dis":"1"}
								)
							}
							that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"022"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<3;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014001","type":"C_TYPE","dis":"1"}
								)
							}
							that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<7;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014001","type":"TYPE","dis":"1"}
								)
							}
							that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					that.categoryThreeOld=that.categoryThree
		},
		computed:{
			categoryTwo:function(){

				for(let item in this.categoryOne){
					if(this.categoryOne[item].id==this.selectedOne){
						this.selectedTwo=this.categoryOne[item].child[0].id;
						return this.categoryOne[item].child;

					}
				}

			}
		},
		methods:{
			toRepertoryOne:function(name){
				this.$store.state.ArticleType=name;
				console.log(name);
			},
			getCategoryThree:function(i){
				let dis=this.selectedOne
				this.$store.state.selectdis=dis
				let url=this.$store.state.url
				console.log(this.categoryThreeOld)
				this.categoryThree=[]
				console.log("当前："+this.selectedTwo)
				console.log("之前："+this.selected)
				if(this.selectedTwo!=this.selected){
				this.selected=this.selectedTwo
				let id=this.selectedTwo;
				// $.ajax({
				// 	type : "GET",
				// 	url : url+'library/probation',
				// 	data:data,
				// 	async: false,
				// 	dataType : "json",
				// 	success : function (data) {
				// 		console.log(data)
				// 	}
				// })
				if(id=='11'&&this.categoryThree.length==0){
					let that=this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"013"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014001","type":"STYLE","dis":"1"}
								)
							}
							that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"022"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<3;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014001","type":"C_TYPE","dis":"1"}
								)
							}
							that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<7;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014001","type":"TYPE","dis":"1"}
								)
							}
							that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
				}
				if(id=='12'){
					this.categoryThree.push(
						{
							"type":"年级",
							"data":[
								{"id":"一年级","ageScale":"014002","name":"一年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"二年级","ageScale":"014002","name":"二年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"三年级","ageScale":"014002","name":"三年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"四年级","ageScale":"014002","name":"四年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"五年级","ageScale":"014002","name":"五年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"六年级","ageScale":"014002","name":"六年级","type":"AGE_DETAIL","dis":"1"}
							]
						}
					)
					let that=this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"013"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014002","type":"STYLE","dis":"1"}
								)
							}
							that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"022"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						for(let i=3;i<alldata.length;i++){
							if (i != 8) {
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014002","type":"C_TYPE","dis":"1"}
							)
							}
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<7;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014002","type":"TYPE","dis":"1"}
								)
							}
							that.categoryThree.push(
							{
								"type":alldata[0].codeTypeName,
								"data":newdata
							}
							)
						}
					})
				}
				if(id=='13'){
					this.categoryThree.push(
						{
							"type":"年级",
							"data":[
								{"id":"七年级","ageScale":"014003","name":"七年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"八年级","ageScale":"014003","name":"八年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"九年级","ageScale":"014003","name":"九年级","type":"AGE_DETAIL","dis":"1"},
								{"id":"中考满分","ageScale":"014003","name":"中考满分","type":"AGE_DETAIL","dis":"1"}
							]
						}
					)
					let that=this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"013"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
								for(let i=0;i<alldata.length;i++){
									newdata.push(
										{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"STYLE","dis":"1"}
									)
								}
								that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"022"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=3;i<alldata.length;i++){
								if (i != 8) {
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"C_TYPE","dis":"1"}
								)
								}
							}
							that.categoryThree.push(
							{
								"type":alldata[0].codeTypeName,
								"data":newdata
							}
						)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
								for(let i=0;i<7;i++){
									newdata.push(
										{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"TYPE","dis":"1"}
									)
								}
								that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"029"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						// console.log(response.body.dto)
						for(let i=0;i<alldata.length;i++){
							if(i!=4){
								newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"E_TYPE","dis":"1"}
							)
							}
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						},
						{
							"type":"年份",
							"data":[
								{"id":"2017","ageScale":"014003","name":"2017","dis":"1","type":"C_YEAR"},
								{"id":"2016","ageScale":"014003","name":"2016","dis":"1","type":"C_YEAR"},
								{"id":"2015","ageScale":"014003","name":"2015","dis":"1","type":"C_YEAR"},
								{"id":"2014","ageScale":"014003","name":"2014","dis":"1","type":"C_YEAR"},
								{"id":"2013","ageScale":"014003","name":"2013","dis":"1","type":"C_YEAR"},
								{"id":"2012","ageScale":"014003","name":"2012","dis":"1","type":"C_YEAR"},
								{"id":"2011","ageScale":"014003","name":"2011","dis":"1","type":"C_YEAR"},
								{"id":"2010","ageScale":"014003","name":"2010","dis":"1","type":"C_YEAR"},
								{"id":"2009","ageScale":"014003","name":"2009","dis":"1","type":"C_YEAR"},
								{"id":"2008","ageScale":"014003","name":"2008","dis":"1","type":"C_YEAR"},
								{"id":"2007","ageScale":"014003","name":"2007","dis":"1","type":"C_YEAR"},
								{"id":"2006","ageScale":"014003","name":"2006","dis":"1","type":"C_YEAR"},
								{"id":"2005","ageScale":"014003","name":"2005","dis":"1","type":"C_YEAR"},
								{"id":"2004","ageScale":"014003","name":"2004","dis":"1","type":"C_YEAR"},
								{"id":"2003","ageScale":"014003","name":"2003","dis":"1","type":"C_YEAR"}
							]
						}
					)
						}
					})
				}
				if(id=='14'){
					this.categoryThree.push(
						{
							"type":"年级",
							"data":[
								{"id":"高一","name":"高一","ageScale":"014004","type":"AGE_DETAIL","dis":"1"},
								{"id":"高二","name":"高二","ageScale":"014004","type":"AGE_DETAIL","dis":"1"},
								{"id":"高三","name":"高三","ageScale":"014004","type":"AGE_DETAIL","dis":"1"},
								{"id":"高考满分","name":"高考满分","ageScale":"014004","type":"AGE_DETAIL","dis":"1"}
							]
						}
					)
					let that=this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"013"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
								newdata.push(
									{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"STYLE","dis":"1"}
								)
							}
								that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"022"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						for(let i=3;i<alldata.length;i++){
							if(i!=8){
								newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"C_TYPE","dis":"1"}
							)
							}
							
						}
								that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						for(let i=0;i<7;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"TYPE","dis":"1"}
							)
						}
								that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"029"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						for(let i=0;i<alldata.length;i++){
							if(i!=4){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"E_TYPE","dis":"1"}
							)
							}
						}
								that.categoryThree.push(
								{
									"type":alldata[0].codeTypeName,
									"data":newdata
								}
							)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"023"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						for(let i=0;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].codeName,"name":alldata[i].codeName,"ageScale":"014004","type":"C_REGION","dis":"1"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						},
						{
							"type":"年份",
							"data":[
								{"id":"2017","ageScale":"014004","name":"2017","dis":"1","type":"C_YEAR"},
								{"id":"2016","ageScale":"014004","name":"2016","dis":"1","type":"C_YEAR"},
								{"id":"2015","ageScale":"014004","name":"2015","dis":"1","type":"C_YEAR"},
								{"id":"2014","ageScale":"014004","name":"2014","dis":"1","type":"C_YEAR"},
								{"id":"2013","ageScale":"014004","name":"2013","dis":"1","type":"C_YEAR"},
								{"id":"2012","ageScale":"014004","name":"2012","dis":"1","type":"C_YEAR"},
								{"id":"2011","ageScale":"014004","name":"2011","dis":"1","type":"C_YEAR"},
								{"id":"2010","ageScale":"014004","name":"2010","dis":"1","type":"C_YEAR"},
								{"id":"2009","ageScale":"014004","name":"2009","dis":"1","type":"C_YEAR"},
								{"id":"2008","ageScale":"014004","name":"2008","dis":"1","type":"C_YEAR"},
								{"id":"2007","ageScale":"014004","name":"2007","dis":"1","type":"C_YEAR"},
								{"id":"2006","ageScale":"014004","name":"2006","dis":"1","type":"C_YEAR"},
								{"id":"2005","ageScale":"014004","name":"2005","dis":"1","type":"C_YEAR"},
								{"id":"2004","ageScale":"014004","name":"2004","dis":"1","type":"C_YEAR"},
								{"id":"2003","ageScale":"014004","name":"2003","dis":"1","type":"C_YEAR"}
							]
						}
					)
						}
					})
				}
				if(id=='21'){
					let that =this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"024"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						for(let i=0;i<6;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014002","type":"C_TYPE","dis":"2"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
						for(let i=0;i<6;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014002","type":"STYLE","dis":"2"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
				}
				if(id=='22'){
					let that =this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"024"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
								if (i != 3 && i != 4 && i != 5 && i != 10) {
									newdata.push(
										{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"C_TYPE","dis":"2"}
									)
								}
							}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<6;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"STYLE","dis":"2"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"025"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"CT_TYPR","dis":"2"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
				}
				if(id=='23'){
					let that =this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"024"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=6;i<10;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014004","dis":"2","type":"C_TYPE"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"025"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014004","dis":"2","type":"CT_TYPR"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
				}
				if(id=="31"){
					this.categoryThree.push(
						{
							"type":"年级",
							"data":[
								{"id":"一年级","name":"一年级","ageScale":"014002","type":"AGE_DETAIL","dis":"3"},
								{"id":"二年级","name":"二年级","ageScale":"014002","type":"AGE_DETAIL","dis":"3"},
								{"id":"三年级","name":"三年级","ageScale":"014002","type":"AGE_DETAIL","dis":"3"},
								{"id":"四年级","name":"四年级","ageScale":"014002","type":"AGE_DETAIL","dis":"3"},
								{"id":"五年级","name":"五年级","ageScale":"014002","type":"AGE_DETAIL","dis":"3"},
								{"id":"六年级","name":"六年级","ageScale":"014002","type":"AGE_DETAIL","dis":"3"},
							]
						}
					)
					let that =this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"026"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=1;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014002","type":"C_TYPE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<6;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014002","type":"STYLE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
				}
				if(id=="32"){
					this.categoryThree.push(
						{
							"type":"年级",
							"data":[
								{"id":"七年级","name":"七年级","ageScale":"014003","type":"AGE_DETAIL","dis":"3"},
								{"id":"八年级","name":"八年级","ageScale":"014003","type":"AGE_DETAIL","dis":"3"},
								{"id":"九年级","name":"九年级","ageScale":"014003","type":"AGE_DETAIL","dis":"3"},
								{"id":"中考作文","name":"中考作文","ageScale":"014003","type":"AGE_DETAIL","dis":"3"},
							]
						}
					)
					let that =this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"026"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<3;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"C_TYPE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"STYLE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"032"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014003","type":"TYPE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
				}
				if(id=="33"){
					this.categoryThree.push(
						{
							"type":"年级",
							"data":[
								{"id":"高一","name":"高一","ageScale":"014004","type":"AGE_DETAIL","dis":"3"},
								{"id":"高二","name":"高二","ageScale":"014004","type":"AGE_DETAIL","dis":"3"},
								{"id":"高三","name":"高三","ageScale":"014004","type":"AGE_DETAIL","dis":"3"},
								{"id":"高考作文","name":"高考作文","ageScale":"014004","type":"AGE_DETAIL","dis":"3"},
							]
						}
					)
					let that =this
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"026"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<3;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014004","type":"C_TYPE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"033"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014004","type":"STYLE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})
					$.ajax({
						type : "GET",
						url : url+'baseCode/getCodeListByCodeType',
						data:{codeType:"032"},
						async: false,
						dataType : "json",
						success : function (data) {
							let alldata=data.dto
							let newdata=[]
							for(let i=0;i<alldata.length;i++){
							newdata.push(
								{"id":alldata[i].code,"name":alldata[i].codeName,"ageScale":"014004","type":"TYPE","dis":"3"}
							)
						}
						that.categoryThree.push(
						{
							"type":alldata[0].codeTypeName,
							"data":newdata
						}
					)
						}
					})

				}
				this.categoryThreeOld=this.categoryThree
				}else{
					this.categoryThree=this.categoryThreeOld
					console.log(this.categoryThree)
				}
			}
		},
		beforeUpdate:function(){

		}
	}
</script>
<style scoped>
	.repertoryCategory{
		background: #FFFFFF;
		padding-top: 2.5rem;
	} 
	.selected-list{
		width: 25%; 
		height:auto;
	}
	.category-one{
		z-index: 100;
		background-color: #FFDC9C;
	    border-top: 5px solid #E2E2E2;
	    position: fixed;
	    top: 1.2rem;
	    width: 100%;
	    height: 1.3rem;
		color:#494949;
	}
	.category-two{
		z-index: 100;
		border-bottom: 2px solid #959595;
		position: fixed;
	    top: 2.6rem;
	    width: 100%;
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
	.category-one .mint-tab-item {
		font-size: 18px;
	}
	.mint-header .mint-button{
		    height: 2rem;
    padding:20px 0px!important;
  }
	.category-one .mint-tab-item.is-selected {
	    border-bottom: 0px;
	    color: #ff5a00;
	    margin-bottom: 0;
	
	}
	.category-two .mint-tab-item {
		font-size: 18px;
	}
	.category-two .mint-tab-item.is-selected {
		border-bottom: 2px solid #26a2ff;
		margin-bottom: -2px;
	}
</style>
