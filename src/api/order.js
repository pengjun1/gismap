import request from '@/utils/request.js'
import qs from 'qs'

// 获取订单列表
export function getOrderList(params){
	return request({
		method: 'GET',
		url: '/orderproduct/getorderproductpage',
		params,
	})
}




