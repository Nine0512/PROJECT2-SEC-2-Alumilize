<script setup>
import Navbar from '../component/Navbar.vue'
</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <Navbar/>
    <div class="flex h-screen">
      <div class="w-full max-lg:w-full max-lg:pb-10 max-lg:pt-5 justify-center flex flex-col items-center space-y-5 ">
        <div
            class="flex flex-col justify-center items-center p-20 max-sm:p-15 max-lg:p-10 bg-yellow-200 rounded-3xl drop-shadow drop-shadow-2xl">
          <p class="text-black text-5xl font-bold pb-5 max-xl:text-3xl max-sm:text-lg ">Welcome to Alumilize E-book
            store!</p>
          <p class="text-black text-xl pb-10 max-xl:text-2xl  max-sm:text-sm">Please login first to be more fun 😀</p>
          <div class="flex flex-col text-black">
            <!--          <label class="pb-2 ">Username</label>-->
            <!--          <input type="text" class="rounded rounded-xl h-10 bg-white w-[30em] max-xl:w-[20em]">-->
            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                <img src="https://api.iconify.design/ic:baseline-person.svg?color=%%2300000" class="w-5 h-5">
              </div>
              <input type="text" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white" placeholder="username">
            </div>
          </div>
          <div class="flex flex-col text-black">
            <!--          <label class="pb-2">Password</label>-->
            <!--          <input type="password" class="rounded rounded-xl h-10 bg-white w-[30em] max-xl:w-[20em]">-->
            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 ml-2 flex items-center pr-3 cursor-pointer">
                <img src="https://api.iconify.design/carbon:password.svg?color=%2300000" class="w-5 h-5">
              </div>
              <input type="password" class="input pl-10 input-bordered w-[30em] max-xl:w-[20em] bg-white" placeholder="password">
            </div>
          </div>
          <button class="btn btn-accent w-[15em] max-xl:w-[10em] bg-green-500 mb-5">Login</button>
          <div class="text-register"><span class="bg-yellow-200 p-5 text-black">If you don't have account yet</span>
          </div>
          <button class="btn btn-primary w-[15em] bg-blue-400 text-black max-xl:w-[10em]">Join us</button>
        </div>
      </div>
<!--            <div-->
<!--                class="w-2/6 max-lg:w-full  max-lg:h-full max-lg:pb-10  justify-center flex flex-col items-center bg-yellow-200 space-y-10">-->
<!--              <img src="/images/Logo.png" alt="Logo">-->
<!--              <div class="flex items-center space-x-2">-->
<!--                <p class="text-black text-xl font-semibold">If you don't have account</p>-->
<!--                <button class="btn btn-success">Join Us</button>-->
<!--              </div>-->
<!--            </div>-->
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