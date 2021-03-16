<template>
  	<div class="formCard">
		<!-- <div class="title">农事信息</div> -->
		<el-form ref="form" :model="addWorkData" label-width="80px">
			<el-form-item label="农事类型" required >
				<el-radio-group v-model="addWorkData.farmType" size="medium">
					<el-radio border :label="index" :disabled="index==0 || index==1 || index == 2" v-for="(item,index) in farmTypelist" :key="index">{{item}}</el-radio>
				</el-radio-group>
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
			<el-form-item label="农事内容" required>
				<el-input v-model="addWorkData.farmContent" maxlength="8" placeholder="请输入农事内容" type="textarea" rows="5"></el-input>
			</el-form-item>
			<el-form-item label="操作时间" required>
				<el-date-picker
					v-model="addWorkData.finishTime"
					align="right"
					type="date"
					placeholder="请选择操作时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="负责人" required>
				<el-input v-model="addWorkData.farmPeople" readonly></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-button class="finish" type="primary" size="medium" :disabled="!(this.addWorkData.farmType && this.addWorkData.farmContent && this.addWorkData.finishTime)" @click="addWork">完 成</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { addWork } from "@/api/work.js";
import { getOrderList } from "@/api/order.js";
export default {
	data(){
		return {
			farmTypelist: ['移栽','采收','种植结束','打农药','施肥'],
			orderList:[],
			checkedList:[],
			addWorkData:{
				platformUserId: process.env.VUE_APP_USERID,
				gismapId: this.$route.query.id,
				farmPeople: process.env.VUE_APP_USERNAME,
				productInfo:[],
				farmImg:'暂无',
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

		// 添加农事
		addWork(){
			this.addWorkData.finishTime = this.dateformat(this.addWorkData.finishTime)
			this.orderList.filter(item1 => {
				this.checkedList.filter(item2 => {
					if(item1.orderProductId == item2) {
						this.addWorkData.productInfo.push(item1)
					}
				})
			})
			this.addWorkData.productInfo = JSON.stringify(this.addWorkData.productInfo)
			addWork(this.addWorkData)
			.then(res => {
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
		.el-radio-group{
			.el-radio{
				// width: 100px;
				margin: 10px;
			}
		}
		.el-date-editor,.el-select{
			width: 100%;
		}
	}
}
</style>
