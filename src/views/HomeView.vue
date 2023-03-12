<template>
  <ParallaxBackground/>

  <div id="content">
    <div id="waves"></div>
    <div id="content-box">
      <h1>Meet the Noxtoon family!</h1>

      <div id="card-container"
           v-if="cartoons.length"
      >
        <Card v-for="cartoon in cartoons"
              :id="cartoon.id"
              :slug="cartoon.slug"
              :name="cartoon.name"
              :description="cartoon.description"
        />
      </div>

    </div>

    <Footer/>
  </div>
</template>

<script setup>
import ParallaxBackground from "@/components/home/ParallaxBackground.vue";
import Footer from "@/components/nav/Footer.vue";
import {onMounted, ref} from "vue";
import {getCartoons} from "@/services/FirestoreService";
import Card from "@/components/home/Card.vue";

const cartoons = ref([]);
onMounted(async () => {
  cartoons.value = (await getCartoons()).docs.map(doc => ({ ...doc.data(), id: doc.id }));
  // Keep the cartoon list with 2 per row
  if (cartoons.value.length % 2 !== 0) {
    cartoons.value.pop()
  }
})
</script>

<style scoped>

#waves {
  width: 100%;
  height: 3em;
  position: relative;
  bottom: 2.6em;
  background-color: var(--nx-c-near-black);
  --mask:
      radial-gradient(54.08px at 50% 75.00px,#000 99%,#0000 101%) calc(50% - 60px) 0/120px 100%,
      radial-gradient(54.08px at 50% -45px,#0000 99%,#000 101%) 50% 30px/120px 100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 33em;
  background-color: var(--nx-c-near-black);
  text-align: center;
}

#content-box {
  width: var(--content-box-width);
  min-height: var(--content-min-height)
}

#card-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap-reverse;
  column-gap: 8em;
  justify-content: center;
}
</style>