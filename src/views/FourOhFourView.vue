<template>
  <img id="henry" src="@/assets/img/misc/henry.png">
  <img src="@/assets/img/parallax/layer5.png">
  <h1>404</h1>
  <h2>This isn't the page you're looking 4!</h2>
  <Footer/>
</template>

<style scoped>
* {
  text-align: center;
  word-break: keep-all;
}

img {
  position: absolute;
  bottom: 1px;
}

#henry {
  max-width: 35em;
  top: 8em;
  left: 10em;
}

h1, h2 {
  position: absolute;
  user-select: none;
  margin-left: -1em;
}

h1 {
  left: 65%;
  top: 55%;
  margin-top: -1em;
  margin-bottom: 0;
  font-family: var(--nx-f-cheri);
  font-size: 20em;
}

h2 {
  left: 12.5%;
  top: 60%;
  font-size: 5em;
}
</style>
<script setup lang="ts">
import Footer from "@/components/nav/Footer.vue";
</script>