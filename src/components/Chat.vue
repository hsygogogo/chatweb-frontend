<template>
  <div>
    <h1>Chat Page</h1>
    <script>
        var isUserInfoShown = false;
    </script>
    <div class="page-header">
        <div class="versionSelector">
            <label for="chatgpt-version">Version:</label>
            <select id="chatgpt-version" v-model="selectedVersion" @change="switchVersion">
                <!--<option value="deepseek-v3">DeepSeek-V3</option>-->
                <option value="spark-4.0-ultra">Spark-4.0 Ultra</option>
            </select>
        </div>
        <div class="loginInfo">
            <div class="register">
                <div class="myButton">
                    <input type="button" @click="redirectLoginPage" value="登录" />
                </div>
                <div class="myButton">
                    <input type="button" @click="redirectRegisterPage" value="注册" />
                </div>
            </div>
        </div>
        <div class="userLoginInfo" onclick="showUserInfo()">
            UserLoginInfo
            <div class="userLoginInfoDetail" id="user-login-info-detail">
                <a href="#">Profile</a>
                <a href="#">History</a>
                <a href="#">Sign Out</a>
            </div>
        </div>
        <script>
            function showUserInfo() {
                alert("showUserInfo is called!")
                if (isUserInfoShown){
                    document.getElementById('user-login-info-detail').style.display='block';
                }
                document.getElementById('user-login-info-detail').style.display='block';
            }
        </script>
    </div>
    <ImageDisplay />
    <div class="layer-2">
        <div class="tablet">
            <div class="tablet-item">
                New Window
            </div>
            <div class="tablet-item">
                Recent
            </div>
            <div class="tablet-item">
                7 days ago
            </div>
            <div class="tablet-item">
                History
            </div>
        </div>
        <div class="main-block">
            <div class="chat-container">
                <div class="chat-header">
                    Aggregate ChatGPT
                </div>

                <div class="chat-box" id="chat-box" ref="chatBox">
                    <!-- Messages will appear here -->
                    <div class="message" v-for="(message, index) in Messages" 
                         :key="index" 
                         :class="{'user-message':isFromUser(message[1]), 'bot-message':!isFromUser(message[1])}"> 
                      <p>{{ message[0] }}</p>
                    </div>
                </div>

                <div class="input-container">
                    <input type="text" v-model="userInput" id="input-field" class="input-field" @keyup.enter="sendMessage" placeholder="Type a message...">
                    <button id="send-btn" class="send-btn" @click="sendMessage">&#8594;</button>
                </div>
            </div>
        </div>
    </div>
    <ContactInfo />
  </div>
</template>
 
<script>
import ImageDisplay from '../components/ImageDisplay.vue';
import ContactInfo from '../components/ContactInfo.vue';

