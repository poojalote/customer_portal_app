import '../styles/ProgressBar.css'

interface ProgressBarProps {
  progress: number
  visible: boolean
}

export function ProgressBar({ progress, visible }: ProgressBarProps) {
  if (!visible) return null

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  )
}
