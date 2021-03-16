import request from '@/utils/request.js'
import qs from 'qs'

// 获取种植品种列表
export function getCateList(params){
	return request({
		method: 'GET',
		url: '/category/getmapcatelist',
		params,
	})
}

// 添加种植品种
export function addCate(data){
	return request({
		method: 'POST',
		url: '/category/addmapcate',
		data: qs.stringify(data),
	})
}

// 编辑种植品种
export function editCate(data){
	return request({
		method: 'POST',
		url: '/category/updatemapcate',
		data: qs.stringify(data),
	})
}

// 删除种植品种
export function removeCate(data){
	return request({
		method: 'POST',
		url: '/category/delcate?cateId='+data.id,
	})
}

// 采收
export function recCate(data){
	return request({
		method: 'POST',
		url: '/category/updaterecover',
		data: qs.stringify(data),
	})
}

// 种植结束
export function endCate(data){
	return request({
		method: 'POST',
		url: '/category/updateplant',
		data: qs.stringify(data),
	})
}
