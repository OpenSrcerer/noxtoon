<template>
  <div id="login-form">
    <div :id="'form-' + input[0].name.toLowerCase()" v-for="input in inputs.entries()">
      <h2>{{ input[0].name }}</h2>
      <input v-model="formData[input[0].name.toLowerCase()]" :type="input[0].hidden ? 'password' : 'text'" maxlength="30"/>

      <div v-if="
      input[0].name === 'Password' &&
      !!formData[input[0].name.toLowerCase()] &&
      submitName === 'Sign Up'
      ">
        <ul>
          <li :class="lengthVal ? 'complete' : ''">At least 6 characters</li>
          <li :class="lowerUpperVal ? 'complete' : ''">At least one UPPERCASE and lowercase character</li>
          <li :class="specialVal ? 'complete' : ''">At least one special character</li>
        </ul>
      </div>
    </div>

    <button @click="validateAndEmit">{{ submitName }}</button>
  </div>
</template>

<script setup lang="ts">

import {computed, reactive} from "vue";

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
    if ((formData['username'] ?? '').length < 3) {
        alert("Your username must be at least three characters long!");
        return;
    }

    if (!lengthVal.value || ((!lowerUpperVal.value || !specialVal.value) && props.submitName === 'Sign Up')) {
        alert("Check that your password meets the requirements!");
        return;
    }

    if (props.submitName !== 'Sign In' && formData['password'] !== formData['confirm password']) {
        alert("Your passwords must match!");
        return;
    }

    for (const [input, validator] of props.inputs.entries()) {
        if (!validator(formData[input.name])) {
            emit('submitFail', input.name);
            return;
        }
    }

    emit('submitSuccess', formData);
}

// Password Validation
const lengthVal = computed(() => (formData['password'] ?? '').length >= 6)
const lowerUpperVal = computed(() =>
    (formData['password'] ?? '').match(/[a-z]/g) &&
    (formData['password'] ?? '').match(/[A-Z]/g)
)
const specialVal = computed(() => (formData['password'] ?? '').match(/[^a-zA-Z0-9]/g))

</script>

<style scoped>
ul {
  text-align: left;
}

li:not(.complete) {
  font-weight: bold;
}

li.complete {
  text-decoration: line-through;
}

#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
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
