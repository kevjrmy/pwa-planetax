<template>
  <header>
    <NuxtLink v-if="!isHome" class="back-btn" to="/">
      <Icon name="material-symbols:arrow-left-alt-rounded" style="height: 2rem; width: 2rem;" />
    </NuxtLink>

    <h1 v-if="isHome" class="home-title">Bienvenido a PlanetaX</h1>
    <h1 v-else class="page-title">{{ pageTitle }}</h1>
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

.back-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.page-title,
.home-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  padding: 0 3rem 0 3rem;
}

.home-title {
  font-size: 1.5rem;
  padding: 0;
}
</style>