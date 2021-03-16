<template>
  	<div class="top">
		<!-- <div class="logo">GisMap</div> -->
		<!-- <div> -->
			<!-- <div class="mapDescribe">产业园</div> -->
			<!-- <div class="mapArea">生产基地面积：未知</div> -->
		<!-- </div> -->
		<!-- <div class="quit">  -->
			<el-button type="primary" class="el-icon-plus" size="mini" @click="$router.push('/addFields')" plain> 新增地块</el-button>
			<el-button type="primary" class="el-icon-notebook-2" size="mini" @click="$emit('showAllFields')"> 所有地块</el-button>
			<el-button type="danger" class="el-icon-right" size="mini" @click="$router.push('/fieldsList')"> 卡片模式</el-button>
		<!-- </div> -->
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.top{
	position: absolute;
	background-color: rgba(0, 0, 0, .8);
	width: 100%;
	top: 0;
	text-align: center;
	height: 50px;
	line-height: 50px;
	z-index: 9;
}
</style>
