<script setup>
import router from "@/router";
import { ref,computed , onMounted} from "vue";
import Card from "@/component/Card.vue";
import Navbar from "@/component/Navbar.vue";
import {useRoleStore} from "@/store/roleChecking";
import { getBook } from "../composable/fetch.js"



let user = ref([
  {
    name: "User Name",
    DateOfBirth: "DD/MM/YY",
    Email: "Email",
    Tel: "Tel",
  },
]);

const editProfile = ref(false);
const shpwProfile = ref(true);
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
  shpwProfile.value = true;
  showLibrary.value = false;
  showUserDetail.value = false;
  showFavBook.value = false;
  showHistory.value = false;
};

const letShowLibrary = () => {
  editProfile.value = false;
  shpwProfile.value = false;
  showLibrary.value = true;
  showUserDetail.value = false;
  showFavBook.value = false;
  showHistory.value = false;
};

const letShowUserDetail = () => {
  editProfile.value = false;
  shpwProfile.value = false;
  showLibrary.value = false;
  showUserDetail.value = true;
  showFavBook.value = false;
  showHistory.value = false;
};

const letShowFavBook = () => {
  editProfile.value = false;
  shpwProfile.value = false;
  showLibrary.value = false;
  showUserDetail.value = false;
  showFavBook.value = true;
  showHistory.value = false;
};

const letShowHistory = () => {
  editProfile.value = false;
  shpwProfile.value = false;
  showLibrary.value = false;
  showUserDetail.value = false;
  showFavBook.value = false;
  showHistory.value = true;
};

const name = ref("");
const dmy = ref("");
// const email = ref("");
const tel = ref("");

// const settingUser = (name, dmy, email, tel) => {
//   user.value[0].name = name;
//   user.value[0].DateOfBirth = dmy;
//   user.value[0].Email = email;
//   user.value[0].Tel = tel;
// };






let allBook = ref([])
let books = ref([])

onMounted( async () => {
  const data = await getBook();
  allBook.value = data;
  books.value = allBook.value;
});

const userDetail = ref([
  {
    id: 1,
    point: 13,
    description: "13 point from order #1",
    expired: "xx:xx xx/xx/xxxx",
  },
  {
    id: 2,
    point: 12,
    description: "12 point from order #2",
    expired: "xx:xx xx/xx/xxxx",
  },
  {
    id: 3,
    point: 15,
    description: "15 point from order #3",
    expired: "xx:xx xx/xx/xxxx",
  },
  {
    id: 4,
    point: 20,
    description: "13 point from order #4",
    expired: "xx:xx xx/xx/xxxx",
  },
  {
    id: 5,
    point: -13,
    description: "order #1 point expired",
    expired: "xx:xx xx/xx/xxxx",
  },
]);



