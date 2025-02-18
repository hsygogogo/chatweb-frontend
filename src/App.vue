<template>
  <div id="app">
    <nav class="navigation" :style="{ width: isWindowsDevice ? '30%' : '90%'}">
      <router-link to="/">
        Chat
      </router-link>
      
      <router-link to="/about">
        About
      </router-link>
      
      <router-link to="/hello">
        Hello
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      </router-link>
      <router-link to="/home">
        Home
      </router-link>
      <router-link to="/login">
        Login
      </router-link>
      <router-link to="/register">
        Register
      </router-link>
      <router-link to="/image">
        Image
      </router-link>
    </nav>
    <!-- <p v-if="isWindowsDevice">You are using a Windows device.</p>
    <p v-else>You are using a mobile device.</p> -->
    <router-view></router-view> <!-- 路由匹配的组件将渲染在这里 -->
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
// import VueDeviceDetector from 'vue-device-detector'
export default {
  name: 'App',
  data() {
    return {
      userInput: '',
      //botMessages: [],
    };
  },
  computed: {
    //isMobile() {
    //  alert("current device:");
    //  return this.$device;
    //},
    isTablet() {
      return this.$device.isTablet();
    },
    isWindowsDevice() {
      return this.$device.windows;
    },
  },

  methods: {
    isMobile() {
      alert("current device:" + this.$device.isMobile());
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.navigation {
  width: 30%;
  background-color: silver;
  font-family: Avenir, Helvetica, Arial;
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
}
</style>
