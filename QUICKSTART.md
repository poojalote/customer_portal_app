# Quick Start Guide

Get the app running in 5 minutes.

## Prerequisites

- Node.js 16+ (`node --version`)
- npm (`npm --version`)
- Android SDK & Gradle (for Android development)

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the App

```bash
npm run build
```

### 3. Sync with Android

```bash
npx cap sync android
```

### 4. Open in Android Studio

```bash
npx cap open android
```

Then:
1. Click "Sync Now" if prompted
2. Click "Run" (green play button) to build and install
3. Select your device/emulator
4. App launches automatically

## Development Workflow

### During Development

```bash
# Terminal 1: Watch files and rebuild
npm run dev

# Terminal 2: Sync and rebuild Android
npm run build && npx cap sync android
```

Then in Android Studio, press `Run` to install latest build.

### Testing on Device

```bash
# Build and sync
npm run android:build

# Install on device
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or via Android Studio UI
```

## Configuration

### Change Website URL

Edit `src/config/config.ts`:

```typescript
export const config: AppConfig = {
  websiteUrl: 'https://your-website.com', // ← Change here
  // ...
}
```

Or via environment variable:

```bash
VITE_WEBSITE_URL=https://your-website.com npm run build
```

### Add Allowed Domain

```typescript
allowedDomains: ['your-website.com', 'api.your-website.com'],
```

### Configure Permissions

In `src/config/config.ts`:

```typescript
permissions: {
  camera: true,      // Enable/disable camera
  location: true,    // Enable/disable geolocation
  storage: true,     // Enable/disable file access
  notification: true, // Enable/disable notifications
  microphone: false, // Enable/disable microphone
}
```

## Common Tasks

### Add a New React Component

```typescript
// src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Hello!</div>
}

// src/components/index.ts
export { MyComponent } from './MyComponent'

// Use in App.tsx
import { MyComponent } from './components'
```

### Create a New Service

```typescript
// src/services/MyService.ts
class MyService {
  async doSomething() {
    return 'result'
  }
}
export const myService = new MyService()

// Use in hook
import { myService } from '../services'
const result = await myService.doSomething()
```

### Check Build Size

```bash
npm run build
ls -lh dist/assets/*.js
```

### Lint & Format Code

```bash
npm run lint      # Check for issues
npm run format    # Auto-fix formatting
```

## Troubleshooting

### App Won't Load

```bash
# Check network connectivity
adb shell am start -n in.cpromptsolution.customer/.MainActivity

# View logs
adb logcat | grep chromium

# Verify website URL is correct in config.ts
```

### Build Fails

```bash
# Clean everything
rm -rf node_modules dist android/app/build
npm install
npm run build
```

### Permissions Not Working

1. Check `src/config/config.ts` has permission enabled
2. Verify `android/app/src/main/AndroidManifest.xml` has permission declared
3. Test on device running Android 6+ (API 23+)

## Next Steps

1. Read [README.md](./README.md) for full feature list
2. Follow [DEVELOPMENT.md](./DEVELOPMENT.md) for architecture
3. Check [ANDROID_SETUP.md](./ANDROID_SETUP.md) for native customization
4. Review [capacitor.config.ts](./capacitor.config.ts) for Capacitor settings

## Useful Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Check code quality
npm run format           # Auto-format code
npm run cap:sync         # Sync with Android
npm run cap:open         # Open Android Studio
npm run android:build    # Build Android APK/AAB
```

## Getting Help

- Check README.md for feature documentation
- Review DEVELOPMENT.md for architecture patterns
- Look at existing components for examples
- Check console logs in browser DevTools
- Use Android Studio's Logcat for native errors

## What's Included

✅ React 18 + TypeScript + Vite
✅ Capacitor 6 for Android
✅ Network monitoring
✅ Offline detection & recovery
✅ Error handling
✅ Permission management
✅ Progress indicators
✅ Dark mode support
✅ ESLint + Prettier configured
✅ Material Design 3 UI

## Deploy to Play Store

1. Build release AAB:
```bash
cd android
./gradlew bundleRelease
```

2. Sign app (usually Play Console handles this)

3. Upload `app/build/outputs/bundle/release/app-release.aab`

4. Fill in app details and publish

---

**Happy coding! 🚀**
