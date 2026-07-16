import '../styles/OfflineScreen.css'

interface OfflineScreenProps {
  onRetry: () => void
}

export function OfflineScreen({ onRetry }: OfflineScreenProps) {
  return (
    <div className="offline-screen">
      <div className="offline-content">
        <div className="offline-illustration">
          <svg viewBox="0 0 200 200" className="offline-icon">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
            <line
              x1="50"
              y1="50"
              x2="150"
              y2="150"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="50"
              x2="50"
              y2="150"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h1 className="offline-title">No Internet Connection</h1>
        <p className="offline-description">
          Please check your internet connection and try again.
        </p>
        <button
          className="offline-button"
          onClick={onRetry}
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
