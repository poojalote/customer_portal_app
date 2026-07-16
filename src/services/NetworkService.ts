import { Network } from '@capacitor/network'
import { logger } from '../utils/logger'
import type { NetworkStatus } from '../types'

type NetworkListener = (status: NetworkStatus) => void

class NetworkService {
  private listeners: Set<NetworkListener> = new Set()
  private currentStatus: NetworkStatus = {
    connected: true,
    connectionType: 'unknown',
  }
  private initialized = false

  async init(): Promise<void> {
    if (this.initialized) return

    try {
      const status = await Network.getStatus()
      this.currentStatus = {
        connected: status.connected,
        connectionType: (status.connectionType as
          | 'wifi'
          | 'cellular'
          | 'none'
          | 'unknown') || 'unknown',
      }

      Network.addListener('networkStatusChange', (status) => {
        this.currentStatus = {
          connected: status.connected,
          connectionType: (status.connectionType as
            | 'wifi'
            | 'cellular'
            | 'none'
            | 'unknown') || 'unknown',
        }
        this.notifyListeners()
        logger.info('Network status changed', this.currentStatus)
      })

      this.initialized = true
      logger.info('NetworkService initialized', this.currentStatus)
    } catch (error) {
      logger.error('Failed to initialize NetworkService', error)
    }
  }

  addListener(listener: NetworkListener): () => void {
    this.listeners.add(listener)
    listener(this.currentStatus)

    return () => {
      this.listeners.delete(listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentStatus)
      } catch (error) {
        logger.error('Error in network listener', error)
      }
    })
  }

  getStatus(): NetworkStatus {
    return { ...this.currentStatus }
  }

  isConnected(): boolean {
    return this.currentStatus.connected
  }
}

export const networkService = new NetworkService()
