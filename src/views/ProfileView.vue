<template>
  <GradientContentBox
      v-if="cartoon"
      :tile-color="cartoon.color"
  >
    <div id="profile-content">
      <img :src="src">
      <div id="profile-text-description">
        <h1>{{ cartoon.name }}</h1>
        <h2>Age: <span class="claim">{{ cartoon.age ?? "Unknown" }}</span></h2>
        <h2>Gender: <span class="claim">{{ cartoon.gender ?? "Unknown" }}</span></h2>
        <h2>Show: <span class="claim">{{ cartoon.show ?? "Unknown" }}</span></h2>
        <p>{{ cartoon.description }}</p>
      </div>
    </div>
  </GradientContentBox>
  <ContentBox>
    <Footer/>
  </ContentBox>
</template>

<script setup lang="ts">
import ContentBox from "@/components/containers/WavyContentBox.vue";
import Footer from "@/components/nav/Footer.vue";
import {computed, onMounted, ref} from "vue";
import {getCartoonBySlug} from "@/services/FirestoreService";
import GradientContentBox from "@/components/containers/GradientTileContentBox.vue";
import {getDynamicImage} from "@/components/composables/URLUtils";

interface Cartoon {
  id: string,
  slug: string,
  name: string,
  age: string,
  gender: string,
  show: string,
  description: string,
  color: string;
}

const props = defineProps<Cartoon>()
const cartoon = ref<Cartoon | null>(null);
const src = computed(() => getDynamicImage(props.slug, "cartoons"));
onMounted(async () => {
  cartoon.value = (await getCartoonBySlug(props.slug))
      .docs
      .map(doc => (<Cartoon> { ...doc.data(), id: doc.id }))[0];
})
</script>

<style scoped>
#profile-content {
  display: flex;
  justify-content: left;
  align-items: center;
  width: var(--content-box-width);
}

#profile-content > * {
  max-height: 50%;
}

#profile-text-description {
  width: 40%;
}

.claim {
  font-weight: normal;
}

h2 {
  margin: 0;
}

#wavy-content {
  min-height: 10vh;
  position: relative;
  top: 81.5vh;
}
</style>