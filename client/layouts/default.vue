<script setup lang="ts"></script>

<template lang="pug">

.main-container
  navbar
    span.logo
      nuxt-link(to="/") Home
    ul
      li
        NuxtLink(to="/about") About
      li
        NuxtLink(to="/contact") Contact
      li
        NuxtLink(to="/blog") Blog
  main
    slot
  footer Footer

</template>

<style scoped lang="scss">
@use "@/styles/index.scss" as *;

.main-container {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

navbar {
  width: 100vw;
  background-color: $main-color;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
