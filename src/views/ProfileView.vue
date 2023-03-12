<template>

</template>

<script setup lang="ts">
import {computed} from "vue";

interface CartoonProps {
  id: string,
  slug: string,
  name: string,
  description: string
}

const props = defineProps<CartoonProps>()
const src = computed(() => {
  const path = new URL('@/../public/assets/img/cartoons', import.meta.url);
  return `${path.pathname}/${props.slug}.png`.replace("/@", "")
});
</script>

<style scoped>

</style>