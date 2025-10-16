<template>
  <main id="home">
    <div class="hero">
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

.radio {
  width: 6rem;
  height: 6rem;
  min-width: 100px;
  min-height: 100px;
  object-fit: contain;
  max-height: 160px;
  max-width: 160px;
}

.tv {
  width: 10rem;
  height: 6rem;
  object-fit: contain;
  max-height: 160px;
  max-width: 160px;
}
</style>
