<script setup>
import {ref} from "vue";
import {useRoleStore} from "@/store/roleChecking"
import Card from "../component/Card.vue";
import Navbar from "@/component/Navbar.vue";
import Footer from "@/component/Footer.vue";

let allBook = ref([]);
let filBook = ref([]);

async function getAllBook() {
  const response = await fetch("http://localhost:5000/Book");
  const data = await response.json();
  allBook.value = data;
  filBook.value = allBook.value;
  return data;
}

getAllBook();

const categoryArr = ref(['Art', 'Design', 'Photography', 'Programming', 'Science', 'Technology']);
const publisherArr = ref(["Siam Inter Comics", "ASCII Media Works","Kodansha Comics","Viz Media","Yen Press","One Peace Books"]);

let authorCheck = [];
let categoryCheck = [];
let plublisherCheck = [];
let removeCheck;

function filterAllCheck(arr) {
  filBook.value = allBook.value.filter((i) =>
    arr.some((c) => {
      if (arr === categoryCheck) {
        return i.category.includes(c);
      } else if (arr === authorCheck) {
        return i.author.includes(c);
      } else if (arr === plublisherCheck) {
        return i.publisher.includes(c);
      }
    })
  )
}

function allChecked(arr, item) {
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
const togleRes = ref(false);

function dropdown(item){
  if(item==='res'){
    togleRes.value = !togleRes.value
  }
  if(item==='drop'){
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

const getRole = useRoleStore().role

</script>

<template>
  <Navbar/>
  <div class="flex justify-center w-full">
    <div class="w-4/6 grid grid-cols-10 max-lg:hidden p-5">
      <div class=" col-span-2 h-[25rem]">
        <div class="flex h-[2rem] pr-2">
          <input
            type="text"
            placeholder="คำค้นหา"
            class="rounded-md w-11/12 max-w-xs h-[2rem] border border-gray-300 bg-white pl-2"
            @input="filterBook"
          />
        </div>
        <span class="text-xs text-red-400">* คำสำหรับการค้นหาหนังสือ</span>
        <span class="flex justify-start items-center"
          >เลือกตามหมวดหมู่</span
        >
        <ul>
          <li
            v-for="item in categoryArr"
            class="flex flex-row items-center text-gray-700 w-full"
          >
            <input
              type="checkbox"
              @click="allChecked(categoryCheck, item)"
              class="mr-2 cursor-pointer"
            />{{ item }}
          </li>
        </ul>
        <hr class="border-gray-300 w-full my-3" />
        <span class=" flex justify-start items-center"
          >สำนักพิมพ์</span
        >
        <ul>
          <li
            v-for="item in publisherArr"
            class="flex flex-row items-center text-gray-700 w-full"
          >
            <input
              type="checkbox"
              @click="allChecked(plublisherCheck, item)"
              class="mr-2 border cursor-pointer"
            />{{ item }}
          </li>
        </ul>
        <hr class="border-gray-300 w-full" />
      </div>

      <div class="grid col-span-8 grid-cols-4 gap-4">
        <div class="col-span-4 grid grid-cols-12 gap-4 h-[2rem]">
          <div class="col-span-8 text-lg text-gray-600 pl-3">
            แสดงหนังสือ {{ filBook.length }} เล่ม จากทั้งหมด
            {{ allBook.length }} เล่ม
          </div>
          <div class="col-span-3 border-b-2 border-gray-300 col-start-10 ">
            <button class="text-gray-600" @click="dropdown('drop')">
              ║เรียงตาม แนะนำ&nbsp;&nbsp;▼
            </button>
            <div
              class="bg-gray-100 border opacity-80 border-gray-300 w-44 absolute z-50 rounded-lg p-2"
              v-if="toggle"
            >
              <p
                class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                @click="sortPrice(sortDesc)"
              >
                เรียงตามราคา <span class="text-red-600">มาก-น้อย</span>
              </p>
              <p
                class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                @click="sortPrice(sortAsc)"
              >
                เรียงตามราคา <span class="text-red-600">น้อย-มาก</span>
              </p>
            </div>
          </div>
        </div>
        <div v-for="item in filBook">
          <Card :item="item" />
        </div>
        <div class="text-6xl m-5 text-red-500">
          {{ msg }}
        </div>
      </div>
    </div>

    <!-- responsive -->
    <div class="lg:hidden w-full m-5">
      <div class="grid grid-cols-2 gap-2">
        <div class="flex h-[2rem] pr-2 pl-2">
          <input
            type="text"
            placeholder="คำค้นหา"
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
              <span>ฟิลเตอร์หนังสือ</span>
              ▼
            </div>
            </div>
            
            <div v-if="togleRes" class="bg-white opacity-90 border border-gray-300 md:w-60 absolute z-50 rounded-lg p-2">
              <span class="flex justify-start items-center"
                >เลือกตามหมวดหมู่</span
              >
              <div>
                <ul>
                  <li
                    v-for="item in categoryArr"
                    class="flex flex-row items-center text-gray-700 w-full"
                  >
                    <input
                      type="checkbox"
                      @click="allChecked(categoryCheck, item)"
                      class="mr-2 cursor-pointer"
                    />{{ item }}
                  </li>
                </ul>
              </div>
              <hr class="border-gray-300 m-2"/>
              <span class="flex justify-start items-center">สำนักพิมพ์</span>
              <ul>
                <li
                  v-for="item in publisherArr"
                  class="flex flex-row items-center text-gray-700 w-full"
                >
                  <input
                    type="checkbox"
                    @click="allChecked(plublisherCheck, item)"
                    class="mr-2 border cursor-pointer"
                  />{{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-start-1 text-xs text-red-400 pl-2 h-1 pb-2">* คำสำหรับการค้นหาหนังสือ</div>
        <div class="col-span-2 grid grid-cols-12 gap-4 h-[2rem]">
          <div class="col-span-8 text-gray-600 pl-3 max-sm:text-md lg:text-lg flex items-center">
            แสดงหนังสือ {{ filBook.length }} เล่มจาก
            {{ allBook.length }} เล่ม
          </div>
          <div class="col-span-4 flex justify-end">
            <div class="border-b-2 border-gray-300">
              <button class="text-gray-600 max-sm:text-sm md:text-lg" @click="dropdown('drop')">
                ║เรียงตาม ▼
              </button>
              <div
                class="bg-white opacity-80 border border-gray-300 :w-40 absolute z-50 rounded-lg p-2"
                v-if="toggle"
              >
                <p
                  class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                  @click="sortPrice(sortDesc)"
                >
                  เรียงตามราคา <span class="text-red-600">มาก-น้อย</span>
                </p>
                <p
                  class="cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
                  @click="sortPrice(sortAsc)"
                >
                  เรียงตามราคา <span class="text-red-600">น้อย-มาก</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-for="item in filBook">
          <Card :item="item"/>
        </div>
        <div class="text-6xl m-5 text-red-400">
          {{ msg }}
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<style scoped></style>
