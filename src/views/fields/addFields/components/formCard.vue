<template>
	<div class="formCard">
		<!-- <div class="title">地块信息</div> -->
		<el-form ref="form" :model="addInfoData" label-width="80px">
			<el-form-item label="地块名称" required >
				<el-input v-model="addInfoData.mapDescribe" maxlength="8" placeholder="例如：一号大田、一号山地（不超过8个字符）"></el-input>
			</el-form-item>
			<el-form-item label="地块类型" required >
				<el-radio-group v-model="addInfoData.mapType" size="medium">
					<el-radio border :label="0">大田</el-radio>
					<el-radio border :label="1">山地</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="所有者" required>
				<el-input v-model="addInfoData.mapPeople" readonly></el-input>
			</el-form-item>
			<el-form-item label="地块面积" required >
				<el-input v-model="addMapData.mapArea" readonly placeholder="绘制轮廓后自动计算">
					<div slot="append">亩</div>
				</el-input>
			</el-form-item>
			<el-form-item label="地块绘制" required >
				<el-tooltip class="item" v-if="!mapShow" effect="dark" content="Tips：绘制地块轮廓有助于让消费者知晓农产品来源于哪个真实地块，可提升消费者的信任度" placement="bottom">
					<el-button class="el-icon-edit" @click="dialogShow = true"> 绘制地块真实轮廓</el-button>
				</el-tooltip>
				<div class="newMap" v-if="mapShow">
					<mapBox :fieldsDetail="{id:'map123',...addMapData}" v-if="addMapData.lnglats"></mapBox>
					<div class="masker">
						<div class="btn">
							<!-- <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editFields"></el-button> -->
							<el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeMap"></el-button>
						</div>
					</div>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button class="finish" type="primary" size="medium" :disabled="!('mapDescribe' in this.addInfoData && this.addInfoData.mapDescribe !='' && 'mapType' in this.addInfoData && 'mapArea' in this.addMapData)" @click="addFields">完 成</el-button>
			</el-form-item>
		</el-form>


		<el-dialog
		title="请拖动地图至农场所在地，然后点击“开始绘制”按钮进行地块区域绘制。"
		:visible.sync="dialogShow"
		width="80%"
		center>
			<div>你好</div>
			<addMap @getNewMap="getNewMap" v-if="dialogShow" :startFlag="startFlag"></addMap>
		</el-dialog>
	</div>
</template>

<script>
import mapBox from '@/components/map/mapBox.vue'
import addMap from '@/components/map/addMap.vue'
import { addFields } from '@/api/fields.js'
export default {
	name:'formCard',
	data(){
		return{
			addInfoData: {
				platformUserId: process.env.VUE_APP_USERID,
				mapPeople: process.env.VUE_APP_USERNAME,
			},
			addMapData:{},
			dialogShow:false,
			mapShow: false,
			startFlag:0,
		}
	},
	components: {
		mapBox,addMap
	},
	mounted(){
	},
	methods: {
		// 新增地块信息
		addFields(){
			addFields({
				...this.addInfoData,
				...this.addMapData
			}).then(res => {
				this.$message({
					type: 'success',
					message: res.msg
				});
				this.$router.push({
					path: '/finishFields',
					query: {
						id :res.data.id
					}
				})
			})
		},

		// 获取绘制的地图
		getNewMap(addMapData){
			this.addMapData = addMapData
			this.dialogShow = false
			this.mapShow = true
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
		width: 100%;
	}
	.newMap{
		position: relative;
		.mapBox{
			height: 200px;
		}
		.btn{
			// opacity: 0;
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
