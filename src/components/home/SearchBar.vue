<template>
  <div id="search-bar">
    <input v-model="search" type="search" maxlength="32"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

const search = ref("")
const emit = defineEmits(['search'])

watch(search, (value) => emit('search', value))
</script>

<style scoped>
input {
  /*background-color: var(--nx-c-smoke-light);*/
  /*color: var(--nx-c-smoke);*/
  /*border: none;*/
  /*outline: none;*/
  /*font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,*/
  /*Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;*/
  /*font-size: 2em;*/
  /*padding: 0 0.5em;*/
  /*margin-top: 0.5em;*/
  /*max-width: 1em;*/
  /*max-height: 2em;*/
  /*text-align: center;*/
  /*font-weight: bold;*/
}
</style>