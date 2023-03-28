<script setup>
import {onMounted, ref} from 'vue'
import Footer from "@/component/Footer.vue";
import Navbar from "@/component/Navbar.vue";
import {useRoleStore} from "@/store/roleChecking"
import {getBook} from "@/composable/fetch.js";

onMounted(async ()=>{
  const data = await getBook()
})
let getUserId = useRoleStore().userInformation.id
let getCart = useRoleStore().userInformation.cart
let getBooked = useRoleStore().userInformation.bookId
let cartChecked = ref([])//item ที่เลือกแล้วใน cart
let total = ref(0)
let outCheckedAll = ref(null)
let outChecked = ref(null)
console.log(typeof getBooked)
let removeBookfromCart = (item)=>{
  let index = getCart.indexOf(item)
  if (index > -1) {
    getCart.splice(index, 1)
  }
}
let checked = (event,id)=>{
  outChecked.value = event.target
  let selectedBookCart = getCart.find(item => item.id === id)
  if(outChecked.value.checked){
    if(!getBooked){
      getBooked = []
      getBooked.push(selectedBookCart.id)
    }
    total.value += selectedBookCart.price
    cartChecked.value.push(selectedBookCart)
  }else{
    total.value -= selectedBookCart.price
    cartChecked.value.pop(selectedBookCart)
    getBooked = getBooked.filter(item => item !== selectedBookCart.id)
  }
  console.log(cartChecked.value)
}
let checkAll = ()=>{
  for(let i = 0; i < getCart.length; i++){
  if(outCheckedAll.value.checked){
      total.value += getCart[i].price
      cartChecked.value.push(getCart[i])
      if (!getBooked){
      getBooked = []
      getBooked.push(getCart[i].id)
      }else{
        getBooked.push(getCart[i].id)
      }
  }else{
      total.value -= getCart[i].price
      getBooked = getBooked.filter(item => item !== getCart.id)
    cartChecked.value.pop(getCart[i])
    }
  }
}
let submitOncart = async ()=>{
  await fetch(`http://localhost:5000/login/${getUserId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bookId: getBooked
    })
  })
  let ids = new Set(cartChecked.value.map(({ id }) => id));
  getCart = getCart.filter(({ id }) => !ids.has(id));
  useRoleStore().setCartToEmpty()
  total.value = 0
  cartChecked.value = []
  outCheckedAll.value.checked = false
  console.log(getCart)
}

</script>
<template>
  <Navbar/>
  {{}}
  <div class="w-full min-h-screen ">
    <!-- 1.Information bar -->
    <div class="bg-[#FEC4A2] text-black my-5 lg:mx-64 py-2  grid lg:grid-cols-4 max-[1100px]:grid-cols-3 md:grid-cols-4 max-[768px]:grid-cols-1 max-[768px]:justify-items-center max-[90px]:grid-cols-1 justify-between rounded-box place-items-center ">
      <div class="flex flex-row whitespace-nowrap">
        <div  class="flex flex-row justify-start pr-2.5 ">
          <input type="checkbox" class="checkbox border border-black"  @click="checkAll()" ref="outCheckedAll"/>
        </div>
        Select All
      </div>
      <div class="max-[1100px]:hidden ">Information</div>
      <div class="lg:ml-64 md:col-end-4 ml-6 max-[768px]:hidden">Price</div>
      <div class="lg:ml-16 md:col-end-5 max-[1100px]:relative max-[768px]:hidden sm:ml-0 ">Remove</div>
    </div>
    <!-- 2.item bar -->
    <div v-for="item in getCart" :key="item.id" class="my-5 lg:mx-64 ">
      <div class="bg-[#FEC4A2] text-black grid lg:grid-cols-6 md:grid-cols-4 py-3.5 place-items-center rounded-box">
        <div class="grid grid-cols-3 mr-2 sm:auto-rows-max">
          <div class="grid place-items-center">
            <input type="checkbox" class="checkbox border border-black"  @click="checked($event,item.id)" ref="outChecked" />
          </div>
          <div class="col-span-2">
            <img :src="item.imageBase64" :alt="item.title" class="w-full"/>
          </div>
        </div>
        <div class="lg:col-span-3  sm:auto-rows-max ">
          <p class="font-semibold lg:text-4xl md:text-2xl">{{ item.title }} </p>
          <p class="text-xs max-[1100px]:hidden">Description</p>
          <p class="font-semibold text-xs max-[1100px]:hidden">{{ item.description }}</p>
        </div>
        <div class="lg:col-span-2 md:col-span-2 grid xl:grid-cols-2 md:grid-row-2 max-[1280px]:grid-rows-2 max-[768px]:grid-rows-2 max-[768px]:justify-items-center">
          <div class="lg:pl-4">
            <p class="font-semibold lg:text-4xl whitespace-nowrap md:text-2xl">Price: {{ item.price }} $</p>
          </div>
          <div class="lg:ml-16" @click="removeBookfromCart(item)">
            <button class="btn"/>
          </div>
        </div>
      </div>
    </div>
    <!-- 3.submit bar -->
    <div class="bg-[#FEC4A2] text-black my-5 lg:mx-64 pt-5 p-2 rounded-box place-items-center">
      <div class="grid lg:grid-cols-6 md:grid-cols-2 ">
        <div class="lg:col-end-6 lg:col-span-1 grid max-[768px]:grid-rows-2 max-[768px]:justify-items-center ">
          <div class="lg:text-4xl md:text-2xl  font-semibold grid justify-items-end whitespace-nowrap">
            Total: {{ total }} $
          </div>
          <div class="font-semibold grid justify-items-center whitespace-nowrap">
            ({{ cartChecked.length }} piece)
          </div>
        </div>
        <div class="lg:col-end-7 lg:col-span-1 card font-semibold btn btn-ghost whitespace-nowrap" @click="submitOncart()">
          Purchase
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>
<style scoped>
img {
  width:6rem;
  height:9rem;
}
</style>