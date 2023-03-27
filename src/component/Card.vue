<script setup>
import {useRoleStore} from "@/store/roleChecking"
import { getBook } from "../composable/fetch.js"
import {onMounted, ref} from "vue";
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isMyBook: {
    type: Boolean,
    default: false
  }
})
let allBook = ref([]);
let filBook = ref([]);

onMounted(async ()=>{
  const data = await getBook()
  allBook.value = data
  filBook.value = allBook.value
})

const getCart = useRoleStore().userInformation.cart
let addBooktoCart = (event,id)=>{
  let selectedBook = allBook.value.find(item => item.id === id)
  if (selectedBook && !getCart.some(item => item.id === selectedBook.id)) {
    getCart.push(selectedBook)
    console.log(getCart)
  }
}
</script>

<template>

  <div class="w-full h-1/2">
    <router-link :to="{name:'book' , params:{id:props.item.id}}">
      <div class="h-full overflow-hidden">
        <img :src="item.imageBase64" :alt="item.title" class="w-full"/>
      </div>
      <div class="py-4 h-40">
        <div class="">
          <h2 class="text-base">{{ item.title }}</h2>
          <h3 class="text-sm">{{ item.author }}</h3>
          <h3 class="text-sm">{{ item.category.join(',') }}</h3>
          <h3 class="text-lg font-bold lg:text-2xl lg:font-semibold text-orange-500" v-if="!isMyBook">{{ item.price }}
            Baht</h3>
        </div>
      </div>
    </router-link>
    <div class="grid place-items-center">
      <button class="w-full lg:w-11/12 py-0.5 rounded-xl bg-yellow-500 text-sm lg:text-black mb-4" v-if="isMyBook">Download
      </button>
      <button class="w-full lg:w-11/12 py-0.5 rounded-xl bg-yellow-500 text-sm lg:text-black mb-4" v-else @click="addBooktoCart($event,item.id)">Add to cart
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>