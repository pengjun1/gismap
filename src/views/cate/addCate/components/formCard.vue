<template>
  	<div class="formCard">
		<!-- <div class="title">种植品种信息</div> -->
		<el-form ref="form" :model="addCateData" label-width="80px">
			<el-form-item label="种植种类" required >
				<el-select v-model="addCateData.parentId" placeholder="请选择种植种类">
					<el-option :label="item" :value="index+1" v-for="(item,index) in cateList"  :key="index"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="关联订单" required>
				<el-select v-model="checkedList" multiple placeholder="请选择订单编号">
					<el-option
					v-for="item in orderList"
					:key="item.orderProductId"
					:label="item.cateName + '-' + item.productName"
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
					<el-radio label="1">移栽</el-radio>
					<el-radio label="2">直播</el-radio>
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
			<el-form-item label="实施人" required>
				<el-input v-model="addCateData.operator"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-button class="finish" type="primary" size="medium" :disabled="!(this.addCateData.parentId && this.addCateData.name && this.addCateData.plantStandard && this.addCateData.plantWay && this.addCateData.plantTime && this.addCateData.recTime && this.addCateData.yieldNum && this.addCateData.plantCount)" @click="addWork">完 成</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { addCate } from "@/api/cate.js";
import { addWork } from "@/api/work.js";
import { getOrderList } from "@/api/order.js";
export default {
	data(){
		return {
			cateList: this.$store.state.cateList,

			orderList:[],
			checkedList:[],

			addCateData:{
				PlatformUserId: process.env.VUE_APP_USERID,
				gismapId: this.$route.query.id,
				farmPeople:process.env.VUE_APP_USERNAME,
				operator: '',
				productInfo:[]
			},
		}
	},
	
	mounted(){
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

		selectOrder(n){
			console.log(n);
		},

		// 添加农事
		addWork(){
			this.addCateData.plantTime = this.dateformat(this.addCateData.plantTime)
			this.addCateData.recTime = this.dateformat(this.addCateData.recTime)
			this.orderList.filter(item1 => {
				this.checkedList.filter(item2 => {
					if(item1.orderProductId == item2) {
						this.addCateData.productInfo.push(item1)
					}
				})
			})
			this.addCateData.productInfo = JSON.stringify(this.addCateData.productInfo)
			addCate(this.addCateData).then(res => {
				addWork({
					platformUserId: process.env.VUE_APP_USERID,
					gismapId: this.$route.query.id,
					farmPeople: process.env.VUE_APP_USERNAME,
					productInfo: this.addCateData.productInfo,
					farmImg:'暂无',
					farmType:1,
					finishTime: this.dateformat(new Date()),
					farmContent:`
						<p><b>种植种类 :</b> ${this.cateList[this.addCateData.parentId-1]}</p>
						<p><b>种植品种 :</b> ${this.addCateData.name}</p>
						<p><b>移栽时间 :</b> ${this.addCateData.plantTime}</p>
						<p><b>预计采收时间 :</b> ${this.addCateData.recTime}</p>
					`,
				}).then(res => {
					this.$router.push({
						path:'/fieldsDetail',
						query:{
							id: this.$route.query.id
						}
					})
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.formCard{
	width: 100%;
	background-color: #fff;
	// padding: 10px 0;
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
