<script setup>
import Header from "@/components/nav/Header.vue";
</script>

<template>
  <Header/>
  <router-view/>
</template>

<style>
body {
  color: var(--color-text);
  background-color: var(--nx-c-near-black);
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
  font-family: var(--nx-f-inter);
  font-weight: normal;
  line-height: 1.6;
}
</style>