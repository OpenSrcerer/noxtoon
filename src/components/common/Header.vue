<template>
  <div id="header-container">
    <div id="nav-header-container">
      <RouterLink to="Home">Noxtoon</RouterLink>
      <RouterLink to="to">Link 1</RouterLink>
      <RouterLink to="to">Link 2</RouterLink>
      <RouterLink to="to">Link 3</RouterLink>
      <RouterLink to="to">Link 4</RouterLink>
    </div>
    <hr>
  </div>
</template>

<script setup>
</script>

<style scoped>
#nav-header-container {
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  column-gap: 10px;
}

#header-container {
  display: flex;
  flex-direction: column;
}

hr {
  width: 100%;
}
</style>