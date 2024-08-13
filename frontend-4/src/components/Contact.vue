<script setup>
import router from "../router/index";

function back() {
  router.push("/");
}
</script>

<template>
  <button
    class="absolute start-0 top-0 m-16 bg-white text-black font-bold hover:bg-white hover:text-emerald-600"
    @click="back"
  >
    <svg class="w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
    </svg>
  </button>
  <div
    class="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-2xl ml-24"
  >
    <div class="p-5 flex flex-row">
      <a href="#">
        <div class="h-32 w-32 bg-gray-200 rounded pt-[40%]">
          <h1 class="justify-center text-emerald-700 font-bold item-center">
            Map
          </h1>
        </div>
      </a>
      <div class="flex flex-col mx-4">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Contact information
        </h5>
        <h1 class="mb-3 font-normal text-gray-700 dark:text-gray-400">Data</h1>
        <button
          class="inline-flex justify-center text-center ml-[50%] font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800"
          @click="changer"
        >
          setting
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
