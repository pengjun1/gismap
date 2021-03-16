<template>
  <div class="addWork">
	<navigator centerTitle="记农事"></navigator>
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
.addWork{
	width: 100%;
}
</style>
