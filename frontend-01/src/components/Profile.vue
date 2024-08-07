<script setup>
import { ref } from 'vue';


const profile = ref(false);
const setting = ref(true);



</script>

<template>
<div class="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-2xl">
    <div class="p-5 w-full flex flex-row" v-show="profile">
    <div class="h-36 w-36 bg-gray-800 rounded mx-8"></div>
    <div class="flex flex-col mx-4 text-start">
        <p href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name Lastname</h5>
        </p>
        <div class="grid grid-cols-2 gap-2">
            <label class="inline-flex text-gray-500">city:<p class="mb-3 font-normal text-black dark:text-gray-400">Almaty</p></label>
            <label class="inline-flex text-gray-500">microdistrict:<p class="mb-3 font-normal text-black dark:text-gray-400">Koktem-1</p></label>
            <label class="inline-flex text-gray-500">home:<p class="mb-3 font-normal text-black dark:text-gray-400">23-block-1</p></label>
            <label class="inline-flex text-gray-500">flat:<p class="mb-3 font-normal text-black dark:text-gray-400">56</p></label>
            <label class="inline-flex text-gray-500">phone:<p class="mb-3 font-normal text-black dark:text-gray-400">87771250431</p></label>
            <label class="inline-flex text-gray-500">birth day:<p class="mb-3 font-normal text-black dark:text-gray-400">01/04/2001</p></label>
        </div>
        <button class="inline-flex w-1/2 justify-center ml-[50%] items-center text-sm py-2 px-2 font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800">
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
            <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="email" placeholder="Enter new city" v-model="email" />
            <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="email" placeholder="Enter new microdistrict" v-model="email" />
            <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="email" placeholder="Enter new home" v-model="email" />
            <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="email" placeholder="Enter your flat" v-model="email" />
            <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="email" placeholder="Enter your birth day" v-model="email" />
            <input class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" type="email" placeholder="Enter your phone" v-model="email" />
            <button class="inline-flex w-1/2 justify-center ml-[50%] items-center text-sm py-2 px-2 font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800">
            save
            </button>
            <button class="inline-flex w-1/2 justify-center ml-[50%] items-center text-sm py-2 px-2 font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800" @click="">
            back
            </button>
        </div>
    </div>
    </div>
</div>
</template>

<style scoped>


</style>
