<template>
  <div>
    <div class="chat-container">
      <div class="chat-header">
        Aggregate ChatGPT
      </div>

      <div class="chat-box" id="chat-box">
        <!-- Messages will appear here -->
      </div>

      <div class="input-container">
        <input type="text" id="input-field" class="input-field" v-model="question" placeholder="Type a message...">
        <button id="send-btn" class="send-btn" @click="askServer">&#8594;</button>
        <div v-if="answer">
        </div>
      </div>
    </div>
    <!-- <h1>向服务器提问</h1>
    <input v-model="question" placeholder="输入你的问题" />
    <button @click="askServer">提问</button>
    <div v-if="answer">
      <h2>服务器回答:</h2>
      <p>{{ answer }}</p>
    </div> -->
  </div>
</template>
 
<script>
export default {
  name: 'TestPage',
  data() {
    return {
      question: '',
      answer: null,
    };
  },
  methods: {
            askServer() {
                fetch(baseurl + '/api/chat/bot', {
                    method: 'POST', // 或 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                        // 可以在这里添加更多的请求头
                    },
                    body: JSON.stringify({
                        'prompt': this.question,
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
                        this.answer = data.resp;
                    }
                    //console.log(data); // 处理响应数据
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
            },

            addMessage(message, sender) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
                messageElement.textContent = message;
                chatBox.appendChild(messageElement);
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
            }
    },
};
</script>
 
<style scoped>
/* 添加一些简单的样式 */
input {
  padding: 10px;
  margin-right: 10px;
}
 
button {
  padding: 10px 20px;
}
</style>
 
