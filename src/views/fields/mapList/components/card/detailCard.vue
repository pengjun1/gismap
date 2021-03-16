<template>
  <div class="detailCard" v-if="showFieldsDetail">
	  <div class="title">
		  <div class="mapDescribe">
				<div>{{fieldsDetail.mapDescribe}}<i class="el-icon-edit" @click="toEditFields"></i></div>
				<i class="el-icon-error" @click="hideDetailCard"></i>
			</div>
		  <div class="tip">
			<div class="left">
				<div class="mapArea">占地面积: {{fieldsDetail.mapArea}}亩</div>
				<div class="mapType">{{typeList[fieldsDetail.mapType]}}</div>
			</div>
			<div class="toFieldsDeatail"  @click="toFieldsDetail">
				进入地块
				<i class="el-icon-arrow-right"></i>
			</div>
		  </div>
	  </div>
	  <div class="list">
			<div class="item" v-if="fieldsDetail.catelist != null && fieldsDetail.catelist.length != 0">
				<div>
					<img :src="require(`@/assets/image/fields/${fieldsDetail.catelist[0].parentId}.png`)" alt="">
					<div class="name">{{cateList[fieldsDetail.catelist[0].parentId-1]}}</div>
					<!-- <div class="parentId">{{cateList[index]}}</div> -->
				</div>
				<div>{{fieldsDetail.catelist[0].name}}</div>
			</div>
			<div class="item" v-else @click="toAddCate">
					暂无种植品种,点击添加
					<i class="el-icon-circle-plus-outline"></i>
			</div>
	  </div>
  </div>
</template>

<script>
export default {
	props:['fieldsDetail','showFieldsDetail'],
	
	data(){
		return {
			// showFieldsDetail: false,
			// 品种列表
			cateList: this.$store.state.cateList,
			// 地块类型列表
			typeList:['大田','山地'],
		}
	},

	methods:{
		// 隐藏对话框
		hideDetailCard(){
			this.$emit('showAllFields')
			this.$emit('hideDetailCard')
		},

        // 进入地块详情
        toFieldsDetail(){
            this.$router.push({
                path: '/fieldsDetail',
                query: {
                    id: this.fieldsDetail.id
                }
            })
        },

        // 进入编辑地块
        toEditFields(){
            this.$router.push({
                path: '/editFields',
                query: {
                    id: this.fieldsDetail.id
                }
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
	}
}
</script>

<style lang="less" scoped>
.detailCard{
	opacity: .9;
	position: absolute;
	bottom: 1%;
	left: 50%;
	transform: translate(-50%,0%);
	background-color: #fff;
	max-width: 96%;
	width: 500px;
	// height: 300px;
	background-color: #409EFF;
	border-radius: 5px;
	color: #fff;
	.title{
		// height: 80px;
		padding: 10px 20px;
		.mapDescribe{
			font-size: 16px;
			font-weight: 700;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.el-icon-edit{
				cursor: pointer;
				margin: 0  10px ;
			}
			.el-icon-edit:hover{
				color: orange;
			}
			.el-icon-error{
				cursor: pointer;
				font-size: 30px;
			}
		}
		.tip{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10px 0;
			>div{				
				display: flex;
				justify-content: space-between;
				align-items: center;
				.mapType{
					background-color: #71b0ee;
					padding: 2px 10px;
					border-radius: 10px;
					margin: 0 10px;
				}
			}
			.toFieldsDeatail{
				cursor: pointer;
				// font-size: 16px;
				// font-weight: 700;
				padding: 5px 10px;
				border-radius: 10px;
				background-color: #213734;
			}
		}
		
	}
	.list{
		background-color: #ccc;
		// height: 100px;
		.item{
			color: #999;
			cursor: pointer;
			font-size: 14px;
			padding: 0 15px;
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px  solid #ccc;
			background-color: #fff;
			>div{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			img{
				width: 40px;
				margin: 0 5px;
			}
			.el-icon-circle-plus-outline{
				font-size: 25px;
				color: #409EFF;
			}
		}
	}
}
</style>
