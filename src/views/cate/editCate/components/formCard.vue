<template>
  	<div class="formCard">
		<!-- <div class="title">种植品种信息</div> -->
		<el-form ref="form" :model="addCateData" label-width="80px">
			<el-form-item label="种植种类" required >
				<el-select v-model="addCateData.parentId" placeholder="请选择种植种类">
					<el-option label="小白菜" :value="1"></el-option>
					<el-option label="毛白菜" :value="2"></el-option>
					<el-option label="鸡毛菜" :value="3"></el-option>
					<el-option label="空心菜" :value="4"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="关联订单" required>
				<el-select v-model="checkedList" multiple placeholder="请选择订单编号">
					<el-option
					v-for="item in orderList"
					:key="item.orderProductId"
					:label="item.orderCode + ' ' + item.cateName + '-' + item.productName"
					:value="item.orderProductId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="种植品种" required>
				<el-input v-model="addCateData.name" maxlength="8" placeholder="请输入品种名称（8个字内）"></el-input>
			</el-form-item>
			<el-form-item label="种植标准" required >
				<el-radio-group v-model="addCateData.plantStandard" size="medium">
					<el-radio :label="1">有机</el-radio>
					<el-radio :label="2">绿色</el-radio>
					<el-radio :label="3">无公害</el-radio>
					<el-radio :label="4">普通</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="种植方式" required >
				<el-radio-group v-model="addCateData.plantWay" size="medium">
					<el-radio :label="1">移栽</el-radio>
					<el-radio :label="2">直播</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="移栽时间" required>
				<el-date-picker
					v-model="addCateData.plantTime"
					align="right"
					type="date"
					placeholder="请选择移栽时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计采收" required>
				<el-date-picker
					v-model="addCateData.recTime"
					align="right"
					type="date"
					placeholder="请选择预计采收时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="实际亩产" required>
				<el-input v-model="addCateData.yieldNum"  type="number" maxlength="10" placeholder="请输入实际播种亩产">
					<div slot="append">公斤</div>
				</el-input>
			</el-form-item>
			<el-form-item label="预计产量" required>
				<el-input v-model="addCateData.plantCount" type="number"  maxlength="10" placeholder="请输入预计总产量">
					<div slot="append">公斤</div>
				</el-input>
			</el-form-item>
			<el-form-item label="负责人" required>
				<el-input v-model="addCateData.farmPeople" readonly></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-button class="finish" type="primary" size="medium" :disabled="!(this.addCateData.parentId && this.addCateData.name && this.addCateData.plantStandard && this.addCateData.plantWay && this.addCateData.plantTime && this.addCateData.recTime && this.addCateData.yieldNum && this.addCateData.plantCount)" @click="editCate">完 成</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { getCateList,editCate } from "@/api/cate.js";
import { getOrderList } from "@/api/order.js";
export default {
	data(){
		return {
			addCateData:{
				// platformUserId: process.env.VUE_APP_USERID,
				// gismapId: this.$route.query.gismapId,
				farmPeople: process.env.VUE_APP_USERNAME,
				// productInfo:null,
				// farmImg:'暂无',
				// plantCount:'0'
			},

			orderList:[],
			checkedList:[],
		}
	},
	
	mounted(){
		this.getCateList()
		this.getOrderList()
	},

	methods:{
		// 获取订单列表
		getOrderList(){
			getOrderList({
              userId:process.env.VUE_APP_USERID,
              currentPage:1,
              pageSize:100,
			}).then(res => {
				this.orderList = res.data.records
				this.orderList.filter(item => {
					item.orderProductId = item.id
					item.productDosage = 1
					delete item.id
				})
			})
		},

		// 获取农资列表
		getCateList(){
			getCateList({
				userId: process.env.VUE_APP_USERID,
				gismapId: this.$route.query.gismapId,
			}).then(res => {
				res.data.filter(item => {
					if(item.id == this.$route.query.id) 
					this.addCateData = {
						platformUserId: process.env.VUE_APP_USERID,
						gismapId: this.$route.query.gismapId,
						id: item.id,
						farmPeople: process.env.VUE_APP_USERNAME,
						parentId: item.parentId,
						name : item.name,
						plantStandard : item.plantStandard,
						plantWay : item.plantWay,
						plantTime : this.dateformat(item.plantTime),
						recTime : this.dateformat(item.recTime),
						yieldNum : item.yieldNum,
						plantCount : 1,
					}
				})
			})
		},

		// 编辑种植品种
		editCate(){
			console.log(this.addCateData);
			editCate(this.addCateData).then(res => {
				this.$router.back()
			})
		}
	}
}
</script>

<style lang="less" scoped>
.formCard{
	background-color: #fff;
	// padding: 100px 0;
	margin-top: 50px;
	// height: 600px;
	.title{
		color: #409EFF;
		font-weight: 700;
		font-size: 30px;
		text-align: center;
		margin-bottom: 40px;
	}
	.el-form{
		width: 90%;
		max-width: 500px;
		margin:  0 auto;
		.finish{
			width: 80%;
		}
		.el-select{
			width: 100%;
		}
		.el-radio-group{
			.el-radio{
				width: 100px;
				margin: 10px;
			}
		}
		.el-date-editor{
			width: 100%;
		}
	}
}
</style>
