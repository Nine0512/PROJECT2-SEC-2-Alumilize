<script setup>
import {computed, onMounted, ref, watch} from "vue";
import router from "@/router";
import {getBook} from "@/composable/fetch.js";

const logo = '/images/Logo.png'
const profile = '/images/image4.png'

let search = ref('')
let infoArr = ref([])
onMounted(async () => {
  const res = await getBook()
  res.forEach(item => {
    let infoObj = {
      id: item.id,
      title: item.title
    }
    infoArr.value.push(infoObj)
  })
})

let searchChoice = computed(() => {
  if (search.value === '') {
    return []
  } else {
    return infoArr.value.filter(item => {
      if (item.title.toLowerCase().includes(search.value.toLowerCase())) {
        return item.title
      }
    })
  }
})

let selectBook = (id) => {
  search.value = ''
  router.push({name: 'book', params: {id: id}})
}

import {useRoleStore} from "@/store/roleChecking"

let getRole = useRoleStore().userInformation.role

watch(()=> useRoleStore().userInformation.role, ()=>{
  getRole = useRoleStore().userInformation.role
})

const logout = () => {
  useRoleStore().setRole('')
  useRoleStore().userInformation = {
    firstname: '',
    lastname: '',
    username: '',
    dateOfBirth: '',
    email: '',
    role: '',
    id: '',
    price: 0,
    cart: [],
    bookId: []
  }
}

</script>

<template>
  <div class="navbar w-full bg-[#FFAD96] flex justify-center">
    <div class="grid grid-cols-3 mx-5 lg:grid-cols-6 gap-4 w-full lg:w-4/6">
      <router-link to="/" class="flex-1 w-full md:w-5/12 lg:w-9/12 cursor-pointer" @click="router.push('/')">
        <img :src="logo" alt="logo">
      </router-link>
      <div class="col-span-3 max-lg:hidden grid grid-cols-4 place-items-center font-bold">
        <router-link  to="/">Home</router-link>
        <router-link to="/Allbook">All Book</router-link>
      </div>
      <div class="col-span-2 grid grid-cols-4 lg:grid-cols-3 place-items-center">
        <div class="form-control col-span-2 lg:col-span-2">
          <input type="text" placeholder="Search" class="input input-bordered w-11/12 h-8" v-model="search"/>
          <div v-if="searchChoice.length"
               class="absolute bg-base-100 p-4 rounded-xl lg:w-2/12 max-h-36 mt-10 overflow-y-scroll z-50">
            <ul v-for="item in searchChoice" :key="item.id">
              <li class="p-2 rounded-md cursor-pointer hover:bg-gray-300" @click="selectBook(item.id)">{{
                  item.title
                }}
              </li>
              <hr>
            </ul>
          </div>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end" v-show="getRole !== ''">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span class="badge badge-sm indicator-item">{{ useRoleStore().userInformation.cart.length }}</span>
              </div>
            </label>
            <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div class="card-body">
                <span class="font-bold text-lg">{{ useRoleStore().userInformation.cart.length }} Items</span>
                <span class="text-info">Subtotal: {{ useRoleStore().getPriceFromCart }}</span>
                <div class="card-actions">
                  <router-link to="/Cart">
                    <button class="btn btn-primary btn-block">View cart</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end pl-1 lg:pl-5">
            <label v-show="getRole !== ''" tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img :src="profile"/>
              </div>
            </label>
            <router-link to="/login" class="btn" v-show="getRole === ''">
              sign in
            </router-link>
            <ul v-show="getRole !== ''" tabindex="0"
                class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <router-link to="/user" class="justify-between">
                  Profile
                </router-link>
              </li>
              <li v-if="getRole === 'admin'">
                <router-link to="/manage" class="justify-between">Add Book <span class="badge">admin</span></router-link>
              </li>
              <li>
                <router-link to="/login" @click="logout">Logout</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="dropdown dropdown-end w-5/12 lg:hidden">
          <label tabindex="0" class="font-bold m-1">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
              </g>
            </svg>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/AllBook">All Book</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>