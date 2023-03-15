<template>
  <div id="pagination-controls">
    <h1 @click="onPrevious" class="side-nav">⬅</h1>
    <div v-if="totalPages <= 5" id="center-nav" ref="centerNav">
      <h1 v-for="page in totalPages" @click="emit('page', page)">
        {{ page }}
      </h1>
    </div>

    <div v-else id="center-nav" ref="centerNav">
      <h1 v-for="page in 3" @click="emit('page', page)">
        {{ page }}
      </h1>

      <input v-model="customPage" type="number" :max="totalPages" @click="emit('page', customPage)"/>

      <h1 @click="emit('page', totalPages)">
        {{ totalPages }}
      </h1>
    </div>
    <h1 @click="onNext" class="side-nav">➡</h1>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  animationMutex: boolean;
}

const props = defineProps<PaginationControlsProps>();
const emit = defineEmits(['prev', 'next', 'page'])
const centerNav = ref<HTMLDivElement | null>();
const customPage = ref(4)
const shouldShow = computed(() => props.totalPages !== 0 ? 1 : 0)

const onCustomPageType = (page: number) => {
  if (!page) {
    customPage.value = 4;
    return;
  }
  if (page > props.totalPages - 1 && page.toString().length === 1) {
    customPage.value = props.totalPages - 1
    return;
  }
  if (page < 4) {
    customPage.value = 4;
    return;
  }
  if (page.toString().length === 2) {
    customPage.value = parseInt(page.toString()[1])
    return;
  }
  emit('page', page)
}

const onPageChangeEvent = () => {
  console.log("page change")
  if (!props.totalPages) return;

  const children = centerNav.value?.children
  if (children && children.length != 0) {
    for (let i = 0; i < children?.length ?? 0; ++i) {
      children[i]?.classList?.remove('current-page')
    }

    let index;
    if (props.totalPages < 4) {
      index = props.currentPage - 1;
    } else {
      index = props.currentPage <= 4 ? props.currentPage - 1 :
        props.currentPage === props.totalPages ? children.length - 1 : 3
    }
    centerNav.value?.children[index].classList.add('current-page')
  }
}

const onPrevious = () => {
  console.log('prev 1')
  if (props.currentPage === 1 || props.animationMutex) return;
  console.log('prev 2')
  if (props.currentPage <= props.totalPages || props.currentPage > 4) {
    customPage.value = props.currentPage - 1
    console.log('prev 3')
  }
  console.log('prev 4')
  emit('prev')
  console.log('prev 5')
}

const onNext = () => {
  if (props.currentPage === props.totalPages || props.animationMutex) return;
  if (props.currentPage >= 3 && props.currentPage <= props.totalPages) {
    customPage.value = props.currentPage + 1
  }
  emit('next')
}

const pageChangeHandler = () => setTimeout(() => onPageChangeEvent(), 250)

watch(customPage, onCustomPageType)
// watch(props, pageChangeHandler)
onMounted(pageChangeHandler)
</script>

<style scoped>
#pagination-controls {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 5em;
  width: var(--content-box-width);
  user-select: none;
  opacity: v-bind(shouldShow);
  transition: opacity 250ms ease-in-out;
}

.current-page {
  background-color: var(--nx-c-smoke);
  color: var(--nx-c-near-black);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

h1 {
  cursor: pointer;
}

h1, input {
  border-radius: 0.2em;
  padding: 0 0.5em;
  transition: all 250ms ease-in-out;
  animation: fadeIn 500ms;
}

#center-nav {
  display: inline-flex;
  justify-content: center;
  column-gap: 0.5em;
  flex-direction: row;
  min-width: 10em;
}

#center-nav > h1, input {
  max-width: 1em;
  max-height: 2em;
}

#center-nav > h1 {
  max-width: 1em;
}

#center-nav > h1:not(.current-page):hover {
  background-color: var(--nx-c-smoke-light);
}

.side-nav {
  background-color: var(--nx-c-smoke-light);
}

.side-nav:hover {
  background-color: var(--nx-c-orange);
  color: var(--nx-c-near-black);
}

input {
  background-color: var(--nx-c-smoke-light);
  color: var(--nx-c-smoke);
  border: none;
  outline: none;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif !important;
  font-size: 2em;
  padding: 0 0.5em;
  margin-top: 0.5em;
  max-width: 1em;
  max-height: 2em;
  text-align: center;
  font-weight: bold;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>