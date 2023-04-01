<script setup>
import {useRoleStore} from "@/store/roleChecking"
import {ref} from "vue";
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

let getCart = useRoleStore().userInformation.cart
<<<<<<< HEAD
let addBookToCart = async (event) => {
=======
let addBookToCart = (event) => {
>>>>>>> 356a43b78ec7785e737dc1a5b788c4bc28c24d84
  let even = event.target.id;
  let num = parseInt(even);
  if(!getCart.includes(num)){
    getCart.push(num)
    console.log(getCart)
  }
<<<<<<< HEAD
  // await fetch(`http://localhost:5000/login/${useRoleStore().userInformation.id}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(
  //     {
  //       cart: getCart
  //     }
  //   )
  // })
=======
>>>>>>> 356a43b78ec7785e737dc1a5b788c4bc28c24d84
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
          <h2 class="md:text-base text-sm">{{ item.title }}</h2>
          <h3 class="md:text-sm text-xs">{{ item.author }}</h3>
          <h3 class="md:text-sm text-xs">{{ item.category.join(',') }}</h3>
          <h3 class="text-lg font-bold lg:text-2xl lg:font-semibold text-orange-500" v-if="!isMyBook">{{ item.price }}
            Baht</h3>
        </div>
      </div>
    </router-link>
    <div class="grid place-items-center">
      <button class="w-full lg:w-11/12 py-0.5 rounded-xl bg-yellow-500 text-sm lg:text-black mb-4" v-if="isMyBook">Download
      </button>
      <button :id="item.id" class="w-full lg:w-11/12 py-0.5 rounded-xl bg-yellow-500 text-sm lg:text-black mb-4" v-else @click="addBookToCart">Add to cart
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>