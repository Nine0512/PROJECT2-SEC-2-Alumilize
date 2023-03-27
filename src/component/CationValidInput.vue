<script setup>
const props = defineProps(['text', 'check'])
const cationIcon = 'https://api.iconify.design/ep:warning-filled.svg?color=%23FF0000'
</script>

<template>
  <div v-show="!check" class="text-xs flex justify-start w-full text-red-500 space-x-2 pt-1">
    <img :src="cationIcon">
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>

</style>