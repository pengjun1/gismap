<template>
	<div class="right">
		<i class="el-icon-place"  @click="showFieldsBoard = true"></i>
		<div class="list" v-if="showFieldsBoard">
			<div class="title">
				<el-button icon="el-icon-right" circle @click="showFieldsBoard = false"></el-button>
				<div class="text">全部地块 {{fieldsList.length}}个</div>
			</div>
			<div class="body">
				<div class="item" v-for="(item) in fieldsList" :key="item.id" @click="selectFields(item.id)">
					<div>
						<img v-if="item.catelist.length!=0" :src="require(`@/assets/image/fields/${item.catelist[0].parentId}.png`)" alt="">
						<img v-else src="@/assets/image/fields/0.png" alt="">
						<div class="mapDescribe">{{item.mapDescribe}}</div>
					</div>
					<div class="useStatus">{{item.catelist.length==0 ? '闲置中' : '使用中'}}</div>
				</div>
			</div>
			<div class="item">
				点击地块,显示详情
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:['fieldsList'],
	data(){
		return {
			// 品种面板展示
			showFieldsBoard: false,
			// 品种列表
			cateList: this.$store.state.cateList,
			// 地块类型列表
			typeList:['大田','山地'],
		}
	},

	methods:{
		selectFields(id){
			this.$emit('selectFields',id)
		}
	}
}
</script>

<style lang='less' scoped> 
	.right{
		// opacity: .9;
		.el-icon-place{
			cursor: pointer;
			color: #409EFF;
			font-size: 25px;
			padding: 5px;
			border-radius: 50%;
			background-color: #fff;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
		.el-icon-place:hover{
			color:#fff;
			background-color: #409EFF;
		}
		.list{
			border-radius: 5px;
			color: #fff;
			font-size: 14px;
			background-color: #8ac1f8;
			// width: 300px;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			.body{
				overflow: auto;
				max-height: 280px;
			}
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
				font-size: 14px;
				padding: 8px 5px;
				display: flex;
				justify-content: space-between;
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
				.useStatus{
					color: lightgreen;
					font-size: 12px;
				}

			}
			.item:hover{
				background-color: #62abf5;
			}
		}
	}
</style>
