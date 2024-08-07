<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router/index';

const email = ref('');
const password = ref('');

async function login(){
  try {
    const response = await axios.post('http://localhost:3000/api/v1/user/login', 
    {
    email: email.value,
    password: password.value
    });
    localStorage.setItem('userData', JSON.stringify({user: response.data.userInfo}));
    localStorage.setItem('token', JSON.stringify({token: response.data.token}));
    console.log(localStorage.getItem('userData'))
    router.push({ path: '/' });
  } catch (error) {
    console.log(error);
  }
}


</script>

<template>
  <div class="flex flex-col mt-1/2">
    <h1 class="text-emerald-700 text-4xl font-bold leading-loose">SignIN</h1>
    <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="email" placeholder="Enter your email" v-model="email" />
    <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="password" placeholder="Enter your password" v-model="password" />
    <div class="flex flex-row mb-4 justify-center">
      <button class="bg-emerald-400 text-white mr-2" @click="login" >Sign IN</button>
      <button class="bg-white text-emerald-800 border-1 border-emerald-600" @click="router.push('/registration')">Sign UP</button>
    </div>
    <a class="text-sm">Forgot your password?</a>
  </div>
</template>

<style scoped>


</style>
