<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import router from "../router/index";

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

const firstName = ref("");
const lastName = ref("");
const microdistrict = ref(userTransformData.userMicrodistrict);
const city = ref(userTransformData.userCity);
const phone = ref();
const home = ref();
const flat = ref();
const birthDay = ref();

let profile = ref(true);
let setting = ref(false);

function changer() {
  if (profile.value === false && setting.value === true) {
    profile.value = true;
    setting.value = false;
  } else {
    profile.value = false;
    setting.value = true;
  }
}

function back() {
  router.push("/");
}

function isValidName(firstName) {
  const reg = /^[a-zA-Z]{4,25}$/;
  return reg.test(firstName);
}

function isValidLastname(lastName) {
  const reg = /^[a-zA-Z]{4,25}$/;
  return reg.test(lastName);
}

function isValidPhone(phone) {
  const reg = /^8\d{10}$/;
  return reg.test(phone);
}

function isValidDateOfBirth(dateOfBirth) {
  const reg =
    /^((3[0-1]|2[0-9]|1[0-9]|0[1-9]))\/((1[0-2]|0[1-9]))\/((198[0-9]|199[0-9]|20[0-1][0-9]|202[0-4]))$/;
  return reg.test(dateOfBirth);
}

function isValidHome(home) {
  const reg = /^(\d+\/[a-zA-Z]+|\d+|\d+\/[a-zA-Z]+)$/;
  return reg.test(home);
}

function isValidFlat(flat) {
  const reg = /^(100|[1-9]|[1-9][0-9])$/;
  return reg.test(flat);
}

const nameClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "mt-4": true,
    "border-emerald-500": isValidName(firstName.value),
    "focus:border-red-500": !isValidName(firstName.value),
  };
});

const lastnameClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "mt-4": true,
    "border-emerald-500": isValidLastname(lastName.value),
    "focus:border-red-500": !isValidLastname(lastName.value),
  };
});
const phoneClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidPhone(phone.value),
    "focus:border-red-500": !isValidPhone(phone.value),
  };
});

const birthClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidDateOfBirth(birthDay.value),
    "focus:border-red-500": !isValidDateOfBirth(birthDay.value),
  };
});

const homeClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidHome(home.value),
    "focus:border-red-500": !isValidHome(home.value),
  };
});

const flatClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidFlat(flat.value),
    "focus:border-red-500": !isValidFlat(flat.value),
  };
});

function vlidator() {
  if (
    isValidName(firstName.value) &&
    isValidLastname(lastname.value) &&
    isValidPhone(phone.value) &&
    isValidHome(home.value) &&
    isValidFlat(flat.value)
  ) {
    return true;
  } else {
    alert("Please enter the valid data!");
    return false;
  }
}

async function updateUser() {
  if (vlidator) {
    try {
      const id = userTransformData.userId; // Получаем идентификатор пользователя
      const response = await axios.put(
        `http://localhost:3000/api/v1/user/${id}`,
        {
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          dateOfBirth: birthDay.value,
          city: city.value,
          microdistrict: microdistrict.value,
          home: home.value,
          flat: flat.value,
        }
      );
      console.log(response);
      alert("User updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to update user");
    }
  } else {
    console.log("Error: invalid data");
  }
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
  <div class="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-2xl">
    <div class="p-5 w-full flex flex-row" v-show="profile">
      <div class="h-36 w-36 bg-gray-800 rounded mx-8"></div>
      <div class="flex flex-col mx-4 text-start">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ userTransformData.userName }} {{ userTransformData.userLastName }}
        </h5>
        <div class="grid grid-cols-2 gap-3">
          <label class="inline-flex text-gray-400"
            >city:
            <p class="mb-3 font-normal text-black dark:text-gray-400">
              {{ userTransformData.userCity }}
            </p></label
          >
          <label class="inline-flex text-gray-400"
            >microdistrict:
            <p class="mb-3 font-normal text-black dark:text-gray-400">
              {{ userTransformData.userMicrodistrict }}
            </p></label
          >
          <label class="inline-flex text-gray-400"
            >home:
            <p class="mb-3 font-normal text-black dark:text-gray-400">
              {{ userTransformData.userHome }}
            </p></label
          >
          <label class="inline-flex text-gray-400"
            >flat:
            <p class="mb-3 font-normal text-black dark:text-gray-400">
              {{ userTransformData.userFlat }}
            </p></label
          >
          <label class="inline-flex text-gray-400"
            >phone:
            <p class="mb-3 font-normal text-black dark:text-gray-400">
              {{ userTransformData.userPhone }}
            </p></label
          >
          <label class="inline-flex text-gray-400"
            >birth day:
            <p class="mb-3 font-normal text-black dark:text-gray-400">
              {{ userTransformData.userBirthDay }}
            </p></label
          >
        </div>
        <button
          class="inline-flex justify-center text-center ml-[50%] font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800"
          @click="changer"
        >
          setting
        </button>
      </div>
    </div>
    <div class="p-5 w-full flex flex-row" v-show="setting">
      <div class="h-36 w-36 bg-gray-800 rounded mx-8"></div>
      <div class="flex flex-col mx-4 text-start">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ userTransformData.userName }} {{ userTransformData.userLastName }}
        </h5>
        <div class="grid grid-cols-2 gap-2">
          <input
            :class="nameClass"
            placeholder="Enter new name"
            v-model="firstName"
          />
          <input
            :class="lastnameClass"
            placeholder="Enter new lastname"
            v-model="lastName"
          />
          <input
            :class="homeClass"
            placeholder="Enter new home"
            v-model="home"
          />
          <input
            :class="flatClass"
            placeholder="Enter your flat"
            v-model="flat"
          />
          <input
            :class="phoneClass"
            placeholder="Enter your phone"
            v-model="phone"
          />
          <input
            :class="birthClass"
            placeholder="Enter your birth day"
            v-model="birthDay"
          />
          <select
            class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2"
            id="city"
            name="city"
            v-model="city"
          >
            <option value="Almaty">Almaty</option>
            <option value="Astana">Astana</option>
            <option value="Taldykorgan">Taldykorgan</option>
            <option value="Taraz">Taraz</option>
          </select>
          <select
            class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2"
            id="microdistrict"
            name="microdistrict"
            v-model="microdistrict"
          >
            <option value="Aksay-1">Aksay-1</option>
            <option value="Koktem">Koktem</option>
            <option value="Sairan">Sairan</option>
            <option value="Koktem-2">Koktem-2</option>
          </select>
          <button
            class="inline-flex justify-center text-center ml-[50%] font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800"
            @click="updateUser"
          >
            save
          </button>
          <button
            class="inline-flex justify-center text-center ml-[50%] font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800"
            @click="changer"
          >
            back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
