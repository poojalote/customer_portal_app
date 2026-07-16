# Development Guide

This guide provides detailed information for developers working on the CPrompt Sales WebView app.

## Project Architecture

### Directory Organization

```
src/
├── components/        # React UI components
├── pages/             # Page-level components (placeholder)
├── services/          # Business logic services
├── plugins/           # Capacitor plugin wrappers
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── config/            # Configuration management
├── types/             # TypeScript type definitions
├── styles/            # CSS stylesheets
├── assets/            # Images, icons, SVGs
├── App.tsx            # Root component
└── main.tsx           # React entry point
```

### Design Patterns

#### Clean Architecture

The app follows clean architecture principles:

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  (Components, Hooks, UI State)      │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│     Domain Layer                    │
│  (Business Logic, Services)         │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│     Data Layer                      │
│  (Plugins, API Calls)               │
└─────────────────────────────────────┘
```

**Benefits:**
- Easy to test (mock services)
- Decoupled components
- Reusable business logic
- Clear separation of concerns

#### Dependency Injection

Services are injected via imports, not instantiated in components:

```typescript
// ✓ Good
import { networkService } from '../services'
function MyComponent() {
  const status = useNetworkStatus() // Uses injected service
}

// ✗ Bad
function MyComponent() {
  const service = new NetworkService() // Tightly coupled
}
```

#### React Hooks Pattern

Custom hooks encapsulate logic:

```typescript
// Hook: useNetworkStatus.ts
export function useNetworkStatus() {
  const [status, setStatus] = useState(...)
  useEffect(() => {
    const unsubscribe = networkService.addListener(setStatus)
    return () => unsubscribe()
  }, [])
  return status
}

// Component: App.tsx
function App() {
  const networkStatus = useNetworkStatus() // Clean API
}
```

## Adding Features

### Adding a New Service

1. **Create service file** (`src/services/YourService.ts`):

```typescript
import { logger } from '../utils/logger'

type YourListener = (data: YourData) => void

class YourService {
  private listeners: Set<YourListener> = new Set()

  addListener(listener: YourListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners(data: YourData): void {
    this.listeners.forEach((listener) => {
      try {
        listener(data)
      } catch (error) {
        logger.error('Error in listener', error)
      }
    })
  }

  async doSomething(): Promise<void> {
    try {
      // Your logic
      this.notifyListeners(result)
    } catch (error) {
      logger.error('Error doing something', error)
      throw error
    }
  }
}

export const yourService = new YourService()
```

2. **Export from services/index.ts**:

```typescript
export { yourService } from './YourService'
```

3. **Create hook** (`src/hooks/useYourService.ts`):

```typescript
import { useState, useEffect } from 'react'
import type { YourData } from '../types'
import { yourService } from '../services'

export function useYourService() {
  const [data, setData] = useState<YourData | null>(null)

  useEffect(() => {
    const unsubscribe = yourService.addListener(setData)
    return () => unsubscribe()
  }, [])

  return data
}
```

4. **Use in component**:

```typescript
import { useYourService } from '../hooks'

function MyComponent() {
  const data = useYourService()
  return <div>{data ? 'Data loaded' : 'Loading'}</div>
}
```

### Adding a New Component

1. **Create component** (`src/components/YourComponent.tsx`):

```typescript
import '../styles/YourComponent.css'

interface YourComponentProps {
  title: string
  onAction?: () => void
}

export function YourComponent({ title, onAction }: YourComponentProps) {
  return (
    <div className="your-component">
      <h2>{title}</h2>
      {onAction && <button onClick={onAction}>Action</button>}
    </div>
  )
}
```

2. **Create styles** (`src/styles/YourComponent.css`):

```css
.your-component {
  padding: 16px;
  border-radius: 8px;
  background: #f5f5f5;
}

.your-component h2 {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .your-component {
    background: #222222;
  }
}
```

3. **Export from components/index.ts**:

```typescript
export { YourComponent } from './YourComponent'
```

4. **Use in App**:

```typescript
import { YourComponent } from './components'

function App() {
  return <YourComponent title="Test" />
}
```

### Adding a Native Bridge Method

1. **Add method to service**:

```typescript
// services/UpdateCheckerService.ts
async checkForUpdate(): Promise<boolean> {
  // Implementation
}
```

2. **Export from hooks** (create hook wrapper if needed):

```typescript
// hooks/useAppUpdate.ts
import { updateCheckerService } from '../services'

export async function checkForUpdate() {
  return updateCheckerService.checkForUpdate()
}
```

3. **Call from website** (via JavaScript):

```javascript
// In website code loaded in WebView
window.CapacitorApp.checkForUpdate?.()
```

## Testing Patterns

### Testing Services

```typescript
// services/__tests__/NetworkService.test.ts
describe('NetworkService', () => {
  it('should notify listeners on network change', (done) => {
    const mockListener = jest.fn()
    const unsubscribe = networkService.addListener(mockListener)

    // Simulate network change
    // Assert mockListener was called
    expect(mockListener).toHaveBeenCalled()

    unsubscribe()
    done()
  })
})
```

### Testing Hooks

```typescript
// hooks/__tests__/useNetworkStatus.test.tsx
import { renderHook } from '@testing-library/react'
import { useNetworkStatus } from '../useNetworkStatus'

describe('useNetworkStatus', () => {
  it('should return initial network status', () => {
    const { result } = renderHook(() => useNetworkStatus())
    expect(result.current.connected).toBe(true)
  })
})
```

### Testing Components

```typescript
// components/__tests__/OfflineScreen.test.tsx
import { render, screen } from '@testing-library/react'
import { OfflineScreen } from '../OfflineScreen'

describe('OfflineScreen', () => {
  it('should render offline message', () => {
    render(<OfflineScreen onRetry={() => {}} />)
    expect(screen.getByText('No Internet Connection')).toBeInTheDocument()
  })

  it('should call onRetry when button clicked', () => {
    const handleRetry = jest.fn()
    render(<OfflineScreen onRetry={handleRetry} />)
    
    const button = screen.getByRole('button', { name: /Retry/i })
    fireEvent.click(button)
    
    expect(handleRetry).toHaveBeenCalled()
  })
})
```

## Performance Optimization

### Code Splitting

```typescript
// Lazy load components
import { lazy, Suspense } from 'react'

const SettingsScreen = lazy(() => import('./pages/SettingsScreen'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsScreen />
    </Suspense>
  )
}
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

// Prevent unnecessary re-renders
const ProgressBar = memo(function ProgressBar({ progress, visible }) {
  return visible ? <div style={{ width: `${progress}%` }} /> : null
})

function App() {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return expensiveOperation(data)
  }, [data])

  // Memoize callbacks
  const handleClick = useCallback(() => {
    // handler
  }, [])
}
```

### Bundle Analysis

```bash
# Build with analysis
npm run build