export default {
  name: 'ChatPage',
  components: {
    ImageDisplay,
    ContactInfo
  },
  data() {
    return {
      userInput: '',
      Messages: [],
      selectedVersion: 'spark-4.0-ultra',
      //botMessages: [],
    };
  },

  methods: {
    switchVersion() {
      alert("Current model: " + this.selectedVersion);
    },
    addMessage(message,sender) {
      const messageElement = [message,sender];
      this.Messages.push(messageElement);
      this.scrollToBottom();
    },
    isFromUser(sender) {
      return sender === "user";
    },
    sendMessage() {
      if (this.userInput.trim() === '') return;
      this.addMessage(this.userInput,'user')
      fetch( baseurl + '/api/chat/bot', {
        method: 'POST', // 或 'PUT'
        headers: {
          'Content-Type': 'application/json',
          // 可以在这里添加更多的请求头
        },
        body: JSON.stringify({
          'prompt': this.userInput,
          'model': this.selectedVersion,
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
          this.addMessage(data.resp,"bot");
          this.userInput=''
          //this.userMessages.push(this.userInput);
          //this.botMessages.push(data.resp);
        }
        //console.log(data); // 处理响应数据
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        this.addMessage('Sorry, I could not understand your message.','bot');
      });
      this.scrollToBottom();
    },
    scrollToBottom() {
      const chatBox = this.$refs.chatBox;
      chatBox.scrollTop = chatBox.scrollHeight;
    },
    redirectLoginPage() {
      this.$router.push('/login');
    },
    redirectRegisterPage() {
      this.$router.push('/register');
    },
  },
}
</script>

<style scoped>

        /* Reset default margin and padding */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f7f7f8;
        }

        /* Main container for the chat */
        .chat-container {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin: 5px auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            height: 500px;
            border: 0px solid black;
            width: 100%;
        }

        .page-header {
            height: 50px;
            margin: 10px auto;
            font-family: "微软雅黑";
            font-size: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .layer-2 {
            margin: 10px auto;
            font-family: "微软雅黑";
            font-size: 20px;
            display: flex;
            flex-direction: row;
            flex: 100%;
            border: 0px solid red;
        }
        .versionSelector {
            height: 20px;
            margin-top: 10px;
            margin-left: 10px;
            font-family: "微软雅黑";
            font-size: 10px;
            max-width: 400px;
        }
        .register {
            height: 20px;
            margin-top: 10px;
            margin-right: 10px;
            font-family: "微软雅黑";
            font-size: 10px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            max-width: 400px;
        }
        .myButton:hover {
            cursor: pointer;
        }
        .full-page {
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: row;
            gap: 10px;
            background-color: #fafafa;
        }

        .main-block {
            flex: 4;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #fafafa;
            border: 0px solid pink;
        }

        .tablet {
            flex: 1;
            overflow-x: auto;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #fafafa;
            border-right: 2px solid silver;
        }
        /* Chat header */
        .chat-header {
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            border-radius: 10px 10px 0 0;
            border: 0px solid green;
        }

        /* The chat box where messages appear */
        .chat-box {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #fafafa;
            border: 0px solid blue;
        }

        /* Each message bubble */
        .message {
            max-width: 70%;
            padding: 10px;
            border-radius: 20px;
            font-size: 14px;
            line-height: 1.5;
            text-align: left;
            border: 0px solid pink;
        }

        .user-message {
            background-color: #dcf8c6;
            align-self: flex-end;
        }

        .bot-message {
            background-color: #e1e1e1;
            align-self: flex-start;
        }

        /* Input area */
        .input-container {
            display: flex;
            padding: 10px;
            background-color: #fff;
            border-radius: 0 0 10px 10px;
            border-top: 1px solid #ddd;
        }
        .input-field {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 25px;
            font-size: 14px;
        }

        .send-btn {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 50%;
            margin-left: 10px;
            cursor: pointer;
            font-size: 16px;
        }

        .send-btn:hover {
            background-color: #45a049;
        }
        .loginInfo {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            background-color: #fafafa;
            border: 0px solid purple;
        }

        /* 样式：按钮 */
        .userLoginInfo {
            position: relative;
            display: inline-block;
            font-size: 16px;
            margin-top: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }

        .userLoginInfo:hover {
            background-color: #45a049; /* 悬停时按钮颜色变换 */
        }
        /* 下拉列表容器 */
        .userLoginInfoDetail {
            display: none;  /* 默认隐藏 */
            /*position: absolute;*/
            background-color: #f9f9f9;
            /*min-width: 160px;*/
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
        }

        /* 下拉项 */
        .userLoginInfoDetail a {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            border-bottom: 1px solid #ddd;
        }

        .userLoginInfoDetail a:hover {
            background-color: #f1f1f1;
        }

        /* 当按钮被悬停时显示下拉列表 */
        .userLoginInfo:hover .userLoginInfoDetail {
            display: block;
        }
        .tablet-item {
            text-shadow: 1px 1px 2px red, -1px -1px 2px blue;
            display: block;
            background-color: #f1f1f1;
            border: 1px solid #ddd;
            text-align: center;
        }
</style>
