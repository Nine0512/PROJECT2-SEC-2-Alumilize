<script setup>
import {ref} from "vue";
import Navbar from "@/component/Navbar.vue";
import Carousel from "@/component/Carousel.vue";
import Card from "@/component/Card.vue";
</script>

<template>
  <div data-theme="garden">
    <router-view></router-view>
  </div>
</template>
<style scoped>
</style>