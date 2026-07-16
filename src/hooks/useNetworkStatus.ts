import { useState, useEffect } from 'react'
import type { NetworkStatus } from '../types'
import { networkService } from '../services'

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus>({
    connected: true,
    connectionType: 'unknown',
  })

  useEffect(() => {
    networkService.init()

    const unsubscribe = networkService.addListener((newStatus) => {
      setStatus(newStatus)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return status
}
