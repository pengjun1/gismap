import request from '@/utils/request.js'
import qs from 'qs'

// 获取农事列表
export function getWorkList(params){
	return request({
		method: 'GET',
		url: '/farmwork/getfarmworklist',
		params,
	})
}

// 添加农事
export function addWork(data){
	return request({
		method: 'POST',
		url: '/farmwork/addfarmwork',
		data: qs.stringify(data),
	})
}




