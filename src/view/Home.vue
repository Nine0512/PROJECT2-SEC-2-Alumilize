<script setup>
import {onMounted, ref} from 'vue'
import Card from '../component/Card.vue'
import Carousel from "@/component/Carousel.vue"
import {getBook} from '@/composable/fetch.js'
import Navbar from "@/component/Navbar.vue"
import Footer from "@/component/Footer.vue";

let imgArr = ref([])

import {useRoleStore} from "@/store/roleChecking"
const getRole = useRoleStore().userInformation.role

const renderImg = async () => {
  const img = await getBook()
  img.forEach(item => {
    let imgObj = {
      id: item.id,
      imageBase64: item.imageBase64,
      title: item.title,
      author: item.author,
      price: item.price,
      date: item.date,
      category: item.category,
      description: item.description
    }
    imgArr.value.push(imgObj)
  })
}

onMounted((() => {
  renderImg()
}))

</script>

<template>
  <Navbar/>
  <div class="w-full min-h-screen flex justify-center">
    <div class="w-full lg:w-4/6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 lg:gap-4">
      <div class="col-span-2 md:col-span-4 lg:col-span-6">
        <Carousel/>
      </div>
      <div v-for="item in imgArr" :key="item.id" class="mx-5 mt-5 lg:mx-0">
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