<script setup>
import {computed, onMounted, ref} from 'vue'
import Card from '../component/Card.vue'
import Carousel from "@/component/Carousel.vue"
import {filterBook} from '@/composable/fetch.js'
import Navbar from "@/component/Navbar.vue"
import Footer from "@/component/Footer.vue";

let bookByViz = ref([])
let bookByCategory = ref([])
let bookByYenPress = ref([])

import {useRoleStore} from "@/store/roleChecking"
import Loading from "@/component/Loading.vue";

const getRole = useRoleStore().userInformation.role

let screenSize = ref(window.innerWidth)
window.addEventListener('resize', () => {
  screenSize.value = window.innerWidth
})
let colForBook = computed(() => {
  if (screenSize.value < 1020) {
    return 4
  } else {
    return 6
  }
})
let isLoading = ref(true)
const renderBookByFilter = async (filter,value) => {
  const books = await filterBook(filter, value)
  isLoading.value = false
  return books
}

onMounted( () => {
  renderBookByFilter('publisher_like', 'Viz Media').then((res) => {
    bookByViz.value = res
  })
  renderBookByFilter('category_like', 'Science').then((res) => {
    bookByCategory.value = res
  })
  renderBookByFilter('publisher_like', 'Yen Press').then((res) => {
    bookByYenPress.value = res
  })
})

</script>

<template>
  <Navbar/>
  <div class="w-full min-h-screen flex justify-center">
    <div class="w-full lg:w-4/6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 lg:gap-4">
      <div class="col-span-2 md:col-span-4 lg:col-span-6">
        <Carousel/>
      </div>
      <div class="col-span-2 md:col-span-4 lg:col-span-6 grid justify-items-center" v-show="isLoading">
        <Loading />
      </div>
      <div class="col-span-2 md:col-span-4 lg:col-span-6 grid grid-cols-2 px-5 lg:px-0" v-show="!isLoading">
        <h1 class="text-2xl font-bold text-sm md:text-lg lg:text-2xl flex justify-start mt-2">Book by Viz Media</h1>
        <h1 class="text-2xl font-bold text-sm md:text-lg lg:text-2xl flex justify-end mt-2">More ></h1>
      </div>
      <div v-for="item in bookByViz.slice(0,colForBook)" :key="item.id" class="mx-5 mt-5 lg:mx-0">
        <Card :item="item"/>
      </div>
      <div class="col-span-2 md:col-span-4 lg:col-span-6 grid grid-cols-2 px-5 lg:px-0" v-show="!isLoading">
        <h1 class="text-2xl font-bold text-sm md:text-lg lg:text-2xl flex justify-start mt-2">Book by Yen Press</h1>
        <h1 class="text-2xl font-bold text-sm md:text-lg lg:text-2xl flex justify-end mt-2">More ></h1>
      </div>
      <div v-for="item in bookByYenPress.slice(0,colForBook)" :key="item.id" class="mx-5 mt-5 lg:mx-0">
        <Card :item="item"/>
      </div>
      <div class="col-span-2 md:col-span-4 lg:col-span-6 grid grid-cols-2 px-5 lg:px-0" v-show="!isLoading">
        <h1 class="text-2xl font-bold text-sm md:text-lg lg:text-2xl flex justify-start mt-2">Science</h1>
        <h1 class="text-2xl font-bold text-sm md:text-lg lg:text-2xl flex justify-end mt-2">More ></h1>
      </div>
      <div v-for="item in bookByCategory.slice(0,colForBook)" :key="item.id" class="mx-5 mt-5 lg:mx-0">
        <Card :item="item"/>
      </div>

      <div v-if="getRole === 'admin'" class="col-span-2 md:col-span-4 lg:col-span-6 flex justify-end">
        <router-link to="/manage" class="btn">Add Book</router-link>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<style scoped>

</style>