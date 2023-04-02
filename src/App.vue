<script setup>
import Navbar from "@/component/Navbar.vue";
import Footer from "@/component/Footer.vue";
</script>

<template>
  <div data-theme="garden" >
    <Navbar/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>
<style scoped>
</style>