import axios from 'axios'
import { Toast } from 'vant'
import queryStringify from "qs-stringify";

const request = axios.create({
	// eslint-disable-next-line no-undef
	baseURL: process.env.NODE_ENV === 'development' ? '/' : '',
	timeout: 8000 ,
	headers:{
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

// request interceptor
request.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		console.log(config)
		if (localStorage.getItem('indexUrlParams')) {
			config.headers['X-AUTH-TOKEN'] = JSON.parse(localStorage.getItem('indexUrlParams')).token
		}
		if(config.method === 'post') {
			config.data = queryStringify(config.params);
			delete config.params;
		}
		return config
	},
	error => {
		// do something with request error
		return Promise.reject(error)
	}
)

// response interceptor
request.interceptors.response.use(
	response => {
		const res = response.data
		return res
	},
	error => {
		// console.log('err: ' + error.response && error.response.data) // for debug
		Toast.fail(error.response && error.response.data || 'Something wrong !')
		return Promise.reject(error)
	}
)

export default request
