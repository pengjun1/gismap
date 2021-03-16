<template>
	<div class="cateCard">
		<div class="left">
			<img :src="require(`@/assets/image/fields/${this.cateDetail.parentId}.png`)" alt="">
		</div>
		<div class="right">
			<div class="parent">{{cateTypeList[cateDetail.parentId-1]}}</div>
			<div class="name">品种：{{cateDetail.name}}</div>
			<div class="time">
				<div class="plantTime">{{dateformat(cateDetail.plantTime)}} 移栽</div>
			</div>
			<div class="time">
				<div class="recTime">预计 {{dateformat(cateDetail.recTime)}} 采收</div>
			</div>
		</div>
		<div class="masker">
			<div class="btn">
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						<i class="el-icon-s-operation"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item >
							<el-button type="info" size="mini" icon="el-icon-view" @click="showInfoDialog = true">查看</el-button>
						</el-dropdown-item>
						<el-dropdown-item>
							<el-button v-if="cateDetail.isPlantStatus == 0" type="success" size="mini" icon="el-icon-burger" @click="showRecDialog = true">采收</el-button>
						</el-dropdown-item>
						<el-dropdown-item>
							<el-button v-if="cateDetail.isPlantStatus == 0" type="warning" size="mini" icon="el-icon-switch-button" @click="showEndDialog = true">种植结束</el-button>
						</el-dropdown-item>
						<el-dropdown-item>
							<el-button v-if="cateDetail.isPlantStatus == 0" type="primary" size="mini" icon="el-icon-edit" @click="toEditCate">编辑</el-button>
						</el-dropdown-item>
						<el-dropdown-item>
							<el-button type="danger" size="mini" icon="el-icon-delete" @click="removeCate">删除</el-button>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>

		<!-- 采收对话框 -->
		<recDialog :showRecDialog="showRecDialog" :cateDetail="cateDetail" @hideRecDialog="showRecDialog = false"></recDialog>


		<!-- 种植结束对话框 -->
		<endDialog :showEndDialog="showEndDialog" :cateDetail="cateDetail" @hideEndDialog="showEndDialog = false"></endDialog>

		<!-- 信息展示对话框 -->
		<infoDialog :showInfoDialog="showInfoDialog" :cateDetail="cateDetail" @hideInfoDialog="showInfoDialog = false"></infoDialog>
	</div>
</template>

<script>
import endDialog from '../dialog/endDialog.vue'
import recDialog from '../dialog/recDialog.vue'
import infoDialog from '../dialog/infoDialog.vue'
import { removeCate } from '@/api/cate.js'
export default {
	props:['cateDetail'],

	components:{
		recDialog,endDialog,infoDialog
	},

	data(){
		return {
			cateTypeList: ['小白菜','毛白菜','鸡毛菜','空心菜'],
			showRecDialog: false,
			showEndDialog: false,
			showInfoDialog: false
		}
	},

	mounted(){
	},

	methods:{
		// 编辑
		toEditCate(){
			this.$router.push({
				path:'/editCate',
				query:{
					gismapId: this.$route.query.id,
					id: this.cateDetail.id
				}
			})
		},

		// 删除
		removeCate(){
			this.$confirm('此操作将把该作物从当前种植中移除, 是否继续?', '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				removeCate({
					id: this.cateDetail.id
				}).then(res => {
					this.$message({
						type: 'success',
						message: res.msg
					});
					this.$emit('refresh')
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
	}
}
</script>

<style lang="less" scoped>
.cateCard{
	// width: 100%;
	font-size: 14px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	border-radius: 5px;
	box-shadow: #ccc 0 0 10px 0;
	padding: 10px 20px;
	position: relative;
	.left{
		img{
			width: 80px;
		}
	}
	.right{
		margin: 0 20px;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #666;
		.parent{
			color: #000;
			font-weight: 700;
		}
		.name{
			margin: 10px 0;
		}
		.time{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.recTime{
				color: #409EFF;
			}
		}
	}
	.el-icon-s-operation{
		font-size: 20px;
	}
	.masker{
		// display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 5px;
		// background-color: rgba(0, 0, 0, .5);
		.btn{
			position: absolute;
			right: 10px;
			top: 10px;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			flex-direction: column;
		}
	}
}
.cateCard:hover{
	.masker{
		// display: block;
	}
}
</style>
