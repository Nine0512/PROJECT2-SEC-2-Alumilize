<script setup>
import Navbar from '../component/Navbar.vue'
import {computed, provide, ref} from "vue";
import toggleIconShowHidePassword from '../composable/toggleShowPassword.js'
import CationValidInput from "@/component/CationValidInput.vue";
import Footer from "@/component/Footer.vue";
import router from "@/router";
import {useRoleStore} from "@/store/roleChecking"

// toggle show icon password
const passwordField = ref(null)
const isSuccess = ref(true)


// login checking
const userInformation = ref({
  username: '',
  password: '',
  email: '',
  firstname: '',
  lastname: '',
  dateOfBirth: '',
  role: '',
  cart: [],
  id: '',
  bookId: []
})



const role = useRoleStore()


const authentication = async () => {
  isSuccess.value = true
  const raw = await fetch('http://localhost:5000/login')
  const data = await raw.json()
  for (let i = 0; i < data.length; i++) {
    if (data[i].username === userInformation.value.username && data[i].password === userInformation.value.password) {
      userInformation.value.role = data[i].role
      userInformation.value.firstname = data[i].firstname
      userInformation.value.lastname = data[i].lastname
      userInformation.value.email = data[i].email
      userInformation.value.dateOfBirth = data[i].dateOfBirth
      userInformation.value.cart = data[i].cart
      userInformation.value.id = data[i].id
      userInformation.value.bookId = data[i].bookId
      role.setInfo(userInformation.value)
      await router.push('/')
    }
  }
  if (userInformation.value.role === '') {
    isSuccess.value = false
    userInformation.value.username = ''
    userInformation.value.password = ''
  }
}

const logout = () => {
  userInformation.value.username = ''
  userInformation.value.password = ''
  userInformation.value.role = ''
}

</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <Navbar/>

    <!--    <div v-if="userInformation.role === 'admin'">-->
    <!--      <button class="btn">Edit</button>-->
    <!--      <button class="btn" @click="logout">logout</button>-->
    <!--    </div>-->
    <!--    <div v-else-if="userInformation.role === 'user'">-->
    <!--      <button class="btn">View</button>-->
    <!--      <button class="btn" @click="logout">logout</button>-->
    <!--    </div>-->
    <!--    <div v-else>-->
    <!--      <button class="btn">Please Login First</button>-->
    <!--    </div>-->

    <div class="flex h-screen">
      <div class="w-full max-lg:w-full max-lg:pb-10 max-lg:pt-5 justify-center flex flex-col items-center space-y-5 ">
        <div
            class="flex flex-col justify-center items-center p-20 max-sm:p-15 max-lg:p-10 bg-[#FAE1D2] rounded-3xl drop-shadow drop-shadow-2xl">
          <p class="text-black text-5xl font-bold pb-5 max-xl:text-3xl max-sm:text-lg ">Welcome to Alumilize E-book
            store!</p>
          <p class="text-black text-xl pb-10 max-xl:text-2xl  max-sm:text-sm">Please login first to be more fun 😀</p>
          <div class="flex flex-col text-black">
            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                <img src="https://api.iconify.design/ic:baseline-person.svg?color=%%2300000" class="w-5 h-5" alt="userIcon">
              </div>
              <input type="text" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white"
                     placeholder="username" v-model="userInformation.username">
            </div>
          </div>
          <div class="flex flex-col text-black mb-6">
            <div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                  <img src="https://api.iconify.design/carbon:password.svg?color=%2300000" class="w-5 h-5" alt="passwordIcon">
                </div>
                <input type="password" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white"
                       ref="passwordField" placeholder="password" v-model="userInformation.password">
                <div class="absolute inset-y-0 right-0 ml-2 flex items-center pr-3 cursor-pointer tooltip">
                  <img src="https://api.iconify.design/zondicons:view-show.svg?color=%23888888" class="w-5 h-5 " @click="toggleIconShowHidePassword($event, passwordField)">
                </div>
            </div>
              <CationValidInput text="Username or Password incorrect!" :check="isSuccess" />
            </div>
          </div>
          <button class="btn btn-accent w-[15em] max-xl:w-[10em] bg-green-500 mb-5" @click="authentication">Login
          </button>
          <div class="text-register"><span class="bg-[#FAE1D2] p-5 text-black">If you don't have account yet</span>
          </div>
          <router-link to="/register" class="btn btn-primary w-[15em] bg-blue-400 text-black max-xl:w-[10em]">Join us</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.text-register {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 10px 0 20px;
}
</style>