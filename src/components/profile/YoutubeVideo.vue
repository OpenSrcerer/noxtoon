<template>
  <iframe :src="`https://www.youtube-nocookie.com/embed/${src}?controls=0&playlist=${src}&autoplay=1&loop=1&mute=1&modestbranding=1&autohide=1&showinfo=0`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</template>

<script setup lang="ts">

interface YoutubeVideoProps {
  src: string;
}

defineProps<YoutubeVideoProps>()
</script>

<style scoped>
iframe {
  height: 20em;
  width: 200%;
  pointer-events: none;
  user-select: none;
  animation: slideIn 1s;
  transform: scale(2);
  overflow: hidden;
  opacity: 0.5
}

@keyframes slideIn {
  0% {
    opacity: 0;
    margin-left: -20em;
  }
  100% {
    opacity: 0.5;
    margin-left: 0;
  }
}
</style>