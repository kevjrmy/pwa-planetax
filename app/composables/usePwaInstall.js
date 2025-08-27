import { ref, readonly } from 'vue'

let globalDeferredPrompt = null
let globalCanInstall = ref(false)
let listenersSetup = false

export function usePwaInstall() {
  const canInstall = globalCanInstall

  const handleBeforeInstallPrompt = (e) => {
    console.log('[PWA] beforeinstallprompt fired ✅')

    e.preventDefault()
    globalDeferredPrompt = e
    globalCanInstall.value = true

    // Persist across reloads in same session
    sessionStorage.setItem('canInstallPWA', 'true')
  }

  const handleAppInstalled = () => {
    console.log('[PWA] App was installed ✅')
    globalCanInstall.value = false
    globalDeferredPrompt = null
    sessionStorage.removeItem('canInstallPWA')
  }

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
        sessionStorage.removeItem('canInstallPWA')
        return true
      } else {
        // User dismissed → keep canInstall true so button still shows
        return false
      }
    } catch (error) {
      console.error('[PWA] Install error:', error)
      return false
    }
  }

  const setupListeners = () => {
    if (!import.meta.client || listenersSetup) return
    console.log('[PWA] Setting up event listeners...')

    // Restore state if we had beforeinstallprompt earlier
    if (sessionStorage.getItem('canInstallPWA') === 'true') {
      globalCanInstall.value = true
      console.log('[PWA] Restored canInstall from session ✅')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    listenersSetup = true
  }

  return {
    canInstall: readonly(canInstall),
    install,
    setupListeners
  }
}
