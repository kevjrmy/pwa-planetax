import { ref, onMounted, onUnmounted } from 'vue'

export function usePwaInstall() {
  const canInstall = ref(false)
  const isInstalled = ref(false)

  let deferredPrompt = null

  // Check if already running as PWA
  const checkIfInstalled = () => {
    if (import.meta.client) {
      isInstalled.value = window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
    }
  }

  // Handle the beforeinstallprompt event
  const handleBeforeInstallPrompt = (e) => {
    console.log('beforeinstallprompt event fired')

    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()

    // Store the event so it can be triggered later
    deferredPrompt = e
    canInstall.value = true
  }

  // Handle app installation
  const handleAppInstalled = () => {
    console.log('PWA was installed')
    canInstall.value = false
    isInstalled.value = true
    deferredPrompt = null
  }

  // Install the PWA
  const install = async () => {
    if (!deferredPrompt) {
      console.warn('No install prompt available')
      return false
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('User accepted PWA installation')
        return true
      } else {
        console.log('User dismissed PWA installation')
        return false
      }

    } catch (error) {
      console.error('Error during PWA installation:', error)
      return false
    } finally {
      // Clean up
      deferredPrompt = null
      canInstall.value = false
    }
  }

  // Setup event listeners immediately when composable is used
  const setupListeners = () => {
    if (!import.meta.client) return

    checkIfInstalled()

    // Check if prompt already exists (important for timing issues)
    if (window.deferredPrompt) {
      console.log('Found existing deferred prompt')
      deferredPrompt = window.deferredPrompt
      canInstall.value = true
    }

    // Listen for future prompts
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    console.log('PWA install listeners set up')
  }

  // Clean up event listeners
  const cleanupListeners = () => {
    if (!import.meta.client) return

    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', handleAppInstalled)
  }

  // Setup immediately when composable is created (not waiting for onMounted)
  if (import.meta.client) {
    setupListeners()
  }

  // Also setup on mount as backup
  onMounted(() => {
    setupListeners()
  })

  onUnmounted(() => {
    cleanupListeners()
  })

  return {
    // State
    canInstall: readonly(canInstall),
    isInstalled: readonly(isInstalled),

    // Actions
    install,

    // Manual setup (for when you don't want auto-setup)
    setupListeners,
    cleanupListeners
  }
}