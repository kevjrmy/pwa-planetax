<template>
  <header>
    <NuxtLink v-if="!isHome" class="back-btn">
      <Icon name="material-symbols:arrow-left-alt-rounded" style="height: 2rem; width: 2rem;" />
    </NuxtLink>

    <h1 v-if="isHome" class="page-title">
      <NuxtImg v-if="isHome" src="/img/PlanetaX-app.png" alt="PlanetaX logo" class="logo" />
      <span>Bienvenido a PlanetaX</span>
    </h1>

    <h1 v-else class="page-title">
      {{ pageTitle }}
    </h1>
  </header>
</template>

<script setup>
import { useRoute } from '#imports'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const pageTitle = computed(() => route.meta.title || 'Untitled Page')
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.logo {
  display: flex;
  justify-content: center;
  margin: auto;
}

img {
  height: 80px;
  width: 80px;
  object-fit: contain;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.page-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}
</style>