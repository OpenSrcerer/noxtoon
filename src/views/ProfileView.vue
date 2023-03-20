<template>
  <GradientContentBox
      v-if="cartoon"
      :tile-color="cartoon.color"
  >
    <YoutubeVideo :src="cartoon.video"/>
    <WavyContentBox>
      <h1>{{ cartoon.name }}</h1>
      <ScrollDownTriangle :scroll-to-comments="true"/>
      <div id="profile-content">
        <div id="likes-comments">
          <ButtonWithCounter color="#ED1940"
                             type="heart"
                             :count="cartoon.hearts"
                             :cartoonId="cartoon.id"
                             @buttonClick="onClick"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="5 6.58 22 20.85">\
              <path d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z"/>
            </svg>
          </ButtonWithCounter>
          <ButtonWithCounter color="#ED8A19"
                             type="star"
                             :count="cartoon.stars"
                             :cartoonId="cartoon.id"
                             @buttonClick="onClick"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 1.05 47.94 45.85">
              <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z" data-darkreader-inline-fill=""></path>
            </svg>
          </ButtonWithCounter>
        </div>

        <img :src="cartoonImageSrc">

        <div id="profile-text-description">
          <h2>Age: <span class="claim">{{ cartoon.age ?? "Unknown" }}</span></h2>
          <h2>Gender: <span class="claim">{{ cartoon.gender ?? "Unknown" }}</span></h2>
          <h2>Show: <span class="claim">{{ cartoon.show ?? "Unknown" }}</span></h2>
          <div id="description" v-html="cartoon.description"></div>
        </div>
      </div>

      <h2 id="comments-title">Comments</h2>
      <hr>
      <AddCommentModal :cartoon-id="cartoon.id" @new-comment="updateTrigger++"/>
      <CommentList :cartoon-id="cartoon.id" :update-trigger="updateTrigger"/>
      <Footer/>
    </WavyContentBox>
  </GradientContentBox>
  <LoadingSpinner v-else/>
</template>

<script setup lang="ts">
import Footer from "@/components/nav/Footer.vue";
import {computed, onMounted, ref} from "vue";
import {getCartoonBySlug, updateCartoonStats} from "@/services/FirestoreService";
import GradientContentBox from "@/components/containers/GradientTileContentBox.vue";
import {getDynamicImage} from "@/components/composables/URLUtils";
import ButtonWithCounter from "@/components/profile/ButtonWithCounter.vue";
import YoutubeVideo from "@/components/profile/YoutubeVideo.vue";
import WavyContentBox from "@/components/containers/WavyContentBox.vue";
import LoadingSpinner from "@/components/nav/LoadingSpinner.vue";
import type {ButtonClickDto} from "@/components/composables/dto/ButtonClickDto";
import CommentList from "@/components/profile/CommentList.vue";
import ScrollDownTriangle from "@/components/nav/ScrollDownTriangle.vue";
import AddCommentModal from "@/components/profile/AddCommentModal.vue";

interface Cartoon {
  id: string,
  slug: string,
  name: string,
  age: string,
  gender: string,
  show: string,
  description: string,
  color: string;
  video: string;
  hearts: string;
  stars: string;
}

onMounted(async () => await retrieveCartoon())

const props = defineProps<Cartoon>()
const cartoon = ref<Cartoon | null>(null);
const updateTrigger = ref(0)

const cartoonImageSrc = computed(() => getDynamicImage(props.slug, "cartoons"));
const cartoonColorLight = computed(() => cartoon.value?.color.slice(0, -2) + '99')

const onClick = async (e: ButtonClickDto) => {
  await updateCartoonStats(e)
  await retrieveCartoon();
}

const retrieveCartoon = async () => {
  cartoon.value = (await getCartoonBySlug(props.slug))
      .docs
      .map(doc => (<Cartoon> { ...doc.data(), id: doc.id }))[0];
}
</script>

<style scoped>
#likes-comments > img {
  max-width: 3em;
}

#profile-content {
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: var(--content-box-width);
  margin-top: 1.5em;
  margin-bottom: 3em;
}

#profile-content > * {
  max-height: 50%;
  animation: slideIn 0.5s;
}

#profile-content > img {
  max-height: 20em;
  max-width: 20em;
}

#profile-text-description {
  max-width: 40em;
  text-align: left;
}

#profile-text-description > div {
  margin-top: 1em;
}

#description {
  font-size: 1.25em;
}

#comments-title {
  margin-top: 3em;
  font-size: 3em;
}

.claim {
  font-weight: normal;
}

h1 {
  font-size: 6em;
  font-family: var(--nx-f-cheri);
  color: v-bind(cartoonColorLight);
  position: absolute;
  top: 1.75em;
  z-index: 3;
  -webkit-text-stroke-width: 0.03em;
  -webkit-text-stroke-color: var(--nx-c-near-black);
  user-select: none;
  text-align: center;
  font-weight: 100;
}

h2 {
  margin: 0;
  font-size: 2em;
}

hr {
  width: var(--content-box-width);
  border: 1px solid var(--nx-c-orange);
}

#wavy-content {
  width: 100%;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    margin-top: 10em;
  }
  100% {
    opacity: 1;
    margin-top: 0;
  }
}
</style>