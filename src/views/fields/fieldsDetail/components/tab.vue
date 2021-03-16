<template>
  <div class="tab">
	<el-tabs  v-model="activeTab" @tab-click="changeTab" animated swipeable >
		<el-tab-pane label="种植品种" name="1">

			<div class="activeCateList" v-if="activeCateList.length != 0">
				当前种植（只能有一个当前种植品种）
				 <!-- <el-button type="primary" size="large" class="el-icon-plus addCate" @click="toAddCate">添加种植品种</el-button> -->
			</div>
			<cateCard class="activeCate" v-for="item in activeCateList" :key="item.id" :cateDetail="item" @refresh="$emit('refresh')"></cateCard>

			<div class="historyCateList" v-if="historyCateList.length != 0">历史种植</div>
			<cateCard v-for="item in historyCateList" :key="item.id" :cateDetail="item"></cateCard>
			
			<div class="nocontent" v-if="activeCateList.length == 0 && historyCateList.length == 0">
				<img src="@/assets/image/cate/noFarmCate.png" alt="">
				<div class="text">暂无种植品种</div>
				<el-button type="primary" size="large" class="el-icon-plus" @click="toAddCate">添加种植品种</el-button>
			</div>
		</el-tab-pane>

		<el-tab-pane label="农事记录" name="2">
			<div class="workList" v-if="workList.length != 0">
				农事记录
				 <el-button type="primary" size="large" class="el-icon-plus" @click="toAddWork">记农事</el-button>
			</div>
			<workCard v-for="item in workList" :key="item.id" :workDetail="item"></workCard>
			<div class="nocontent" v-if="workList.length == 0">
				<img src="@/assets/image/cate/noFarmWork.png" alt="">
				<div class="text">暂无农事记录</div>
				 <el-button type="primary" size="large" class="el-icon-plus" @click="toAddWork">记农事</el-button>
			</div>
		</el-tab-pane>

		<el-tab-pane label="地块信息" name="3">
			<infoCard :fieldsDetail="fieldsDetail"></infoCard>
			<!-- <div class="btns">
				<el-button type="warning" size="large" class="el-icon-edit" @click="editFields">编辑地块</el-button>
				<el-button type="danger" size="large" class="el-icon-delete" @click="removeFields">删除地块</el-button>
			</div> -->
		</el-tab-pane>
	</el-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getWorkList } from '@/api/work.js'
import { removeFields } from '@/api/fields.js'
import cateCard from './card/cateCard.vue'
import workCard from './card/workCard.vue'
import infoCard from './card/infoCard.vue'
export default {
	props: ['fieldsDetail'],

	data(){
		return {
			activeTab:'1',
			activeCateList:'',
			historyCateList:'',
			workList:''
		}
	},
	
	components:{
		cateCard,workCard,infoCard
	},

	mounted(){
		this.getCateList()
		this.getWorkList()
	},

	methods:{
		// 切换标签页
		changeTab(e){
			if (e.index == '0') this.getCateList()
			if (e.index == '1') this.getWorkList()
		},

		// 获取农资列表
		getCateList(){
			this.activeCateList = []
			this.historyCateList = []
			getCateList({
				userId: process.env.VUE_APP_USERID,
				gismapId: this.$route.query.id,
			}).then(res => {
				res.data.filter(item => {
					if (item.isPlantStatus == 0) this.activeCateList.push(item)
					else this.historyCateList.push(item)
				})
				this.fieldsDetail.catelist = this.activeCateList
				// this.isRender = true
			})
		},

		// 获取农事列表
		getWorkList(){
			getWorkList({
				userId: process.env.VUE_APP_USERID,
				gismapId: this.$route.query.id,
				currentPage:1,
				pageSize:100
			}).then(res => {
				this.workList = res.data.records
			})
		},

		// 添加种植品种
		toAddCate(){
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

		// 编辑地块
		editFields(){
			this.$router.push({
				path: '/editFields',
				query: {
					id: this.fieldsDetail.id
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
.tab{
	max-width: 800px;
	margin: 0 auto;

	font-size: 16px;
	background-color: #fff;
	margin-top: 30px;
	padding: 10px;
	.activeCateList,.historyCateList,.workList{
		margin-top: 20px;
		font-weight: 700;
		color: #666;
	}
	.activeCate{
		border: 2px solid #409EFF;
	}
	.addCate{
		float: right;
	}
	.nocontent{
		text-align: center;
		padding: 50px 0;
		img{
			width: 200px;
		}
		.text{
			color: #ccc;
			margin-bottom: 20px;
		}
	}
	.btns{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.cateCard{
		margin: 10px;
	}
	.workCard{
		margin: 10px;
	}
	.infoCard{
		margin: 10px;
	}
}
</style>
