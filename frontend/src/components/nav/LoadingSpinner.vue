<template>
  <img id="loading-spinner" src="../../assets/img/misc/cat-dog.png">
  <h1 id="loading-text">Loading...</h1>
</template>

<style scoped>
  #loading-spinner {
    width: 150px;
    height: 150px;
    margin-left: -75px;
    margin-top: -75px;
    position: absolute;
    left: 50%;
    top: 50%;
    animation: loadingRotate 2s linear;
    animation-iteration-count: infinite;
  }

  #loading-text {
    font-family: var(--nx-f-cheri);
    color: rgb(169, 169, 169);
    letter-spacing: 0.1em;
    position: absolute;
    margin-left: -2.75em;
    margin-top: -5em;
    left: 50%;
    top: 50%;
  }

  @keyframes loadingRotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
