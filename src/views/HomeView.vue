<template>
  <ParallaxBackground/>
  <div id="content-wrapper">
    <div id="content">
      <div id="box"></div>
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
      <Footer/>
    </div>
  </div>
</template>

<script setup>
import ParallaxBackground from "@/components/home/ParallaxBackground.vue";
import Footer from "@/components/nav/Footer.vue";
</script>

<style scoped>
#content-wrapper {
  display: block;
}

#box {
  width: 100vw;
  height: 40px;
  position: relative;
  bottom: 5.5vh;
  background-color: var(--nx-c-near-black);
  --mask:
      radial-gradient(54.08px at 50% 75.00px,#000 99%,#0000 101%) calc(50% - 60px) 0/120px 100%,
      radial-gradient(54.08px at 50% -45px,#0000 99%,#000 101%) 50% 30px/120px 100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}

#content {
  position: relative;
  top: 70vh;
  margin-bottom: 500px;
  background-color: var(--nx-c-near-black);
}
</style>