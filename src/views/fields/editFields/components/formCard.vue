<template>
	<div class="formCard">
		<div class="title">地块信息</div>
		<el-form ref="form" :model="editInfoData" label-width="80px">
			<el-form-item label="地块名称" required  label-width="100px">
				<el-input v-model="editInfoData.mapDescribe" maxlength="8" placeholder="例如：一号大田、一号山地(不超过8个字符)"></el-input>
			</el-form-item>
			<el-form-item label="地块类型" required  label-width="100px">
				<el-radio-group v-model="editInfoData.mapType" size="medium">
					<el-radio border :label="0">大田</el-radio>
					<el-radio border :label="1">山地</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="所有者" required label-width="100px">
				<el-input v-model="editInfoData.mapPeople" readonly></el-input>
			</el-form-item>
			<el-form-item label="地块面积" required  label-width="100px">
				<el-input v-model="editMapData.mapArea" readonly placeholder="绘制轮廓后自动计算（单位：亩）">
					<div slot="append">亩</div>
				</el-input>
			</el-form-item>
			<el-form-item label="地块绘制" required  label-width="100px">
				<el-tooltip class="item" v-if="!mapShow" effect="dark" content="Tips：绘制地块轮廓有助于让消费者知晓农产品来源于哪个真实地块，可提升消费者的信任度" placement="bottom">
					<el-button class="el-icon-edit" @click="dialogShow = true"> 绘制地块真实轮廓</el-button>
				</el-tooltip>
				<div class="newMap" v-if="mapShow">
					<mapBox :fieldsDetail="{...editInfoData,...editMapData}" v-if="editMapData.lnglats"></mapBox>
					<div class="masker">
						<div class="btn">
							<el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editMap"></el-button>
							<!-- <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeMap"></el-button> -->
						</div>
					</div>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button class="finish" type="primary" size="medium" :disabled="!(this.editInfoData.mapDescribe.length!=0 && this.editInfoData.mapType.length!=0 && this.editMapData.mapArea.length!=0)" @click="editFieldsInfo">完 成</el-button>
			</el-form-item>
		</el-form> 


		<el-dialog
			title="请拖动地图至农场所在地，然后点击“开始绘制”按钮进行地块区域绘制。"
			:visible.sync="dialogShow"
			width="80%"
			center>
			<editMap @getNewMap="getNewMap" :startFlag="startFlag" :fieldsInfo="editMapData"></editMap>
		</el-dialog>
	</div>
</template>

<script>
import mapBox from '@/components/map/mapBox.vue'
import editMap from '@/components/map/editMap.vue'
import { editFields,getFieldsDetail } from '@/api/fields.js'
export default {
	name:'formCard',
	data(){
		return{
			editInfoData: {
					platformUserId: process.env.VUE_APP_USERID,
					mapPeople: process.env.VUE_APP_USERNAME,
					id: '',
					mapDescribe : '',
					mapType : '',
			},
			editMapData:{
				address : '',
					mapColor: '',
					longitude:'',
					latitude: '',
					mapArea: '',
					lnglats: '',
			},
			dialogShow:false,
			mapShow: true,
			startFlag:3,
		}
	},

	components: {
		mapBox,editMap
	},

	mounted(){
		this.getFieldsDetail()
		if ( this.$route.query.editMap) {
			setTimeout(() => {
				this.dialogShow = true
			}, 1000);
		}
	},

	methods: {
		// 获取地块详情
		getFieldsDetail(){
			getFieldsDetail({
				mapid: this.$route.query.id,
			}).then(res => {
				this.editInfoData = {
					platformUserId: process.env.VUE_APP_USERID,
					mapPeople: process.env.VUE_APP_USERNAME,
					id: res.data.id,
					address : res.data.address,
					mapDescribe : res.data.mapDescribe,
					mapType : res.data.mapType,
					// catelist : res.data.catelist,
				}
				this.editMapData = {
					mapColor: res.data.mapColor,
					longitude: res.data.longitude,
					latitude: res.data.latitude,
					mapArea: res.data.mapArea,
					lnglats: res.data.lnglats,
				}
			})
		},

		// 编辑地块信息
		editFieldsInfo(){
			console.log({
				...this.editInfoData,
				...this.editMapData
			});
			editFields({
				...this.editInfoData,
				...this.editMapData
			}).then(res => {
				this.$message({
					type: 'success',
					message: res.msg
				});
				this.$router.push({
					path: '/fieldsDetail',
					query: {
						id :this.$route.query.id
					}
				})
			})
		},

		// 获取绘制的地图
		getNewMap(editMapData){
			console.log('editMapData',editMapData);
			this.editMapData = false
			this.editMapData = editMapData
			this.dialogShow = false
			setTimeout(() => {
				this.mapShow = true
			}, 1000);
		},

		// 编辑地块
		editMap(){
			this.startFlag = 3
			this.dialogShow = true
		},

		// 删除地块
		removeMap(){
			this.$confirm('删除地块轮廓, 是否继续?', '警告', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
				//  center: true
			}).then(() => {
					this.startFlag = 0
					this.mapShow = false
			})
		}
	},
}
</script>

<style lang="less" scoped >
.formCard{
	background-color: #fff;
	// padding: 100px 0;
	margin-top: 50px;
	// height: 600px;
	// .el-dialog{
	// 	height: 400px;
	// }
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
	}
	/deep/.el-dialog{
		height: 60%;
	}
	.newMap{
		position: relative;
		.mapBox{
			height: 200px;
		}
		.btn{
			opacity: 0;
			position: absolute;
			right: 10px;
			top: 5px;
		}
	}
	.newMap:hover{
		.btn{
			opacity: 1;
		}
	}
}
</style>
