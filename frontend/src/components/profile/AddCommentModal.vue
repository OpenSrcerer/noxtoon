<template>
  <h1 v-if="modalActive" id="close-modal" @click="modalActive = !modalActive">x</h1>

  <div v-if="modalActive" id="comment-form">
    <h1>Nickname</h1>
    <input v-model="formData.nickname" type="text" maxlength="30"/>

    <h1>Comment</h1>
    <textarea v-model="formData.comment" maxlength="750"/>
    <h1 @click="onSubmit">Submit</h1>
  </div>

  <div v-else id="add-comment-button" @click="modalActive = !modalActive">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1662.18 1920.12">
      <path d="M1662.178 0v1359.964h-648.703l-560.154 560.154v-560.154H0V0h1662.178ZM906.794 755.55H453.32v117.53h453.473V755.55Zm302.063-302.365H453.32v117.529h755.536V453.185Z" fill-rule="evenodd"></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
// ------ Comment Handling ------
import {reactive, ref} from "vue";
import {addComment} from "@/services/BackendClient";

interface CommentFormProps {
  cartoonId: string;
}

const props = defineProps<CommentFormProps>();
const emit = defineEmits(['newComment'])
const formData = reactive<Record<string, any>>({});
const modalActive = ref(false);

clearForm()

const onSubmit = async () => {
  if ((formData.nickname ?? '').length < 3 || (formData.comment ?? '').length < 10) {
    alert("Please make sure that your nickname is at least 3 characters and your comment is 10 characters long!")
    return;
  }

  await addComment({
    cartoonId: props.cartoonId,
    username: formData.nickname,
    comment: formData.comment
  })
  emit('newComment')
  clearForm()
  modalActive.value = !modalActive.value
  const top = document.getElementById("comments-title")?.getBoundingClientRect()?.top ??
      document.body.scrollHeight + window.scrollY
  window.scrollTo({ top, behavior: "smooth" });
}

function clearForm() {
  Object.keys(formData).forEach(key => formData[key] = '')
}
</script>

<style scoped>
#close-modal {
  position: fixed;
  left: 1em;
  top: 1.5em;
  z-index: 5;
  transition: all 150ms ease-in-out;
  cursor: pointer;
  padding: 0 0.5em 0.2em 0.5em;
  border-radius: 2em;
}

#close-modal:hover {
  background-color: var(--nx-c-orange);
  color: var(--nx-c-near-black);
}

#add-comment-button {
  position: fixed;
  width: 5em;
  bottom: 2em;
  right: 2em;
  padding: 1.5em 1.5em 0.5em 1.5em;
  border-radius: 5em;
  background-color: var(--nx-c-orange);
  fill: var(--nx-c-near-black);
  transition: all 150ms ease-in-out;
  transform: scale(0.75);
  cursor: pointer;
  z-index: 4;
}

#add-comment-button:hover {
  transform: scale(1);
  background-color: var(--nx-c-near-black);
  fill: var(--nx-c-orange);
}

#comment-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 1px;
  z-index: 4;
  background-color: var(--nx-c-near-black-transparent);
  text-align: left;
}

h1:nth-child(1), h1:nth-child(3) {
  margin: 0;
}

h1:nth-child(3) {
  margin-top: 1em;
}

h1:nth-child(5) {
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: 1em;
  cursor: pointer;
  transition: all 200ms ease-in-out;
}

h1:nth-child(5):hover {
  color: var(--nx-c-near-black);
  background-color: var(--nx-c-orange);
}

input, textarea {
  font-size: 1em;
  background-color: var(--nx-c-gray-hover);
  color: var(--nx-c-smoke);
  border: none;
  border-radius: .5em;
  font-family: var(--nx-f-inter) !important;
}

input {
  text-align: center;
  max-height: 2em;
  transition: all 250ms ease-in-out;
}

div > input {
  height: 5em;
}

div > textarea {
  min-height: 20em;
  min-width: 40em;
}

input[type="search"]::-webkit-search-cancel-button {
  filter: invert(1);
}
</style>
