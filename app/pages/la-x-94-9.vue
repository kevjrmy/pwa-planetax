<template>
  <main class="player-page">
    <NuxtImg src="/img/x_949_fm_logo_white.png" />

    <div class="player-controls">
      <button @click="stopOrReload" :class="{ spinning: isSpinning }">
        <Icon :name="stopReloadIcon" style="width: 2rem; height: 2rem; color: white;" />
      </button>

      <button @click="togglePlay">
        <Icon :name="playPauseIcon" style="width: 2rem; height: 2rem; color: white;" />
      </button>
    </div>

    <audio ref="audioRef" :src="streamUrl"></audio>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ title: 'La X 94.9' })

const streamUrl = 'https://stream.islahostingla.com/8040/stream'
const audioRef = ref(null)

// State flags
const isPlaying = ref(false)
const isStopped = ref(false) // default: Stop button visible
const isSpinning = ref(false) // for animation

// Reactive icons
const playPauseIcon = computed(() =>
  isPlaying.value ? 'material-symbols:pause' : 'material-symbols:play-arrow'
)
const stopReloadIcon = computed(() =>
  isStopped.value ? 'material-symbols:refresh-rounded' : 'material-symbols:stop-rounded'
)

// Play / Pause toggle
function togglePlay() {
  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play().catch(err => console.error('Playback error:', err))
    isPlaying.value = true
    isStopped.value = false
  }
}

// Stop or Reload with spinning animation
function stopOrReload() {
  if (!audioRef.value) return

  if (!isStopped.value) {
    // Stop or pause the stream
    audioRef.value.pause()
    audioRef.value.currentTime = 0
    isPlaying.value = false
    isStopped.value = true
  } else {
    // Trigger spinning animation
    isSpinning.value = true

    // Always reset and auto-play, regardless of previous state
    audioRef.value.currentTime = 0
    audioRef.value.play().catch(err => console.error('Playback error:', err))
    isPlaying.value = true
    isStopped.value = false

    // Stop spinning after animation
    setTimeout(() => {
      isSpinning.value = false
    }, 500) // 0.5s rotation
  }
}
</script>

<style scoped>
img {
  height: 120px;
  width: 120px;
  object-fit: contain;
}

.player-controls {
  display: flex;
  column-gap: 1rem;
}

button.spinning {
  animation: spin 0.5s linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>