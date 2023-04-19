/*
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-01-04 14:10:22
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-19 11:32:08
 */

import Vue from 'vue'
import App from './App.vue'
// import '../plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
// import axios from 'axios'
import router from './router'
import service from './service'
import echarts from 'echarts'


Vue.use(ElementUI)
// Vue.prototype.axios = axios // 挂载到原型,可以在全局使用
Vue.prototype.service = service // 挂载到原型,可以在全局使用
Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果在本地存储中没有找到名为 "token" 的键值对和 ”username“的键值对，
  // 就会将用户重定向到登录页面，否则允许用户继续访问该路由。
  if (!localStorage.getItem('token')  || !localStorage.getItem('username') ) {
    // 判断路由的时候排除注册页
    if(to.path == "/register"){
      next()
    }else{
      if (to.path !== '/login') {
        next('/login')
      } else{
        next()
      }
    }

  } next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
