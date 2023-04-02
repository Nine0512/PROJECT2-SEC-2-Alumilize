<script setup>
import {useRoleStore} from "@/store/roleChecking"
import { addBookToCart } from "@/composable/fetch.js"
import book from '../book/Ore no Imouto ga Konna ni Kawaii Wake ga Nai Ayase IF.pdf'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
let getBookId = useRoleStore().userInformation.bookId

</script>

<template>

  <div class="w-full h-1/2">
    <router-link :to="{name:'book' , params:{id:props.item.id}}">
      <div class="h-full overflow-hidden">
        <img :src="item.imageBase64" :alt="item.title" class="w-full"/>
      </div>
      <div class="py-4 h-40">
        <div class="">
          <h2 class="md:text-base text-sm">{{ item.title }}</h2>
          <h3 class="md:text-sm text-xs">{{ item.author }}</h3>
          <h3 class="md:text-sm text-xs">{{ item.category.join(',') }}</h3>
          <h3 class="text-lg font-bold lg:text-2xl lg:font-semibold text-orange-500">{{ item.price }}
            Baht</h3>
        </div>
      </div>
    </router-link>
    <div class="grid place-items-center">
      <a :href="book" target="_blank"
         class="w-full lg:w-11/12 py-0.5 bg-green-500 text-sm lg:text-black mb-4 btn border-none rounded-full hover:bg-green-600 hover:transition"
         v-if="getBookId.includes(item.id)">
        Download
      </a>
      <button :id="item.id"
              class="w-full lg:w-11/12 py-0.5 bg-yellow-500 text-sm lg:text-black mb-4 btn border-none rounded-full hover:bg-yellow-600 hover:transition"
              v-else
              @click="addBookToCart($event,item.price, useRoleStore().userInformation.role, useRoleStore().userInformation.id, useRoleStore().userInformation.cart)">Add to cart
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>