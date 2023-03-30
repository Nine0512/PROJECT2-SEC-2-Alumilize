<script setup>
import router from "@/router";
import { ref, computed, onMounted } from "vue";
import Card from "@/component/Card.vue";
import Navbar from "@/component/Navbar.vue";
import { useRoleStore } from "@/store/roleChecking";
import { getBook } from "../composable/fetch.js";
const editProfile = ref(false);
const showProfile = ref(true);
const showLibrary = ref(false);
const showUserDetail = ref(false);
const showFavBook = ref(false);
const showHistory = ref(false);

const showEditProfile = () => {
  editProfile.value = true;
  shpwProfile.value = false;
  showLibrary.value = false;
  showUserDetail.value = false;
  showFavBook.value = false;
  showHistory.value = false;
};
const letShowProfile = () => {
  editProfile.value = false;
  showProfile.value = true;
  showLibrary.value = false;
  showUserDetail.value = false;
  showFavBook.value = false;
  showHistory.value = false;
};
const letShowLibrary = () => {
  editProfile.value = false;
  showProfile.value = false;
  showLibrary.value = true;
  showUserDetail.value = false;
  showFavBook.value = false;
  showHistory.value = false;
};
const letShowHistory = () => {
  editProfile.value = false;
  showProfile.value = false;
  showLibrary.value = false;
  showUserDetail.value = false;
  showFavBook.value = false;
  showHistory.value = true;
};
let allBook = ref([]);
let books = ref([]);
onMounted(async () => {
  const data = await getBook();
  allBook.value = data;
  books.value = allBook.value;
});

const { firstname, lastname, username, dateOfBirth, email, role, id, bookId } =
  useRoleStore().userInformation;
