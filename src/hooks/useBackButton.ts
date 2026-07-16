import { useEffect, useRef } from 'react'
import { App } from '@capacitor/app'
import { logger } from '../utils/logger'
import { DOUBLE_BACK_EXIT_DELAY } from '../utils/constants'

export function useBackButton(onBack?: () => boolean) {
  const backPressedRef = useRef(false)
  const backTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleBackButton = async () => {
      if (onBack?.()) {
        return
      }

      if (backPressedRef.current) {
        await App.exitApp()
        return
      }

      backPressedRef.current = true
      logger.debug('Press back again to exit')

      if (backTimeoutRef.current) {
        clearTimeout(backTimeoutRef.current)
      }

      backTimeoutRef.current = setTimeout(() => {
        backPressedRef.current = false
        logger.debug('Back press timeout reset')
      }, DOUBLE_BACK_EXIT_DELAY)
    }

    const setupListener = async () => {
      const listener = await App.addListener('backButton', handleBackButton)

      return () => {
        void listener.remove()
        if (backTimeoutRef.current) {
          clearTimeout(backTimeoutRef.current)
        }
      }
    }

    let cleanup: (() => void) | undefined

    setupListener().then((cleanup_fn) => {
      cleanup = cleanup_fn
    })

    return () => {
      cleanup?.()
    }
  }, [onBack])
}
