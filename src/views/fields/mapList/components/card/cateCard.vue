<template>
  <div class="left">
		<i class="el-icon-grape" @click="showCateBoard = true"></i>
		<div class="list" v-if="showCateBoard">
			<div class="title">
				<div class="text">种植种类 {{cateList.length}}种</div>
				<el-button icon="el-icon-back" circle  @click="showCateBoard = false"></el-button>
			</div>
			<div class="item" v-for="(item,index) in cateList" :key="index" @click="selectCate(index+1)">
				<div>
					<img :src="require(`@/assets/image/fields/${index+1}.png`)" alt="">
					<!-- <div class="parentId">{{cateList[index]}}</div> -->
				</div>
				<div class="name">{{cateList[index]}}</div>
			</div>
			<!-- <div class="item"> -->
				<!-- 鼠标点击品种,显示当前种植该品种的地块 -->
			<!-- </div> -->
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			//  品种面板展示
			showCateBoard: false,
			// 品种列表
			cateList: this.$store.state.cateList,
		}
	},

	methods:{
		selectCate(parentId){
			this.$emit('selectCate',parentId)
		}
	}
}
</script>

<style lang="less" scoped>
	.left{
		// opacity: .9;
		overflow: auto;
		.el-icon-grape{
			cursor: pointer;
			color: #409EFF;
			font-size: 25px;
			padding: 5px;
			border-radius: 50%;
			background-color: #fff;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
		.el-icon-grape:hover{
			color:#fff;
			background-color: #409EFF;
		}
		.list{
			border-radius: 5px;
			color: #fff;
			font-size: 14px;
			background-color: #8ac1f8;
			// width: 300px;
			// height: auto;
			overflow: auto;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			.title{
				font-weight: 700;
				height: 50px;
				padding: 0 10px;
				line-height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #409EFF;
			}
			.item{
				cursor: pointer;
				font-size: 12px;
				padding: 10px 5px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1px  solid #ccc;
				>div{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				img{
					width: 20px;
					margin: 0 5px;
				}
			}
			.item:hover{
				background-color: #62abf5;
			}
		}
		.el-button{
			position:absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
