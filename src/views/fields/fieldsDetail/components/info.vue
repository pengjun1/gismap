<template>
  <div class="info">
	  <div class="left" >
		  <MapBox :fieldsDetail="fieldsDetail" v-if="fieldsDetail"></MapBox>
		  <div class="masker"></div>
		  <el-button type="primary" icon="el-icon-edit" @click="editMap">修改地块轮廓</el-button>
	  </div>
	  <div class="right">
			<div class="top">
				<div class="one">
					<div class="oneLeft">
						<div class="mapDescribe">{{fieldsDetail.mapDescribe}}</div>
						<div class="mapType">{{fieldsDetail.mapType == 0 ? '大田' : '山地'}}</div>
					</div>
					<div class="oneRight">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link">
								<i class="el-icon-s-operation"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item >
									<el-button type="warning" size="mini" icon="el-icon-edit" @click="editFields">编辑地块</el-button>
								</el-dropdown-item>
								<el-dropdown-item >
									<el-button type="danger" size="mini" icon="el-icon-edit" @click="removeFields">删除地块</el-button>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<div class="two">
					<div class="mapArea">
						<div class="label">占地面积：</div>
						<div class="value">{{fieldsDetail.mapArea}} 亩</div>
					</div>
				</div>
				<div class="two">
					<div class="userStatus">
						<div class="label">当前状态：</div>
						<div class="value">{{isUsed ? '使用中' : '闲置中'}}</div>
					</div>
				</div>
			</div>
			<div class="addBtns">
				<div class="bottom cate" @click="addCate" v-if="fieldsDetail.catelist.length != 1">
					<i class="el-icon-circle-plus"></i>
					<div class="addCate">添加种植品种</div>
				</div>
				<div class="bottom work" @click="toAddWork" v-else>
					<i class="el-icon-circle-plus"></i>
					<div class="addCate">记农事</div>
				</div>
			</div>
	  </div>
  </div>
</template>

<script>
import MapBox from '@/components/map/mapBox.vue'
import { removeFields } from '@/api/fields.js'
export default {
	props: ['fieldsDetail'],

	data(){
		return {
			isUsed: false
		}
	},

	mounted(){
		if(this.fieldsDetail.catelist.length!=0) this.isUsed = true
	},

	components:{
		MapBox
	},

	methods:{

		// 添加种植品种
		addCate(){
			this.$router.push({
				path:'/addCate',
				query:{
					id: this.fieldsDetail.id
				}
			})
		},

		// 添加农事
		toAddWork(){
			this.$router.push({
				path:'/addWork',
				query:{
					id: this.fieldsDetail.id
				}
			})
		},

		// 历史种植品种
		historyCate(){},

		// 修改地块轮廓
		editMap(){
			this.$router.push({
				path: '/editFields',
				query: {
					id: this.fieldsDetail.id,
					editMap:true
				}
			})
		},

		// 编辑地块
		editFields(){
			this.$router.push({
				path: '/editFields',
				query: {
					id: this.fieldsDetail.id,
				}
			})
		},

		// 删除地块
		removeFields(){
			this.$confirm('此操作将永久删除该地块, 是否继续?', '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				removeFields({
					id: this.fieldsDetail.id
				}).then(res => {
					this.$message({
						type: 'success',
						message: res.msg
					});
					this.$router.back()
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.info{
	max-width: 800px;
	margin: 0 auto;

	font-size: 14px;
	margin-top: 50px;
	display: flex;
	justify-content:space-between;
	align-items: center;
	height: 200px;
	background-color: #fff;
	.left{
		position: relative;
		// width: 200px;
		width: 50%;
		max-width: 400px;
		height: 100%;
		background-color: #ccc;
		border-radius: 4px;
		overflow: hidden;
		margin: 0 10px;
		.el-button{
			position: absolute;
			bottom: 0;
			width: 100%;
			border: none;
			opacity: 1;
			background-color: rgba(0,0,0,.8);
		}
		.masker{
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			// background-color: #fff;
		}
	}
	.left:hover{
		.el-button{
			opacity: 1;
		}
	}
	.right{
		// width: 200px;
		width: 50%;
		max-width: 400px;
		height: 100%;
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.top{
			.one{
				position: relative;
				.oneLeft{
					.mapDescribe{
						display: inline-block;
						color: #409EFF;
						font-weight: 700;
					}
					.mapType{
						color: #fff;
						padding: 2px 8px;
						margin: 0 8px;
						font-size: 12px;
						display: inline-block;
						border-radius: 2px;
						background-color: #FF7C12;
					}
				}
				.oneRight{
					position: absolute;
					right: 0;
					top: 0;
					.el-icon-s-operation{
						font-size: 20px;
					}
				}
			}
			.two{
				display: flex;
				margin: 20px 0;
				color: #666;
				>div{
					display: flex;
					width: 130px;
				}
				.userStatus{
					.value{
						color: #409EFF;
					}
				}
			}
		}
		.addBtns{
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.bottom{
			// margin-right: 20px;
			cursor: pointer;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 80px;
			i{
				font-size: 40px;
			}
			.addCate{
				font-size: 12px;
				margin: 5px;
			}
		}
		.bottom.cate{
			color: #409EFF;
			border: 1px solid #409EFF;
		}
		.bottom.work{			
			color: green;
			border: 1px solid green;
		}
		.cate:hover{
			color: #fff;
			background-color: #409EFF;
		}
		.work:hover{
			color: #fff;
			background-color: green;
		}
	}
}
</style>
