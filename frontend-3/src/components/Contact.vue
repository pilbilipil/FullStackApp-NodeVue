<script setup>
import router from '../router/index';

function back(){
    router.push('/');
}
</script>

<template>
<button class="absolute start-0 top-0 m-16" @click="back">Back</button>
<div class="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-2xl ml-24">
    <div class="p-5 flex flex-row">
        <a href="#">
        <div class="h-32 w-32 bg-gray-200 rounded pt-[40%]">
            <p class="justify-center text-emerald-700 font-bold item-center">Map</p>
        </div>
        </a>
    <div class="flex flex-col mx-4">
        <p href="#"><h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contact information</h5></p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Data</p>
        <button class="inline-flex justify-center text-center ml-[50%] font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800" @click="changer">
            setting
        </button>
    </div>
    </div>
</div>
</template>

<style scoped>


</style>
