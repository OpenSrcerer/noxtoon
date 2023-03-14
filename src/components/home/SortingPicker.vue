<template>
  <div id="choice-picker">
    <input type="radio" id="alphabetically" name="sorting_order" value="name"
           @click="emit('sort', 'name')" checked>
    <label for="alphabetically">Alphabetically</label><br>
    <input type="radio" id="hearts" name="sorting_order" value="hearts"
           @click="emit('sort', 'hearts')">
    <label for="hearts">Hearts</label><br>
    <input type="radio" id="stars" name="sorting_order" value="stars"
           @click="emit('sort', 'stars')">
    <label for="stars">Stars</label>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['sort'])
</script>

<style scoped>
</style>