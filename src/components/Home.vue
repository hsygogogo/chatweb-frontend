<template>
  <div>
    <!-- <h1>Home Page</h1> -->
    <h1>比大小</h1>
    <div>
      <p>你的分数: {{ scoreA }}</p>
      <p>对方分数: {{ scoreB }}</p>
    </div>
    <input v-model="inputNum" @keyup.enter="askServer" placeholder="输入一个数字" />
    <button @click="askServer">go</button>
    <button @click="restartGame">重新开始</button>
    <div v-if="inputNum">
      <p>你的数字: {{ inputNum }}</p>
    </div>
    <div v-if="inputNum && answer">
      <p>对方数字: {{ answer }}</p>
      <button @click="confirmResult">确认</button>
    </div>
    
  </div>
</template>
 
<script>
export default {
  name: 'HomePage',
  data() {
    return {
      inputNum: null,
      answer: null,
      scoreA: 0,
      scoreB: 0,
      isConfirmed: true,
    };
  },
  methods: {
    confirmResult() {
      this.inputNum=null;
      this.answer=null;
      this.isConfirmed=true;
    },
    askServer() {
      if (!this.isConfirmed) return;
      fetch('http://1.94.30.120/api/game/play', {
        method: 'POST', // 或 'PUT'
          headers: {
            'Content-Type': 'application/json',
            // 可以在这里添加更多的请求头
          },
          body: JSON.stringify({
            'inputNum': this.inputNum,
            // 这里是你想要发送的数据
          }),
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // 解析JSON数据
      })
      .then(data => {
        if (data.code!==200) {
          alert(data.message)
        } else {
          //alert(data.data)
          //window.location.href = "userList.html"; // 假设登录成功后跳转到dashboard.html
          this.answer = data.resp.numB;
          this.scoreA = data.resp.scoreA;
          this.scoreB = data.resp.scoreB;
          this.isConfirmed = false;
        }
        //console.log(data); // 处理响应数据
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
    },

    restartGame() {
      fetch('http://1.94.30.120/api/game/restart', {
        method: 'POST', // 或 'PUT'
          headers: {
            'Content-Type': 'application/json',
            // 可以在这里添加更多的请求头
          },
          body: JSON.stringify({
            'inputNum': this.inputNum,
            // 这里是你想要发送的数据
          }),
        })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // 解析JSON数据
      })
      .then(data => {
        if (data.code!==200) {
          alert(data.message)
        } else {
          //alert("Game Restarted!")
          //window.location.href = "userList.html"; // 假设登录成功后跳转到dashboard.html
          this.inputNum = null;
          this.answer = null;
          this.scoreA = 0;
          this.scoreB = 0;
          this.isConfirmed = true;
        }
        //console.log(data); // 处理响应数据
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
    },
  },
  mounted() {
    // 组件挂载后开始自动播放
    this.restartGame();
  },
};
</script>

<style scoped>
  .score {
    width: 40%;
    height: 50px;
    font-family: "微软雅黑";
    font-size: 15px;
    background-color: lightgreen;
    text-align: "left";
  }
  .scoreitem {
    display: inline-block;
  }
</style>
