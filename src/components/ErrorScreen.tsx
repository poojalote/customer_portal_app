import '../styles/ErrorScreen.css'

interface ErrorScreenProps {
  errorCode?: string
  errorMessage?: string
  onRetry: () => void
}

export function ErrorScreen({
  errorCode = 'Error',
  errorMessage = 'Something went wrong',
  onRetry,
}: ErrorScreenProps) {
  return (
    <div className="error-screen">
      <div className="error-content">
        <div className="error-illustration">
          <svg viewBox="0 0 200 200" className="error-icon">
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x="100"
              y="120"
              fontSize="60"
              textAnchor="middle"
              fill="currentColor"
            >
              !
            </text>
          </svg>
        </div>
        <h1 className="error-title">{errorCode}</h1>
        <p className="error-description">{errorMessage}</p>
        <button
          className="error-button"
          onClick={onRetry}
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
