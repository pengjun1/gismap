<template>
  <div class="fieldsCard">
    <!-- 主体 -->
	  <div class="body">
      <MapBox :fieldsDetail="fieldsDetail" v-if="fieldsDetail"/>
      <div class="masker">
        <!-- <div class="btn">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click.stop="editFields"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.stop="removeFields"></el-button>
        </div> -->
        <div class="info">
          <div class="cate">{{fieldsDetail.catelist.length != 0 ? cateList[fieldsDetail.catelist[0].parentId-1] : '暂无种植品种'}}</div>
          <div>{{fieldsDetail.catelist.length != 0 ? '·' : ''}}</div>
          <div class="name">{{fieldsDetail.catelist.length != 0 ? fieldsDetail.catelist[0].name : ''}}</div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="fieldsName">{{fieldsDetail.mapDescribe}}</div>
      <div class="mapArea">{{fieldsDetail.mapArea}} 亩</div>
    </div>
  </div>
</template>

<script>
import { removeFields } from '@/api/fields.js'
import MapBox from '@/components/map/mapBox.vue'
export default {
  props:['fieldsDetail'],
  data(){
   return {
     cateList: this.$store.state.cateList
   }
  },
  components:{
    MapBox
  },
  methods:{
    // 编辑地块
    editFields(){
			this.$router.push({
				path: '/editFields',
				query: {
					id: this.fieldsDetail.id
				}
			})
    },

    // 删除地块
    removeFields(){
        this.$confirm('此操作将永久删除该地块, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          //  center: true
        }).then(() => {
          removeFields({
            id: this.fieldsDetail.id
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.msg
            });
            this.$emit('updateFieldsList')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
}
</script>

<style lang="less" scoped>
.fieldsCard{
  font-size: 12px;
  background-color: #fff;
  width: 44%;
  max-width: 200px;
  height: 230px;
  cursor:pointer;
  margin: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  .body{
    position: relative;
    height: 80%;
    background-color: #ccc;
    .masker{
      opacity: 1;
      background-color: rgba(0, 0, 0, 0);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      .btn{
        opacity: .5;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .info{
        color: #fff;
        font-size: 12px;
        line-height: 40px;
        position: absolute;
        left: 10px;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        >div{
          margin: 0 2px;
        }
      }
    }
    .masker:hover{
      opacity: 1;
      transition: all 1s;
    }
  }
  .footer{
    padding: 0 10px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mapArea{
      color: #409EFF;
      font-size: 12px;
      border: 1px solid #409EFF;
      border-radius: 20px;
      padding: 2px 4px;
    }
  }
}
.fieldsCard:hover{
  transition:all  .3s;
  // border: 10px solid red;
  box-shadow: #666 0 10px 10px 2px ;
}
</style>
