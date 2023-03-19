<template>
  <PaginationControls v-if="comments.length"
                      :current-page="currentPage"
                      :total-pages="totalPages"
                      :animation-mutex="animationMutex"
                      @next="loadPage(currentPage + 1)"
                      @prev="loadPage(currentPage - 1)"
                      @page="loadPage"
  />

  <div v-if="comments.length">
    <div ref="pageContainer"
         id="comment-container"
         v-if="paginatedComments"
    >
      <div class="comment"
           v-for="comment in paginatedComments"
      >
        <h1>{{ comment.username }} <span>｜</span> {{ (comment.date ?? new Date()).toLocaleString() }}</h1>
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </div>

  <div v-else id="no-results-placeholder">
    <h1>No comments found!</h1>
    <p>Be the first to comment!</p>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import type {CommentDto} from "@/components/composables/dto/CommentDto";
import {getCartoonComments} from "@/services/FirestoreService";
import PaginationControls from "@/components/home/PaginationControls.vue";

/* ---- Constants ---- */
const ITEMS_PER_PAGE = 5;
const ANIMATION_LENGTH = 500;

/* ---- Props ---- */

interface CommentListProps {
  cartoonId: string;
  updateTrigger: number;
}

const props = defineProps<CommentListProps>()

/* ---- Refs ---- */
const comments = ref<Array<CommentDto>>([])
const currentPage = ref(1)
const animationMutex = ref(false)
const pageContainer = ref<HTMLDivElement | null>()

/* ---- Hooks ---- */
onMounted(async () => retrieveCartoonComments())
watch(props, async () => await retrieveCartoonComments())

/* ---- Computed ---- */
const paginatedComments = computed(
    () => comments.value.slice(ITEMS_PER_PAGE * (currentPage.value - 1), ITEMS_PER_PAGE * currentPage.value)
)
const totalPages = computed(() => Math.ceil(comments.value.length / ITEMS_PER_PAGE))

const retrieveCartoonComments = async () => {
  const allComments = await getCartoonComments(props.cartoonId)
  comments.value = allComments.docs.map(doc => <CommentDto>({...doc.data(), id: doc.id}))
      .map(data => { data.date = new Date(<string> data.date); return data; })
      .sort((a, b) => (<Date> b.date).getTime() - (<Date> a.date).getTime());
}

const loadPage = async (page: number) => {
  // Mutex Guard & Page limit guard
  const animationAlreadyPlaying = animationMutex.value;
  const pageOutOfBounds = page === 0 || page > totalPages.value;
  const alreadyOnPage = currentPage.value === page;

  if (animationAlreadyPlaying || pageOutOfBounds || alreadyOnPage) { return }
  animationMutex.value = true; // Grab the mutex

  const swipeClass = page > currentPage.value ? "swipeLeft" : "swipeRight";

  pageContainer.value?.classList.add(swipeClass)
  setTimeout(() => {
    pageContainer.value?.classList.remove(swipeClass);
    animationMutex.value = false; // Release the mutex
  }, ANIMATION_LENGTH)
  currentPage.value = page
}
</script>

<style scoped>
#comment-container {
  display: inline-block;
  width: calc(var(--content-box-width) / 1.5)
}

.comment {
  flex-wrap: wrap;
  column-gap: 1em;
  border-radius: 1em;
  margin: 2em;
  border: 1px solid var(--nx-c-orange);
  text-align: center;
}

.comment > h1 {
  font-size: 1.5em;
  font-style: italic;
  text-decoration: underline;
}

.comment > p {
  margin: 0 1em 1em 1em;
}

span {
  font-style: normal;
  font-weight: lighter;
  white-space: nowrap;
}

#no-results-placeholder {
  margin-top: 7.77em;
  margin-bottom: 7.77em;
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