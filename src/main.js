import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入base.css
import '@/assets/css/base.css'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.themeColor = '#2CD18A'

Vue.prototype.timeformat = (date) => {
  var d = new Date(date)
  return  `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
Vue.prototype.dateformat = (date) => {
  var d = new Date(date)
  return  `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()}`
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
