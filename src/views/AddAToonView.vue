<template>
  <div id="add-toon-form">
    <div v-for="input in inputs">
      <h1>{{ input }}</h1>
      <input type="text" maxlength="32"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputs = ['Name', 'Show', 'Gender', 'Age', 'Description', 'Video']
</script>

<style scoped>
#add-toon-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

</style>