<template>
  <div id="parallax-scene" ref="scene">
    <div class="rellax">
      <h1 class="rellax" data-rellax-speed="10">Test parallax!</h1>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>
      <p>bla bla bla</p>

    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Rellax from "rellax";

const scene = ref(null)
const rellax = ref(null)

onMounted(() => {
  rellax.value = new Rellax('.rellax', {
    speed: 0,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  })
})
</script>

<style scoped>
  /*h1 {*/
  /*  padding-top: 1000px;*/
  /*  height: 3000px;*/
  /*}*/
</style>