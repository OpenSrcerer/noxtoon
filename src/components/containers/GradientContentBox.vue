<template>
  <div id="gradient-content-box">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

interface GradientBoxProps {
  gradientStart?: string;
  gradientEnd?: string;
}

const props = withDefaults(
    defineProps<GradientBoxProps>(),
    {
      gradientStart: "#e6d7cb",
      gradientEnd: "#e4e4e4"
    }
)
</script>

<style scoped>
#gradient-content-box {
  background: linear-gradient(-45deg, v-bind(gradientStart), v-bind(gradientEnd));
  background-size: 100% 100%;
  animation: backgroundOpacity 500ms;
  position: absolute;
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
}

@keyframes backgroundOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>