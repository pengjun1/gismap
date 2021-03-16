<template>
  <div class="infoCard">
		<div class="title">基础信息</div>
		<div class="text">
			<div class="label">所有者</div>
			<div class="value">神农0800</div>
		</div>
		<div class="text">
			<div class="label">地块名称</div>
			<div class="value">{{fieldsDetail.mapDescribe}}</div>
		</div>
		<div class="text">
			<div class="label">地块类型</div>
			<div class="value">{{fieldsDetail.mapType == '1' ? '大田' : '山地'}}</div>
		</div>
		<div class="text">
			<div class="label">占地面积</div>
			<div class="value">{{fieldsDetail.mapArea}} 亩</div>
		</div>
		<div class="text">
			<div class="label">地块位置</div>
			<div class="value address" >{{fieldsDetail.address}}</div>
		</div>
		<div class="text">
			<div class="label">地理经度</div>
			<div class="value address" >{{fieldsDetail.longitude}}</div>
		</div>
		<div class="text">
			<div class="label">地理纬度</div>
			<div class="value address" >{{fieldsDetail.latitude}}</div>
		</div>
		<div class="text">
			<div class="label">创建时间</div>
			<div class="value">{{timeformat(fieldsDetail.createTime)}}</div>
		</div>
  </div>
</template>

<script>
export default {
	props:['fieldsDetail']
}
</script>

<style lang="less" scoped>
.infoCard{
	font-size: 14px;
	border-radius: 5px;
	box-shadow: #ccc 0 0 10px 0;
	padding: 5px 10px;
	.title{
		font-size: 20px;
		font-weight: 700;
	}
	.text{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20px 0;
		.label{

		}
		.value{
			color: #666;
		}
	}
}
</style>
