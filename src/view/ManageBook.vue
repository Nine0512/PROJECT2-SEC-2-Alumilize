<script setup>

import {onMounted, ref} from "vue"
import {useRoute} from 'vue-router'
import router from "@/router";

let route = useRoute()
const file = ref(null)
let fileReader

let previewImg = ref('')
let categoryArr = ref(['Art', 'Design', 'Photography', 'Programming', 'Science', 'Technology'])
let fileExtension = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
let warning = ref('')
let id = route.params.id
let bookObj = ref({})
let btn = ref('Add')

onMounted(async () => {
  if (id === undefined) {
    btn.value = 'Add'
    bookObj.value = {
      title: "",
      author: "",
      price: "",
      printLength: "",
      language: "",
      publisher: "",
      publishedDate: "",
      date: new Date().toLocaleDateString(),
      description: "",
      category: [],
      imageBase64: ""
    }
  } else {
    btn.value = 'Update'
    fetch(`http://localhost:5000/Book/${id}`).then(res => res.json()).then(res => {
      bookObj.value = res
      previewImg.value = bookObj.value?.imageBase64
    })
  }
})



const handleFileChange = (e) => {
  console.log(e.target.files[0].name)
  if (fileExtension.some(item => e.target.files[0].name.endsWith(item))) {
    warning.value = ''
    file.value = e.target.files[0]
    previewImg.value = URL.createObjectURL(e.target.files[0])
  } else {
    previewImg.value = ''
    warning.value = 'Please upload file with extension .png, .jpg, .jpeg, .gif, .svg'
  }
}

const handleSubmit = async () => {
  if (bookObj.value?.title === '' || bookObj.value?.author === '' || bookObj.value?.price === '' || bookObj.value?.description === ''
      || bookObj.value?.category.length === 0 || bookObj.value?.printLength === '' || bookObj.value?.language === ''
      || bookObj.value?.publishedDate === '' || bookObj.value?.publisher === '' || file.value === null) {
    warning.value = 'Please fill all the field'
    return false
  } else {
    warning.value = ''
    fileReader = new FileReader()
    fileReader.onload = (e) => {
      bookObj.value.imageBase64 = e.target.result
      fetch(' http://localhost:5000/Book', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bookObj.value),
      }).then(() => router.go(-1))
    }
    fileReader.readAsDataURL(file.value)
    return true
  }
}


const handleUpdate = async (id) => {
  fileReader = new FileReader()
  bookObj.value.date = new Date().toLocaleDateString()
  if (!file.value) {
    fetch(`http://localhost:5000/Book/${id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(bookObj.value),
    })
        .then(() => router.go(-1))
  } else {
    fileReader.onload = (e) => {
      bookObj.value.imageBase64 = e.target.result
      fetch(`http://localhost:5000/Book/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(bookObj.value),
      })
          .then(() => router.go(-1))
    }
    fileReader.readAsDataURL(file.value)
  }
}

let pushCategory = (item) => {
  if (bookObj.value?.category.some(e => e === item)) {
    bookObj.value.category = bookObj.value?.category.filter(e => e !== item)
  } else {
    bookObj.value?.category.push(item)
  }
}


</script>

<template>

  <div class="w-full min-h-screen flex justify-center">
    <div class="w-full lg:w-4/6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-10">
      <div class="col-span-3">
        <h3 class="font-bold text-lg">Book info</h3>
        <div class="my-5">
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Title</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                   v-model="bookObj.title"/>
          </div>
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Author</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                   v-model="bookObj.author"/>
          </div>
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Price</span>
            </label>
            <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                   v-model="bookObj.price"/>
          </div>
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Print Length</span>
            </label>
            <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                   v-model="bookObj.printLength"/>
          </div>
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Language</span>
            </label>
            <select class="select select-bordered w-full max-w-xs" v-model="bookObj.language">
              <option disabled selected>What language of your book?</option>
              <option>Thai</option>
              <option>English</option>
              <option>Japanese</option>
              <option>German</option>
              <option>French</option>
            </select>
          </div>
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Publisher</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                   v-model="bookObj.publisher"/>
          </div>
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Published Date</span>
            </label>
            <input type="date" placeholder="Type here" class="input input-bordered w-full max-w-xs"
                   v-model="bookObj.publishedDate"/>
          </div>
          <div class="form-control w-5/6 max-w-xs">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea class="textarea textarea-bordered h-24" placeholder="Type here"
                      v-model="bookObj.description"></textarea>
          </div>
          <div class="w-full">
            <label class="label">
              <span class="label-text">Category</span>
            </label>
            <div class="grid grid-cols-2">
              <div v-for="item in categoryArr" :key="item" class="my-3">
                <div class="form-control md:w-full">
                  <label class="label cursor-pointer px-5">
                    <span class="label-text">{{ item }}</span>
                    <input v-if="btn === 'Update'" type="checkbox" class="checkbox" @click="pushCategory(item)"
                           :checked="bookObj?.category?.some(m => m === item)"/>
                    <input v-if="btn === 'Add'" type="checkbox" class="checkbox" @click="pushCategory(item)"/>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3">
        <h3 class="font-bold text-lg">Preview Image</h3>
        <div class="w-full bg-gray-300 rounded-xl p-10 mt-5" :class="previewImg?'':'h-5/6'">
          <img :src="previewImg" alt="selected Image" v-if="previewImg">
        </div>
      </div>
      <div class="col-span-6 grid grid-cols-2 w-full">
        <div class="flex flex-col justify-start">
          <p class="text-red-500" v-if="warning">{{ warning }}</p>
          <input type="file" class="file-input" @change="handleFileChange"/>
        </div>
        <div class="flex justify-end modal-action mb-5">
          <label v-if="btn === 'Add'" :for="handleSubmit?'':'my-modal'" class="btn bg-green-500 hover:bg-green-600 text-black"
                 @click="handleSubmit">Submit</label>
          <label v-else-if="btn === 'Update'" for="my-modal" class="btn ml-2 border-none btn bg-green-500 hover:bg-green-600 text-black" @click="handleUpdate(id)">Update</label>
          <button class="btn ml-2 border-none" @click="router.go(-1)">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>