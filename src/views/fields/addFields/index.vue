<template>
  <div class="addFields">
	  <navigator centerTitle="添加地块"></navigator>
	  <formCard></formCard>
  </div>
</template>

<script>
import navigator from '@/components/common/navigator.vue'
import formCard from './components/formCard.vue'
export default {
	name:'addFields',
	components:{
		navigator,formCard
	}
}
</script>

<style lang="less" scoped>
.addFields{
	width: 100%;
}
</style>
