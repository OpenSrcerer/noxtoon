<template>
  <div id="login-form">
    <h1>Login Form</h1>

    <div :id="'form-' + input[0].toLowerCase()" v-for="input in inputs.entries()">
        <h2>{{ input[0] }}</h2>
        <input v-model="formData[input[0].toLowerCase()]" type="text" maxlength="30"/>
    </div>

    <h1 @click="validateAndEmit">{{ submitName }}</h1>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";

interface LoginFormProps {
    inputs: Map<string, (v) => boolean>, // input name, validation
    submitName: string
}

const formData = reactive<Record<string, any>>({});
const props = defineProps<LoginFormProps>();
const emit = defineEmits(['submitFail', 'submitSuccess'])

const validateAndEmit = () => {
    for (const [input, validator] of props.inputs.entries()) {
        if (!validator(input)) {
            emit('submitFail', `Field ${input} is invalid!`);
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
    max-width: 30rem;
}


</style>
