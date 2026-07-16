import '../styles/PermissionScreen.css'

export interface PermissionItem {
  type: string
  label: string
  granted: boolean
}

interface PermissionScreenProps {
  permissions: PermissionItem[]
  requesting: boolean
  allGranted: boolean
  onRequest: () => void
}

export function PermissionScreen({
  permissions,
  requesting,
  allGranted,
  onRequest,
}: PermissionScreenProps) {
  return (
    <div className="permission-screen">
      <div className="permission-card">
        <svg
          className="permission-icon"
          viewBox="0 0 24 24"
          width="56"
          height="56"
        >
          <path
            fill="currentColor"
            d="M12 1a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v3h6V6a3 3 0 0 0-3-3z"
          />
        </svg>

        <h1>Permissions required</h1>
        <p className="permission-subtitle">
          This app needs the following permissions to work properly.
        </p>

        <ul className="permission-list">
          {permissions.map((permission) => (
            <li key={permission.type} className="permission-item">
              <span
                className={`permission-status ${permission.granted ? 'granted' : 'pending'}`}
              >
                {permission.granted ? '✓' : '!'}
              </span>
              <span>{permission.label}</span>
            </li>
          ))}
        </ul>

        {!allGranted && (
          <button
            className="permission-button"
            onClick={onRequest}
            disabled={requesting}
          >
            {requesting ? 'Requesting…' : 'Grant Permissions'}
          </button>
        )}
      </div>
    </div>
  )
}
