<template>
  <RouterLink :to="`/toon/${slug}`" class="card-container">
    <img :src="src"/>
    <div class="card-content">
      <h2>{{ name }}</h2>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {getDynamicImage} from "@/components/composables/URLUtils";

interface Props {
  slug: string,
  name: string,
}

const props = defineProps<Props>()
const src = computed(() => getDynamicImage(props.slug, "cartoons"));
</script>

<style scoped>
  .card-container {
    text-decoration: none;
    color: var(--nx-c-smoke);
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: opacityFadeIn 750ms;
    width: 18em;
    max-height: 20em;
    justify-content: space-evenly;
    text-align: left;
    border-radius: 1em;
    padding: 1em;
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
    max-height: 75%;
  }

  @keyframes opacityFadeIn {
    0% {
      margin-top: 10em;
      opacity: 0;
    }
    100% {
      margin-top: 0;
      opacity: 1;
    }
  }
</style>