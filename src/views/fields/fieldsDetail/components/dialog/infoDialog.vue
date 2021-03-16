<template>
	<el-dialog
		title="种植信息"
		:visible.sync = "showInfoDialog"
		width="90%"
		@close="$emit('hideInfoDialog')">
		<div>

		<el-form ref="form" :model="cateDetail" label-width="80px">
			<el-form-item label="种类" required >
				<el-select v-model="cateDetail.parentId"  placeholder="请选择种植种类" disabled>
					<el-option label="小白菜" :value="1"></el-option>
					<el-option label="毛白菜" :value="2"></el-option>
					<el-option label="鸡毛菜" :value="3"></el-option>
					<el-option label="空心菜" :value="4"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="品种" required>
				<el-input v-model="cateDetail.name" maxlength="8" placeholder="请输入品种名称（字数不超过8位）" disabled></el-input>
			</el-form-item>
			<el-form-item label="种植标准" required >
				<el-radio-group v-model="cateDetail.plantStandard" size="medium" disabled>
					<el-radio :label="1">有机</el-radio>
					<el-radio :label="2">绿色</el-radio>
					<el-radio :label="3">无公害</el-radio>
					<el-radio :label="4">普通</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="种植方式" required >
				<el-radio-group v-model="cateDetail.plantWay" size="medium" disabled>
					<el-radio :label="1">移栽</el-radio>
					<el-radio :label="2">直播</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="移栽时间" required>
				<el-date-picker
					v-model="cateDetail.plantTime"
					align="right"
					type="date"
					placeholder="请选择移栽时间"
					disabled>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="预计采收" required>
				<el-date-picker
					v-model="cateDetail.recTime"
					align="right"
					type="date"
					placeholder="请选择预计采收时间"
					disabled>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="实际亩产" required>
				<el-input v-model="cateDetail.yieldNum"  type="number" maxlength="10" placeholder="请输入实际播种亩产（单位：公斤）" disabled></el-input>
			</el-form-item>
			<el-form-item label="预计产量" required>
				<el-input v-model="cateDetail.plantCount" type="number"  maxlength="10" placeholder="请输入预计总产量（单位：公斤）" disabled></el-input>
			</el-form-item>
			<el-form-item label="负责人" required>
				<el-input v-model="cateDetail.farmPeople" disabled></el-input>
			</el-form-item>
			<!-- <el-form-item>
				<el-button class="finish" type="primary" size="medium" :disabled="!(this.cateDetail.parentId && this.cateDetail.name && this.cateDetail.plantStandard && this.cateDetail.plantWay && this.cateDetail.plantTime && this.cateDetail.recTime && this.cateDetail.yieldNum && this.cateDetail.plantCount)" @click="addWork">完 成</el-button>
			</el-form-item> -->
		</el-form>


		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="$emit('hideInfoDialog')">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	props:['showInfoDialog','cateDetail'],
	data(){
		return {
			endFormData:{
				cateId: this.cateDetail.id,
				planttime:'',
				farmPeople: process.env.VUE_APP_USERNAME
			}
		}
	},

	methods:{}
}
</script>

<style lang="less" scoped>
.el-input{
	width: 100%;
}
</style>
