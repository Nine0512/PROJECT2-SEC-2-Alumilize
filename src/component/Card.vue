<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

</script>

<template>

  <div class="card w-full my-4">
      <figure class="h-full overflow-hidden"><img :src="item.imageBase64" :alt="item.title" class="w-full"/></figure>
      <div class="py-4 h-40">
        <div class="h-full">
          <h2 class="text-base">{{ item.title }}</h2>
          <h3 class="text-sm">{{ item.author }}</h3>
          <h3 class="text-sm">{{ item.category.join(',') }}</h3>
        </div>
      </div>
    <div class="grid place-items-center">
      <button class="w-full lg:w-11/12 py-0.5 rounded-xl bg-yellow-500 text-sm lg:text-black mb-4">{{ item.price }} Baht
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>