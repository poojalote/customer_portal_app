import { App } from '@capacitor/app'
import { logger } from '../utils/logger'
import { config } from '../config/config'

interface VersionInfo {
  version: string
  buildNumber: number
}

class UpdateCheckerService {
  async checkForUpdate(): Promise<boolean> {
    try {
      if (!config.versionCheckUrl) {
        logger.debug('No version check URL configured')
        return false
      }

      const currentInfo = await App.getInfo()
      const response = await fetch(config.versionCheckUrl)

      if (!response.ok) {
        logger.warn('Version check API returned error', response.status)
        return false
      }

      const remoteVersion: VersionInfo = await response.json()
      const currentVersion = currentInfo.version
      const buildNumber = parseInt(currentInfo.build, 10)

      const updateAvailable =
        this.compareVersions(currentVersion, remoteVersion.version) <
          0 || buildNumber < remoteVersion.buildNumber

      logger.info('Update check result', {
        currentVersion,
        remoteVersion: remoteVersion.version,
        updateAvailable,
      })

      return updateAvailable
    } catch (error) {
      logger.error('Error checking for updates', error)
      return false
    }
  }

  private compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map((x) => parseInt(x, 10))
    const parts2 = v2.split('.').map((x) => parseInt(x, 10))

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const p1 = parts1[i] || 0
      const p2 = parts2[i] || 0

      if (p1 > p2) return 1
      if (p1 < p2) return -1
    }

    return 0
  }
}

export const updateCheckerService = new UpdateCheckerService()
