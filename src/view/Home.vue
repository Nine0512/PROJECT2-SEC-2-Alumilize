<script setup>
import {onMounted, ref} from 'vue'
import Card from '../component/Card.vue'
import Carousel from "@/component/Carousel.vue"
import {getBook} from '@/composable/fetch.js'

let imgArr = ref([])

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
  <div class="w-full min-h-screen flex justify-center">
    <div class="w-full lg:w-4/6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 lg:gap-4">
      <div class="col-span-2 md:col-span-4 lg:col-span-6">
        <Carousel/>
      </div>
      <div v-for="item in imgArr" :key="item.id" class="mx-5 mt-5 lg:mx-0">
        <Card :item="item"/>
      </div>
      <div class="col-span-2 md:col-span-4 lg:col-span-6 flex justify-end">
        <router-link to="/manage" class="btn">Add Book</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>