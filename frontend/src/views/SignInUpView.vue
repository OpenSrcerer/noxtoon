<template>
    <br><br>
    <hr>
    <h1 @click="isSignIn = !isSignIn">toggle</h1>
    <hr>
    <br>

    <LoginForm v-if="isSignIn"
               @submit-fail="onSignInFail"
               @submit-success="onSignIn"
               submit-name="Sign In"
               :inputs="signInInputs"/>

    <LoginForm v-else
               @submit-fail="onSignUpFail"
               @submit-success="onSignUp"
               submit-name="Sign Up"
               :inputs="signUpInputs"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import LoginForm from "../components/login/LoginForm.vue";
import {createUser, loginUser} from "../services/BackendClient";

const isSignIn = ref(true);

// Sign In Form
const signInInputs = new Map([
    ['Username', () => true],
    ['Password', () => true],
]);
const onSignInFail = (v) => console.log(v);
const onSignIn = async (form) => await loginUser(form.username, form.password);

// Sign Up Form
const signUpInputs = new Map([
    ['Username', () => true],
    ['Password', () => true],
    ['Confirm Password', () => true],
]);
const onSignUpFail = (v) => console.log(v);
const onSignUp = async (form) => await createUser(form.username, form.password);

</script>

<style scoped>

</style>
