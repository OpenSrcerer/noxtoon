<template>
  <div id="gt-content-box"
      :class="[!!tileColor ? 'tile-content-box' : 'gradient-content-box']">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

interface GradientTileBoxProps {
  tileColor?: string;
  tileBackground?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

const props = withDefaults(
    defineProps<GradientTileBoxProps>(),
    {
      tileColor: undefined,
      tileBackground: "#101010",
      gradientStart: "#e6d7cb",
      gradientEnd: "#e4e4e4"
    }
)
</script>

<style scoped>
#gt-content-box {
  animation: backgroundOpacity 500ms;
  position: absolute;
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
}

.gradient-content-box {
  background: linear-gradient(-45deg, v-bind(gradientStart), v-bind(gradientEnd));
  background-size: 100% 100%;
}

.tile-content-box {
  background:
      linear-gradient(-135deg, #0000 18.75%, v-bind(tileBackground) 0 31.25%, #0000 0),
      repeating-linear-gradient(-45deg, v-bind(tileBackground) -6.25% 6.25%, v-bind(tileColor) 0 18.75%);
  background-size: var(--custom-background-size) var(--custom-background-size);
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