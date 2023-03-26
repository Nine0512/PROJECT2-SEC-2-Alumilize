<script setup>
import { ref } from 'vue'
let book = [
  {
    "id":1,
    "title":"Harry",
    "price" :100,
    "description":"เซโตะ อิจิทากะ เด็กนักเรียนมัธยมที่ขี้อายเวลาเข้าหาเพศตรงข้าม ชอบทำอะไรตรงข้ามกับที่ตัวเองคิด และจะมานั่งนึกเสียใจทีหลัง แอบชอบ อิโอริ มาตลอด แต่ไม่กล้าพูด แต่วันหนึ่งถูกเข้าใจผิดเนื่องด้วยมีวัยรุ่นอันธพาลได้กล่าวถึงเรื่องด้านลบที่อิโอริได้ไปถ่ายแบบ แล้วยังต้องมาทำงานร่วมกัน ขณะที่ทั้งสองเริ่มที่จะยอมรับซึ่งกันและกัน อากิบะ อิตซึกิ ก็ได้เข้ามาในชีวิตเพื่อทำตามคำสัญญาที่ได้ทำไว้กับอิจิทากะว่า จะแต่งงานกัน (ตัวละครหลักในเรื่อง ชื่อจะขึ้นด้วยตัวอักษร I) เป็นการ์ตูนเกี่ยวกับความรัก ตลก แกมทะลึ่งเล็กน้อย",
    isChecked: false
  },
  {
    "id":2,
    "title":"Conan",
    "price" :200,
    "description":"เซโตะ อิจิทากะ เด็กนักเรียนมัธยมที่ขี้อายเวลาเข้าหาเพศตรงข้าม ชอบทำอะไรตรงข้ามกับที่ตัวเองคิด และจะมานั่งนึกเสียใจทีหลัง แอบชอบ อิโอริ มาตลอด แต่ไม่กล้าพูด แต่วันหนึ่งถูกเข้าใจผิดเนื่องด้วยมีวัยรุ่นอันธพาลได้กล่าวถึงเรื่องด้านลบที่อิโอริได้ไปถ่ายแบบ แล้วยังต้องมาทำงานร่วมกัน ขณะที่ทั้งสองเริ่มที่จะยอมรับซึ่งกันและกัน อากิบะ อิตซึกิ ก็ได้เข้ามาในชีวิตเพื่อทำตามคำสัญญาที่ได้ทำไว้กับอิจิทากะว่า จะแต่งงานกัน (ตัวละครหลักในเรื่อง ชื่อจะขึ้นด้วยตัวอักษร I) เป็นการ์ตูนเกี่ยวกับความรัก ตลก แกมทะลึ่งเล็กน้อย",
    isChecked: false
  },
  {
    "id":3,
    "title":"Dragonball",
    "price" :300,
    "description":"เซโตะ อิจิทากะ เด็กนักเรียนมัธยมที่ขี้อายเวลาเข้าหาเพศตรงข้าม ชอบทำอะไรตรงข้ามกับที่ตัวเองคิด และจะมานั่งนึกเสียใจทีหลัง แอบชอบ อิโอริ มาตลอด แต่ไม่กล้าพูด แต่วันหนึ่งถูกเข้าใจผิดเนื่องด้วยมีวัยรุ่นอันธพาลได้กล่าวถึงเรื่องด้านลบที่อิโอริได้ไปถ่ายแบบ แล้วยังต้องมาทำงานร่วมกัน ขณะที่ทั้งสองเริ่มที่จะยอมรับซึ่งกันและกัน อากิบะ อิตซึกิ ก็ได้เข้ามาในชีวิตเพื่อทำตามคำสัญญาที่ได้ทำไว้กับอิจิทากะว่า จะแต่งงานกัน (ตัวละครหลักในเรื่อง ชื่อจะขึ้นด้วยตัวอักษร I) เป็นการ์ตูนเกี่ยวกับความรัก ตลก แกมทะลึ่งเล็กน้อย",
    isChecked: false
  },
  {
    "id":4,
    "title":"Gintama",
    "price" :400,
    "description":"Kyosuke Kosaka, a normal seventeen-year-old high-school student, hasn’t gotten along with his younger sister, Kirino, in years. For longer than he can remember, Kirino has ignored his comings and goings and looked at him with spurning eyes. It seemed as if the relationship between Kyosuke and his sister, now fourteen, would continue this way forever.\\n\\nOne day, however, Kyosuke finds a DVD case of a magical girl anime entitled Hoshikuzu Witch Meruru (Stardust Witch Meruru), which had fallen into the entranceway of his house. To Kyosuke’s surprise, inside the case is a hidden adult video game titled Imoto to Koishiyo! (Love with Little Sister!)",
    isChecked: false
  }
]
let cart = ref([])//itemที่ใส่ไปใน cart
let cartChecked = ref([])//item ที่เลือกแล้วใน cart
let yourEbook = ref([])
let selectedBookCart = ref([])
let isCheckAll = ref(false)
let total = ref(0)
let cartCheckedLength = ref(0)
let outChecked = ref(null)
let addBooktoCart = (event,id)=>{
  let selectedBook = book.find(item => item.id === id)
  if (selectedBook && !cart.value.some(item => item.id === selectedBook.id)) {
    cart.value.push(selectedBook)
    console.log(cart.value)
  }
}
let removeBookfromCart = (item)=>{
  let index = cart.value.indexOf(item)
  if (index > -1) {
    cart.value.splice(index, 1)
  }
}
let checked = (event,id)=>{
  selectedBookCart = cart.value.find(item => item.id === id)
  if(selectedBookCart && selectedBookCart.isChecked === false){
    cartCheckedLength.value += 1
    selectedBookCart.isChecked = true
    total.value += selectedBookCart.price
    cartChecked.value.push(selectedBookCart)
  }else{
    total.value -= selectedBookCart.price
    cartCheckedLength.value -= 1
    selectedBookCart.isChecked = false
    cartChecked.value.pop(selectedBookCart)
  }
}
let checkAll = ()=>{
  if(!isCheckAll.value){
    for(let i = 0; i < cart.value.length; i++){
      cart.value[i].isChecked = true
      total.value += cart.value[i].price
      cartChecked.value.push(cart.value[i])
    }
  }else{
    for(let i = 0; i < cart.value.length; i++){
      cart.value[i].isChecked = false
      total.value -= cart.value[i].price
      cartChecked.value.pop(cart.value[i])
    }
  }
  cartCheckedLength.value = cartChecked.value.length
}
let submitOncart = ()=>{
  let ids = new Set(cartChecked.value.map(({ id }) => id));
  cart.value = cart.value.filter(({ id }) => !ids.has(id));
  cartCheckedLength.value -= cartChecked.value.length
  total.value = 0
  cartChecked.value = []
  outChecked.value.checked = false
}
</script>
<template>
  <div class="flex flex-col justify-center">
    <div>
      <div v-for="item in book" :key="item.id">
        <div class="flex justify-center">
          {{ item.id }} - {{ item.title }}
        </div>
        <div class="flex flex-row justify-center">
          <div>
            <button @click="addBooktoCart($event,item.id)">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full min-h-screen">
    <!-- 1.Information bar -->
    <div class="my-5 lg:mx-64 py-2  grid lg:grid-cols-4 max-[1100px]:grid-cols-3 md:grid-cols-4 max-[768px]:grid-cols-1 max-[768px]:justify-items-center max-[90px]:grid-cols-1 justify-between bg-base-300 rounded-box place-items-center ">
      <div class="flex flex-row whitespace-nowrap border">
        <div  class="flex flex-row justify-start pr-2.5">
          <input type="checkbox" class="checkbox"  @click="checkAll()" v-model="isCheckAll" ref="outChecked"/>
        </div>
        Select All
      </div>
      <div class="max-[1100px]:hidden border">Information</div>
      <div class="lg:ml-64 md:col-end-4 ml-6 border max-[768px]:hidden">Price</div>
      <div class="lg:ml-16 md:col-end-5 max-[1100px]:relative max-[768px]:hidden sm:ml-0 border ">Remove</div>
    </div>
    <!-- 2.item bar -->
    <div v-for="item in cart" :key="item.id" class="my-5 lg:mx-64 ">
      <div class="grid lg:grid-cols-6 md:grid-cols-4 py-3.5 place-items-center bg-base-300 rounded-box border border-black">
        <div class="grid grid-cols-3 border border-emerald-600 mr-2 sm:auto-rows-max"><!--Image border border-amber-200-->
          <div class="grid place-items-center">
            <input type="checkbox" class="checkbox"  @click="checked($event,item.id)" />
          </div>
          <div class="col-span-2">
            <img src="https://picsum.photos/200/300" alt="book" class=""/>
          </div>
        </div>
        <div class="lg:col-span-3  sm:auto-rows-max "><!--Name border border-emerald-600-->
          <p class="font-semibold lg:text-4xl md:text-2xl">{{ item.title }} </p>
          <p class="text-xs max-[1100px]:hidden">Description</p>
          <p class="font-semibold text-xs max-[1100px]:hidden">{{ item.description }}</p>
        </div>
        <div class="lg:col-span-2 md:col-span-2 grid xl:grid-cols-2 md:grid-row-2 max-[1280px]:grid-rows-2 max-[768px]:grid-rows-2 max-[768px]:justify-items-center">
          <div class="lg:pl-4"><!--Price border border-blue-600-->
            <p class="font-semibold lg:text-4xl whitespace-nowrap md:text-2xl">Price: {{ item.price }} $</p>
          </div>
          <div class="lg:ml-16" @click="removeBookfromCart(item)"><!--Trash border border-rose-400-->
            <button class="btn"/>
          </div>
        </div>
      </div>
    </div>
    <!-- 3.submit bar -->
    <div class="my-5 lg:mx-64 pt-5 p-2 bg-base-300 rounded-box place-items-center border border-black">
      <div class="grid lg:grid-cols-6 md:grid-cols-2">
        <div class="lg:col-end-6 lg:col-span-1 grid max-[768px]:grid-rows-2 max-[768px]:justify-items-center ">
          <div class="lg:text-4xl md:text-2xl  font-semibold grid justify-items-end whitespace-nowrap">
            Total: {{ total }} $
          </div>
          <div class="font-semibold grid justify-items-center whitespace-nowrap">
            ({{ cartCheckedLength }} piece)
          </div>
        </div>
        <div class="lg:col-end-7 lg:col-span-1 card font-semibold btn btn-ghost whitespace-nowrap" @click="submitOncart()">
          Purchase
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
img {
  width:6rem;
  height:9rem;
}
</style>