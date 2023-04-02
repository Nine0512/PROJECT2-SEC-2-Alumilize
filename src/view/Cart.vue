<script setup>
import {ref} from 'vue'
import {useRoleStore} from "@/store/roleChecking"

const bin = '/icon/bin.svg'
let getUserId = useRoleStore().userInformation.id
let getCart = useRoleStore().userInformation.cart
let getCartItemId = useRoleStore().userInformation.cart.map(e => e.id)
getCart = getCart.filter((item, index) => getCart.indexOf(item) === index);
let cartChecked = []
let total = ref(0)
let outCheckedAll = ref(null)
let outChecked = ref(null)
let infoArr = ref([])
let itemList = ref(null)
let dataJson = async () => {
  let res = await fetch('http://localhost:5000/Book?id=' + getCartItemId.join('&id='))
  infoArr.value = await res.json();
}

dataJson()

let removeBookFromCart = async (item) => {
  if (getCart.some(items => items.id === item.id)) {
    useRoleStore().removeFromCart(item)
    infoArr.value = infoArr.value.filter(e => e.id !== item.id)
    await fetch(`http://localhost:5000/login/${getUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: useRoleStore().userInformation.cart
      })
    })
  }
}

let checked = (event, id) => {
  outCheckedAll.value.checked = false
  outChecked.value = event.target
  let selectedBookCart = infoArr.value.find(item => item.id === id)
  if (outChecked.value.checked) {
    if (!getCart) {
      getCart = []
      getCart.push(selectedBookCart.id)
    } else {
      getCart.push(selectedBookCart.id)
    }
    total.value += selectedBookCart.price
    cartChecked.push(selectedBookCart.id)
  } else {
    total.value -= selectedBookCart.price
    cartChecked.pop(selectedBookCart.id)
    getCart = getCart.filter(item => item !== selectedBookCart.id)
  }
}

let checkAll = () => {
  for (let i = 0; i < itemList.value.children.length; i++) {
    itemList.value.children[i].children[0].children[0].children[0].children[0].checked = outCheckedAll.value.checked
  }
  for (let i = 0; i < infoArr.value.length; i++) {
    if (outCheckedAll.value.checked) {
      total.value += infoArr.value[i].price
      cartChecked.push(infoArr.value[i].id)
      if (!getCart) {
        getCart = []
        getCart.push(infoArr.value[i].id)
      } else {
        getCart.push(infoArr.value[i].id)
      }
    } else {
      total.value -= infoArr.value[i].price
      getCart = getCart.filter(item => item !== infoArr.value[i].id)
      cartChecked.pop(infoArr.value[i].id)
    }
  }
  outChecked.value.checked = true
}
let submitOnCart = async () => {
  // const now = new Date().toISOString(); // สร้าง Object Date ขึ้นมาแล้วแปลงเป็น ISO string
  useRoleStore().setCart(useRoleStore().userInformation.cart.filter(item => !cartChecked.find(id => id === item.id)))
  infoArr.value = infoArr.value.filter(item => !cartChecked.find(e => e === item.id))
  const data = {
    bookId: [],
  }
  let raw = await fetch(`http://localhost:5000/login/${getUserId}`)
  let user = await raw.json()
  data.bookId = user.bookId.concat(cartChecked.filter(e => !user.bookId.find(item => item === e)))
  // useRoleStore().userInformation.cart = infoArr.value
  await fetch(`http://localhost:5000/login/${getUserId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  await fetch(`http://localhost:5000/login/${getUserId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: useRoleStore().userInformation.cart
    })
  })
  cartChecked.length = 0
  total.value = 0
  outCheckedAll.value.checked = false
  outChecked.value.checked = false
  useRoleStore().setBookId(data.bookId)
}

</script>
<template>
  <div class="w-full min-h-screen ">
    <!-- 1.Information bar -->
    <div
        class="bg-[#FEC4A2] text-black my-5 lg:mx-64 py-2  grid lg:grid-cols-4 max-[1100px]:grid-cols-3 md:grid-cols-4 max-[768px]:grid-cols-1 max-[768px]:justify-items-center max-[90px]:grid-cols-1 justify-between rounded-box place-items-center ">
      <div class="flex flex-row whitespace-nowrap">
        <div class="flex flex-row justify-start pr-2.5 ">
          <input type="checkbox" class="checkbox border border-black" @click="checkAll()" ref="outCheckedAll"/>
        </div>
        Select All
      </div>
      <div class="max-[1100px]:hidden ">Information</div>
      <div class="lg:ml-64 md:col-end-4 ml-6 max-[768px]:hidden">Price</div>
      <div class="lg:ml-16 md:col-end-5 max-[1100px]:relative max-[768px]:hidden sm:ml-0 ">Remove</div>
    </div>
    <!-- 2.item bar -->
    <div class="w-full" ref="itemList">
      <div v-for="item in infoArr" :key="item.id" class="my-5 lg:mx-64 ">
        <div class="bg-[#FEC4A2] text-black grid lg:grid-cols-6 md:grid-cols-4 py-3.5 place-items-center rounded-box">
          <div class="grid grid-cols-3 mr-2 sm:auto-rows-max">
            <div class="grid place-items-center">
              <input type="checkbox" class="checkbox border border-black" @click="checked($event,item.id)"
                     ref="outChecked"/>
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
          <div
              class="lg:col-span-2 md:col-span-2 grid xl:grid-cols-2 md:grid-row-2 max-[1280px]:grid-rows-2 max-[768px]:grid-rows-2 max-[768px]:justify-items-center">
            <div class="lg:pl-4">
              <p class="font-semibold lg:text-4xl whitespace-nowrap md:text-2xl">Price: {{ item.price }} $</p>
            </div>
            <div class="lg:ml-16" @click="removeBookFromCart(item)">
              <img :src="bin" alt="bin" class="w-1/3 cursor-pointer">
            </div>
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
        <div class="lg:col-end-7 lg:col-span-1 card font-semibold btn btn-ghost whitespace-nowrap"
             @click="submitOnCart()">
          Purchase
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>