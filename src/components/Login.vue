<template>
  <div>
    <h2>Login Form</h2>
    <form id="loginForm">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password"><br><br>
      <button v-on:click="validateLogin()">登录</button>
    </form>
  </div>
</template>
 
<script>
export default {
name: 'LoginPage',
 methods: {
  validateLogin() {
    // 获取用户输入  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 这里为了简单，我们不进行真正的验证，只是检查用户名和密码是否非空  
    if (username.trim() !== "" && password.trim() !== "") {
        // 假设验证通过，进行页面跳转  
        // 这里只是简单跳转到另一个页面，实际应用中你可能需要根据用户权限跳转到不同的页面  
        //window.location.href = "https://www.baidu.com"; // 假设登录成功后跳转到dashboard.html
        fetch(baseurl+'/api/login/login', {
                method: 'POST', // 或 'PUT'  
                headers: {
                    'Content-Type': 'application/json',
                    // 可以在这里添加更多的请求头  
                },
                body: JSON.stringify({
                    'username': username,
                    'password': password
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
                    alert("Login successfully!")
                    window.location.href = "userList.html"; // 假设登录成功后跳转到dashboard.html  
                }
                //console.log(data); // 处理响应数据  
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    } else {
        alert("Username and password cannot be empty!");
    }
  }
 }
}
</script>
