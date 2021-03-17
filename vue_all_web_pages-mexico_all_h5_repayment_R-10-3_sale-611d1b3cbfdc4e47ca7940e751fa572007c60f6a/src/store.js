/**
Created by dechuan on 2020/12/24 18
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		LOADING: false,
		repaymentInfo: {}
	},
	getters: {
		repaymentInfo: state => {
			return state.repaymentInfo
		}
	},
	mutations: {
		updateRepaymentInfo(state, newRepaymentInfo){
			state.repaymentInfo = { ...newRepaymentInfo }
		},
		showLoading(state){
			state.LOADING = true
		},
		hideLoading (state) {
			state.LOADING = false
		}
	}
})

export default store;