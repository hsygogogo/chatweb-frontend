import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue'; // 示例组件，请根据实际情况调整
import About from '../components/About.vue'; // 示例组件，请根据实际情况调整
import Hello from '../components/HelloWorld.vue';
import Chat from '../components/Chat.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Test from '../components/Test.vue'
import ImageDisplay from '../components/ImageDisplay.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ChatPage',
      component: Chat
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: About
    },
    {
      path: '/hello',
      name: 'HelloPage',
      component: Hello
    },
    {
      path: '/home',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: Register
    },
    {
      path: '/test',
      name: 'TestPage',
      component: Test
    },
    {
      path: '/image',
      name: 'ImageDisplay',
      component: ImageDisplay
    }
    // 添加更多路由配置
  ]
});
