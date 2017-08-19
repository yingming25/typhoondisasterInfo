import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Mapstatus from '@/components/Mapstatus'
//import Static from '@/components/Static'
//import Chatroom from '@/components/Chatroom'
import VueRouter from 'vue-router'

Vue.use(Router)
Vue.use(VueRouter)




export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/hello'
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Mapstatus',
      name: 'MapStatus',
      component: Mapstatus,
    },
    /*{
      path: '/static',
      name: 'Static',
      component: Static
    },
    {
      path: '/chatroom',
      name: 'Chatroom',
      component: Chatroom
    }*/
  ]
})

/*new Vue({
  router,
  template: `
    <div id="app">
      <nav class="navbar navbar-toggleable-md navbar-light bg-faded sticky-top">
    <a class="navbar-brand" href="#">Navbar</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ path: '/hello' }">入口頁面</router-link>
        </li>
        <!--<li class="nav-item">
          <router-link class="nav-link" :to="{ path: '/static' }">樣板頁面</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ path: '/chatroom' }">聊天室</router-link>
        </li>-->
      </ul>
    </div>
  </nav>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')*/
