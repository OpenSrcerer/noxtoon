<template>
  <div id="comment-container"
       v-if="comments"
  >
    <div class="comment"
         v-for="comment in comments"
    >
      <h1>{{ comment.username }}</h1>
      <p>{{ comment.comment }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {CommentDto} from "@/components/composables/dto/CommentDto";
import {getCartoonComments} from "@/services/FirestoreService";

interface CommentListProps {
  cartoonId: string;
}

const props = defineProps<CommentListProps>()
const comments = ref<Array<CommentDto>>()

onMounted(async () => retrieveCartoonComments())

const retrieveCartoonComments = async () => {
  const allComments = await getCartoonComments(props.cartoonId)
  comments.value = allComments.docs.map(doc => ({...doc.data(), id: doc.id}));
}

</script>

<style scoped>

</style>