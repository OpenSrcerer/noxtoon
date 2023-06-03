<template>
  <div id="login-form">
    <div :id="'form-' + input[0].name.toLowerCase()" v-for="input in inputs.entries()">
      <h2>{{ input[0].name }}</h2>
      <input v-model="formData[input[0].name.toLowerCase()]" :type="input[0].hidden ? 'password' : 'text'" maxlength="30"/>
    </div>

    <button @click="validateAndEmit">{{ submitName }}</button>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";

interface LoginForm {
  name: string;
  hidden: boolean;
}

interface LoginFormProps {
    inputs: Map<LoginForm, (v) => boolean>, // input name, validation
    submitName: string
}

const formData = reactive<Record<string, any>>({});
const props = defineProps<LoginFormProps>();
const emit = defineEmits(['submitFail', 'submitSuccess'])

const validateAndEmit = () => {
    for (const [input, validator] of props.inputs.entries()) {
        if (!validator(formData[input.name])) {
            emit('submitFail', input.name);
            return;
        }
    }
    emit('submitSuccess', formData);
}

</script>

<style scoped>
#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  font-size: 1.5rem;
  font-family: var(--nx-f-inter);
  margin-top: 2rem;
  border-radius: .5rem;
  padding: .5rem 1rem;
  transition: .5s;
  cursor: pointer;
  color: var(--nx-c-smoke);
  background-color: var(--nx-c-gray-hover);
  border: 1px solid var(--nx-c-gray-card-hover);
}

button:hover {
  background-color: var(--nx-c-orange);
  border: 1px solid var(--nx-c-orange);
  color: var(--nx-c-near-black);
}

input {
  font-size: 1rem;
  border-radius: .25rem;
  transition: .5s;
  width: 15rem;
  min-height: 2.5rem;
  font-family: var(--nx-f-inter);
  text-align: center;
  background-color: var(--nx-c-gray-hover);
  border: 1px solid var(--nx-c-gray-card-hover);
  color: white;
}

h2 {
  margin-bottom: .5rem;
}

</style>
