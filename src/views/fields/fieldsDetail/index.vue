<template>
  <div class="fieldsDetail">
	  <navigator centerTitle="地块详情"></navigator>
	  <div class="body">
		  <info :fieldsDetail="fieldsDetail" v-if="isInfoRender"></info>
		  <tab :fieldsDetail="fieldsDetail"  v-if="isTabRender" @refresh="getCateList"></tab>
	  </div>
  </div>
</template>

<script>
import { getFieldsDetail } from '@/api/fields.js'
import { getCateList } from '@/api/cate.js'
import navigator from '@/components/common/navigator.vue'
import info from './components/info.vue'
import tab from './components/tab.vue'
export default {
	data(){
		return {
			// 地块详情
			fieldsDetail: '',
			// 当前种植品种
			activeCateList: false,
			// 历史种植品种
			historyCateList: '',
			// 是否渲染
			isInfoRender:false,
			isTabRender:false
		}
	},

	components:{
		navigator,info,tab
	},

	mounted(){
		this.getFieldsDetail()
	},

	methods:{
		// 获取地块详情
		getFieldsDetail(){
			getFieldsDetail({
				mapid: this.$route.query.id,
			}).then(res => {
				this.fieldsDetail = res.data
				this.getCateList()
			})
		},

		// 获取农资列表
		getCateList(){
			this.isInfoRender = false
			this.isTabRender = false
			this.activeCateList = []
			this.historyCateList = []
			getCateList({
				userId: process.env.VUE_APP_USERID,
				gismapId: this.$route.query.id,
			}).then(res => {
				res.data.filter(item => {
					if(item.isPlantStatus == 0) this.activeCateList.push(item)
					else this.historyCateList.push(item)
				})
				this.fieldsDetail.catelist = this.activeCateList
				this.isInfoRender = true
				this.isTabRender = true
			})
		}
	}
}
</script>

<style lang="less" scoped>
.fieldsDetail{
	width: 100%;
	// .body{
	// background-color: #fff;
	// 	margin-top: 50px;
	// 	width: 100%;
	// }
}
</style>
