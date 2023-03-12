<script setup>
import Header from "@/components/nav/Header.vue";
import {watchEffect} from "vue";
import {useRoute} from "vue-router";

const routeName = useRoute().name
watchEffect(
    () => document.title = !routeName ? "Noxtoon" :
        `Noxtoon - ${routeName.charAt(0).toUpperCase() + routeName.substring(1).toLowerCase()}`
)
</script>

<template>
  <Header/>
  <router-view/>
</template>

<style>
body {
  color: var(--color-text);
  background: var(--nx-c-smoke);
  transition: color 0.5s, background-color 0.5s;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

body {
  margin: 0;
  overflow-x: hidden;
}

html {
  font-size: 15px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-weight: normal;
  line-height: 1.6;
}
</style>