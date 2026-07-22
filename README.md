# CPrompt customer - WebView Container App

A production-ready native Android app that wraps the CPrompt customer website (`https://customer.cpromptsolution.in`) in a native WebView container, providing native mobile capabilities while maintaining the responsiveness of the existing web application.

## Features

### Core Capabilities
- **Native WebView Container** – Loads responsive website inside a native Android shell
- **Offline Support** – Detects network loss and shows a native offline screen; auto-reloads when connection restored
- **Smart Navigation** – Back button behavior: in-page navigation when history exists, double-back-to-exit at root
- **Error Handling** – Custom error screens for SSL/DNS/timeout/server errors (never default Android errors)
- **Session Persistence** – Preserves form data, scroll position, and page state when app goes to background

### Mobile Features
- **Camera Upload** – Native photo/gallery chooser for file inputs
- **File Upload** – Support for PDF, Word, Excel, images, videos with multiple selection
- **Downloads** – Auto-save to Downloads folder with progress notifications
- **Geolocation** – HTML5 geolocation with native permission handling
- **Deep Links** – Open app links directly in app, external links in browser
- **Notifications** – Download progress and local notifications

### UI/UX
- **Material Design 3** – Modern splash, offline, and error screens
- **Progress Bar** – Top progress indicator during page load
- **Responsive Design** – Full-screen WebView adapts to device orientation
- **Dark Mode Support** – Theme-aware UI components

## Tech Stack

- **Frontend**: React 18 + TypeScript 5 + Vite
- **Mobile Framework**: Capacitor 6
- **Platform**: Android (Kotlin/Java)
- **UI Framework**: Material Design 3
- **Build Tools**: ESLint, Prettier

## Project Structure

```
WebViewApplication/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Toast.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── OfflineScreen.tsx
│   │   └── ErrorScreen.tsx
│   ├── pages/                # Screen pages (placeholder)
│   ├── services/             # Business logic services
│   │   ├── NetworkService.ts
│   │   ├── PermissionService.ts
│   │   └── UpdateCheckerService.ts
│   ├── plugins/              # Capacitor plugin wrappers
│   ├── hooks/                # React hooks
│   │   ├── useNetworkStatus.ts
│   │   └── useBackButton.ts
│   ├── utils/                # Utilities
│   │   ├── logger.ts
│   │   ├── url-utils.ts
│   │   └── constants.ts
│   ├── config/               # App configuration
│   │   └── config.ts
│   ├── types/                # TypeScript types
│   ├── styles/               # CSS stylesheets
│   ├── assets/               # Icons, illustrations
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
├── android/                  # Native Android project
│   └── app/src/main/java/    # Kotlin source code (add custom WebView handlers)
├── index.html                # HTML template
├── capacitor.config.ts       # Capacitor configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
└── README.md                 # This file
```

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- Android SDK (API 24+)
- Gradle
- JDK 11+

### Installation

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Sync with Android
npm run android:build

