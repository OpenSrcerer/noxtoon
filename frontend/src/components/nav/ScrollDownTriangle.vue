<template>
  <div id="triangle-down" @click="scrollToBottom"></div>
</template>

<script setup lang="ts">

const props = defineProps<{ scrollToComments?: boolean }>()

const scrollToBottom = () => {
  const top = props.scrollToComments ?
      document.getElementById("comments-title")?.getBoundingClientRect()?.top ?? document.body.scrollHeight + window.scrollY :
      document.body.scrollHeight
  window.scrollTo({ top, behavior: "smooth" });
}
</script>

<style scoped>
#triangle-down {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 20px solid var(--vt-c-text-dark-2);
  margin-top: 1.5em;
  transition: all ease-in-out 100ms;
}

#triangle-down:hover {
  cursor: pointer;
  transform: scale(125%);
}
</style>