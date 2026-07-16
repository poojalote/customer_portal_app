import { useEffect, useRef, useState } from 'react'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { ProgressBar, OfflineScreen, ErrorScreen } from './components'
import { useNetworkStatus, useBackButton } from './hooks'
import { logger } from './utils/logger'
import { config } from './config/config'
import './styles/App.css'

type AppState = 'loading' | 'online' | 'offline' | 'error'

export function App() {
  const [appState, setAppState] = useState<AppState>('loading')
  const [progress, setProgress] = useState(0)
  const [errorCode, setErrorCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const networkStatus = useNetworkStatus()
  const webviewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initApp = async () => {
      try {
        await StatusBar.setStyle({ style: Style.Light })
        await StatusBar.setBackgroundColor({ color: '#ffffff' })
        await SplashScreen.hide()
        logger.info('App initialized successfully')
      } catch (error) {
        logger.error('Error initializing app', error)
      }
    }

    initApp()
  }, [])

  useEffect(() => {
    if (networkStatus.connected) {
      if (appState === 'offline') {
        logger.info('Network restored, retrying')
        setAppState('loading')
      } else {
        setAppState('online')
      }
    } else {
      setAppState('offline')
    }
  }, [networkStatus.connected, appState])

  const handleWebViewMessage = (event: Event) => {
    const customEvent = event as CustomEvent
    const { type, data } = customEvent.detail || {}

    switch (type) {
      case 'progress':
        setProgress(data?.progress || 0)
        break
      case 'loaded':
        setProgress(100)
        setTimeout(() => setProgress(0), 500)
        setAppState('online')
        break
      case 'error':
        setErrorCode(data?.code || 'Error')
        setErrorMessage(
          data?.message || 'Failed to load page'
        )
        setAppState('error')
        break
      default:
        break
    }
  }

  const handleRetry = () => {
    if (webviewRef.current && appState === 'offline') {
      setAppState('loading')
    } else if (webviewRef.current && appState === 'error') {
      setAppState('loading')
      window.location.reload()
    }
  }

  useBackButton(() => {
    const webView = webviewRef.current
    if (webView && (webView as any).canGoBack?.()) {
      (webView as any).goBack()
      return true
    }
    return false
  })

  useEffect(() => {
    window.addEventListener('message', handleWebViewMessage)
    return () => {
      window.removeEventListener(
        'message',
        handleWebViewMessage
      )
    }
  }, [appState])

  return (
    <div className="app">
      <ProgressBar
        progress={progress}
        visible={appState === 'loading'}
      />

      {appState === 'offline' && (
        <OfflineScreen onRetry={handleRetry} />
      )}

      {appState === 'error' && (
        <ErrorScreen
          errorCode={errorCode}
          errorMessage={errorMessage}
          onRetry={handleRetry}
        />
      )}

      {(appState === 'online' || appState === 'loading') && (
        <div
          ref={webviewRef}
          className="webview-container"
          style={{
            display:
              appState === 'loading'
                ? 'none'
                : 'block',
          }}
        />
      )}
    </div>
  )
}
