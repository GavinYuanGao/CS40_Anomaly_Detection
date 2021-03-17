import Vue from 'vue';
import VueRouter from 'vue-router';
import RepaymentInfo from '../views/ReapymentInfo'

Vue.use(VueRouter);

// 1. 编写路由规则
const routes = [
	{
		path: '/', name: 'RepaymentInfo', component: RepaymentInfo
	},
	{
		path: '/personalBank', name: 'PersonalBank',
		component: () => import(/* webpackChunkName: "personalBank" */ '../views/repaymentGuide/PersonalBank.vue')
	},
	{
		path: '/oxxo_cash', name: 'OXXO_CASH',
		component: () => import(/* webpackChunkName: "oxxo_cash" */ '../views/repaymentGuide/OXXO_CASH.vue')
	},
  {
    path: '/clabe', name: 'Clabe',
    component: () => import(/* webpackChunkName: "clabe" */ '../views/repaymentGuide/Clabe.vue')
  }
]

// 2. 创建router对象
const router  = new VueRouter({
	routes
})

export default router
