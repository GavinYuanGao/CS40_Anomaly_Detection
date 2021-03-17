/**
Created by dechuan on 2020/12/22 12
 */

import request from "./http";
const baseUrl = '/api';

export const getLatestLoanByParams = (params) => {
	// var url = 'loanapp/h5/repayment';
	// if(params.key) {
	// 	url = 'loanapp/h5/latest/repayment'
	// }
	return request({
		url: `${baseUrl}/loanapp/h5/repayment`,
		method: "get",
		params,
	})
}

export const getLatestLoanByToken = (params) => {
	return request({
		url: `${baseUrl}/loanapp/latest`,
		method: "get",
		params,
	})
}

export const getMethodsV2 = (params) => {
	return request({
		url: `${baseUrl}/loanapp/in/deposit/methods`,
		method: "get",
		params,
	})
}

export const createDepositVa = (params) => {
	if(params.token) {
		const { loanAppId, remainAmount: amount } = JSON.parse(localStorage.getItem('repaymentInfo'))
		return request({
			url: `${baseUrl}/loanapp/deposit`,
			method: "post",
			params: { ...params, loanAppId, amount },
		})
	} else {
		return request({
			url: `${baseUrl}/loanapp/h5/deposit`,
			method: "post",
			params,
		})
	}

}


