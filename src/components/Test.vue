<template>
  <div class="chat-window">
    <div class="messages">
      <div class="message user-message" v-for="(message, index) in userMessages" :key="index">
        <p>{{ message }}</p>
      </div>
      <div class="message bot-message" v-for="(message, index) in botMessages" :key="index">
        <p>{{ message }}</p>
      </div>
    </div>
    <input
      v-model="userInput"
      @keyup.enter="sendMessage"
      placeholder="Type your message..."
      class="input-field"
    />
    <button @click="sendMessage" class="send-button">Send</button>
  </div>
</template>

<script>

export default {
  name: "TestPage",
  data() {
    return {
      userInput: '',
      userMessages: [],
      botMessages: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() === '') return;

                fetch(baseurl + '/api/chat/bot', {
                    method: 'POST', // 或 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                        // 可以在这里添加更多的请求头
                    },
                    body: JSON.stringify({
                        'prompt': this.userInput,
                        'model': "deepseek-v3"
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
                        this.userMessages.push(this.userInput);
                        this.botMessages.push(data.resp);
                    }
                    //console.log(data); // 处理响应数据
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                    this.botMessages.push('Sorry, I could not understand your message.');
                });
    },
  },
};
</script>

<style scoped>
.chat-window {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.messages {
  height: 300px;
  overflow-y: auto;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.message {
  margin: 10px 0;
}

.user-message {
  text-align: right;
}

.bot-message {
  text-align: left;
}

.input-field {
  width: calc(100% - 60px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.send-button {
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
