<template>
<div class="dropdown">
  <div class="dropdown-button">
    <svg viewBox="0 0 248.349 248.349" xml:space="preserve"><g><g><path d="M9.954,241.305h228.441c3.051,0,5.896-1.246,7.805-3.416c1.659-1.882,2.393-4.27,2.078-6.723
      c-5.357-41.734-31.019-76.511-66.15-95.053c-14.849,14.849-35.348,24.046-57.953,24.046s-43.105-9.197-57.953-24.046
      C31.09,154.65,5.423,189.432,0.071,231.166c-0.315,2.453,0.424,4.846,2.078,6.723C4.058,240.059,6.903,241.305,9.954,241.305z"/>
      <path d="M72.699,127.09c1.333,1.398,2.725,2.73,4.166,4.019c12.586,11.259,29.137,18.166,47.309,18.166
      s34.723-6.913,47.309-18.166c1.441-1.289,2.834-2.622,4.166-4.019c1.327-1.398,2.622-2.828,3.84-4.329
      c9.861-12.211,15.8-27.717,15.8-44.6c0-39.216-31.906-71.116-71.116-71.116S53.059,38.95,53.059,78.16
      c0,16.883,5.939,32.39,15.8,44.6C70.072,124.262,71.366,125.687,72.699,127.09z"/></g></g></svg>
  </div>

  <div class="dropdown-content">
    <h4>Welcome,</h4>
    <h2>{{ name }}</h2>
    <hr>
    <button @click="onSignOut">Sign Out</button>
  </div>
</div>
</template>

<script setup lang="ts">

import {logoutUser} from "../../services/BackendClient";
import router from "../../router";

const props = defineProps<{name: string}>();
const emit = defineEmits(['signOut']);

const onSignOut = async () => {
  await logoutUser();
  emit('signOut')
  router.push("/login")
}

</script>

<style scoped>
button {
  width: 80%;
  height: 2rem;
  margin-top: .5rem;
  margin-bottom: 1rem;
  font-family: var(--nx-f-inter);
  font-size: 1.1rem;
  background-color: var(--nx-c-orange);
  border: none;
  border-radius: 0.5rem;
  transition: 0.4s;
}

button:hover {
  font-weight: bold;
  cursor: pointer;
  background-color: #e74410;
}

svg {
  width: 1.8rem;
  fill: var(--nx-c-near-black);
  transition: 0.4s;
}

/* Dropdown Button */
.dropdown-button {
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
  transition: 0.4s;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  width: 20%;
  color: var(--nx-c-near-black);
  user-select: none;
  text-align: center;
  transition: 0.4s;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  opacity: 0;
  display: block;
  position: absolute;
  width: 100%;
  z-index: 100;
  border-radius: 0 0 1rem 1rem;
  background-color: var(--nx-c-gray-hover);
  transition: 0.4s;
  min-width: 36px;
}

h2, h4 {
  color: var(--nx-c-smoke);
  margin: 0;
}

h4 {
  margin-top: .5rem;
}

h2 {
  margin-top: -.5rem;
}

hr {
  max-width: 80%;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  opacity: 100;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropdown-button {
  background-color: var(--nx-c-gray-hover);
  cursor: pointer;
}

.dropdown:hover svg {
  fill: var(--nx-c-smoke);
}
</style>
