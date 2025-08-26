import { ref, readonly } from 'vue'

// Global state that persists across page navigation
let globalDeferredPrompt = null
let globalCanInstall = ref(false)
let listenersSetup = false

export function usePwaInstall() {
  const canInstall = globalCanInstall
  
  // Handle the beforeinstallprompt event
  const handleBeforeInstallPrompt = (e) => {
    console.log('[PWA] beforeinstallprompt event fired!')
    
    // Prevent the mini-infobar
    e.preventDefault()
    
    // Store globally so it persists across navigation
    globalDeferredPrompt = e
    globalCanInstall.value = true
    
    console.log('[PWA] Install prompt stored globally ✅')
  }

  // Handle app installation
  const handleAppInstalled = () => {
    console.log('[PWA] App was installed ✅')
    globalCanInstall.value = false
    globalDeferredPrompt = null
  }

  // Install function
  const install = async () => {
    console.log('[PWA] Install button clicked')
    
    if (!globalDeferredPrompt) {
      console.warn('[PWA] No install prompt available')
      return false
    }

    try {
      await globalDeferredPrompt.prompt()
      const { outcome } = await globalDeferredPrompt.userChoice
      
      console.log('[PWA] Install outcome:', outcome)
      
      if (outcome === 'accepted') {
        globalCanInstall.value = false
        globalDeferredPrompt = null
        return true
      }
      
      return false
      
    } catch (error) {
      console.error('[PWA] Install error:', error)
      return false
    }
  }

  // Setup listeners only once globally
  const setupListeners = () => {
    if (!import.meta.client || listenersSetup) return

    console.log('[PWA] Setting up global event listeners...')
    
    // Check if prompt already exists from previous navigation
    if (window.deferredPrompt) {
      console.log('[PWA] Found existing deferred prompt from previous navigation')
      globalDeferredPrompt = window.deferredPrompt
      globalCanInstall.value = true
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    
    listenersSetup = true
    console.log('[PWA] Global event listeners set up ✅')
  }

  // Setup immediately when composable is first used
  if (import.meta.client) {
    setupListeners()
  }

  return {
    canInstall: readonly(canInstall),
    install
  }
}