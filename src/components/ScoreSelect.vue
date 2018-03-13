<template>
	<div class="score-select">
		<div class="score-code">得分</div>
		<div class="items-container">
			<div class="score-line">
				<div class="score-grade-c"></div>
			</div>
			<ul class="score-category">
				<li v-for = "(item, i) in gradeItem" :key="item.id" class="category-item" @click="selectGrade" >{{item.grade}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
			return {
				gradeItem: [{
					id: 1,
					grade: 'D'
				},{
					id: 2,
					grade: 'D+'
				},{
					id: 3,
					grade: 'C'
				},{
					id: 4,
					grade: 'C+'
				},{
					id: 5,
					grade: 'B'
				},{
					id: 6,
					grade: 'B+'
				},{
					id: 7,
					grade: 'A'
				},{
					id: 8,
					grade: 'A+'
				}]
			}
	    },
	    mounted() {
    		$('.score-category').on("click", "LI", function(){
    			$(this).siblings().removeClass('active').end().addClass('active');
    			$('.score-grade-c').css('width', $(this).index()+"rem");
    			$(this).attr('ref', 'inner')
    		})
	    }, 
	    methods: {
	    	selectGrade(e) {
    			var el = e.currentTarget;
                var getWord=el.innerHTML;
	    		console.log(getWord)
	    	}
	    } 
	}
</script>

<style scoped>
.score-select{
	width:100%;
	height:1.8rem;
	margin-top:.3rem;
	box-shadow: 0px 1px 10px #ccc;
	border-radius: .3rem;
	overflow: hidden;
}
.score-code{
	float:left;
	text-align: center;
	line-height: 1.8rem;
	width:1.8rem;
	background: #438fff;
	font-size: 1.2em;
	color:#feffff;
}
.items-container{
	float:left;
	position:relative;
}
.score-line{
	position:absolute;
	top:.7rem;
	left:.3rem;
	width:7rem;
	height:.3rem;
	background: #d2d2d2;
	border-radius:.2rem;
}
.score-category{
	position:absolute;
	top:1.2rem;
	left:.3rem;
	width:7rem;
	overflow: hidden;
	display:flex;
	justify-content: space-between;
}
.category-item{
	float:left;
}
.active{
	color:#fea405;
}
.score-grade-c{
	position:absolute;
	top:0;
	left:0;
	height:.3rem;
	background: #438fff;
	border-radius:.2rem;
}
</style>