<script setup>
import { computed } from "vue";
import router from "../router/index";
import store from "../store/store";
import axios from "axios";

const itemArray = computed(() => store.getters.getItemArray);
const checkedElementsValues = [];

const userDataString = localStorage.getItem("userData");
const userData = JSON.parse(userDataString);
const userTransformData = {
  userId: userData.user.user[0],
};

const totalPrice = computed(() => {
  return itemArray.value.reduce((sum, item) => sum + item.productPrice, 0);
});

const totalItemCount = computed(() => {
  return itemArray.value.reduce((count) => count + 1, 0);
});

function deleteFromCart(getItem) {
  store.dispatch("removeItemFromCart", getItem);
}

function back() {
  router.push("/");
}

async function createOrder() {
  showCheckedArray();
  if (totalItemCount.value > 0 || checkedElementsValues.length > 0) {
    try {
      const productIds = itemArray.value.map((item) => item.productId);
      const serviceIds = checkedElementsValues;
      const userIds = parseInt(userTransformData.userId, 10);
      const response = await axios.post("http://localhost:3000/api/v1/order", {
        productIds: productIds,
        serviceIds: serviceIds,
        userIds: userIds,
      });
      console.log(response);
      alert("Order created");
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Need at least 1 item in Cart or Choise 1 service");
  }
}

function showCheckedArray() {
  let checked_elements = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  checkedElementsValues.length = 0; // Clear previous values
  checked_elements.forEach(function (element) {
    checkedElementsValues.push(parseInt(element.value, 10));
  });
  console.log(checkedElementsValues.values);
}
</script>

<template>
  <button
    class="absolute start-0 top-0 m-16 bg-black text-white font-bold hover:text-black hover:bg-white hover:text-black"
    @click="back"
  >
    <svg class="w-6 h-6 hover:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
    </svg>
  </button>
  <button
    class="absolute end-0 top-0 m-16 bg-black text-white hover:bg-white hover:text-black"
    @click="createOrder"
  >
    Create order
  </button>
  <h1 class="font-bold text-3xl text-black uppercase m-8">Cart</h1>
  <div>
    <h1>Choise some service</h1>
    <div class="inline-flex justify-content items-center my-4">
      <label class="text-slate-500 font-bold mx-2 text-sm" for="">washing outside</label
      ><input class="ser" value="1" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for="">washing inside</label
      ><input class="ser" value="2" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for="">washing full</label
      ><input class="ser" value="3" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for=""
        >surface inspection</label
      ><input class="ser" value="4" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for=""
        >thorough inspection</label
      ><input class="ser" value="5" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for="">full inspection</label
      ><input class="ser" value="6" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for="">fast repair</label
      ><input class="ser" value="7" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for="">full repair</label
      ><input class="ser" value="8" type="checkbox" />
      <label class="text-slate-500 font-bold mx-2 text-sm" for="">replace repair</label
      ><input class="ser" value="9" type="checkbox" />
    </div>
  </div>
  <div class="flex flex-row justyfi-center items-center w-screen bg-slate-50">
    <!-- item block -->
    <div
      class="grid grid-cols-3 overflow-y-scroll no-scrollbar gap-4 w-[150vh] p-8 h-[70vh]"
    >
      <div
        class="grid grid-cols-1 max-w-60 max-h-44 bg-white border border-gray-200 rounded-lg shadow-xl"
        v-for="item in itemArray"
        :key="item"
      >
        <div class="p-5">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ item.productName }}
          </h5>
          <div class="grid grid-cols-2 gap-2">
            <p class="mb-3 font-normal text-sm text-gray-400">
              Country: {{ item.productCountry }}
            </p>
            <p class="mb-3 font-normal text-sm text-gray-400">
              Price: {{ item.productPrice }}$
            </p>
          </div>
          <button
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-red-800 dark:hover:bg-black"
            @click="deleteFromCart(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    <div
      class="top-0 h-[60vh] ml-16 border-2 rounded bg-white border-gray-200 px-16 shadow-lg text-start"
    >
      <h2 class="uppercase font-bold mt-6">Info</h2>
      <p class="text-gray-400 mt-4">price: {{ totalPrice }}$</p>
      <p class="text-gray-400 mt-4">count: {{ totalItemCount }}</p>
      <p class="text-gray-400 mt-4">
        sales: -{{ Math.floor(totalPrice * 0.1) }}$
      </p>
      <div class="border-t-2 border-gray-400 mt-16"></div>
    </div>
  </div>
</template>

<style scoped></style>