# Check bundle size
ls -lh dist/assets/*.js

# Analyze imports
npx vite-plugin-visualizer
```

## Debugging

### Logging

```typescript
import { logger } from '@utils/logger'

// In development
logger.debug('Debug message', { data })

// In production
logger.info('Important event', { metadata })
logger.error('Error occurred', error)
```

### React DevTools

```bash
# Install React DevTools browser extension
# Then debug components in browser console
```

### Android Debugging

```bash
# Connect device
adb devices

# View logs
adb logcat | grep chromium

# Open DevTools in WebView
# (Enable in build configuration)
adb shell setprop debug.http.enable true

# Kill app
adb shell am force-stop in.cpromptsolution.sales

# Restart app
adb shell am start -n in.cpromptsolution.sales/.MainActivity
```

## Code Quality

### ESLint

```bash
# Check for issues
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Prettier

```bash
# Format code
npm run format

# Check if formatted
npm run format:check
```

### TypeScript

```bash
# Type checking
npm run build  # Includes tsc check
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature

# Create pull request
# Review and merge
```

### Commit Message Convention

```
feat: add new feature
fix: fix a bug
docs: update documentation
style: format code
refactor: refactor code
perf: improve performance
test: add tests
chore: update dependencies
```

## Deployment

### Building for Release

```bash
# Build optimized bundle
npm run build

# Sync with Android
npm run android:build

# Build release AAB
cd android
./gradlew bundleRelease

# Build release APK
./gradlew assembleRelease

# AAB location: app/build/outputs/bundle/release/app-release.aab
# APK location: app/build/outputs/apk/release/app-release.apk
```

### Play Store Deployment

1. Sign app with keystore (or let Play Console handle it)
2. Upload AAB to Play Console
3. Fill in app details:
   - Description
   - Screenshots (5 phone, 1 tablet)
   - Privacy policy
   - Content rating
4. Set pricing and distribution
5. Review policies
6. Release to production (or beta/alpha first)

### Version Management

Update in multiple places:

1. **TypeScript config** (`package.json`):
```json
{
  "version": "1.0.1"
}
```

2. **Android** (`android/app/build.gradle`):
```gradle
defaultConfig {
  versionCode 2
  versionName "1.0.1"
}
```

3. **Capacitor** (`capacitor.config.ts`):
```typescript
// No version field, uses package.json
```

## Common Issues & Solutions

### WebView Not Reloading on Network

**Problem**: Website doesn't reload when network returns
**Solution**: 
- Check NetworkService is initialized
- Verify `onPause` doesn't destroy WebView
- Ensure `webView.reload()` is called

### Form Data Lost on Rotation

**Problem**: Form data disappears on screen rotation
**Solution**:
- Add to AndroidManifest.xml: `android:configChanges="orientation|screenSize"`
- Implement `onSaveInstanceState`

### Permissions Not Requested

**Problem**: Permission dialog never appears
**Solution**:
- Verify permission in AndroidManifest.xml
- Check it's requested at runtime
- Ensure device is API 23+

### Large Bundle Size

**Problem**: App size is too large
**Solution**:
- Enable code minification in build
- Use SplitAPKs for distribution
- Remove unused dependencies
- Compress images

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Capacitor Documentation](https://capacitorjs.com)
- [Android Developer Guide](https://developer.android.com)
- [MDN Web Docs](https://developer.mozilla.org)

## Support

For questions or issues:
1. Check documentation first
2. Search existing issues
3. Create detailed issue report
4. Contact development team
