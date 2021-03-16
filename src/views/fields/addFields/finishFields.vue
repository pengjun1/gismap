<template>
  <div class="finishFields">
	  <navigator centerTitle="地块创建成功"></navigator>
    <div class="body">
      <div class="success">
      <i class="el-icon-check"></i>
      <div>地块创建成功</div>
      </div>
      <div class="text">
        您可以进行以下操作
      </div>
      <div class="addType" @click="$router.push('/addFields')">
        继续创建地块
      </div>
      <div class="toFields" @click="toFieldsDetail">
      <i class="el-icon-place"></i> 
      <div>进入地块</div>
      </div>
    </div>
  </div>
</template>

<script>
import navigator from '@/components/common/navigator.vue'
export default {
  data(){
    return {
    }
  },
  components:{
    navigator
  },
  mounted(){
  },
  methods:{
    // 进入地块详情
    toFieldsDetail(){
      this.$router.push({
        path:'/fieldsDetail',
        query:{
          id: this.$route.query.id
        }
      })
    },
  }
}
</script>

<style lang='less' scoped>
.finishFields{
	text-align: center;
  width: 100%;
  .body{
    background-color: #fff;
    padding: 100px 0;
    margin-top: 50px;
    .success{
      color: #409EFF;
      margin-bottom: 80px;
      .el-icon-check{
      font-size: 80px;
      border: 4px solid #409EFF;
      border-radius: 50%;
      padding: 10px;
    }
    div{
      font-size: 20px;
      font-weight: 700;
      margin-top: 10px;
    }
    }
    .text{
      color: #999999;
    font-size: 16px;
      }
    .addType{
    cursor: pointer;
    display: inline-block;
    color:#fff;
    font-size: 16px;
      background-color: #409EFF;
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    margin: 20px 0;
    }
    .toFields{
    cursor: pointer;
    font-size: 18px;
    color: #409EFF;
    display: flex;
    justify-content: center;
    }
  }
}
</style>
