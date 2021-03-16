import request from '@/utils/request.js'
import qs from 'qs'

// 获取地块列表
export function getFieldsList(params){
	return request({
		method: 'GET',
		url: '/gismap/getlandpage',
		params,
	})
}

// 获取地块详情
export function getFieldsDetail(params){
	return request({
		method: 'GET',
		url: '/gismap/getgismapbyid',
		params,
	})
}

// 新增地块
export function addFields(data){
	return request({
		method: 'POST',
		url: '/gismap/adduserland',
		data:qs.stringify(data),
	})
}

// 编辑地块
export function editFields(data){
	return request({
		method: 'POST',
		url: '/gismap/updateuserland',
		data:qs.stringify(data),
	})
}

// 删除地块
export function removeFields(params){
	return request({
		method: 'GET',
		url: '/gismap/deluserland',
		params,
	})
}
