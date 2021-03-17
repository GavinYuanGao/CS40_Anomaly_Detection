import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import { Popup, Picker } from 'vant';

Vue.use(Popup)
Vue.use(Picker)


Vue.config.productionTip = false

new Vue({
	// 3. 注册router对象
	store,
	router,
  render: h => h(App),
}).$mount('#app')
