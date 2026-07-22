export interface PermissionsConfig {
  camera: boolean
  location: boolean
  storage: boolean
  notification: boolean
  microphone: boolean
}

export interface AppConfig {
  websiteUrl: string
  allowedDomains: string[]
  timeoutMs: number
  appName: string
  packageName: string
  theme: 'light' | 'dark' | 'system'
  permissions: PermissionsConfig
  environment: 'development' | 'staging' | 'production'
  versionCheckUrl?: string
}

const getEnvVar = (key: string, defaultValue: string): string => {
  const envValue = (import.meta as any).env[key]
  return envValue || defaultValue
}

export const config: AppConfig = {
  websiteUrl:
    getEnvVar('VITE_WEBSITE_URL', 'https://customer.cpromptsolution.in'),
  allowedDomains:
    getEnvVar('VITE_ALLOWED_DOMAINS', '')
      .split(',')
      .filter(Boolean) || ['customer.cpromptsolution.in', 'cpromptsolution.in'],
  timeoutMs: parseInt(
    getEnvVar('VITE_TIMEOUT_MS', '30000'),
    10
  ),
  appName: 'CPrompt customer',
  packageName: 'in.cpromptsolution.customer',
  theme: 'system',
  permissions: {
    camera: true,
    location: true,
    storage: true,
    notification: true,
    microphone: false,
  },
  environment:
    (getEnvVar('VITE_ENV', 'production') as
      | 'development'
      | 'staging'
      | 'production') || 'production',
  versionCheckUrl:
    getEnvVar('VITE_VERSION_CHECK_URL', 'https://api.cpromptsolution.in/version'),
}
