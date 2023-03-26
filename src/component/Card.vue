<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

</script>

<template>

  <div class="w-full h-auto p-3">
    <router-link :to="{name:'book' , params:{id:props.item.id}}">
      <div class="h-full overflow-hidden">
        <img :src="item.imageBase64" :alt="item.title" class="w-full"/>
      </div>
      <div class="py-4 h-40">
        <div class="">
          <h2 class="text-base">{{ item.title }}</h2>
          <h3 class="text-sm">{{ item.author }}</h3>
          <h3 class="text-sm">{{ item.category.join(',') }}</h3>
        </div>
        <div class="flex justify-end">
          <h3 class="text-2xl font-semibold text-orange-500">{{ item.price }} Baht</h3>
        </div>
      </div>
    </router-link>
    <div class="grid grid-cols-2 gap-4 place-items-center">
      <button class="rounded-xl py-2 border-none hover:bg-yellow-400 w-full bg-yellow-300 text-white">Add to cart
      </button>
      <button class="rounded-xl py-2 border-none hover:bg-yellow-600 w-full bg-yellow-500 text-white">Buy now
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>