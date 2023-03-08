<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<template>
  <Header/>
  <router-view class="content"/>
  <Footer/>
</template>

<style scoped>
.content {
  flex: 1;
}
</style>