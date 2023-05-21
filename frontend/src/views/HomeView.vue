<template>
  <div v-if="shownCartoons">
    <GradientContentBox/>
    <ParallaxBackground/>
    <ContentBox>
      <ScrollDownTriangle/>
      <h1 style="margin-bottom: 0; text-decoration-line: underline; font-size: 3em;">Cartoon Search</h1>
      <h2>Find all of your favorite cartoons on Noxtoon, quickly and easily.</h2>
      <hr>

      <div id="search-sort-container">
        <SortingPicker @sort="onSort" @direction="onDirectionChange"/>
        <SearchBar @search="onSearch"/>
      </div>

      <div id="outer-content-box">
        <div ref="refPage" id="inner-content-box">
          <Card v-if="shownCartoons.length !== 0"
                v-for="cartoon in shownCartoons"
                :slug="cartoon.slug"
                :name="cartoon.name"
                :hearts="cartoon.hearts"
                :stars="cartoon.stars"
          />
          <div v-else id="no-results-placeholder">
            <h1>No results for "{{ searchString }}"</h1>
            <p>Try refining your search query.</p>
          </div>
        </div>
      </div>

      <PaginationControls
          :total-pages="totalPages"
          :current-page="currentPage"
          :animation-mutex="animationMutex"
          @next="loadPage(currentPage + 1)"
          @prev="loadPage(currentPage - 1)"
          @page="loadPage"
      />
      <Footer/>
    </ContentBox>
  </div>
  <LoadingSpinner v-else/>
</template>

<script setup lang="ts">
import ParallaxBackground from "@/components/home/ParallaxBackground.vue";
import Footer from "@/components/nav/Footer.vue";
import {computed, onMounted, ref} from "vue";
import {getCartoons} from "@/services/BackendClient";
import Card from "@/components/home/Card.vue";
import ContentBox from "@/components/containers/WavyContentBox.vue";
import GradientContentBox from "@/components/containers/GradientTileContentBox.vue";
import LoadingSpinner from "@/components/nav/LoadingSpinner.vue";
import PaginationControls from "@/components/home/PaginationControls.vue";
import SearchBar from "@/components/home/SearchBar.vue";
import ScrollDownTriangle from "@/components/nav/ScrollDownTriangle.vue";
import SortingPicker from "@/components/home/SortingPicker.vue";

/* ---- Constants ---- */
const ITEMS_PER_PAGE = 3;
const ANIMATION_LENGTH = 500;

/* ------- Refs ------ */
const cartoons = ref<Array<Record<any, any>>>([]);
const searchString = ref<string>("")
const sortString = ref<string>("name");
const sortReverse = ref<boolean>(false);
const currentPage = ref(1);
const totalPages = ref(0);
const refPage = ref<HTMLDivElement>();
const animationMutex = ref(false)

/* ---- Computed ---- */
const shownCartoons = computed(() => {
  let toons = cartoons.value;
  if (searchString.value.length != 0) {
    toons = toons.filter(toon => toon.name.toLowerCase().includes(searchString.value.toLowerCase()))
  }

  toons = toons.sort((t1, t2) =>
      sortString.value === 'name' ?
          t1[sortString.value].toLowerCase().localeCompare(t2[sortString.value].toLowerCase()) :
          parseInt(t2[sortString.value]) - parseInt(t1[sortString.value])
  )

  if (sortReverse.value) {
    toons = toons.reverse();
  }

  // Side effect that needs to be after filtering but before pagination
  totalPages.value = Math.ceil(toons.length / ITEMS_PER_PAGE);

  toons = toons.slice(ITEMS_PER_PAGE * (currentPage.value - 1), ITEMS_PER_PAGE * currentPage.value);
  return toons
})

/* ------ Hooks ----- */
onMounted(async () => updateCartoonList())

/* ----- Methods ---- */
const loadPage = async (page: number) => {
  // Mutex Guard & Page limit guard
  const animationAlreadyPlaying = animationMutex.value;
  const pageOutOfBounds = page === 0 || page > totalPages.value;
  const alreadyOnPage = currentPage.value === page;

  if (animationAlreadyPlaying || pageOutOfBounds || alreadyOnPage) { return }
  animationMutex.value = true; // Grab the mutex

  const swipeClass = page > currentPage.value ? "swipeLeft" : "swipeRight";

  refPage.value?.classList.add(swipeClass)
  setTimeout(() => {
    refPage.value?.classList.remove(swipeClass);
    animationMutex.value = false; // Release the mutex
  }, ANIMATION_LENGTH)
  currentPage.value = page
}

const updateCartoonList = async () => {
  cartoons.value = await getCartoons();
}

const onSearch = (search: string) => {
  searchString.value = search;
  currentPage.value = 1;
}

const onSort = (sort: string) => {
  sortString.value = sort
}

const onDirectionChange = () => {
  sortReverse.value = !sortReverse.value
}
</script>

<style scoped>
#gt-content-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

#wavy-content {
  position: relative;
  top: 33em;
}

#outer-content-box {
  animation: fadeSwipeIn 1s;
}

#inner-content-box {
  width: var(--content-box-width);
  min-height: 10em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  column-gap: 2em;
  row-gap: 2em;
}

#no-results-placeholder {
  margin-top: 7.77em;
  margin-bottom: 7.77em;
}

#search-sort-container {
  display: inline-flex;
  justify-content: space-between;
  width: var(--content-box-width);
  margin-top: 2em;
  margin-bottom: 2em;
}

hr {
  width: var(--content-box-width);
  border: 1px solid var(--nx-c-orange);
}

/* Page Animation */

.swipeLeft {
  animation: swipePageLeft v-bind(ANIMATION_LENGTH + "ms") !important;
}

.swipeRight {
  animation: swipePageRight v-bind(ANIMATION_LENGTH + "ms") !important;
}

@keyframes fadeSwipeIn {
  0% {
    margin-top: 15em;
    opacity: 0;
  }

  100% {
    margin-top: 0;
    opacity: 1;
  }
}

@keyframes swipePageLeft {
  0% {
    margin-left: 100em;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    opacity: 1;
  }
}

@keyframes swipePageRight {
  0% {
    margin-left: -100em;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    opacity: 1;
  }
}
</style>
