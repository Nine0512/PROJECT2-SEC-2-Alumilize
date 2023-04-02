<script setup>
import Navbar from "@/component/Navbar.vue";
import Footer from "@/component/Footer.vue";
</script>

<template>
  <div data-theme="garden" class="flex flex-col min-h-screen" >
    <Navbar/>
    <router-view></router-view>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>
<style scoped>
</style>