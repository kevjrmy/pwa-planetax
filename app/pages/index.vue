<template>
  <main id="home">
    <div class="hero">
      <NuxtImg src="/img/PlanetaX-app.png" class="logo" />
      <section>
        <ul role="list">
          <li>
            <NuxtLink to="/la-x-94-9">
              <NuxtImg src="/img/x_949_fm_logo_white.png" class="radio" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/planeta-network-103-4">
              <NuxtImg src="/img/planeta_network_radio_logo.png" class="radio" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/planeta-tv">
              <NuxtImg src="/img/PLANETA--X-TV-LOGO.png" class="tv" />
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  title: 'Inicio'
})
</script>

<style scoped>
main#home {
  gap: 0;
  justify-content: start;
}

.hero {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 2rem;
}

img {
  margin: auto;
}

section {
  height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

ul {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  align-items: center;
}

.logo,
.radio {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.tv {
  width: 120px;
  height: 60px;
  object-fit: contain;
}
</style>
