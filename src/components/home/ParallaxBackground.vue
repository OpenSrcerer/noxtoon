<template>
  <div id="parallax-container" class="parallax" ref="container">

    <img src="@/assets/img/parallax/logo-wide.png"
         data-rellax-speed="-4"
         id="logo-wide"
    />

    <img src="@/assets/img/parallax/layer0.png"
         data-rellax-speed="-2"
         id="layer-0"
    />

    <img src="@/assets/img/parallax/layer1.png"
         data-rellax-speed="-1"
         id="layer-1"
    />

    <img src="@/assets/img/parallax/layer2.png"
         data-rellax-speed="1"
         id="layer-2"
    />

    <img src="@/assets/img/parallax/layer3.png"
         data-rellax-speed="2"
         id="layer-3"
    />

    <img src="@/assets/img/parallax/layer4.png"
         data-rellax-speed="3"
         id="layer-4"
    />

    <img src="@/assets/img/parallax/layer5.png"
         data-rellax-speed="4"
         id="layer-5"
    />
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import Rellax from "rellax";

const container = ref(null)
const rellax = ref(null)

onMounted(() => {
  container.value.childNodes.forEach(node => node.classList.add("parallax"))

  rellax.value = new Rellax('.parallax', {
    speed: 0,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  })
})

onUnmounted(() => {
  rellax.value.destroy();
})
</script>

<style scoped>
#parallax-container {
  height: 80%;
  width: 100%;
  overflow: hidden;
}

.parallax {
  position: absolute;
  width: 100em;
}

#logo-wide {
  animation: logoSlideIn 750ms;
  width: 40vw;
  z-index: 21;
  top: 30vh;
  left: 30vw;
}

#layer-0 {
  animation: opacityFadeIn 250ms ease-out;
  top: 10vh;
  left: 30vw;
  z-index: 0;
}

#layer-1 {
  animation: opacityFadeIn 300ms ease-out;
  top: -10vh;
  z-index: 10;
}

#layer-2 {
  animation: opacityFadeIn 350ms ease-out;
  z-index: 20;
  top: 35vh;
}

#layer-3 {
  animation: opacityFadeIn 400ms ease-out;
  z-index: 30;
  top: -20vh;
  left: 40vw;
}

#layer-4 {
  animation: opacityFadeIn 450ms ease-out;
  z-index: 40;
  left: 70vw;
  bottom: -50vh;
}

#layer-5 {
  background: linear-gradient(-45deg, v-bind(gradientStart), v-bind(gradientEnd));
  animation: opacityFadeIn 500ms ease-out;
  z-index: 10;
  top: -10vh;
  width: 100%;
}

/* Animation */

@keyframes logoSlideIn {
  0% { top: 90vh; }
  100% { top: 30vh }
}

@keyframes opacityFadeIn {
  0% { opacity: 0 }
  100% { opacity: 1 }
}
</style>