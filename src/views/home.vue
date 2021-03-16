<template>
  <el-container class="home">

    <!-- 边栏 -->
    <!-- <el-aside width="200px">
      <h5 class="title">GisMap</h5>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#409EFF">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title"><a href="http://124.70.216.87:8080/gismapPC">线上</a></span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title"><a href="http://192.168.1.102:8080/gismapPC">本地</a></span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container> -->

      <!-- 顶栏 -->
      <!-- <el-header>
        <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <el-switch
              v-model="activeMap"
              @change="changeMapUrl"
              active-text=""
              inactive-text="高德/谷歌">
            </el-switch>
            </el-menu-item>
        </el-menu>
      </el-header> -->

      <!-- 主版 -->
      <!-- <el-main v-if="renderFlag"> -->
        <router-view></router-view>
      <!-- </el-main> -->
    <!-- </el-container> -->
  </el-container>
</template>

<script>
export default {
    name:'home',
    data(){
      return {
        renderFlag: true,
        activeMap: true 
      }
    },

    mounted() {
    },

    methods:{
      changeMapUrl() {
        this.renderFlag = false
        setTimeout(() => {
          this.$store.commit('changeMapUrl')
          this.renderFlag = true
        }, 0);
      }
    }
}
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  .el-aside{
    height: 100%;
    color: #fff;
    background-color: #282B32;
    .title{
      font-size: 25px;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
    .el-menu{
      border: none;
    }
  }
  .el-header{
    background-color: '#fff';
  }
  .el-main{
    background-color: #f5f5f5;
  }
}
</style>
