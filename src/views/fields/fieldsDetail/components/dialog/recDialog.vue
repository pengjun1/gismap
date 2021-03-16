<template>
	<el-dialog
		title="采收"
		:visible.sync = "showRecDialog"
		width="80%"
		@close="$emit('hideRecDialog')">

		<el-form ref="form" v-model="recFormData" label-width="80px">
			<el-form-item label="采收重量">
				<el-input type="number"  v-model="recFormData.recovernum" placeholder="请输入采收重量">
					<div slot="append">公斤</div>
				</el-input>
			</el-form-item>
			<el-form-item label="采收时间">
				    <el-date-picker
						v-model="recFormData.recovertime"
						type="date"
						placeholder="请选择采收日期">
					</el-date-picker>
			</el-form-item>
			<el-form-item label="负责人">
				<el-input readonly v-model="recFormData.recoverpeople"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input type="textarea" rows="3" v-model="recFormData.remark"  placeholder="请输入备注信息"></el-input>
			</el-form-item>
		</el-form>

		<span slot="footer" class="dialog-footer">
			<el-button @click="$emit('hideRecDialog')">取 消</el-button>
			<el-button type="primary" :disabled="recFormData.recovernum == '' ||  recFormData.recovertime == '' || recFormData.remark == ''" @click="recCate">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { recCate } from '@/api/cate.js'
import { addWork } from '@/api/work.js'
export default {
	props:['showRecDialog','cateDetail'],
	data(){
		return {
			recFormData:{
				cateId: this.cateDetail.id,
				recovernum:'',
				recovertime:'',
				recoverpeople:process.env.VUE_APP_USERNAME,
				remark:''
			}
		}
	},

	methods:{
		recCate(){
			this.recFormData.recovertime = this.dateformat(this.recFormData.recovertime)
			recCate(this.recFormData).then(() => {
				addWork({
					platformUserId: process.env.VUE_APP_USERID,
					gismapId: this.$route.query.id,
					farmPeople: process.env.VUE_APP_USERNAME,
					productInfo:null,
					farmImg:'暂无',
					farmType:1,
					finishTime: this.dateformat(new Date()),
					farmContent:`
						<p><b>采收重量 :</b> ${this.recFormData.recovernum} 公斤</p>
						<p><b>采收时间 :</b> ${this.recFormData.recovertime} </p>
						<p><b>负责人 :</b> ${this.recFormData.recoverpeople} </p>
						<p><b>备注 :</b> ${this.recFormData.remark} </p>
					`,
				}).then(res => {
					this.$emit('hideRecDialog')
					this.$message({
						type: 'success',
						message: res.msg
					});
					location.reload()
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.el-input{
	width: 100%;
}
</style>
