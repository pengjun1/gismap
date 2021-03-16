<template>
  <div class="login">
    <el-form ref="form" :model="form" size="medium" label-width="80px">
      <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item  label="验证码">
        <el-input v-model="form.code" placeholder="请输入密码" class="codecss"></el-input>
        <el-image class="code"  src="http://192.168.1.102:8888/common/kaptcha"></el-image>
      </el-form-item> -->
		<el-button type="success" @click="login">登 录</el-button>
    </el-form>

  </div>
</template>

<script>
  export default {
    name:'login',
    data(){
      return {
        form:{
          username:'123456',
          password:'123456',
          code:'',
        },
        codeImg:''
      }
    },
    mounted(){
    },
    methods:{
		login(){
			this.$router.push('/home')
		}
    }
  }
</script>

<style lang="less" scoped>
  .login{
      //font-size: 100px;
      .el-form{
        margin: 100px auto;
        width: 400px;
      }
      img{
        width: 200px;
        height: 200px;
      }
      .codecss{
        width: 140px;
      }
	  .code{
		  position: absolute;
		  height: 100%;
	  }
		.el-button{
			width: 100%;
			margin: .2rem 0;
		}

  }
</style>
