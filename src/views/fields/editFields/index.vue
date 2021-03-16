<template>
  <div class="editFields">
	  <navigator centerTitle="编辑地块"></navigator>
	  <formCard></formCard>
  </div>
</template>

<script>
import navigator from '@/components/common/navigator.vue'
import formCard from './components/formCard.vue'
export default {
	name:'editFields',
	components:{
		navigator,formCard
	}
}
</script>

<style lang="less" scoped>
.editFields{
	width: 100%;
}
</style>
