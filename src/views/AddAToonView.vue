<template>
  <div id="add-toon-form">
    <div v-for="input in inputs">
      <h1>{{ input }}</h1>
      <input v-model="formData[input]" type="text"/>
    </div>
    <h1 @click="onSubmit">Submit</h1>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {createCartoon} from "@/services/FirestoreService";

const formData = reactive<Record<string, any>>({});
const inputs = ['Name', 'Show', 'Gender', 'Age', 'Description', 'Video', 'Color']
clearForm()

const onSubmit = async () => {
  await createCartoon({
    name: formData[inputs[0]],
    show: formData[inputs[1]],
    gender: formData[inputs[2]],
    age: formData[inputs[3]],
    description: formData[inputs[4]],
    video: formData[inputs[5]],
    color: formData[inputs[6]],
  })
  clearForm()
}

function clearForm() {
  inputs.forEach(input => formData[input] = '');
}
</script>

<style scoped>
#add-toon-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  flex-wrap: wrap;
}

h1 {
  cursor: pointer;
}

h1:hover {
  background-color: var(--nx-c-gray-hover);
  color: var(--nx-c-near-black);
}
</style>