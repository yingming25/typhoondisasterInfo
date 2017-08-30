// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import Navbar from './components/partials/Navbar'
import Hello from './components/Hello'




Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.component('navbar', Navbar);
Vue.component('hello', Hello);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, Hello, Navbar }
})
