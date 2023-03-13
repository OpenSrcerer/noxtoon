<template>
  <GradientContentBox/>
  <ParallaxBackground/>
  <ContentBox>
    <div id="inner-content-box">
      <h1>Meet the Noxtoon family!</h1>

      <div id="card-container"
           v-if="cartoons.length"
      >
        <Card v-for="cartoon in cartoons"
              :slug="cartoon.slug"
              :name="cartoon.name"
        />
      </div>
    </div>
    <Footer/>
  </ContentBox>
</template>

<script setup>
import ParallaxBackground from "@/components/home/ParallaxBackground.vue";
import Footer from "@/components/nav/Footer.vue";
import {onMounted, ref} from "vue";
import {getCartoons} from "@/services/FirestoreService";
import Card from "@/components/home/Card.vue";
import ContentBox from "@/components/containers/WavyContentBox.vue";
import GradientContentBox from "@/components/containers/GradientTileContentBox.vue";

const cartoons = ref([]);
onMounted(async () =>
  cartoons.value = (await getCartoons())
      .docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
)
</script>

<style scoped>
#wavy-content {
  position: relative;
  top: 33em;
}

#gradient {
  top: 0;
}

#inner-content-box {
  width: var(--content-box-width);
  min-height: var(--content-min-height)
}

#card-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8em;
  justify-content: space-between;
}

#card-container::after {
  content: "";
  flex: auto;
}
</style>