<template>
  <div class="button-w-counter"
       @click="onClickHandler"
       ref="slotContainer"
  >
    <slot ref="slot"></slot>
    <h5>{{ count }}</h5>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import type {ButtonClickDto} from "@/components/composables/ButtonClickDto";
import {increment} from "firebase/firestore";

interface ButtonWithCounterProps {
  cartoonId: string;
  count: string;
  color: string;
  type: "heart" | "star";
}

/* Props / Emits */
const props = defineProps<ButtonWithCounterProps>();
const emit = defineEmits(['buttonClick'])

/* Refs */
const clicked = ref(false)
const slotContainer = ref<HTMLDivElement | null>(null)
const animationMutex = ref(false)

/* Computed Vals */
const textColor = computed(() => clicked.value ? "#FF711C" : "#9E9C9C")
const fillColor = computed(() => clicked.value ? "#0F0F0F" : props.color)
const background = computed(() => clicked.value ? "#D2CECA" : "transparent")

/* LIKE / COMMENT HANDLING */
const onClickHandler = () => {
  if (animationMutex.value) { return; }

  // Event value: 1 (add like) / -1 (remove like)
  const value = clicked.value ? -1 : 1;
  const property = props.type === "heart" ? { hearts: increment(value) } : { stars: increment(value) };
  emit('buttonClick', <ButtonClickDto> { cartoonId: props.cartoonId, property })
  saveLocalClickStatus(!clicked.value)

  // Animation
  animationMutex.value = true;
  clicked.value = !clicked.value;
  animateClick()
}

/* Animate */
const animateClick = () => {
  const children = slotContainer.value?.children as HTMLCollection
  for (let i = 0; i < children?.length ?? 0; ++i) {
    if (i === 0) { children[i]?.classList?.add('click-rotate') }
    children[i]?.classList?.add('click-shake')
  }
  setTimeout(() => {
    for (let i = 0; i < children?.length ?? 0; ++i) {
      children[i]?.classList?.remove('click-shake', 'click-rotate')
    }
    animationMutex.value = false;
  }, 1000)
}

/* Local Storage */
onMounted(() => clicked.value = getLocalClickStatus())

const getLocalClickStatus = () => {
  return (localStorage.getItem(props.cartoonId) ?? "false") == "true"
}

const saveLocalClickStatus = (state: boolean) => {
  localStorage.setItem(props.cartoonId, state.toString())
}
</script>

<style>
.button-w-counter {
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
  padding-top: 1em;
  border-radius: 1em;
  transition: all ease-in-out 100ms;
  background-color: v-bind(background);
}

.button-w-counter:hover {
  cursor: pointer;
  transform: scale(125%);
}

.button-w-counter > svg {
  fill: v-bind(fillColor);
  transition: fill ease-in-out 200ms;
}

.button-w-counter > * {
  display: block;
  max-width: 3em;
}

.button-w-counter > h5 {
  width: 3em;
  margin: 0.3em 0 0;
  font-size: 1.5em;
  color: v-bind(textColor);
  font-family: "Cheri Liney", Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
  Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

/* Animation */

.click-shake {
  animation: clickShake 750ms;
}

.click-rotate {
  animation: clickRotate 1000ms;
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

@keyframes clickShake {
  0% {
    transform: translateX(0) translateY(0);
  }

  50% {
    transform: translateX(0) translateY(-10px);
  }

  100% {
    transform: translateX(0) translateY(0);
  }
}

@keyframes clickRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>