<template>
  <RouterLink :to="`${slug}`" class="card-container">
    <img :src="src"/>
    <div class="card-content">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {getDynamicImage} from "@/components/composables/URLUtils";

interface CartoonProps {
  id: string,
  slug: string,
  name: string,
  description: string
}

const props = defineProps<CartoonProps>()
const src = computed(() => getDynamicImage(props.slug, "cartoons"));
</script>

<style scoped>
  .card-container {
    text-decoration: none;
    color: var(--nx-c-smoke);
    display: flex;
    align-items: center;
    column-gap: 2em;
    animation: opacityFadeIn 750ms;
    width: 30em;
    max-height: 30em;
    justify-content: space-evenly;
    text-align: left;
    border-radius: 1em;
    padding: 3em;
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: ease;
  }

  .card-container:hover {
    transform: translateY(-1em);
    background-color: var(--nx-c-smoke);
    color: var(--nx-c-gray-hover)
  }

  .card-container > img {
    width: 50%;
    max-height: 100%;
  }

  @keyframes opacityFadeIn {
    0% {
      margin-left: -10em;
      opacity: 0;
    }
    100% {
      margin-left: 0;
      opacity: 1;
    }
  }
</style>