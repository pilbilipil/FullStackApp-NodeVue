<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Menu from "../layout/Menu.vue";
import Store from "../store/store";

const myItems = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(8);
const totalItems = ref(0);
const productName = ref('');

function transformProductData(productArray) {
  return {
    productId: productArray[0],
    productPrice: productArray[2],
    productCount: productArray[4],
    productCountry: productArray[5],
    productName: productArray[6],
    productType: productArray[7],
  };
}

async function getItems() {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/product");
    myItems.value = [];
    myItems.value = response.data.result.map(transformProductData);
    totalItems.value = myItems.value.length;
  } catch (error) {
    console.log(error);
  }
}

async function getByName() {
  if (productName.value.length !== 0) {
    try {
      const name = productName.value;
      const response = await axios.get(`http://localhost:3000/api/v1/product/${name}`);
      console.log(response.data.result);
      myItems.value = [];
      myItems.value = response.data.result.map(transformProductData);
      totalItems.value = myItems.value.length;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('Please enter the product name!');
  }
}

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return myItems.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value);
});

onMounted(() => {
  getItems();
});

function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}

function goToPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function addToCart(itemId) {
  Store.dispatch("addItemToCart", itemId);
}
</script>

<template>
  <Menu></Menu>
  <h1 class="text-2xl font-bold text-emerald-700 mt-36 mb-16">Products</h1>
  <div class="felx flex-row justyfi-center items-center mb-8">
  <button class="mx-4" @click="getItems">show all</button>
  <input placeholder="product name" class="border-b-2 border-emerald-500 rounded bg-[#FAFAFA] mb-2 p-1 pl-2" v-model="productName"/>
  <button @click="getByName" class="inline-flex justyfi-center items-center text-black mx-4 rounded-full bg-white hover:text-white">
    <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
    </svg>
  </button>
  </div>
  <div class="grid grid-cols-4 gap-6 mb-16">
    <div
      v-for="value in paginatedItems"
      :key="value.productId"
      class="max-w-80 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-5 justyfi-center items-center">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ value.productName }}
        </h5>
        <div class="grid grid-cols-2 gap-2">
          <p class="mb-3 text-start font-normal text-sm text-gray-400">
            Type: {{ value.productType }}
          </p>
          <p class="mb-3 text-start text-sm text-gray-400">
            Country: {{ value.productCountry }}
          </p>
          <p class="mb-3 text-start font-normal text-sm text-gray-400">
            Count: {{ value.productCount }}
          </p>
          <p class="mb-3 text-start font-normal text-sm text-gray-400">
            Price: {{ value.productPrice }}$
          </p>
        </div>
        <button
          class="button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 dark:hover:bg-emerald-800"
          @click="
            addToCart({
              productId: value.productId,
              productPrice: value.productPrice,
              productCount: value.productCount,
              productCountry: value.productCountry,
              productName: value.productName,
              productType: value.productType,
            })
          "
        >
        <span>Add </span>
        </button>
      </div>
    </div>
  </div>
  <div class="flex justify-center mb-8">
    <button
      @click="goToPreviousPage"
      :disabled="currentPage === 1"
      class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span class="px-4 py-2 mx-1"
      >Page {{ currentPage }} of {{ totalPages }}</span
    >
    <button
      @click="goToNextPage"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.button {
  border-radius: 4px;
  background-color: #05751a;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  width: 80px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.3s;
}

.button span:after {
  content: 'Add';
  position: absolute;
  opacity: 0px;
  top: 0px;
  right: 0;
  transition: 0.1s;
}

.button:focus span:after {
  opacity: 10;
  top: -40px;
  color:#00ff2f00;
  transition: 1.0s;
}

</style>
