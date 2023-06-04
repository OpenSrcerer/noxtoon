<template>
  <div :id="type"
       :style="buttonsClicked[type] ? 'background-color: #272727;' : ''"
       class="button-w-counter"
       ref="slotContainer"
       @click="onClickHandler(type)"
  >
    <slot ref="slot"></slot>
    <h5 :style="buttonsClicked[type] ? 'color: #FF711C;' : ''">{{ formatCompactNumber(count) }}</h5>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import type {ButtonClickDto} from "@/components/composables/dto/ButtonClickDto";
import {formatCompactNumber} from "../composables/NumberUtils";

type ButtonType = "heart" | "star";

interface ButtonWithCounterProps {
  cartoonId: string;
  count: number;
  color: string;
  type: ButtonType;
}

interface ClickStorage {
  heart: boolean;
  star: boolean;
}

/* Props / Emits */
const props = defineProps<ButtonWithCounterProps>();
const emit = defineEmits(['buttonClick'])

/* Refs */
const buttonsClicked = reactive<ClickStorage>({ heart: false, star: false })
const slotContainer = ref<HTMLDivElement | null>(null)
const animationMutex = ref(false)

/* Computed Vals */
const fillColor = computed(() => buttonsClicked[props.type] ? props.color : "#d2ceca")

/* LIKE / COMMENT HANDLING */
const onClickHandler = (target: ButtonType) => {
  if (animationMutex.value) { return; }

  // Event value: 1 (add like) / -1 (remove like)
  const value = buttonsClicked[target] ? -1 : 1;
  const property = props.type === "heart" ? { hearts: value } : { likes: value };
  emit('buttonClick', <ButtonClickDto> { cartoonId: props.cartoonId, property })
  saveLocalClickStatus(target, !buttonsClicked[target])

  // Animation
  animationMutex.value = true;
  buttonsClicked[target] = !buttonsClicked[target];
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
onMounted(() => setLocalClickStatus(props.type))

const setLocalClickStatus = (target: ButtonType) => {
  buttonsClicked[target] = (localStorage.getItem(`${props.cartoonId}-${props.type}`) ?? "false") == "true"
}

const saveLocalClickStatus = (target: string, state: boolean) => {
  localStorage.setItem(`${props.cartoonId}-${props.type}`, state.toString())
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
  color: #9E9C9C;
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