# Open Android Studio for further development
npm run cap:open
```

## Configuration

Edit `src/config/config.ts` to configure:

```typescript
export interface AppConfig {
  websiteUrl: string           // Website to load
  allowedDomains: string[]     // Domains to load in WebView
  timeoutMs: number            // Request timeout
  appName: string              // App name
  packageName: string          // Android package ID
  theme: 'light' | 'dark' | 'system'
  permissions: PermissionsConfig
  environment: 'development' | 'staging' | 'production'
}
```

### Environment Variables

Create a `.env` file to override defaults:

```env
VITE_WEBSITE_URL=https://customer.cpromptsolution.in
VITE_ALLOWED_DOMAINS=customer.cpromptsolution.in,cpromptsolution.in
VITE_TIMEOUT_MS=30000
VITE_ENV=production
VITE_VERSION_CHECK_URL=https://api.cpromptsolution.in/version
```

## Development

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm run android:build
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Architecture

### Clean Architecture Pattern

The app follows clean architecture with distinct layers:

1. **Presentation Layer** (`pages/`, `components/`)
   - React components rendering UI
   - State management via hooks
   - No business logic

2. **Domain Layer** (`services/`)
   - Pure TypeScript services
   - Business logic isolated from UI
   - No React dependencies

3. **Data Layer** (`plugins/`)
   - Thin wrappers around Capacitor plugins
   - Implements dependency inversion
   - Testable plugin abstractions

### Service Structure

- **NetworkService** – Monitors connection status, notifies listeners
- **PermissionService** – Manages runtime permission requests
- **UpdateCheckerService** – Checks for app updates
- **LoggingService** – Handles app-wide logging

### Component Hierarchy

```
App
├── ProgressBar (during load)
├── OfflineScreen (when offline)
├── ErrorScreen (on error)
└── WebView (main content)
```

## Native Features Implementation

### WebView Setup (MainActivity.kt)

```kotlin
val webView = WebView(this)
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    databaseEnabled = true
    mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
    setAppCacheEnabled(false)
    setGeolocationEnabled(true)
}
```

### File Upload Handler

Override `WebChromeClient.onShowFileChooser()` to show native chooser for:
- Camera (photo capture)
- Gallery (image/video selection)
- File picker (document selection)

### Download Handler

Implement `DownloadListener` to:
- Intercept download URLs
- Request storage permission if needed
- Use Android DownloadManager for progress tracking
- Save to Downloads folder
- Send completion notifications

### Permission Management

Request permissions on-demand:
- **Camera** – When file chooser triggered
- **Location** – When geolocation requested
- **Storage** – For downloads (API < 29)
- **Notifications** – For download progress (API 13+)

### Network Monitoring

```kotlin
ConnectivityManager.registerNetworkCallback()
```

On disconnect: Hide WebView, show offline screen
On reconnect: Reload website

## Extending the App

### Adding a New Service

1. Create `src/services/YourService.ts`
2. Implement service class with public methods
3. Export singleton instance
4. Use in hooks/components via dependency injection

### Adding a Native Feature

1. Create Kotlin file in `android/app/src/main/java/`
2. Implement as Capacitor plugin if possible
3. Fallback to native handling in MainActivity/WebViewClient
4. Export JS bridge if calling from website

### Adding a Component

1. Create `src/components/YourComponent.tsx`
2. Add corresponding CSS in `src/styles/YourComponent.css`
3. Export from `src/components/index.ts`
4. Use in App.tsx or other components

## Deployment

### Build APK/AAB

```bash
# Use Android Studio or:
cd android
./gradlew build
# APK: app/build/outputs/apk/
# AAB: app/build/outputs/bundle/
```

### Play Store Release

1. Build release AAB
2. Sign with keystore
3. Upload to Google Play Console
4. Set app manifest details
5. Create release notes
6. Publish to production

## Troubleshooting

### WebView Not Loading

Check:
- `capacitor.config.ts` has correct `server.url`
- Network connectivity
- Device has internet permission
- Logs in Android Studio Logcat

### Permissions Not Requested

- Verify `config.ts` has permission enabled
- Check AndroidManifest.xml has permission declared
- Ensure device is API 23+ for runtime permissions

### Downloads Not Working

- Confirm WRITE_EXTERNAL_STORAGE permission granted
- Check Downloads folder exists
- Verify DownloadManager is working (Android Settings > Downloads)

### Session Not Persisting

- Ensure WebView isn't destroyed on onPause()
- Check `android:configChanges` in manifest
- Verify cookie settings are enabled

## Performance Tips

- Minimize initial bundle size (currently ~165 KB gzipped)
- Use SplashScreen while WebView loads
- Enable aggressive caching in WebView settings
- Lazy load heavy resources on website side
- Monitor memory usage with Android Profiler

## Security Considerations

- HTTPS only (cleartext disabled)
- No mixed content allowed
- Validate all URLs before loading
- Clear cache/cookies on app uninstall
- Never log sensitive data in production
- Use certificate pinning for API calls

## License

Proprietary – CPrompt Solution

## Support

For issues or feature requests, contact the development team.
