import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import VCharts from 'v-charts'
import './assets/css/index.scss'
import 'ant-design-vue/dist/antd.css'
import router from './router'

// 全局引入SvgIcon组件
import '@/components/Icon/index.js'
import Icon from '@/components/Icon/SvgIcon.vue'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VCharts)
Vue.component('Icon', Icon)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
