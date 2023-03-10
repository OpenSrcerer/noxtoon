<script setup>
import Header from "@/components/nav/Header.vue";
import {watchEffect} from "vue";

watchEffect(() => document.title = "Noxtoon")
</script>

<template>
  <Header/>
  <router-view/>
</template>