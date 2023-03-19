<template>
  <div id="comment-form">
    <div v-for="input in inputs">
      <h1>{{ input }}</h1>
      <input v-model="formData[input]" type="text"/>
    </div>
    <h1 @click="onSubmit">Submit</h1>
  </div>
</template>

<script setup lang="ts">
// ------ Comment Handling ------
import {reactive} from "vue";
import {addComment} from "@/services/FirestoreService";

interface CommentFormProps {
  cartoonId: string;
}

const props = defineProps<CommentFormProps>();
const formData = reactive<Record<string, any>>({});
const inputs = ['Username', 'Comment']
clearForm()

const onSubmit = async () => {
  await addComment({
    cartoonId: props.cartoonId,
    username: formData[inputs[0]],
    comment: formData[inputs[1]]
  })
  clearForm()
}

function clearForm() {
  inputs.forEach(input => formData[input] = '');
}
</script>

<style scoped>

</style>