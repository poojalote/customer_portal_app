import { Camera } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'
import { Filesystem } from '@capacitor/filesystem'
import { PushNotifications } from '@capacitor/push-notifications'
import { logger } from '../utils/logger'
import { PERMISSION_REQUEST_TIMEOUT } from '../utils/constants'

export type PermissionType =
  | 'camera'
  | 'location'
  | 'storage'
  | 'microphone'
  | 'notifications'

class PermissionService {
  private requestedPermissions: Set<PermissionType> = new Set()

  async requestPermission(type: PermissionType): Promise<boolean> {
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
    this.requestedPermissions.add(type)

    switch (type) {
      case 'camera':
        return this.requestCameraPermission()
      case 'location':
        return this.requestLocationPermission()
      case 'storage':
        return this.requestStoragePermission()
      case 'microphone':
        return this.requestMicrophonePermission()
      case 'notifications':
        return this.requestNotificationPermission()
      default:
        return false
    }
  }

  private async requestCameraPermission(): Promise<boolean> {
    const status = await Camera.requestPermissions({ permissions: ['camera'] })
    return status.camera === 'granted' || status.camera === 'limited'
  }

  private async requestLocationPermission(): Promise<boolean> {
    const status = await Geolocation.requestPermissions()
    return status.location === 'granted' || status.coarseLocation === 'granted'
  }

  private async requestStoragePermission(): Promise<boolean> {
    // Scoped storage (Android 10+) needs no runtime grant for app-private
    // writes; the Filesystem plugin only prompts on legacy Android versions.
    const status = await Filesystem.requestPermissions()
    return status.publicStorage === 'granted'
  }

  private async requestMicrophonePermission(): Promise<boolean> {
    const status = await Camera.requestPermissions({ permissions: ['photos'] })
    return status.photos === 'granted' || status.photos === 'limited'
  }

  private async requestNotificationPermission(): Promise<boolean> {
    const status = await PushNotifications.requestPermissions()
    return status.receive === 'granted'
  }

  async checkPermission(type: PermissionType): Promise<boolean> {
    try {
      switch (type) {
        case 'camera': {
          const status = await Camera.checkPermissions()
          return status.camera === 'granted' || status.camera === 'limited'
        }
        case 'location': {
          const status = await Geolocation.checkPermissions()
          return status.location === 'granted' || status.coarseLocation === 'granted'
        }
        case 'storage': {
          const status = await Filesystem.checkPermissions()
          return status.publicStorage === 'granted'
        }
        case 'notifications': {
          const status = await PushNotifications.checkPermissions()
          return status.receive === 'granted'
        }
        default:
          return false
      }
    } catch (error) {
      logger.error(`Error checking ${type} permission`, error)
      return false
    }
  }

  hasRequestedPermission(type: PermissionType): boolean {
    return this.requestedPermissions.has(type)
  }
}

export const permissionService = new PermissionService()
