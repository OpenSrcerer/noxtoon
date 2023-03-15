<template>
  <div id="sort-choice-container">
    <div id="choice-picker">
      <div class="choice">
        <input type="radio" id="alphabetically" name="sorting_order" value="name"
               @click="emit('sort', 'name'); sortingValues = ['A', 'Z']" checked>
        <label for="alphabetically">Alphabetically</label>
      </div>

      <div class="choice">
        <input type="radio" id="hearts" name="sorting_order" value="hearts"
               @click="emit('sort', 'hearts'); sortingValues = ['0', '9']">
        <label for="hearts">Hearts</label>
      </div>

      <div ref="arrow" class="choice">
        <input type="radio" id="stars" name="sorting_order" value="stars"
               @click="emit('sort', 'stars'); sortingValues = ['0', '9']">
        <label for="stars">Stars</label>
      </div>
    </div>

    <div id="direction-container" @click="onDirectionChange">
      <h1>{{ sortingValues[0] }}</h1>
      <div id="sort-direction">
        <h1>⬇</h1>
      </div>
      <h1>{{ sortingValues[1] }}</h1>
    </div>

  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(['sort', 'direction'])
const arrow = ref<HTMLDivElement>();
const rotation = ref("180deg")
const sortingValues = ref(['A', 'Z'])

const onDirectionChange = () => {
  rotation.value = rotation.value.startsWith("1") ? "0deg" : "180deg";
  emit('direction')
}
</script>

<style scoped>
#sort-choice-container {
  display: inline-flex;
  align-items: center;
}

#direction-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 10em;
  user-select: none;
  cursor: pointer;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 1em;
}

#direction-container:hover {
  background-color: var(--nx-c-gray-hover);
}

#choice-picker {
  margin-left: -1.5em;
  margin-right: 1.5em;
  display: flex;
  flex-direction: column;
  row-gap: .2em;
}

#sort-direction {
  transition: all 300ms ease-in-out;
  transform: rotate(v-bind(rotation));
  font-size: 1em;
  user-select: none;
  border-radius: .5em;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

#direction-container:hover > #sort-direction {
  transform: rotate(v-bind(rotation)) scale(1.5);
  color: var(--nx-c-orange);
}

.choice {
  display: inline-flex;
  column-gap: .5em;
  font-size: 1.5em;
  border-radius: .2em;
  user-select: none;
  text-align: left;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.choice:hover {
  background-color: var(--nx-c-smoke);
}

.choice:hover, .choice > *:hover {
  color: var(--nx-c-near-black);
  cursor: pointer;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

input {
  appearance: none;
  background-color: #fff;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(0.5em);
  display: grid;
  place-content: center;
  margin: 0 0 0 1em;
  transition: color 300ms ease-in-out;
}

input::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--nx-c-orange);
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

label {
  flex-grow: 1;
  padding: .25em;
  margin-right: 1em;
}
</style>