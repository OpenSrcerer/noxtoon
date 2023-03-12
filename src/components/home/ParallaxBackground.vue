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
import {onMounted, ref} from "vue";
import Rellax from "rellax";

const container = ref(null)

onMounted(() => {
  container.value.childNodes.forEach(node =>
    node.classList.add("parallax")
  )

  new Rellax('.parallax', {
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
.parallax {
  position: absolute;
  width: 100em;
}

#logo-wide {
  position: fixed;
  animation: fadeIn 750ms;
  width: 40vw;
  z-index: 21;
  top: 30vh;
  left: 30vw;
}

@keyframes fadeIn {
  0% { top: 90vh; }
  100% { top: 30vh }
}

#layer-0 {
  top: 10vh;
  left: 30vw;
  z-index: 0;
}

#layer-1 {
  top: -10vh;
  z-index: 10;
}

#layer-2 {
  z-index: 20;
  top: 35vh;
}

#layer-3 {
  z-index: 30;
  top: -20vh;
  left: 40vw;
}

#layer-4 {
  z-index: 40;
  left: 70vw;
  bottom: -50vh;
}

#layer-5 {
  z-index: 10;
  top: -10vh;
}

#parallax-container {
  width: 100%;
  height: 20em;
}
</style>