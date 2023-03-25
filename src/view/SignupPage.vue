<script setup>
import Navbar from '../component/Navbar.vue'
import toggleIconShowHidePassword from "@/composable/toggleShowPassword";
import {ref} from "vue";
import CationValidInput from "@/component/CationValidInput.vue";

const passwordField = ref(null)
const confirmPasswordField = ref(null)

const emailField = ref(null)
const usernameField = ref(null)

const isFirstnameValid = ref(true)
const isLastnameValid = ref(true)
const isEmailValid = ref(true)
const isUsernameValid = ref(true)
const isPasswordValid = ref(true)

const cationIcon = 'https://api.iconify.design/ep:warning-filled.svg?color=%23FF0000'

const userInformation = ref({
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
  confirmPasswordField: ''
})

const reg = async () => {
  isFirstnameValid.value = true
  isLastnameValid.value = true
  isEmailValid.value = true
  isUsernameValid.value = true
  isPasswordValid.value = true
  const raw = await fetch('http://localhost:5000/login')
  const data = await raw.json()
  if (raw.status === 200) {
    if (userInformation.value.firstname.length === 0) {
      isFirstnameValid.value = false
    } else if (userInformation.value.lastname.length === 0) {
      isFirstnameValid.value = true
      isLastnameValid.value = false
    } else if (!userInformation.value.email.includes('@')) {
      isFirstnameValid.value = true
      isLastnameValid.value = true
      isEmailValid.value = false
    } else if (data.find(e => e.username === userInformation.value.username) || userInformation.value.username.length === 0) {
      isFirstnameValid.value = true
      isLastnameValid.value = true
      isEmailValid.value = true
      isUsernameValid.value = false
    } else if (userInformation.value.password !== userInformation.value.confirmPasswordField || userInformation.value.password.length === 0 || userInformation.value.confirmPasswordField.length === 0) {
      isFirstnameValid.value = true
      isLastnameValid.value = true
      isEmailValid.value = true
      isUsernameValid.value = true
      isPasswordValid.value = false
    } else {
      isFirstnameValid.value = true
      isLastnameValid.value = true
      isEmailValid.value = true
      isUsernameValid.value = true
      isPasswordValid.value = true
      await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: userInformation.value.firstname,
          lastname: userInformation.value.lastname,
          email: userInformation.value.email,
          username: userInformation.value.username,
          password: userInformation.value.password,
          role: 'user'
        })
      })
    }
  }
}

</script>

<template>
  <div class="flex flex-col w-full h-screen ">
    <Navbar/>
    <div class="flex h-screen">
      <div class="w-full flex flex-col justify-center items-center">
        <div class="flex flex-col space-y-5 p-20 max-lg:p-5 rounded-2xl items-center bg-[#FAE1D2] drop-shadow-2xl">
          <div>
            <p class="font-bold text-3xl pb-5">Register Here 😁</p>
          </div>
          <div class="text-register"><span
              class="bg-[#FAE1D2] max-lg:text-xs   p-5 text-black">Please input your information below here</span></div>
          <div class="w-[30em] max-xl:w-[20em] flex justify-between space-x-3">
            <div>
              <input type="text" class="input pl-5 input-bordered w-full max-xl:w-[10em] bg-white"
                     placeholder="Firstname" v-model="userInformation.firstname"
                     :class="isFirstnameValid ? '' : 'border-2 border-red-500'">
              <CationValidInput text="Please Do not Empty Firstname" :check="isFirstnameValid" />
            </div>
            <div>
              <input type="text" class="input pl-5 input-bordered w-full max-xl:w-[10em] bg-white"
                     placeholder="Lastname" v-model="userInformation.lastname"
                     :class="isLastnameValid ? '' : 'border-2 border-red-500'">
              <CationValidInput text="Please Do not Empty Lastname" :check="isLastnameValid" />
            </div>


          </div>
          <div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                <img src="https://api.iconify.design/ic:round-mail.svg?color=%%2300000" class="w-5 h-5 z-10"
                     alt="userIcon">
              </div>
              <input type="text" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white"
                     placeholder="Email" v-model="userInformation.email" ref="emailField"
                     :class="isEmailValid ? '' : 'border-2 border-red-500'">
            </div>
            <CationValidInput text="Please Valid Email format" :check="isEmailValid" />
          </div>
          <div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                <img src="https://api.iconify.design/ic:baseline-person.svg?color=%%2300000" class="w-5 h-5"
                     alt="userIcon">
              </div>
              <input type="text" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white"
                     placeholder="username" v-model="userInformation.username" ref="usernameField"
                     :class="isUsernameValid ? '' : 'border-2 border-red-500'">
            </div>
            <CationValidInput text="Username is already exits" :check="isUsernameValid" />
          </div>

          <div class="flex flex-col text-black">
            <div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                  <img src="https://api.iconify.design/carbon:password.svg?color=%2300000" class="w-5 h-5"
                       alt="passwordIcon">
                </div>
                <input type="password" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white"
                       ref="passwordField" placeholder="password" v-model="userInformation.password"
                       :class="isPasswordValid ? '' : 'border-2 border-red-500'">
                <div class="absolute inset-y-0 right-0 ml-2 flex items-center pr-3 cursor-pointer tooltip">
                  <img src="https://api.iconify.design/zondicons:view-show.svg?color=%23888888" class="w-5 h-5"
                       @click="toggleIconShowHidePassword($event, passwordField)">
                </div>
              </div>
              <CationValidInput text="password dont match" :check="isPasswordValid" />
            </div>
          </div>

          <div class="flex flex-col text-black">
            <div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                  <img src="https://api.iconify.design/carbon:password.svg?color=%2300000" class="w-5 h-5"
                       alt="passwordIcon">
                </div>
                <input type="password" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white"
                       placeholder="Confirm password" ref="confirmPasswordField"
                       v-model="userInformation.confirmPasswordField"
                       :class="isPasswordValid ? '' : 'border-2 border-red-500'">
                <div class="absolute inset-y-0 right-0 ml-2 flex items-center pr-3 cursor-pointer tooltip">
                  <img src="https://api.iconify.design/zondicons:view-show.svg?color=%23888888" class="w-5 h-5"
                       @click="toggleIconShowHidePassword($event, confirmPasswordField)">
                </div>
              </div>
              <CationValidInput text="password dont match" :check="isPasswordValid" />
            </div>
          </div>
          <button class="btn btn-primary w-[15em] bg-green-500 text-black max-xl:w-[10em]" @click="reg">Join us</button>
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