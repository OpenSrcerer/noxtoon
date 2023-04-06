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
        <Transition :name="`swipe${pageChangeDirection}`">
          <div id="inner-content-box" :key="currentPage">
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
        </Transition>
      </div>

      <PaginationControls
          :total-pages="totalPages"
          :current-page="currentPage"
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
import {getCartoons} from "@/services/FirestoreService";
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

const pageChangeDirection = ref("Right");

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
  const pageOutOfBounds = page === 0 || page > totalPages.value;
  const alreadyOnPage = currentPage.value === page;

  if (pageOutOfBounds || alreadyOnPage) { return }

  pageChangeDirection.value = page > currentPage.value ? "Left" : "Right";

  currentPage.value = page
}

const updateCartoonList = async () => {
  const allCartoons = await getCartoons()
  cartoons.value = allCartoons.docs.map(doc => ({...doc.data(), id: doc.id}));
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

.swipeLeft-enter-from, .swipeLeft-enter-active, .swipeLeft-enter-to {
  animation: swipePageLeft v-bind(ANIMATION_LENGTH + "ms") !important;
}

.swipeRight-enter-from, .swipeRight-enter-active, .swipeRight-enter-to {
  animation: swipePageRight v-bind(ANIMATION_LENGTH + "ms") !important;
}

.swipeLeft-leave-from, .swipeLeft-leave-active, .swipeLeft-leave-to, .swipeRight-leave-from, .swipeRight-leave-active, .swipeRight-leave-to {
  display: none;
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