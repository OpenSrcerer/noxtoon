<template>
  <div id="wavy-content">
    <div id="waves"></div>
    <slot>
      <h1>Insert some data here!</h1>
    </slot>
  </div>
</template>

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

#wavy-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--nx-c-near-black);
  text-align: center;
}
</style>