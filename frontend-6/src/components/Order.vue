<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

// Используем ref для реактивности order
const order = ref([]);
const status = ref('Processing');

const userDataString = localStorage.getItem("userData");
const userData = JSON.parse(userDataString);
const userTransformData = {
  userId: userData.user.user[0],
  userName: userData.user.user[1],
  userLastName: userData.user.user[2],
  userEmail: userData.user.user[3],
  userPhone: userData.user.user[4],
  userBirthDay: userData.user.user[6],
  userGender: userData.user.user[7],
  userCity: userData.user.user[8],
  userMicrodistrict: userData.user.user[9],
  userHome: userData.user.user[10],
  userFlat: userData.user.user[11],
};

async function getUserOrder() {
  try {
    const id = userTransformData.userId;
    const response = await axios.get(
      `http://localhost:3000/api/v1/user/${id}/order`
    );
    console.log(response.data.result);

    order.value = response.data.result.map((orderArray) => ({
      orderId: orderArray[0],
      userId: orderArray[1],
      statusId: orderArray[2],
      createdBy: orderArray[3],
      updatedBy: orderArray[4],
      createTime: orderArray[5],
      updateTime: orderArray[6],
    }));
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getUserOrder();
});
</script>

<template>
  <div>
    <select
            class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-12 p-1 pl-2"
            id="status"
            name="status"
            v-model="status"
          >
            <option value="Processing">Processing</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
    <div class="grid grid-cols-4 gap-4 overflow-y-scroll no-scrollbar h-[70vh] shadow-inner w-screen">
      <div
        v-for="value in order"
        :key="value.orderId"
        class="flex p-8 flex-col mx-4 max-w-80 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700"
      >
      <h1 class="font-bold text-2xl text-emerald-700 mb-6">Order</h1>
        <p>Order ID:{{ value.userId }}</p>
        <p>Status: Processing</p>
        <p>Created at:{{ value.createTime }}</p>
        <button
            class="justyfi-center items-center text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 dark:hover:bg-black">
            Delete 
          </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
