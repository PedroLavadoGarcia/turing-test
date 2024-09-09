<!-- src/pages/Login.vue -->
<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username</label>
          <input v-model="username" id="username" type="text" />
        </div>
        <div>
          <label for="password">Password</label>
          <input v-model="password" id="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  
  const login = () => {
    // Aquí puedes añadir lógica de autenticación
    console.log(`Logging in with ${username.value} and ${password.value}`);
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  