<template>
	<el-dialog
		title="种植结束"
		:visible.sync = "showEndDialog"
		width="80%"
		@close="$emit('hideEndDialog')">
		<div>

		<el-form ref="form" v-model="endFormData" label-width="80px">
			<el-form-item label="结束时间">
				<el-date-picker
					v-model="endFormData.planttime"
					type="date"
					placeholder="请选择种植结束日期">
				</el-date-picker>
			</el-form-item>
		</el-form>

		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="$emit('hideEndDialog')">取 消</el-button>
			<el-button type="primary" :disabled="endFormData.planttime == ''" @click="endCate">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { endCate } from '@/api/cate.js'
import { addWork } from '@/api/work.js'
export default {
	props:['showEndDialog','cateDetail'],
	data(){
		return {
			cateList: this.$store.state.cateList,
			endFormData:{
				cateId: this.cateDetail.id,
				planttime:'',
			}
		}
	},

	methods:{
		endCate(){
			this.endFormData.planttime = this.dateformat(this.endFormData.planttime)
			endCate(this.endFormData).then(() => {
				addWork({
					platformUserId: process.env.VUE_APP_USERID,
					gismapId: this.$route.query.id,
					farmPeople: process.env.VUE_APP_USERNAME,
					productInfo:null,
					farmImg:'暂无',
					farmType:2,
					finishTime: this.dateformat(new Date()),
					farmContent:`
						<p><b>种植种类 :</b> ${this.cateList[this.endFormData.parentId-1]}</p>
						<p><b>种植品种 :</b> ${this.endFormData.name}</p>
						<p><b>种植结束时间 :</b> ${this.endFormData.planttime}</p>
					`,
				}).then(() => {
					this.$emit('hideEndDialog')
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
