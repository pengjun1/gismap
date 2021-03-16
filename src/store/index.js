import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	cateList:['水稻','小麦','玉米'],
	toogleFlag: true,
    // mapUrl: 'https://map.snkoudai.com/maps/vt/lyrs=s&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galile',
	GoogleS:'https://www.ahyicun.cn/maps/vt/lyrs=s&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galile',
	GoogleM:'https://www.ahyicun.cn/maps/vt/lyrs=m&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galile',
  },
  mutations: {
    changeMapUrl (state) {
		if(state.toogleFlag){
			state.toogleFlag = false
			state.mapUrl = state.GaodeS
		}else {
			state.toogleFlag = true
			state.mapUrl = state.GoogleS
		}
		console.log(state.mapUrl);
    }
  }
})

export default store
