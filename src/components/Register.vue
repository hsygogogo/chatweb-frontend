<template>
  <div>
    <h2>Register Form</h2>
    <form id="loginForm">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username"><br>
      <label for="age">Age:</label><br>
      <input type="text" id="age" name="age"><br>
      <label for="gender">Gender:</label><br>
      <input type="text" id="gender" name="gender"><br>
      <label for="mobileno">Mobile No:</label><br>
      <input type="text" id="mobileno" name="mobileno"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password"><br>
      <label for="password2">Repeat Password:</label><br>
      <input type="password" id="password2" name="password2"><br><br>
      <button v-on:click="validateRegister()">注册</button>
    </form>
  </div>
</template>
 
<script>
export default {
name: 'RegisterPage',
 methods: {
  validateRegister() {
    // 获取用户输入  
    var username = document.getElementById("username").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var mobile_no = document.getElementById("mobileno").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    //console.log(username)

    // 这里为了简单，我们不进行真正的验证，只是检查用户名和密码是否非空  
    if (username.trim() !== "" && password.trim() !== "" && password2.trim() !== "" && password.trim() === password2.trim()) { // && repeat_password.trim() !== "" && password.trim() == repeatpassword.trim()) {  
        // 假设验证通过，进行页面跳转  
        // 这里只是简单跳转到另一个页面，实际应用中你可能需要根据用户权限跳转到不同的页面  
        fetch(baseurl + '/api/login/register', {
                method: 'POST', // 或 'PUT'  
                headers: {  
                    'Content-Type': 'application/json',
                    // 可以在这里添加更多的请求头  
                },
                body: JSON.stringify({
                    'username': username,
                    'age': age,
                    'gender': gender,
                    'mobile_no': mobile_no,
                    'password': password,
                    'repeat_password': password2
                    // 这里是你想要发送的数据  
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json(); // 解析JSON数据  
            })
            .then(data => {
                if (data.code !== 200) {
                    alert(data.message)
                } else {
                    alert("Register successfully!")
                    window.location.href = "userList.html";
                }
                //console.log(data); // 处理响应数据  
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    } else if (username.trim() === "" || password.trim() === "" || password2.trim() === "") {
        alert("Username and Password can't be empty!")
    } else {
        alert("repeated password incorrect!")
    }
  }
 }
}
</script>
