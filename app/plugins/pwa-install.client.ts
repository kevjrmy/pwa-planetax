import { usePwaInstall } from '@/composables/usePwaInstall'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const { setupListeners } = usePwaInstall()
    setupListeners()
  }
})
