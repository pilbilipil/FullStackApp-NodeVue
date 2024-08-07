<script setup>
import axios from 'axios';
import { ref } from 'vue';


const microdistrict = ref();
const city = ref();
const phone = ref();
const home = ref();
const flat = ref();
const birthDay = ref();

let profile = ref(true);
let setting = ref(false);
function changer(){
    if(profile.value === false && setting.value === true)
    {
        profile.value = true;
        setting.value = false;
    }else
    {
        profile.value = false;
        setting.value = true;
    }
}

// async function updateUser(){
//     try {
//         const response = await axios.put('');
//     } catch (error) {
        
//     }
// }

// async function getUserDate(){
//     try {
//         const response = await axios.get('http://localhost:3000/api/v1/user/{id}');
//         console.log(response.data);
//     } catch (error) {
//         console.log(error);
//     }
// }

const userData = JSON.parse(localStorage.getItem('userData'));

</script>

<template>
<div class="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-2xl">
    <div class="p-5 w-full flex flex-row" v-show="profile">
    <div class="h-36 w-36 bg-gray-800 rounded mx-8"></div>
    <div class="flex flex-col mx-4 text-start">
        <p href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
        </p>
        <div class="grid grid-cols-2 gap-2">
            <label class="inline-flex text-gray-400">city:<p class="mb-3 font-normal text-black dark:text-gray-400">Almaty</p></label>
            <label class="inline-flex text-gray-400">microdistrict:<p class="mb-3 font-normal text-black dark:text-gray-400">Koktem-1</p></label>
            <label class="inline-flex text-gray-400">home:<p class="mb-3 font-normal text-black dark:text-gray-400">23-block-1</p></label>
            <label class="inline-flex text-gray-400">flat:<p class="mb-3 font-normal text-black dark:text-gray-400">56</p></label>
            <label class="inline-flex text-gray-400">phone:<p class="mb-3 font-normal text-black dark:text-gray-400">87771250431</p></label>
            <label class="inline-flex text-gray-400">birth day:<p class="mb-3 font-normal text-black dark:text-gray-400">01/04/2001</p></label>
        </div>
        <button class="inline-flex w-1/2 justify-center ml-[50%] items-center text-sm py-2 px-2 font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800" @click="changer">
            setting
        </button>
    </div>
    </div>
    <div class="p-5 w-full flex flex-row" v-show="setting">
    <div class="h-36 w-36 bg-gray-800 rounded mx-8"></div>
    <div class="flex flex-col mx-4 text-start">
        <p href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name Lastname</h5>
        </p>
        <div class="grid grid-cols-2 gap-2">
            <input class="border-b-2 border-emerald-400 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" placeholder="Enter new city" v-model="city" />
            <input class="border-b-2 border-emerald-400 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" placeholder="Enter new microdistrict" v-model="microdistrict" />
            <input class="border-b-2 border-emerald-400 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" placeholder="Enter new home" v-model="home" />
            <input class="border-b-2 border-emerald-400 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" placeholder="Enter your flat" v-model="flat" />
            <input class="border-b-2 border-emerald-400 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" placeholder="Enter your phone" v-model="phone" />
            <input class="border-b-2 border-emerald-400 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" placeholder="Enter your birth day" v-model="birthDay" />
            <button class="inline-flex w-1/2 justify-center ml-[50%] items-center text-sm py-2 px-2 font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800">
            save
            </button>
            <button class="inline-flex w-1/2 justify-center ml-[50%] items-center text-sm py-2 px-2 font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800" @click="changer">
            back
            </button>
        </div>
    </div>
    </div>
</div>
</template>

<style scoped>


</style>
