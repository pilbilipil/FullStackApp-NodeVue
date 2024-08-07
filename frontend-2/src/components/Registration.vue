<script setup>
import axios from 'axios';
import router from '../router/index';
import { ref } from 'vue';

const firstName = ref();
const lastname = ref();
const email = ref();
const phone = ref();
const userPassword = ref();
const dateOfBirth = ref();
const gender = ref('male');
const city = ref('Almaty');
const microdistrict = ref('Aksay-1');
const home = ref();
const flat = ref();

//         FIRST_NAME: body.firstName,
//         LAST_NAME: body.lastName,
//         EMAIL: body.email,
//         PHONE: body.phone,
//         USER_PASSWORD: body.userPassword,
//         DATE_OF_BIRTH: body.dateOfBirth,
//         GENDER: body.gender,
//         CITY: body.city,
//         MICRODISTRICT: body.microdistrict,
//         HOME: body.home,
//         FLAT: body.flat


async function createUser(){
    try {
        const response = await axios.post('http://localhost:3000/api/v1/user', 
        {    
            firstName: firstName.value,  
            lastName: lastname.value,  
            email: email.value,  
            phone: phone.value,  
            userPassword: userPassword.value,  
            dateOfBirth: dateOfBirth.value,  
            gender: gender.value,  
            city: city.value,  
            microdistrict: microdistrict.value,  
            home: home.value,  
            flat: flat.value
        })
        router.push('/login');
        alert('User created');
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-emerald-700 text-4xl font-bold leading-loose">SignUP</h1>
    <div class="grid grid-cols-2 gap-2">
    <input placeholder="name" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 mt-4 p-1 pl-2" v-model="firstName">
    <input placeholder="lastname" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 mt-4 p-1 pl-2" v-model="lastname">
    <input type="email" placeholder="email" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2" v-model="email">
    <input type="password" placeholder="password" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2" v-model="userPassword">
    <input placeholder="phone" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-8 p-1 pl-2" v-model="phone">
    <input placeholder="day/month/year" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-8 p-1 pl-2" v-model="dateOfBirth">
    </div>
    <div class="grid grid-cols-2 gap-2">
        <select class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2" id="city" name="city" v-model="city">
            <option value="Almaty">Almaty</option>
            <option value="Astana">Astana</option>
            <option value="Taldykorgan">Taldykorgan</option>
            <option value="Taraz">Taraz</option>
        </select>
        <select class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2" id="microdistrict" name="microdistrict" v-model="microdistrict">
            <option value="Aksay-1">Aksay-1</option>
            <option value="Koktem">Koktem</option>
            <option value="Sairan">Sairan</option>
            <option value="Koktem-2">Koktem-2</option>
        </select>
        <input placeholder="home" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2" v-model="home">
        <input placeholder="flat" class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2" v-model="flat">
    </div>
    <div class="flex w-1/2 ml-36">
    <select class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2" id="gender" name="gender" v-model="gender">
            <option value="male">male</option>
            <option value="female">female</option>
    </select>
    </div>
    <div class="flex flex-row justify-center">
      <button class="bg-emerald-400 text-white mr-2" @click="router.push('/login')">Sign IN</button>
      <button class="bg-white text-emerald-800 border-1 border-emerald-600" @click="createUser">Sign UP</button>
    </div>
  </div>
</template>

<style scoped>

</style>
