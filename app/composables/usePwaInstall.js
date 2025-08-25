import { ref, readonly } from 'vue'

export function usePwaInstall() {
  const canInstall = ref(false)
  
  let deferredPrompt = null

  // Handle the beforeinstallprompt event
  const handleBeforeInstallPrompt = (e) => {
    console.log('[PWA] beforeinstallprompt event fired!')
    
    // Prevent the mini-infobar
    e.preventDefault()
    
    // Store the event
    deferredPrompt = e
    canInstall.value = true
  }

  // Install function
  const install = async () => {
    if (!deferredPrompt) {
      console.warn('[PWA] No install prompt available')
      return false
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      console.log('[PWA] Install outcome:', outcome)
      return outcome === 'accepted'
      
    } catch (error) {
      console.error('[PWA] Install error:', error)
      return false
    } finally {
      deferredPrompt = null
      canInstall.value = false
    }
  }

  // Setup immediately
  if (import.meta.client) {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    // Check if prompt already exists
    if (window.deferredPrompt) {
      deferredPrompt = window.deferredPrompt
      canInstall.value = true
    }
  }

  return {
    canInstall: readonly(canInstall),
    install
  }
}