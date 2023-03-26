<script setup>
import {ref} from "vue";
import InputModal from "@/component/InputModal.vue";
import Navbar from "@/component/Navbar.vue";
import Carousel from "@/component/Carousel.vue";
import Card from "@/component/Card.vue";
</script>

<template>
  <div data-theme="garden">
    <Navbar/>
<!--    <Carousel/>-->
    <router-view></router-view>
  </div>
</template>
<style scoped>
</style>