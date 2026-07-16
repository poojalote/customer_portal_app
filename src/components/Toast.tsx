import { useState, useEffect } from 'react'
import '../styles/Toast.css'

interface ToastProps {
  message: string
  duration?: number
  type?: 'info' | 'error' | 'warning' | 'success'
}

export function Toast({
  message,
  duration = 3000,
  type = 'info',
}: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <div className={`toast toast--${type}`} role="status">
      {message}
    </div>
  )
}
