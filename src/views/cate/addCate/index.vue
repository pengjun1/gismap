<template>
  <div class="addCate">
	<navigator centerTitle="添加种植品种"></navigator>
	<formCard></formCard>
  </div>
</template>

<script>
import navigator from '@/components/common/navigator.vue'
import formCard from './components/formCard.vue'
export default {
	components:{
		navigator,formCard
	}
}
</script>

<style lang="less" scoped>
.addCate{
	width: 100%;
	// .body{
		// margin-top: 50px;
		// padding: 20px 30px;
		// background-color: #fff;
	// }
}
</style>
