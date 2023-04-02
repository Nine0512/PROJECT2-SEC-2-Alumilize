<script setup>
import { onMounted, ref } from "vue";
import Card from "../component/Card.vue";
import { getBook } from "../composable/fetch.js";
import Loading from "@/component/Loading.vue";

let allBook = ref([]);
let filBook = ref([]);
const publisherArr = ref([])


onMounted(async () => {
  const data = await getBook();
  loading.value = false;
  allBook.value = data;
  filBook.value = allBook.value;
  allBook.value.forEach((item) => {
    if (!publisherArr.value.includes(item.publisher)) {
      publisherArr.value.push(item.publisher);
    }
  });
});

const categoryArr = ref([
  "Art",
  "Design",
  "Photography",
  "Programming",
  "Science",
  "Technology",
]);


let authorCheck = [];
let categoryCheck = [];
let publisherCheck = [];
let removeCheck;

function filterAllCheck(arr) {
  filBook.value = allBook.value.filter((i) =>
    arr.some((c) => {
      if (arr === categoryCheck) {
        return i.category.includes(c);
      } else if (arr === authorCheck) {
        return i.author.includes(c);
      } else if (arr === publisherCheck) {
        return i.publisher.includes(c);
      }
    })
  );
}
const category = ref([])
const publisher = ref([])
let loading = ref(true)

function allChecked(arr, item, event) {
  if (event.target.checked) {
    arr.push(item);
    filterAllCheck(arr, item);
  } else {
    removeCheck = arr.indexOf(item);
    arr.splice(removeCheck, 1);
    filterAllCheck(arr, item);
  }
  if (arr.length === 0) {
    filBook.value = allBook.value;
  }
}

const msg = ref("");

function filterBook(event) {
  filBook.value = allBook.value.filter((i) =>
    i.title.toLowerCase().includes(event.target.value.toLowerCase())
  );
  msg.value = null;

  if (filBook.value.length === 0) {
    msg.value = "Book Not Found";
  }
}

const toggle = ref(false);
const toggleRes = ref(false);

function dropdown(item) {
  if (item === "res") {
    toggleRes.value = !toggleRes.value;
  }
  if (item === "drop") {
    toggle.value = !toggle.value;
  }
}

let sortAsc = "asc";
let sortDesc = "desc";

function sortPrice(item) {
  filBook.value = filBook.value.sort((a, b) => {
    if (item === "asc") {
      return a.price - b.price;
    } else if (item === "desc") {
      return b.price - a.price;
    }
  });
}
</script>