const  {
  firstname,
  lastname,
  username,
  dateOfBirth,
  email,
  role,
  id
} = useRoleStore().userInformation
const updateUser = async () => {
await fetch(`http://localhost:5000/login/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    copy
  )
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
}

const copy = {
  "firstname": firstname,
    "lastname": lastname,
    "email": email,
    "dateOfBirth": dateOfBirth,
}

</script>

<template>
  <Navbar/>
  <div class="w-full min-h-screen flex justify-center">
    <div class="w-full lg:w-4/6 grid grid-cols-3 lg:grid-cols-6 gap-4 text-black">

        <!-- left zone -->
      <div class="col-span-1 pt-10 w-full md:w-5/12 lg:w-9/12">
        <div class=" avatar w-full items-center">
          <div class="w-20 rounded-full">
            <img src="/images/image4.png"/>
          </div>
        </div>


        <div class="text-black">
          <h1 class="text-xl font-bold flex justify-center mt-5"> {{ username }} </h1>
          <button
            @click="showEditProfile()"
            class="text-sm mt-2"
          >
            Edit Profile
          </button>

          <div class="text-md flex flex-col pt-2 gap-y-2">
            <div class="flex flex-row  ">
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
            <div class="flex flex-row  " >
            <button
              @click="letShowLibrary()"
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
            <div class="flex flex-row  ">
            <button
              @click="letShowUserDetail()"
              class="mt-3  whitespace-nowrap flex flex-row gap-2"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 0C5.14917 0 0 5.14917 0 11.5C0 17.8515 5.14917 23 11.5 23C17.8508 23 23 17.8515 23 11.5C23 5.14917 17.8508 0 11.5 0ZM11.5 20.8438C6.348 20.8438 2.15625 16.652 2.15625 11.5C2.15625 6.34804 6.34804 2.15625 11.5 2.15625C16.6527 2.15625 20.8438 6.34804 20.8438 11.5C20.8438 16.652 16.6527 20.8438 11.5 20.8438Z"
                  fill="black"
                />
                <path
                  d="M11.5 3.59375C7.14047 3.59375 3.59375 7.14047 3.59375 11.5C3.59375 15.8595 7.14047 19.4062 11.5 19.4062C15.8595 19.4062 19.4062 15.8595 19.4062 11.5C19.4062 7.14047 15.8595 3.59375 11.5 3.59375ZM11.5 18.6875C7.53704 18.6875 4.3125 15.463 4.3125 11.5C4.3125 7.53704 7.53704 4.3125 11.5 4.3125C15.4636 4.3125 18.6875 7.53704 18.6875 11.5C18.6875 15.463 15.4636 18.6875 11.5 18.6875Z"
                  fill="black"
                />
                <path
                  d="M11.8187 7.77637H9.50519C9.13598 7.77637 8.83698 8.07537 8.83698 8.44386V15.2636C8.83698 15.6328 9.13598 15.9318 9.50519 15.9318H9.84071C10.2099 15.9318 10.5089 15.6328 10.5089 15.2636V13.3432H11.8187C13.5699 13.3432 14.9955 12.0952 14.9955 10.5601C14.9955 9.02506 13.5699 7.77637 11.8187 7.77637ZM11.8187 11.8783H10.5089V9.24127H11.8187C12.6483 9.24127 13.3228 9.83298 13.3228 10.5601C13.3228 11.2866 12.6483 11.8783 11.8187 11.8783Z"
                  fill="black"
                />
              </svg>

              Point
            </button>
            </div>
            <div class="flex flex-row  ">
            <button @click="letShowFavBook()" class="mt-3 whitespace-nowrap flex flex-row gap-2">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.39 17.87C10.2749 17.9479 10.139 17.9895 10 17.9895C9.86098 17.9895 9.72514 17.9479 9.61 17.87C7.764 16.637 0 11.15 0 5.97299C0 -0.707008 7.85 -1.77701 10 2.72299C12.15 -1.77701 20 -0.707008 20 5.97299C20 11.151 12.236 16.637 10.39 17.868V17.87Z"
                  fill="black"
                />
              </svg>

              Favorite
            </button>
            </div>
            <div class="flex flex-row ">
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
      <div class="flex flex-row ">
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
                shpwProfile = !shpwProfile;
                updateUser();

              "
              class="border border-black w-fit p-2 rounded-lg bg-[#FEC4A2] grid place-self-end"
            >
              Save
            </button>
          </div>
        </div>

        <div v-show="shpwProfile">
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

        <div v-show="showLibrary" >
              <div class=" grid grid-cols-2 lg:grid-cols-4 gap-4"> 
               <div 
               v-for="book in books"
                  :key="book.id"
                  >
                  <Card :item="book" :isMyBook="true"/>
                 

                </div>
              </div>
        </div>

        <div v-show="showUserDetail">
          <div class="grid grid-cols">
            <div class="flex flex-row gap-36 ml-28 mt-48 text-md">
              <p>Id</p>
              <p>Point</p>
              <p>Description</p>
              <p>Expired</p>
            </div>

            <div
              v-for="point in userDetail"
              :key="point.id"
              class="mt-5 ml-28 flex flex-row gap-36 whitespace-nowrap"
            >
              <h1 class="text-md">{{ point.id }}</h1>
              <h1 class="text-md">{{ point.point }}</h1>
              <h1 class="text-xs">{{ point.description }}</h1>
              <h1 class="text-xs">{{ point.expired }}</h1>
            </div>
          </div>
        </div>

        <div v-show="showFavBook">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
            v-for="book in books"
                  :key="book.id"
            >
            <Card :item="book" :isMyBook="true"/>
    
            </div>
          </div>
        </div>

        <div v-show="showHistory">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
            v-for="book in books"
                  :key="book.id"
            >
            <Card :item="book" :isMyBook="true"/>

            </div>
          </div>
        </div>
        </div>
    </div>
    </div>
  </div>
</template>

<style scoped></style>
