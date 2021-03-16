<template>
  <div class="workCard">
	  <div class="top">
		  <div class="left">
			  <div class="time">{{dateformat(workDetail.createTime)}}</div>
			  <div class="work">{{farmTypelist[workDetail.farmType]}}</div>
		  </div>
		  <div class="right">
			  <img src="@/assets/image/fields/user.png" alt="">
		  </div>
	  </div>
	  <div class="bottom">
		  <div class="order" v-for="item in workDetail.opvlist" :key="item.id">
			  <div class="productName">{{item.productName}}</div>
			  <!-- <div class="orderCode">{{item.orderCode}}</div> -->
			  <div class="productDosage">{{"×" + item.productDosage}}</div>
		  </div>
		  <div class="content" v-html="workDetail.farmContent"></div>
		  <div class="img"></div>
	  </div>
  </div>
</template>

<script>
export default {
	props:['workDetail'],
	data() {
		return {
			farmTypelist: ['移栽','采收','种植结束','打农药','施肥']
		}
	}

}
</script>

<style lang="less" scoped>
.workCard{
	font-size: 14px;
	border-radius: 5px;
	box-shadow: #ccc 0 0 10px 0;
	padding: 10px 20px;
	.top{
		margin: 10px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.time{
				color: #fff;
				font-size: 12px;
				padding: 2px 10px;
				display: inline-block;
				background-color: #409EFF;
				border-radius: 5px;
			}
			.work{
				font-size: 16px;
				font-weight: 700;
				margin: 0 20px;
			}
		}
		.right{
			img{
				width: 20px;
			}
		}
	}
	.bottom{
		margin: 15px 0;
		.order{
			// width: 300px;
			font-size: 12px;
			background-color: #ddd;
			padding: 5px 10px;
			margin: 5px 0;
			border-radius: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.content{
			color: #666;
			margin: 20px 5px;
		}
		.img{}
	}
}
</style>
