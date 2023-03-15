<template>
  <RouterLink :to="`/toon/${slug}`" class="card-container">
    <img :src="src"/>

    <div class="card-stats">
      <div class="stat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 6.58 22 20.85">\
          <path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z"/>
        </svg>
        <h3>{{ formatCompactNumber(hearts) }}</h3>
      </div>
      <div class="stat">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1.05 47.94 45.85">
          <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z" data-darkreader-inline-fill=""></path>
        </svg>
        <h3>{{ formatCompactNumber(stars) }}</h3>
      </div>
    </div>

    <div class="card-content">
      <h2>{{ name }}</h2>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {getDynamicImage} from "@/components/composables/URLUtils";
import {formatCompactNumber} from "../composables/NumberUtils";

interface CardProps {
  slug: string,
  name: string,

  hearts: number;
  stars: number;
}

const props = defineProps<CardProps>()
const src = computed(() => getDynamicImage(props.slug, "cartoons"));
</script>

<style scoped>
  .card-container {
    text-decoration: none;
    background-color: var(--nx-c-smoke-light);
    color: var(--nx-c-smoke);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 18em;
    max-height: 22em;
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
    color: var(--nx-c-gray-hover);
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: ease;
  }

  .card-container:hover .stat {
    background-color: var(--nx-c-gray-hover);
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: ease;
  }

  .card-container:hover h3 {
    color: var(--nx-c-smoke)
  }

  .card-container > img {
    max-height: 75%;
  }

  .card-stats {
    width: 50%;
    height: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: .5em;
  }

  .stat {
    display: flex;
    column-gap: .3em;
    max-width: 7em;
    border-radius: 3em;
    justify-content: center;
    position: relative;
    background-color: var(--nx-c-smoke);
    height: 3em;
    bottom: 18em;
    left: 11em;
  }

  .stat:last-child {
    fill: #ED8A19;
  }

  .stat:first-child {
    fill: #ED1940;
  }

  h2 {
    margin-top: 0.5em;
    margin-bottom: 1em;
  }

  h3 {
    color: var(--nx-c-near-black);
    position: relative;
    font-size: 1.5em;
    margin: 0;
  }

  img {
    margin-top: 2em;
  }

  svg {
    width: 1.5em;
    margin: .3em .1em .3em 0;
  }
</style>