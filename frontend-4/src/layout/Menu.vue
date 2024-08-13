<script setup>
import router from "../router/index";

const token = localStorage.getItem("token");

async function exit() {
  if (token != null) {
    localStorage.clear("token");
    router.push("/login");
  } else {
    alert("error: User not in system");
  }
}
</script>

<template>
  <div class="relative w-full">
    <div
      class="bg-emerald-800 w-full fixed top-0 left-0 border-b-2 border-white"
    >
      <nav
        class="container px-6 py-1 mx-auto md:flex md:justify-between md:items-center"
      >
        <div class="flex items-center justify-between">
          <router-link to="/" class="text-xl font-bold text-white md:text-2xl">
            <div class="inline-flex justify-center items-centers hover:text-emerald-300">
              <p>CarServiceShop_</p>
              <svg
                class="w-10 h-10 hover:text-emerald-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 0 0-2 2v9a1 1 0 0 0 1 1h.535a3.5 3.5 0 1 0 6.93 0h3.07a3.5 3.5 0 1 0 6.93 0H21a1 1 0 0 0 1-1v-4a.999.999 0 0 0-.106-.447l-2-4A1 1 0 0 0 19 6h-5a2 2 0 0 0-2-2H4Zm14.192 11.59.016.02a1.5 1.5 0 1 1-.016-.021Zm-10 0 .016.02a1.5 1.5 0 1 1-.016-.021Zm5.806-5.572v-2.02h4.396l1 2.02h-5.396Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </router-link>
          <!-- Mobile menu button -->
          <div @click="showMenu = !showMenu" class="flex md:hidden">
            <button
              type="button"
              class="text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <!-- :class="showMenu ? 'flex' : 'hidden'" -->
        <ul
          class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        >
          <li class="text-sm font-bold text-white hover:text-emerald-300">
            <router-link class="inline-flex hover:text-emerald-300" to="/">
              <div class="inline-flex items-center hover:text-emerald-300">
                Home
                <svg
                  class="w-6 h-6 hover:text-emerald-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <li class="text-sm font-bold text-white hover:text-emerald-300">
            <router-link to="/shop" class="">
              <div class="flex items-center hover:text-emerald-300">
                <span>shop</span>
                 <svg
                  class="w-6 h-6 hover:text-emerald-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                
                  <path
                    class=""
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <li class="text-sm font-bold text-white hover:text-emerald-300">
            <router-link to="/contact">
              <div class="inline-flex items-center hover:text-emerald-300">
                Contact
                <svg
                  class="w-6 h-6 hover:text-emerald-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <li
            class="text-sm font-bold text-white hover:text-emerald-300"
            :class="token ? 'flex' : 'hidden'"
          >
            <router-link :to="token ? '/cart' : ''">
              <div class="inline-flex items-center hover:text-emerald-300">
                {{ token ? "Cart" : "" }}
                <svg
                  class="w-6 h-6 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <li class="text-sm font-bold text-white hover:text-emerald-300">
            <router-link :to="token ? '/profile' : '/login'">
              <div class="inline-flex items-center hover:text-emerald-300">
                {{ token ? "Profile" : "Login" }}
                <svg
                  class="w-6 h-6 hover:text-emerald-300 ml-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <button
            v-show="Boolean(token)"
            class="bg-emerald-800 items-center hover:bg-emerald-800"
            @click="exit"
          >
            <svg
              class="w-6 h-6 text-white hover:text-red-400 hover:bg-emerald-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
                d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
