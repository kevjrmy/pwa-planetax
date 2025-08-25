<template>
  <nav aria-label="Main navigation" class="bottom-nav">
    <ul role="list">
      <li>
        <NuxtLink to="/" aria-current="page">
          <Icon name="material-symbols:home" style="height: 1.5rem; width: 1.5rem;" />
          <span class="label">Inicio</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/planeta-network-103-4" aria-current="page">
          <Icon name="material-symbols:radio" style="height: 1.5rem; width: 1.5rem;" />
          <span class="label">Planeta Network</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/la-x-94-9" aria-current="page">
          <Icon name="material-symbols:radio-outline" style="height: 1.5rem; width: 1.5rem;" />
          <span class="label">La X 94.9</span>
        </NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink to="/planeta-tv" aria-current="page">
          <Icon name="material-symbols:tv-guide" style="height: 1.5rem; width: 1.5rem;" />
          <span class="label">Planeta tv</span>
        </NuxtLink>
      </li> -->
      <li>
        <NuxtLink to="/info" aria-current="page">
          <Icon name="material-symbols:info" style="height: 1.5rem; width: 1.5rem;" />
          <span class="label">App Info</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="css" scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 0;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(0, 0, 0, 0.9);
  height: 90px;
}

ul {
  width: 100svw;
  max-width: 768px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  column-gap: 0.5rem;
  font-size: small;
}

li>a {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>