<template>
    <div class="flex justify-center w-full">
      <div class="w-4/6 grid grid-cols-10 max-lg:hidden p-5">
        <div class="col-span-2 h-[25rem]">
          <div class="flex h-[2rem] pr-2">
            <input
              type="text"
              placeholder="search word"
              class="rounded-md w-11/12 max-w-xs h-[2rem] border border-gray-300 bg-white pl-2"
              @input="filterBook"
            />
          </div>
          <span class="text-xs text-red-400">* word for book search</span>
          <span class="flex justify-start items-center">Category</span>
          <ul>
            <li
              v-for="(item,index) in categoryArr" :key="index"
              class="flex flex-row items-center text-gray-700 w-full"
            >
              <input
                type="checkbox"
                @click="allChecked(categoryCheck, item, $event)"
                class="mr-2 cursor-pointer" v-model="category[index]"
              />{{ item }}  
            </li>
          </ul>
          <hr class="border-gray-300 w-full my-3" />
          <span class="flex justify-start items-center">publisher</span>
          <ul>
            <li
              v-for="(item,index) in publisherArr" :key="index"
              class="flex flex-row items-center text-gray-700 w-full"
            >
              <input
                type="checkbox"
                @click="allChecked(publisherCheck, item, $event)"
                class="mr-2 border cursor-pointer" v-model="publisher[index]"
              />{{ item }}
            </li>
          </ul>
          <hr class="border-gray-300 w-full" />
        </div>

        <div class="grid col-span-8 grid-cols-4 gap-4">
          <div class="col-span-4 grid grid-cols-12 gap-4 h-[2rem]">
            <div class="col-span-8 text-lg text-gray-600 pl-3">
              display {{ filBook.length }} books from all
              {{ allBook.length }} books
            </div>
            <div class="col-span-3 border-b-2 border-gray-300 col-start-10">
              <button class="text-gray-600" @click="dropdown('drop')">
                ║Sort by Advise ▼
              </button>
              <div
                class="bg-gray-100 border opacity-80 border-gray-300 w-44 absolute z-50 rounded-lg p-2"
                v-if="toggle"
              >
                <p
                  class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                  @click="sortPrice(sortDesc)"
                >
                  sort by price <span class="text-red-600">max-min</span>
                </p>
                <p
                  class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                  @click="sortPrice(sortAsc)"
                >
                  sort by price <span class="text-red-600">min-max</span>
                </p>
              </div>
            </div>
          </div>
          <div class="col-span-4 grid place-items-center" v-show="loading">
            <Loading />
          </div>
          <div v-for="item in filBook">
            <Card :item="item" />
          </div>
          <div class="col-span-4 grid place-items-center text-6xl m-5 text-red-500">
            {{ msg }}
          </div>
        </div>
      </div>

      <div class="lg:hidden w-full m-5">
        <div class="grid grid-cols-2 gap-2">
          <div class="flex h-[2rem] pr-2 pl-2">
            <input
              type="text"
              placeholder="search word"
              class="rounded-md w-11/12 max-w-xs h-[2rem] border border-gray-300 bg-white pl-2"
              @input="filterBook"
            />
          </div>
          <div class="w-full col-start-2 flex">
            <div class="w-full">
              <div
                class="w-full cursor-pointer border-b-2 border-gray-300 pl-2 text-gray-600"
                @click="dropdown('res')"
              >
                <div class="flex justify-between max-sm:text-md lg:text-lg">
                  <span>book filter</span>
                  ▼
                </div>
              </div>

              <div
                v-if="toggleRes"
                class="bg-white opacity-90 border border-gray-300 md:w-60 absolute z-50 rounded-lg p-2"
              >
                <span class="flex justify-start items-center"
                  >Search by Category</span
                >
                <div>
                  <ul>
                    <li
                      v-for="(item,index) in categoryArr" :key="index"
                      class="flex flex-row items-center text-gray-700 w-full"
                    >
                      <input
                        type="checkbox"
                        @click="allChecked(categoryCheck, item, $event)"
                        class="mr-2 cursor-pointer" v-model="category[index]"
                      />{{ item }}
                    </li>
                  </ul>
                </div>
                <hr class="border-gray-300 m-2" />
                <span class="flex justify-start items-center"
                  >Search by publisher</span
                >
                <ul>
                  <li
                    v-for="(item,index) in publisherArr" :key="index"
                    class="flex flex-row items-center text-gray-700 w-full"
                  >
                    <input
                      type="checkbox"
                      @click="allChecked(publisherCheck, item, $event)"
                      class="mr-2 border cursor-pointer" v-model="publisher[index]"
                    />{{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-start-1 text-xs text-red-400 pl-2 h-1 pb-2">
            * word for book search
          </div>
          <div class="col-span-2 grid grid-cols-12 gap-4 h-[2rem]">
            <div
              class="col-span-8 text-gray-600 pl-3 max-sm:text-md lg:text-lg flex items-center"
            >
              display {{ filBook.length }} from {{ allBook.length }} books
            </div>
            <div class="col-span-4 flex justify-end">
              <div class="border-b-2 border-gray-300">
                <button
                  class="text-gray-600 max-sm:text-sm md:text-lg"
                  @click="dropdown('drop')"
                >
                  ║Sort by ▼
                </button>
                <div
                  class="bg-white opacity-80 border border-gray-300 :w-40 absolute z-50 rounded-lg p-2"
                  v-if="toggle"
                >
                  <p
                    class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                    @click="sortPrice(sortDesc)"
                  >
                    sort by price <span class="text-red-600">max-min</span>
                  </p>
                  <p
                    class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                    @click="sortPrice(sortAsc)"
                  >
                    sort by price <span class="text-red-600">min-max</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-2 grid place-items-center" v-show="loading">
            <Loading />
          </div>
          <div v-for="item in filBook">
            <Card :item="item" />
          </div>
          <div class="col-span-2 grid place-items-center text-6xl m-5 text-red-400">
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped></style>
