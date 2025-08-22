<template>
  <main class="main-container">
    <div class="content-wrapper">
      <h1 class="page-title">Info App</h1>

      <section id="team">
        <ul>
          <li>Director proyecto: Carlos</li>
          <li>Desarrollo app: Kevin Jeremy</li>
          <li>Streaming: Islahosting</li>
          <li>Diseño gráfico: Karola</li>
        </ul>
      </section>

      <!-- PWA Install Section -->
      <div class="install-section">
        <h2 class="section-title">
          <Icon name="mdi:download" />
          Instalar App
        </h2>

        <!-- Install Button -->
        <div v-if="canInstall" class="install-available">
          <p class="install-description">
            Instala PlanetaX como aplicación para una mejor experiencia
          </p>
          <button @click="installPwa" class="install-button">
            <Icon name="mdi:cellphone-arrow-down" />
            <span>Instalar PlanetaX App</span>
          </button>
        </div>

        <!-- Already Installed -->
        <div v-else-if="isInstalled" class="install-status installed">
          <div class="status-icon success">
            <Icon name="mdi:check-circle" />
          </div>
          <p class="status-title">¡App ya instalada!</p>
          <p class="status-subtitle">
            PlanetaX está disponible en tu pantalla de inicio
          </p>
        </div>

        <!-- Not Available -->
        <div v-else class="install-status not-available">
          <div class="status-icon info">
            <Icon name="mdi:information-outline" />
          </div>
          <p class="status-title">Instalación no disponible</p>
          <p class="status-subtitle">
            La instalación como app no está disponible en este momento
          </p>

          <!-- Manual Instructions -->
          <div class="manual-instructions">
            <h3>Instalación manual:</h3>
            <div class="instruction-list">
              <div class="instruction-item">
                <span class="bullet">•</span>
                <span><strong>Chrome/Brave:</strong> Menú → "Añadir a pantalla de inicio"</span>
              </div>
              <div class="instruction-item">
                <span class="bullet">•</span>
                <span><strong>Safari:</strong> Compartir → "Añadir a inicio"</span>
              </div>
              <div class="instruction-item">
                <span class="bullet">•</span>
                <span><strong>Desktop:</strong> Busca el icono de instalación en la barra de URL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- App Info -->
      <div class="benefits-section">
        <h2 class="section-title">
          <Icon name="mdi:information" />
          Beneficios de la App
        </h2>
        <ul class="benefits-list">
          <li class="benefit-item">
            <Icon name="mdi:lightning-bolt" class="icon yellow" />
            <span>Acceso rápido desde tu pantalla de inicio</span>
          </li>
          <li class="benefit-item">
            <Icon name="mdi:wifi-off" class="icon blue" />
            <span>Funciona sin conexión a internet</span>
          </li>
          <li class="benefit-item">
            <Icon name="mdi:fullscreen" class="icon green" />
            <span>Experiencia a pantalla completa</span>
          </li>
          <li class="benefit-item">
            <Icon name="mdi:bell" class="icon purple" />
            <span>Notificaciones push (próximamente)</span>
          </li>
        </ul>
      </div>

      <!-- Debug Info (only in development) -->
      <div v-if="$dev" class="debug-section">
        <h3>Debug Info:</h3>
        <div class="debug-info">
          <div>Can Install: {{ canInstall }}</div>
          <div>Is Installed: {{ isInstalled }}</div>
          <div>User Agent: {{ userAgent }}</div>
          <div>Is PWA: {{ isPWA }}</div>
          <div>Is iOS: {{ isIOS }}</div>
          <div>Is Android: {{ isAndroid }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

definePageMeta({
  title: 'Info app'
})

// Reactive state
const canInstall = ref(false)
const isInstalled = ref(false)
const userAgent = ref('')
const isPWA = ref(false)
const isIOS = ref(false)
const isAndroid = ref(false)

// Store the deferred prompt
let deferredPrompt = null

// Detect device and environment
const detectEnvironment = () => {
  if (import.meta.client) {
    userAgent.value = navigator.userAgent
    isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent)
    isAndroid.value = /Android/.test(navigator.userAgent)

    // Check if running as PWA
    isPWA.value = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true

    // Check if already installed (rough detection)
    isInstalled.value = isPWA.value
  }
}

// Handle beforeinstallprompt event
const handleBeforeInstallPrompt = (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()

  // Save the event so it can be triggered later
  deferredPrompt = e
  canInstall.value = true

  console.log('PWA install prompt ready')
}

// Handle app installed event
const handleAppInstalled = () => {
  console.log('PWA was installed')
  canInstall.value = false
  isInstalled.value = true
  deferredPrompt = null

  // Optional: Analytics tracking
  // gtag('event', 'pwa_install', { method: 'automatic' })
}

// Install PWA function
const installPwa = async () => {
  if (!deferredPrompt) {
    console.log('No install prompt available')
    return
  }

  try {
    // Show the install prompt
    const result = await deferredPrompt.prompt()
    console.log('Install prompt result:', result)

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log('User choice:', outcome)

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
      // Optional: Analytics tracking
      // gtag('event', 'pwa_install', { method: 'manual', outcome: 'accepted' })
    } else {
      console.log('User dismissed the install prompt')
      // Optional: Analytics tracking  
      // gtag('event', 'pwa_install', { method: 'manual', outcome: 'dismissed' })
    }

    // Reset the deferred prompt
    deferredPrompt = null
    canInstall.value = false

  } catch (error) {
    console.error('Error during PWA installation:', error)
  }
}

// Lifecycle hooks
onMounted(() => {
  detectEnvironment()

  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

  // Listen for the app installed event
  window.addEventListener('appinstalled', handleAppInstalled)

  // Check if install prompt is already available (edge case)
  if (window.deferredPrompt) {
    deferredPrompt = window.deferredPrompt
    canInstall.value = true
  }
})

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  background-color: #000;
  color: white;
  padding: 1.5rem;
}

.content-wrapper {
  max-width: 28rem;
  margin: 0 auto;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.install-section,
.benefits-section {
  background-color: #111;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.install-available {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.install-description {
  color: #d1d5db;
  font-size: 0.875rem;
}

.install-button {
  width: 100%;
  background-color: white;
  color: black;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.install-button:hover {
  background-color: #f3f4f6;
}

.install-status {
  text-align: center;
}

.status-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.status-icon.success {
  color: #10b981;
}

.status-icon.info {
  color: #6b7280;
}

.status-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.installed .status-title {
  color: #10b981;
}

.not-available .status-title {
  color: #9ca3af;
}

.status-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
}

.manual-instructions {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #1f2937;
  border-radius: 0.5rem;
  text-align: left;
}

.manual-instructions h3 {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: white;
}

.instruction-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #d1d5db;
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.bullet {
  color: #60a5fa;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #d1d5db;
}

.icon {
  font-size: 1.25rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.icon.yellow {
  color: #fbbf24;
}

.icon.blue {
  color: #60a5fa;
}

.icon.green {
  color: #10b981;
}

.icon.purple {
  color: #a78bfa;
}

.debug-section {
  margin-top: 1.5rem;
  background-color: #7f1d1d;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 0.75rem;
}

.debug-section h3 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.debug-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: #fca5a5;
}
</style>