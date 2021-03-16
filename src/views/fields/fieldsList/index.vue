<template>
  <div class="fieldsList">
      <Head class="head"></Head>
      <div class="body">
        <Card class="card" v-for="item in fieldsList" :key="item.id" :fieldsDetail="item" @updateFieldsList="getFieldsList" @click.native="toFieldsDetail(item.id)"/>
      </div>
  </div>
</template>

<script>
import Card from './components/card.vue'
import Head from './components/head.vue'

import { getFieldsList } from '@/api/fields.js'
export default {
    name:'fieldsList',
    data(){
        return {
            fieldsList:''
        }
    },
    components:{
        Head,
        Card
    },
    mounted(){
        this.getFieldsList()
    },
    methods:{
        // 获取地块列表
        getFieldsList(){
            getFieldsList({
                userId: process.env.VUE_APP_USERID,
                status: 0,
                currentPage: 1,
                pageSize: 100
            }).then(res => {
                this.fieldsList = res.data.records
            })
        },

        // 进入地块详情
        toFieldsDetail(id){
            this.$router.push({
                path: '/fieldsDetail',
                query: {
                    id
                }
            })
        },
    }

}
</script>

<style lang="less" scoped>
.fieldsList{
    width: 100%;
    .body{
        // height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
        padding-top: 60px ;
        // .card{
        //     cursor:pointer;
        //     margin: 10px;
        //     border: 1px solid #ccc;
        //     box-sizing: border-box;
        // }
    }
}
</style>
