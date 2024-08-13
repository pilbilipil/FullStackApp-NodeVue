<script setup>
import axios from "axios";
import router from "../router/index";
import { ref, computed } from "vue";

const firstName = ref("");
const lastname = ref("");
const email = ref();
const phone = ref();
const userPassword = ref();
const dateOfBirth = ref();
const gender = ref("male");
const city = ref("Almaty");
const microdistrict = ref("Aksay-1");
const home = ref();
const flat = ref();

function isValidName(firstName) {
  const reg = /^[a-zA-Z]{4,25}$/;
  return reg.test(firstName);
}

function isValidLastname(lastName) {
  const reg = /^[a-zA-Z]{4,25}$/;
  return reg.test(lastName);
}

function isValidEmail(email) {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(email);
}

function isValidPhone(phone) {
  const reg = /^8\d{10}$/;
  return reg.test(phone);
}

function isValidPassword(password) {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
  return reg.test(password);
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
    "border-emerald-500": isValidLastname(lastname.value),
    "focus:border-red-500": !isValidLastname(lastname.value),
  };
});

const emailClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidEmail(email.value),
    "focus:border-red-500": !isValidEmail(email.value),
  };
});

const phoneClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-8": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidPhone(phone.value),
    "focus:border-red-500": !isValidPhone(phone.value),
  };
});

const passwordClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-2": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidPassword(userPassword.value),
    "focus:border-red-500": !isValidPassword(userPassword.value),
  };
});

const birthClass = computed(() => {
  return {
    "border-b-2": true,
    "bg-[#FAFAFA]": true,
    rounded: true,
    "mb-8": true,
    "p-1": true,
    "pl-2": true,
    "border-emerald-500": isValidDateOfBirth(dateOfBirth.value),
    "focus:border-red-500": !isValidDateOfBirth(dateOfBirth.value),
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
    isValidEmail(email.value) &&
    isValidPhone(phone.value) &&
    isValidHome(home.value) &&
    isValidFlat(flat.value) &&
    isValidPassword(userPassword.value) &&
    isValidDateOfBirth(dateOfBirth.value)
  ) {
    return true;
  } else {
    alert("Please enter the valid data!");
    return false;
  }
}
async function createUser() {
  if (vlidator() === true) {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user", {
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
        flat: flat.value,
      });
      router.push("/login");
      alert("User created");
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("Error: not valid data");
  }
}

function back() {
  router.push("/");
}
</script>

<template>
  <button class="absolute start-0 top-0 m-16" @click="back">Back</button>
  <div class="flex flex-col">
    <h1 class="text-emerald-700 text-4xl font-bold leading-loose">SignUP</h1>
    <div class="grid grid-cols-2 gap-2">
      <input placeholder="firstName" :class="nameClass" v-model="firstName" />
      <input placeholder="lastname" :class="lastnameClass" v-model="lastname" />
      <input
        type="email"
        placeholder="email"
        :class="emailClass"
        v-model="email"
      />
      <input
        type="password"
        placeholder="password"
        :class="passwordClass"
        v-model="userPassword"
      />
      <input placeholder="phone" :class="phoneClass" v-model="phone" />
      <input
        placeholder="day/month/year"
        :class="birthClass"
        v-model="dateOfBirth"
      />
    </div>
    <div class="grid grid-cols-2 gap-2">
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
      <input placeholder="home" :class="homeClass" v-model="home" />
      <input placeholder="flat" :class="flatClass" v-model="flat" />
    </div>
    <div class="flex w-1/2 ml-36">
      <select
        class="border-b-2 border-emerald-500 bg-[#FAFAFA] rounded mb-2 p-1 pl-2"
        id="gender"
        name="gender"
        v-model="gender"
      >
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
    </div>
    <div class="flex flex-row justify-center">
      <button
        class="bg-emerald-400 text-white mr-2"
        @click="router.push('/login')"
      >
        Sign IN
      </button>
      <button
        class="bg-white text-emerald-800 border-1 border-emerald-600"
        @click="createUser"
      >
        Sign UP
      </button>
    </div>
  </div>
</template>

<style scoped></style>
