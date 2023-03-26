<script setup>

import {ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import book from '../book/Ore no Imouto ga Konna ni Kawaii Wake ga Nai Ayase IF.pdf'
import {getBookById, deleteBook} from "@/composable/fetch";

const bookIcon = '/icon/book.svg'
const calendarIcon = '/icon/calendar.svg'
const globeIcon = '/icon/globe.svg'
const publisherIcon = '/icon/publisher.svg'


let bookInfo = ref()
const route = useRoute()
let id = route.params.id

watch(() => route.params.id, () => {
  id = route.params.id
  renderImg()
})

const renderImg = async () => {
  const img = await getBookById(id)
  bookInfo.value = img
}



renderImg()

</script>

<template>
  <div class="w-full min-h-screen flex justify-center text-black">
    <div class="w-full lg:w-4/6 lg:grid lg:grid-cols-6 gap-4 mx-5 my-2 mt-10">
      <div class="col-span-6 grid grid-cols-2 md:grid-cols-6 gap-4">
        <div class="col-span-2 w-full">
          <img :src="bookInfo?.imageBase64" class="w-full object-cover">
        </div>
        <div class="col-span-2 md:col-span-4 flex flex-col md:grid md:grid-cols-2 px-5">
          <div class="my-5 grid place-items-center md:place-items-start">
            <h1 class="text-4xl font-bold mb-5">{{ bookInfo?.title }}</h1>
            <p class="text-lg">Author : {{ bookInfo?.author }}</p>
            <p class="text-lg">Category :
              {{ bookInfo?.category.length > 1 ? bookInfo?.category.join(',') : bookInfo?.category.join('') }}</p>
            <p class="text-lg">Latest Update : {{ bookInfo?.date }}</p>
          </div>
          <div class="flex-col justify-self-end">
            <div class="place-items-center grid mt-10">
              <p class="text-4xl text-orange-500 font-bold">{{ bookInfo?.price }} Baht</p>
              <button class="btn border-none rounded-full bg-yellow-500 hover:bg-yellow-600 w-4/6 lg:w-full mt-8 ">Buy now</button>
            </div>
          </div>
          <div class="md:col-span-2 w-full grid place-content-center mb-5">
            <div class="w-full lg:w-5/6 grid grid-cols-4 gap-10 mt-5 py-3 px-6 place-items-center border-y border-neutral-400 border-solid">
              <div class="flex flex-col w-full place-items-center mx-2 lg:mx-3">
                <p class="text-[0.6rem] lg:text-xs whitespace-nowrap">Print Length</p>
                <img :src="bookIcon" class="w-4 h-4 lg:w-8 lg:h-8 my-2">
                <p class="text-[0.6rem] lg:text-xs whitespace-nowrap">{{ bookInfo?.printLength }} pages</p>
              </div>
              <div class="flex flex-col w-full place-items-center mx-2 lg:mx-3">
                <p class="text-[0.6rem] lg:text-xs">Language</p>
                <img :src="globeIcon" class="w-4 h-4 lg:w-8 lg:h-8 my-2">
                <p class="text-[0.6rem] lg:text-xs">{{ bookInfo?.language }}</p>
              </div>
              <div class="flex flex-col w-full place-items-center mx-2 lg:mx-3">
                <p class="text-[0.5rem] lg:text-xs">Publisher</p>
                <img :src="publisherIcon" class="w-4 h-4 lg:w-8 lg:h-8 my-2">
                <p class="text-[0.6rem] lg:ext-xs whitespace-nowrap">{{ bookInfo?.publisher }}</p>
              </div>
              <div class="flex flex-col w-full place-items-center mx-2 lg:mx-3">
                <p class="text-[0.5rem] lg:text-xs whitespace-nowrap">Publication Date</p>
                <img :src="calendarIcon" class="w-4 h-4 lg:w-8 lg:h-8 my-2">
                <p class="text-[0.6rem] lg:text-xs whitespace-nowrap">{{ bookInfo?.publishedDate }}</p>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <h1 class="text-lg font-semibold">Promotion</h1>
            <ul class="list-disc pl-5">
              <li>Limited-time Discount: Offer a limited-time discount on the book, reducing the price by 25%.</li>
              <li>Code: READMORE10 for Get 10% off your next e-book purchase.</li>
              <li>Code: FREEREAD for New user get a free e-book of your choice.(once use)</li>
              <li>Code: NEWRELEASE20 for Get 20% off the newest e-book release.</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-span-6">
        <div class="lg:col-span-6">
          <h1 class="text-2xl font-bold">Description : {{ bookInfo?.title }}</h1>
          <p class="text-lg my-4 text-justify">&nbsp;&nbsp;&nbsp;&nbsp;{{ bookInfo?.description }}</p>
        </div>
      </div>
      <div class="col-span-6">
        <a :href="book" class="btn" target="_blank">Download</a>
      </div>
      <div class="col-span-6 flex justify-end my-5">
        <router-link :to="'/manage/update/' + bookInfo?.id" class="btn ml-2">Update</router-link>
        <label for="my-modal-6" class="btn ml-2">Delete</label>
        <input type="checkbox" id="my-modal-6" class="modal-toggle"/>
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Are you sure!</h3>
            <p class="py-4">You won't be able to revert this!</p>
            <div class="modal-action">
              <a href="/" class="btn btn-error" @click="deleteBook(bookInfo?.id)">Delete</a>
              <label for="my-modal-6" class="btn">Cancel</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>