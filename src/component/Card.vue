<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

</script>

<template>

  <div class="w-full h-auto">
    <router-link :to="{name:'book' , params:{id:props.item.id}}">
      <div class="h-full overflow-hidden">
        <img :src="item.imageBase64" :alt="item.title" class="w-full"/>
      </div>
      <div class="py-4 h-40">
        <div class="">
          <h2 class="text-base">{{ item.title }}</h2>
          <h3 class="text-sm">{{ item.author }}</h3>
          <h3 class="text-sm">{{ item.category.join(',') }}</h3>
          <h3 class="text-lg font-bold lg:text-2xl lg:font-semibold text-orange-500">{{ item.price }} Baht</h3>
        </div>
      </div>
    </router-link>
    <div class="grid place-items-center">
      <button class="w-full lg:w-11/12 py-0.5 rounded-xl bg-yellow-500 text-sm lg:text-black mb-4">Add to cart
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>