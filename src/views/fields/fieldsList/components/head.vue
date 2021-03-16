<template>
  <div class="head">
      <el-button type="primary"  size="mini" icon="el-icon-plus" @click="$router.push('/addFields')" plain>新增地块</el-button>
      <el-button type="warning"  size="mini" icon="el-icon-connection"><a href="http://pengjun.cn.utools.club">在线测试</a></el-button>
      <el-button type="primary"  size="mini" icon="el-icon-map-location" @click="$router.push('/mapList')" >地图模式</el-button>
  </div>
</template>
size="medium" 
<script>
export default {
  data(){
    return {
      searchValue:''
    }
  }
}
</script>

<style lang="less" scoped>
.head{
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
