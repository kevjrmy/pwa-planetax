<template>
  <main>
    <div class="content-wrapper">
      <section id="team">
        <ul>
          <li>Director proyecto: <strong>Carlos Martinez</strong></li>
          <li>Desarrollo app: <strong>
              <NuxtLink to="https://www.linkedin.com/in/kevin-jeremy" target="_blank">Kevin Jeremy
                <Icon name="mdi:external-link" />
              </NuxtLink>
            </strong></li>
          <li>Streaming: <strong>
              <NuxtLink to="https://islahostingla.com/" target="_blank">Islahosting
                <Icon name="mdi:external-link" />
              </NuxtLink>
            </strong></li>
          <li>Diseño gráfico: <strong>Karolarte</strong></li>
        </ul>
      </section>

      <!-- PWA Install Section - Only show when NOT running as PWA -->
      <div v-if="!isRunningAsPWA" class="install-section">
        <h2 class="section-title">
          <Icon name="mdi:download" />
          Instalar App
        </h2>

        <!-- Install Button - Only show if actually available -->
        <div v-if="canInstall" class="install-available">
          <p class="install-description">
            ¡Instala PlanetaX como aplicación para una mejor experiencia!
          </p>
          <button @click="install" class="install-button">
            <Icon name="mdi:cellphone-arrow-down" />
            <span>Instalar PlanetaX App</span>
          </button>
        </div>

        <!-- Manual Installation Instructions (when can't install programmatically) -->
        <div v-else class="install-status not-available">
          <div class="status-icon info">
            <Icon name="mdi:information-outline" />
          </div>
          <p class="status-title">Instalación Manual</p>
          <small class="status-subtitle">
            Instala PlanetaX usando el menú de tu navegador
          </small>

          <div class="manual-instructions">
            <h3>Instrucciones por navegador:</h3>
            <div class="instruction-list">
              <div class="instruction-item">
                <span class="bullet">
                  <Icon name="material-symbols:android" style="color: #3DDC84;" />
                </span>
                <span><strong>Chrome/Brave Android:</strong> Menú → "Añadir a pantalla de inicio"</span>
              </div>
              <div class="instruction-item">
                <span class="bullet">
                  <Icon name="mdi:apple" />
                </span>
                <span><strong>Safari iOS:</strong> Botón compartir → "Añadir a inicio"</span>
              </div>
              <div class="instruction-item">
                <span class="bullet">
                  <Icon name="material-symbols:laptop-chromebook-outline-rounded" />
                </span>
                <span><strong>Desktop:</strong> Icono de instalación en la barra de URL</span>
              </div>
              <div class="instruction-item">
                <span class="bullet">
                  <Icon name="logos:microsoft-edge" />
                </span>
                <span><strong>Edge:</strong> Menú → "Apps" → "Instalar este sitio como app"</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="benefits-section">
        <h2 class="section-title">
          <Icon name="mdi:star" />
          ¿Por qué instalar?
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
            <span>Experiencia a pantalla completa sin barras del navegador</span>
          </li>
          <li class="benefit-item">
            <Icon name="mdi:notification-settings" class="icon purple" />
            <span>Notificaciones push de nuevos contenidos</span>
          </li>
          <li class="benefit-item">
            <Icon name="mdi:download" class="icon orange" />
            <span>Menor consumo de datos y mayor velocidad</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  title: 'App info'
})

const { canInstall, install } = usePwaInstall()

// Check if running as PWA (standalone mode)
const isRunningAsPWA = ref(false)

onMounted(() => {
  if (import.meta.client) {
    isRunningAsPWA.value = window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true

    console.log('[PWA] Running as PWA:', isRunningAsPWA.value)
    console.log('[PWA] Can install:', canInstall.value)
  }
})
</script>

<style scoped>
main {
  margin-bottom: 90px;
}

#team {
  line-height: 2;
}

#team a {
  text-decoration: underline;
}

.install-section,
.benefits-section {
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #333;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #60a5fa;
}

.install-available {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.install-description {
  color: #d1d5db;
  text-align: center;
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

.install-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.install-button:active {
  transform: translateY(0);
}

.install-status {
  text-align: center;
}

.status-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.status-icon.success {
  color: #10b981;
}

.status-icon.info {
  color: #60a5fa;
}

.status-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.installed .status-title {
  color: #10b981;
}

.not-available .status-title {
  color: #60a5fa;
}

.status-subtitle {
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.manual-instructions {
  background-color: #1a1a1a;
  border-radius: 0.5rem;
  padding: 1.25rem;
  text-align: left;
  border: 1px solid #333;
}

.manual-instructions h3 {
  margin-bottom: 1rem;
}

.instruction-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.instruction-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #d1d5db;
  line-height: 1.5;
}

.bullet {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #d1d5db;
  padding: 0.75rem;
  background-color: #1a1a1a;
  border-radius: 0.5rem;
  border: 1px solid #333;
  transition: border-color 0.2s;
}

.benefit-item:hover {
  border-color: #4b5563;
}

.icon {
  font-size: 1.5rem;
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

.icon.orange {
  color: #f97316;
}
</style>