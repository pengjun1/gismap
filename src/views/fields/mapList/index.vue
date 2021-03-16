<template>
  <div class="fieldsMapList">
    <div class="map">
      <mapBox class="mapBox" :showAll="showAll" :fieldsList="activeList" @clickFields="selectFields" v-if="activeList.length != 0"></mapBox>
    </div>
    <top v-show="showAll"  @showAllFields="getFieldsList"></top>
    <cateCard v-show="showAll" @selectCate="selectCate"></cateCard>
    <fieldsCard v-show="showAll" @selectFields='selectFields' :fieldsList="fieldsList"></fieldsCard>
    <detailCard :fieldsDetail="fieldsDetail"  :showFieldsDetail="showFieldsDetail" @hideDetailCard="showFieldsDetail = false" @showAllFields="getFieldsList"></detailCard>
    
    <el-switch
      v-model="showAll"
      active-color="#13ce66"
      inactive-color="#ff4949">
      展示面板
    </el-switch>
  </div>
</template>

<script>

import mapBox from '@/components/map/mapBox.vue'
import top from './components/top.vue'
import detailCard from './components/card/detailCard.vue'
import cateCard from './components/card/cateCard.vue'
import fieldsCard from './components/card/fieldsCard.vue'
import { getFieldsList } from '@/api/fields.js'
export default {
  name:'fieldsMapList',

  components:{
    mapBox,top,cateCard,fieldsCard,detailCard
  },
  
  data(){
    return {
      // 品种列表
      cateList: this.$store.state.cateList,
      // 地块类型列表
      typeList:['大田','山地'],
      // 所有界面
      showAll: true,

      // 地块列表
      fieldsList:[],
      // 激活品种列表
      activeList:[],
      
      // 地块详情面板
      showFieldsDetail:false,
      // 当前地块详情
      fieldsDetail:{}
    }
  },

  created(){
	  },

  mounted(){
	  this.getFieldsList()
  },

  methods:{
    // 获取地块列表
    getFieldsList(){
      this.showFieldsDetail = false
        // 获取地块列表
      getFieldsList({
        userId: process.env.VUE_APP_USERID,
        status: 0,
        currentPage: 1,
        pageSize: 100
      }).then(res => {
          this.fieldsList = res.data.records
          this.activeList = res.data.records
      })
    },

    // 选择种类
    selectCate(parentId){
      // this.activeCate = parentId
      this.activeList = []
      this.fieldsList.filter(item => {
        if (item.catelist.length != 0 && item.catelist[0].parentId == parentId) {
          this.activeList.push(item)
        }
      })
    },

    // 选择地块
    selectFields(id){
      // this.activeFields = id
      this.activeList = []
      this.fieldsDetail = {}
      this.fieldsList.filter(item => {
        if (item.id == id) {
          this.activeList.push(item)
          this.fieldsDetail = item
        }
      })
      // console.log(this.fieldsDetail);
      this.showFieldsDetail = true
    },

    clickFields(item){
      this.fieldsDetail = item
      this.showFieldsDetail = true
    },

	// 展示地块详情
    showDetail(item,index){
      this.fieldsDetail = item
      this.activeFields = index
      this.activeList = []
      this.activeList.push(this.fieldsList[index])
      this.showFieldsDetail = true
    },

    // 跳转到地块详情
    toFieldsDetail(){
      this.$router.push({
        path:'/fieldsDetail',
        query:{
          id: this.fieldsDetail.id
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.fieldsMapList{
	position: relative;
	width: 100%;
	height: 100%;
	.map{
		width: 100%;
		height: 100%;
	}
  .el-switch{
    position: absolute;
    right: 15px;
    bottom: 15px;
  }
}
</style>
