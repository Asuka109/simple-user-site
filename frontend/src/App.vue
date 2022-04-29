<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

interface User {
  id: string;
  uname: string;
  password: {
    hashed: string;
    salt: string;
  };
}

type Response<D> = D & { message: string };

const username = ref("");
const password = ref("");
const currentUser = ref("");
const handleLogin = async () => {
  if (!username.value) {
    return alert("请输入用户名");
  }
  if (password.value.length < 6) {
    return alert("密码长度不能小于6位");
  }
  try {
    const res = await axios.post<Response<{ user: User }>>(`http://localhost:8000/api/login`, {
      uname: username.value,
      password: password.value
    });
    console.log('res: ', res);
      console.log('res.status: ', res.status);
    if (res.status === 200) {
      currentUser.value = res.data.user.uname;
    }
    alert(res.data.message);
  } catch (e: any) {
    alert(e.response.data.message);
  }
}
</script>

<template>
  <div>
    <div style="color: green" v-if="currentUser">
      当前用户: {{ currentUser }}
    </div>
    <div>
      <label for="username">用户名</label>
      <input id="username" v-model="username" />
    </div>
    <div>
      <label for="password">密码</label>
      <input id="password" v-model="password" type="password" />
    </div>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
