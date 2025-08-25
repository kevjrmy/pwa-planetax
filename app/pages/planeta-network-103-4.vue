<template>
  <main class="player-page">
    <NuxtImg src="/img/planeta_network_radio_logo.png" />
     
    <!-- Row 1: Play/Stop Controls -->
    <div class="player-controls">
      <button @click="stopOrReload" :class="{ spinning: isSpinning }">
        <Icon :name="stopReloadIcon" style="width: 2rem; height: 2rem; color: white;" />
      </button>
       
      <button @click="togglePlay">
        <Icon :name="playPauseIcon" style="width: 2rem; height: 2rem; color: white;" />
      </button>
    </div>

    <!-- Row 2: Volume Controls -->
    <div class="volume-control">
      <button @click="toggleMute" :class="{ muted: isMuted }">
        <Icon :name="volumeIcon" style="width: 2rem; height: 2rem; color: white;" />
      </button>
      
      <input 
        type="range" 
        min="0" 
        max="100" 
        v-model="volumeLevel"
        @input="updateVolume"
        class="volume-slider"
      />
      
      <span class="volume-label">{{ volumeLevel }}%</span>
    </div>
     
    <audio ref="audioRef" :src="streamUrl"></audio>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

definePageMeta({
  title: 'Planeta Network 103.4'
})

const streamUrl = 'https://stream.islahostingla.com/8210/stream'
const audioRef = ref(null)

// State flags
const isPlaying = ref(false)
const isStopped = ref(false) // default: Stop button visible
const isSpinning = ref(false) // for animation
const isMuted = ref(false)
const volumeLevel = ref(80) // Default volume 80%

// Reactive icons
const playPauseIcon = computed(() =>
  isPlaying.value ? 'material-symbols:pause' : 'material-symbols:play-arrow'
)

const stopReloadIcon = computed(() =>
  isStopped.value ? 'material-symbols:refresh-rounded' : 'material-symbols:stop-rounded'
)

const volumeIcon = computed(() => {
  if (isMuted.value || volumeLevel.value === 0) {
    return 'material-symbols:volume-off'
  } else if (volumeLevel.value < 50) {
    return 'material-symbols:volume-down'
  } else {
    return 'material-symbols:volume-up'
  }
})

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

// Volume control functions
function toggleMute() {
  if (!audioRef.value) return
  
  isMuted.value = !isMuted.value
  audioRef.value.muted = isMuted.value
}

function updateVolume() {
  if (!audioRef.value) return
  
  const volume = volumeLevel.value / 100
  audioRef.value.volume = volume
  
  // Auto unmute if volume is increased
  if (volume > 0 && isMuted.value) {
    isMuted.value = false
    audioRef.value.muted = false
  }
  
  // Auto mute if volume is set to 0
  if (volume === 0) {
    isMuted.value = true
    audioRef.value.muted = true
  }
}

// Watch for volume level changes
watch(volumeLevel, () => {
  updateVolume()
})

// Initialize volume when audio element is ready
watch(audioRef, (newAudioRef) => {
  if (newAudioRef) {
    newAudioRef.volume = volumeLevel.value / 100
    newAudioRef.muted = isMuted.value
  }
})
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
  margin-bottom: 1rem;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

button.spinning {
  animation: spin 0.5s linear;
}

button.muted {
  opacity: 0.6;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.volume-icon-row {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.volume-slider {
  width: 150px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.volume-slider::-webkit-slider-track {
  background: linear-gradient(to right, white 0%, white var(--volume-progress, 80%), rgba(255, 255, 255, 0.3) var(--volume-progress, 80%));
  height: 4px;
  border-radius: 2px;
}

.volume-label {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 35px;
  text-align: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Add visual feedback for volume progress */
.volume-slider {
  background: linear-gradient(to right, 
    white 0%, 
    white calc(var(--volume-progress) * 1%), 
    rgba(255, 255, 255, 0.3) calc(var(--volume-progress) * 1%));
}
</style>

<script>
// Update CSS custom property for volume progress
export default {
  mounted() {
    this.updateVolumeProgress()
  },
  watch: {
    volumeLevel() {
      this.updateVolumeProgress()
    }
  },
  methods: {
    updateVolumeProgress() {
      this.$nextTick(() => {
        document.documentElement.style.setProperty('--volume-progress', this.volumeLevel)
      })
    }
  }
}
</script>