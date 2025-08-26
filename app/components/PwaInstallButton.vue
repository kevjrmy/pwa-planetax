<template>
  <div v-if="canInstall && !isRunningAsPWA" class="install-available">
    <p v-if="showDescription" class="install-description">
      {{ description }}
    </p>
    <button @click="handleInstall" class="install-button" :disabled="installing">
      <Icon :name="installing ? 'mdi:loading' : buttonIcon" :class="{ spinning: installing }" />
      <span>{{ installing ? 'Instalando...' : buttonText }}</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
    default: '¡Instala PlanetaX como aplicación para una mejor experiencia!'
  },
  buttonText: {
    type: String,
    default: 'Instalar PlanetaX App'
  },
  buttonIcon: {
    type: String,
    default: 'mdi:cellphone-arrow-down'
  },
  showDescription: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['install-success', 'install-failed'])

const { canInstall, install } = usePwaInstall()
const installing = ref(false)

// Check if running as PWA
const isRunningAsPWA = ref(false)

const handleInstall = async () => {
  if (installing.value) return

  installing.value = true
  
  try {
    const success = await install()
    
    if (success) {
      emit('install-success')
      console.log('[PWA] Installation successful! ✅')
    } else {
      emit('install-failed', 'User dismissed installation')
      console.log('[PWA] Installation cancelled by user')
    }
  } catch (error) {
    emit('install-failed', error.message)
    console.error('[PWA] Installation error:', error)
  } finally {
    installing.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    isRunningAsPWA.value = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    
    console.log('[PWA] PwaInstallButton mounted')
    console.log('[PWA] Running as PWA:', isRunningAsPWA.value)
    console.log('[PWA] Can install:', canInstall.value)
  }
})
</script>

<style scoped>
.install-available {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.install-description {
  color: #d1d5db;
  text-align: center;
  margin: 0;
}

.install-button {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: white;
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.install-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.install-button:active:not(:disabled) {
  transform: translateY(0);
}

.install-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
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