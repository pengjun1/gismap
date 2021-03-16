<template>
  <div class="navigator">
    <div class="left">
      <i class="el-icon-back" @click="$router.back()"></i>
      <div  @click="$router.back()">{{leftTitle}}</div>
      <!-- <div style="margin:0 5px">|</div> -->
      <!-- <div  @click="$router.push('/fieldsList')"> 首页</div> -->
    </div>
    <div class="center">{{centerTitle}}</div>
    <div class="right" @click="$router.push('/mapList')" >首页</div>
  </div>
</template>

<script>
export default {
  props:{
    leftNav : {
      default: false
    },
    leftTitle : {
      default: '上一级'
    },
    centerTitle : {}
  }
}
</script>

<style lang="less" scoped>
.navigator{
  font-size: 14px;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
  box-shadow: #ccc 0px 5px 20px 0px ;
  .left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .el-icon-back{
      font-size: 14px;
      font-weight: 400;
      margin-right: 5px;
    }
  }
  .center{
    font-size: 18px;
  }
  .right{
    cursor: pointer;
  }
}
</style>
