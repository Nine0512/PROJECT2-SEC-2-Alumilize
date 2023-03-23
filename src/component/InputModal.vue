<script setup>

import {ref} from "vue"
import {useRoute} from 'vue-router'

defineEmits(['updateValue'])

const props = defineProps({
  method: {
    type: String,
    default: 'insert'
  },
  item: Object
})

let route = useRoute()
const file = ref(null)
let title = ref('')
let author = ref('')
let price = ref()
let description = ref('')
let fileReader
let category = ref([])
let previewImg = ref('')
let categoryArr = ref(['Art', 'Design', 'Photography', 'Programming', 'Science', 'Technology'])
let fileExtension = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
let warning = ref('')
let id = route.params.id

if (props.method === 'update') {
  title.value = props.item?.title
  author.value = props.item?.author
  price.value = props.item?.price
  description.value = props.item?.description
  category.value = props.item?.category
  previewImg.value = props.item?.imageBase64
}
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
  if (title.value === '' || author.value === '' || price.value === '' || description.value === '' || category.value.length === 0 || file.value === null) {
    warning.value = 'Please fill all the field'
    return false
  }else{
    warning.value = ''
    fileReader = new FileReader()
    fileReader.onload = (e) => {
      fetch('http://localhost:5000/Book', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          imageBase64: e.target.result,
          title: title.value,
          author: author.value,
          price: price.value,
          date: new Date().toLocaleDateString(),
          category: category.value,
          description: description.value
        }),
      }).then(res => res.json()).then(() => location.reload())
    }
    fileReader.readAsDataURL(file.value)
    return true
  }
}


const handleUpdate = async (id) => {
  fileReader = new FileReader()
  fileReader.onload = (e) => {
    fetch(`http://localhost:5000/Book/${id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageBase64: e.target.result,
        title: title.value,
        author: author.value,
        price: price.value,
        date: new Date().toLocaleDateString(),
        category: category.value,
        description: description.value
      }),
    })
        .then(res => res.json()).then(() => {
      location.reload()
    })

  }
  fileReader.readAsDataURL(file.value)
}


let pushCategory = (item) => {
  if (category.value.some(e => e === item)) {
    category.value = category.value.filter(e => e !== item)
  }else {
    category.value.push(item)
  }
}

</script>

<template>

  <!-- The button to open modal -->
  <label v-if="method === 'insert'" for="my-modal" class="btn">Add Book</label>
  <label v-else-if="method === 'update'" for="my-modal" class="btn">Update Book</label>


  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="my-modal" class="modal-toggle"/>
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl p-10">
      <h3 class="font-bold text-lg">Book info</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 place-items-center my-5">
        <div class="">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Title</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="title"/>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Author</span>
            </label>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="author"/>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Price</span>
            </label>
            <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="price"/>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea class="textarea textarea-bordered h-24" placeholder="Type here" v-model="description"></textarea>
          </div>
        </div>
        <div class="w-full">
          <label class="label">
            <span class="label-text">Category</span>
          </label>
          <div v-for="item in categoryArr" :key="item" class="my-3">
            <div class="form-control md:w-full">
              <label class="label cursor-pointer px-5">
                <span class="label-text">{{ item }}</span>
                <input v-if="method === 'update'" type="checkbox" class="checkbox" @click="pushCategory(item)"
                       :checked="category.some(m => m === item)"/>
                <input v-if="method === 'insert'" type="checkbox" class="checkbox" @click="pushCategory(item)"/>
              </label>
            </div>
          </div>
        </div>
      </div>
      <img :src="previewImg" alt="selected Image" v-if="previewImg" class="my-5">
      <p class="text-red-500" v-if="warning">{{ warning }}</p>
      <input type="file" class="file-input w-full max-w-xs" @change="handleFileChange"/>
      <div class="modal-action">
        <label v-if="method === 'insert'" :for="handleSubmit?'':'my-modal'" class="btn" @click="handleSubmit">Submit</label>
        <label v-else-if="method === 'update'" for="my-modal" class="btn" @click="handleUpdate(id)">Update</label>
        <label for="my-modal" class="btn">Cancel</label>
      </div>
    </div>
  </div>

</template>