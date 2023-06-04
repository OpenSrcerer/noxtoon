<template>
  <div id="login-screen">
    <div id="login-container">
      <div id="clippy-logo">
        <img id="clippy" src="../assets/img/misc/clippy-hello.gif"/>
        <img id="logo" src="../assets/img/parallax/logo-wide.png">
      </div>

      <hr>

      <div v-if="isSignIn">
        <LoginForm :inputs="signInInputs"
                   @submit-fail="onFailure"
                   @submit-success="onSignIn"
                   submit-name="Sign In"/>
        <p>Don't have an account? <span @click="isSignIn = false">Sign Up</span></p>
      </div>

      <div v-else>
        <LoginForm :inputs="signUpInputs"
                   @submit-fail="onFailure"
                   @submit-success="onSignUp"
                   submit-name="Sign Up"/>
        <p>Already have an account? <span @click="isSignIn = true">Sign In</span></p>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
import LoginForm from "../components/login/LoginForm.vue";
import {createUser, loginUser} from "../services/BackendClient";
import {setCurrentUser} from "../services/UsernameService";

const isSignIn = ref(true);

// Sign In Form
const signInInputs = new Map([
    [{ name: "Username", hidden: false }, () => true],
    [{ name: 'Password', hidden: true }, () => true],
]);
const onSignIn = async (form) => {
    await loginUser(form.username, form.password);
    setCurrentUser()
}

// Sign Up Form
const signUpInputs = new Map([
    [{ name: "Username", hidden: false }, () => true],
    [{ name: 'Password', hidden: true }, () => true],
    [{ name: 'Confirm Password', hidden: true }, () => true],
]);
const onSignUp = async (form) => {
    await createUser(form.username, form.password);
    setCurrentUser();
}

const onFailure = (e) => console.log(e);

</script>

<style scoped>
img {
  max-width: 10rem;
}

h1 {
  font-size: 5rem;
  word-break: break-all;
  text-align: right;
}

#login-screen {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 5rem;
  height: 100vh;
  user-select: none;
  margin-top: -5rem;
}

hr {
  width: 100%;
  border: 1px solid var(--nx-c-orange);
  margin-top: 3rem;
}

#login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

#logo {
  max-width: 20rem;
  transition: all 250ms ease-in-out;
}

#logo:hover {
  transform: rotate(15deg);
}

span {
  user-select: none;
  color: var(--nx-c-orange);
  text-decoration: underline;
  cursor: pointer;
}

#clippy-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

#clippy {
  opacity: 0;
  transition: .5s;
}

#clippy-logo:hover > #clippy {
  opacity: 100;
}
</style>
