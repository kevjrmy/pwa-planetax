<template>
  <main>
    <ul role="list">
    <li>
      <NuxtLink to="/la-x-94-9">
        <NuxtImg src="/img/x_949_fm_logo_white.png" />
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/planeta-network-103-4">
        <NuxtImg src="/img/planeta_network_radio_logo.png" />
      </NuxtLink>
    </li>
    </ul>
  </main>
</template>

<script setup>
definePageMeta({
  title: 'Inicio'
})
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}

img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
</style>
