<template>
	<div class="check">
		<div class="mint-cell-title" style="border-right: 1px solid #CCCCCC;">
			<label class="mint-checklist-label">
					<span class="mint-checkbox">
						<input type="checkbox" class="mint-checkbox-input" @click='delAll' id="checkAll" name="controlAll"> 
							<span class="mint-checkbox-core">
							</span>
					</span> 
					<span class="mint-checkbox-label">
						全选
					</span>
				</label>
		</div>
		<div class="mint-cell-title" style="color: #f00;" @click='deleteBooks'>
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
		name: 'check',
		methods: {
			delAll: function() {
				var checklist = document.getElementsByName("text");
				if(document.getElementById("checkAll").checked) {
					for(var i = 0; i < checklist.length; i++) {
						checklist[i].checked = 1;
					}
				} else {
					for(var j = 0; j < checklist.length; j++) {
						checklist[j].checked = 0;
					}
				}
			},
			deleteBooks: function() {
				var idArr = [];
				$('input[name="text"]:checked').each(function() {
					idArr.push($(this).attr("value"));
				});
				console.log(idArr);
				if (idArr.length==0){
					MessageBox('',"你还没用选择哦！！")
				}else{
					var vm = this;
				let url = this.$store.state.url;
				vm.$http.get(url + 'my/delete', {
					params: {
						"bookIds": idArr.toString()
					}
				}).then(function(data) {
					
					if(data.body.code=='1'){
						location.reload();	
					}

					//				console.log(idArr);
					//	  		  
				}, (response) => {
					console.log("error");
				});
				}
				

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