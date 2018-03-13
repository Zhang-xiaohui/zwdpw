<template>
	<div class="check">
		<div class="mint-cell-title" style="border-right: 1px solid #CCCCCC;">
			<label class="mint-checklist-label">
					<span class="mint-checkbox">
						<input type="checkbox" class="mint-checkbox-input" @click='delAll' id="checkAllBook" name="controlAll"> 
							<span class="mint-checkbox-core">
							</span>
					</span> 
					<span class="mint-checkbox-label">
						全选
					</span>
				</label>
		</div>
		<div class="mint-cell-title" style="color: #f00;" @click='deletebook'>
			<label class="mint-checklist-label">
					 
					<span class="mint-checkbox-label" >
						删除
					</span>
				</label>
		</div>
	</div>
</template>

<script>
import {MessageBox} from 'mint-ui';
	export default {
		name: 'checkedbook',
		created:function(){
			var checklist = document.getElementsByName("text");
			for(var j = 0; j < checklist.length; j++) {
				checklist[j].checked = false;
			}
			$("#checkAllBook").checked = false;
		},
		methods: {
			delAll: function() {
				var checklist = document.getElementsByName("text");
				if(document.getElementById("checkAllBook").checked) {
					console.log(1)
					for(var i = 0; i < checklist.length; i++) {
						checklist[i].checked = true;
					}
				} else {
					console.log(2)
					for(var j = 0; j < checklist.length; j++) {
						checklist[j].checked = false;
					}
				}
			},
			deletebook: function() {
				    var ids = [];
				    
              $('input[name="text"]:checked').each(function() {
              	var idJson = {
              		id:$(this).attr("id"),
              		tableName:$(this).attr("tableName")
              	};
              	ids.push(idJson);
              	
              });
              console.log(ids);
              if(ids.length>0){
              	$(".composition-name").css("margin-left","1em");			  
   		      $(".composition-tag").css("margin-left",".5em");
              }
//				 $(".composition-name").css("margin-left","1em");
//			  $(".composition-tag").css("margin-left",".5em")
                if(ids.length == 0){
              	MessageBox('',"你还没用选择哦！！")
              }
				   var ids = [];
               var text_index = $('input[name="text"]:checked').length;
              $('input[name="text"]:checked').each(function(i) {
              		var tab = {};
              		tab.id = $(this).attr("id");
              		tab.tableName = $(this).attr("tableName");
              		ids.push(tab);
              });
              var checked = $('input[name="text"]:checked')
				var vm = this;
				let url = this.$store.state.url;
				vm.$http.get(url + 'collectionList/deleteList', {
					params: {
//						"userId": "336",
                        "resIds":JSON.stringify(ids)
					}
				}).then(function(data) {
	               this.$emit('tabcontainer2');
				}, (response) => {
					console.log("error");
				});


			}
			
		}
	}
</script>
<style scoped>
	.check {
		width: 100%;
	}
	
	.mint-cell-title {
		padding-top: 1.5em;
		padding-bottom: 1.5em;
		border-top: 1px solid #e2e2e2;
		display: inline-block;
		width: 50.1%;
		text-align: center;
		margin-left: -5px;
	}
	
	.mint-checkbox-label {
		font-size: 1.5em;
	}
</style>