const updateUser = async () => {
  await fetch(`http://localhost:5000/login/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(copy),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
const copy = {
  firstname: firstname,
  lastname: lastname,
  email: email,
  dateOfBirth: dateOfBirth,
  bookId: bookId,
};
let booked = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let bookUser = "http://localhost:5000/Book?id=" + booked.join("&id=");
const userLibrary = async () => {
  let res = await fetch(bookUser);
  let data = await res.json();
  books.value = data;
};
</script>
<template>
  <Navbar />
  <div class="w-full min-h-screen flex justify-center">
    <div
      class="w-full lg:w-4/6 grid grid-cols-3 lg:grid-cols-6 gap-4 text-black"
    >
      <!-- left zone -->
      <div class="col-span-1 pt-10 w-full md:w-5/12 lg:w-9/12">
        <div class="avatar w-full items-center">
          <div class="w-20 rounded-full"><img src="/images/image4.png" /></div>
        </div>
        <div class="text-black">
          <h1 class="text-xl font-bold flex justify-center mt-5">
            {{ username }}
          </h1>
          <button @click="showEditProfile()" class="text-sm mt-2">
            Edit Profile
          </button>
          <div class="text-md flex flex-col pt-2 gap-y-2">
            <div class="flex flex-row">
              <button
                @click="letShowProfile()"
                class="mt-8 whitespace-nowrap flex flex-row gap-2"
              >
                <svg
                  width="19"
                  height="25"
                  viewBox="0 0 19 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.70648" cy="4.75" r="4.75" fill="black" />
                  <path
                    d="M19 19.8261C19 25.0728 14.7467 24.1631 9.5 24.1631C4.25329 24.1631 0 25.0728 0 19.8261C0 14.5794 4.25329 10.3261 9.5 10.3261C14.7467 10.3261 19 14.5794 19 19.8261Z"
                    fill="black"
                  />
                </svg>
                Profile
              </button>
            </div>
            <div class="flex flex-row">
              <button
                @click="
                  letShowLibrary();
                  userLibrary();
                "
                class="mt-3 whitespace-nowrap flex flex-row gap-2"
              >
                <svg
                  width="21"
                  height="24"
                  viewBox="0 0 21 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 0C2.79 0 2.61 0.03 2.43 0.09C1.26 0.33 0.33 1.26 0.09 2.43C0 2.61 0 2.79 0 3V19.5C0 21.99 2.01 24 4.5 24H21V21H4.5C3.66 21 3 20.34 3 19.5C3 18.66 3.66 18 4.5 18H21V1.5C21 0.66 20.34 0 19.5 0H18V9L15 6L12 9V0H3Z"
                    fill="black"
                  />
                </svg>
                Library
              </button>
            </div>
            <div class="flex flex-row">
              <button
                @click="letShowHistory()"
                class="mt-2 whitespace-nowrap flex flex-row gap-1"
              >
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.6795 20.1819C8.04775 22.0651 10.0496 23.3914 12.3173 23.917C14.5849 24.4426 16.9661 24.1323 19.0233 23.043C21.0806 21.9538 22.6756 20.1588 23.5155 17.9878C24.3554 15.8168 24.3837 13.4157 23.5951 11.2255C22.8067 9.03536 21.2543 7.20328 19.2234 6.06587C17.1924 4.92847 14.8191 4.56214 12.5397 5.03417C10.2603 5.50622 8.22778 6.78494 6.81555 8.6354C5.40332 10.4859 4.70624 12.7838 4.85242 15.1069M4.85242 15.1069L3.03992 13.2944M4.85242 15.1069L6.66492 13.2944"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.5 9.66663V14.5L18.125 18.125"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                History
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- right zone -->
      <div class="lg:col-span-5 col-span-2">
        <div class="flex flex-row">
          <div v-show="editProfile">
            <div class="text-black grid grid-rows-3 ml-64 mt-48 gap-y-5">
              <div class="flex flex-row gap-2">
                <label class="w-40">Firstname: </label>
                <input
                  type="text"
                  placeholder="Firstname"
                  class="input input-bordered border border-black h-8 bg-[#FAE1D2]"
                  v-model="copy.firstname"
                />
              </div>
              <div class="flex flex-row gap-2">
                <label class="w-40">Lastname: </label>
                <input
                  type="text"
                  placeholder="Lastname"
                  class="input input-bordered border border-black h-8 bg-[#FAE1D2]"
                  v-model="copy.lastname"
                />
              </div>
              <div class="text-black flex flex-row gap-2">
                <label class="w-40">DD/MM/YY: </label>
                <input
                  type="date"
                  placeholder="Your Birthday"
                  class="input input-bordered border border-black h-8 bg-[#FAE1D2]"
                  v-model="copy.dateOfBirth"
                />
              </div>
              <div class="text-black flex flex-row gap-2">
                <label class="w-40">Email: </label>
                <input
                  type="email"
                  placeholder="Email"
                  class="input input-bordered border border-black h-8 bg-[#FAE1D2]"
                  v-model="copy.email"
                />
              </div>
              <button
                @click="
                  editProfile = !editProfile;
                  showProfile = !showProfile;
                  updateUser();
                "
                class="border border-black w-fit p-2 rounded-lg bg-[#FEC4A2] grid place-self-end"
              >
                Save
              </button>
            </div>
          </div>
          <div v-show="showProfile">
            <div class="text-black grid grid-rows-4 ml-64 mt-48 gap-y-5">
              <div class="gap-2">
                <label class="w-44">Firstname: {{ copy.firstname }}</label>
              </div>
              <div class="gap-2">
                <label class="w-44">Lastname: {{ copy.lastname }}</label>
              </div>
              <div class="text-black gap-2">
                <label class="w-40">YY/MM/DD : {{ copy.dateOfBirth }} </label>
              </div>
              <div class="text-black w-96 gap-2">
                <label class="">Email : {{ copy.email }} </label>
              </div>
            </div>
          </div>
          <div v-show="showLibrary">
            <div class="grid grid-cols-2 lg:grid-cols-4 mt-16 gap-4">
              <div v-for="book in books" :key="book.id">
                <Card :item="book" :isMyBook="true" />
              </div>
            </div>
          </div>
          <div v-show="showHistory">
            <div class="grid grid-cols-2 lg:grid-cols-4 mt-16 gap-4">
              <div v-for="book in books" :key="book.id">
                <Card :item="book" :isMyBook="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
