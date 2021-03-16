import axios from 'axios'

// 实例化并挂载到vue原型对象
const request = axios.create({
     baseURL: process.env.VUE_APP_BASEURL,
     timeout: 5000,
     responseType: 'json'
})

// 响应拦截器
request.interceptors.response.use(function(data){
      if(data.status != 200) console.log(data.statusText);
      if(data.data.status != true) console.log(data.data.msg);
	  console.log(data.data);
      return data.data; 
})

export default request
