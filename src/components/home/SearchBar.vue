<template>
  <div id="search-bar">
    <input v-model="search" type="search" maxlength="32"/>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="11 11 490 490">
      <g><path d="m495,466.1l-119.2-119.2c29.1-35.5 46.5-80.8 46.5-130.3 0-113.5-92.1-205.6-205.6-205.6-113.6,0-205.7,92.1-205.7,205.7s92.1,205.7 205.7,205.7c49.4,0 94.8-17.4 130.3-46.5l119.1,119.1c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9zm-443.2-249.4c-1.42109e-14-91 73.8-164.8 164.8-164.8 91,0 164.8,73.8 164.8,164.8s-73.8,164.8-164.8,164.8c-91,0-164.8-73.8-164.8-164.8z"></path></g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const search = ref("")
const emit = defineEmits(['search'])

watch(search, (value) => emit('search', value))
</script>

<style scoped>
#search-bar {
  display: flex;
  justify-content: right;
  align-items: center;
  column-gap: 1em;
  transition: all .5s ease-in-out;
}

svg {
  width: 3em;
  fill: var(--nx-c-smoke);
}

input {
  font-size: 1.5em;
  height: 2em;
  width: 60%;
  background-color: var(--nx-c-gray-hover);
  color: var(--nx-c-smoke);
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  border: none;
  border-radius: .5em;
  /*outline: none;*/
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
  max-height: 2em;
  transition: all 250ms ease-in-out;
}

input[type="search"]::-webkit-search-cancel-button {
  filter: invert(1);
}
</style>