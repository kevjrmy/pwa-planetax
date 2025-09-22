<template>
  <main>
    Planeta X TV

    <iframe title="Planeta X TV" width="100%" height="auto" style="border:none" src="https://planetanetworkradio.com/tv/" allow="autoplay; fullscreen; encrypted-media" @load="onIframeLoad">
    </iframe>
  </main>
</template>

<script setup>
definePageMeta({
  title: 'PlanetaX TV'
})

const iframeSrc = ref('https://planetanetworkradio.com/tv/?autoplay=1&muted=1')
</script>