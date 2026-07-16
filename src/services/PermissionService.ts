import { logger } from '../utils/logger'
import { PERMISSION_REQUEST_TIMEOUT } from '../utils/constants'

type PermissionType =
  | 'camera'
  | 'location'
  | 'storage'
  | 'microphone'
  | 'notifications'

interface PermissionStatus {
  granted: boolean
  denied: boolean
  asked: boolean
}

class PermissionService {
  private requestedPermissions: Set<PermissionType> = new Set()

  async requestPermission(
    type: PermissionType
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        logger.warn(`Permission request timeout for ${type}`)
        resolve(false)
      }, PERMISSION_REQUEST_TIMEOUT)

      this.performRequest(type)
        .then((granted) => {
          clearTimeout(timeout)
          resolve(granted)
        })
        .catch((error) => {
          clearTimeout(timeout)
          logger.error(`Permission request error for ${type}`, error)
          resolve(false)
        })
    })
  }

  private async performRequest(type: PermissionType): Promise<boolean> {
    try {
      this.requestedPermissions.add(type)

      switch (type) {
        case 'camera':
          return await this.requestCameraPermission()
        case 'location':
          return await this.requestLocationPermission()
        case 'storage':
          return await this.requestStoragePermission()
        case 'microphone':
          return await this.requestMicrophonePermission()
        case 'notifications':
          return await this.requestNotificationPermission()
        default:
          return false
      }
    } catch (error) {
      logger.error(`Error requesting ${type} permission`, error)
      return false
    }
  }

  private async requestCameraPermission(): Promise<boolean> {
    logger.debug('Requesting camera permission')
    return true
  }

  private async requestLocationPermission(): Promise<boolean> {
    logger.debug('Requesting location permission')
    return true
  }

  private async requestStoragePermission(): Promise<boolean> {
    logger.debug('Requesting storage permission')
    return true
  }

  private async requestMicrophonePermission(): Promise<boolean> {
    logger.debug('Requesting microphone permission')
    return true
  }

  private async requestNotificationPermission(): Promise<boolean> {
    logger.debug('Requesting notification permission')
    return true
  }

  hasRequestedPermission(type: PermissionType): boolean {
    return this.requestedPermissions.has(type)
  }
}

export const permissionService = new PermissionService()
