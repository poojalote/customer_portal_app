import { useEffect, useState } from 'react'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import {
  OfflineScreen,
  PermissionScreen,
  type PermissionItem,
} from './components'
import { useNetworkStatus } from './hooks'
import { permissionService, type PermissionType } from './services/PermissionService'
import { logger } from './utils/logger'
import { config } from './config/config'
import './styles/App.css'

type AppState = 'loading' | 'offline' | 'permissions' | 'launching'

const PERMISSION_LABELS: Record<PermissionType, string> = {
  camera: 'Camera — for photo uploads',
  location: 'Location — for location-based features',
  storage: 'Storage — for downloading files',
  notifications: 'Notifications — for updates and alerts',
  microphone: 'Microphone — for audio uploads',
}

function getRequiredPermissions(): PermissionType[] {
  const required: PermissionType[] = []
  if (config.permissions.camera) required.push('camera')
  if (config.permissions.location) required.push('location')
  if (config.permissions.storage) required.push('storage')
  if (config.permissions.notification) required.push('notifications')
  if (config.permissions.microphone) required.push('microphone')
  return required
}

export function App() {
  const [appState, setAppState] = useState<AppState>('loading')
  const [permissionItems, setPermissionItems] = useState<PermissionItem[]>([])
  const [requesting, setRequesting] = useState(false)
  const networkStatus = useNetworkStatus()

  useEffect(() => {
    const initApp = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light })
        await StatusBar.setBackgroundColor({ color: '#ffffff' })
      } catch (error) {
        logger.error('Error initializing status bar', error)
      } finally {
        await SplashScreen.hide()
      }
    }

    initApp()
  }, [])

  useEffect(() => {
    if (appState !== 'loading') return
    if (!networkStatus.connected) {
      setAppState('offline')
      return
    }

    const checkPermissions = async () => {
      const required = getRequiredPermissions()
      const results: PermissionItem[] = []

      for (const type of required) {
        results.push({
          type,
          label: PERMISSION_LABELS[type],
          granted: await permissionService.checkPermission(type),
        })
      }

      setPermissionItems(results)

      if (results.every((item) => item.granted)) {
        setAppState('launching')
      } else {
        setAppState('permissions')
      }
    }

    checkPermissions()
  }, [appState, networkStatus.connected])

  useEffect(() => {
    if (appState === 'launching') {
      window.location.href = config.websiteUrl
    }
  }, [appState])

  useEffect(() => {
    if (!networkStatus.connected && appState !== 'offline' && appState !== 'launching') {
      setAppState('offline')
    }
  }, [networkStatus.connected, appState])

  const handleRequestPermissions = async () => {
    setRequesting(true)
    try {
      const required = getRequiredPermissions()
      const results: PermissionItem[] = []

      for (const type of required) {
        const alreadyGranted = await permissionService.checkPermission(type)
        const granted = alreadyGranted || (await permissionService.requestPermission(type))
        const item = { type, label: PERMISSION_LABELS[type], granted }
        results.push(item)
        setPermissionItems([...results])
      }

      if (results.every((item) => item.granted)) {
        setAppState('launching')
      }
    } finally {
      setRequesting(false)
    }
  }

  const handleOfflineRetry = () => {
    setAppState('loading')
  }

  if (appState === 'offline') {
    return <OfflineScreen onRetry={handleOfflineRetry} />
  }

  if (appState === 'permissions') {
    return (
      <PermissionScreen
        permissions={permissionItems}
        requesting={requesting}
        allGranted={permissionItems.every((item) => item.granted)}
        onRequest={handleRequestPermissions}
      />
    )
  }

  return <div className="app" />
}
