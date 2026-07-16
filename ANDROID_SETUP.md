# Android Setup Guide

This guide explains how to add custom native Android features to the WebView app.

## Directory Structure

After running `npx cap add android`, your Android project structure should look like:

```
android/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/                    # Add Kotlin files here
│   │   │   ├── res/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── assets/
│   │   └── test/
│   └── build.gradle
├── build.gradle
└── settings.gradle
```

## Step 1: Create Java Directory

Create the directory structure for Kotlin source files:

```bash
mkdir -p android/app/src/main/java/in/cpromptsolution/sales
```

## Step 2: Create CustomWebViewClient (MainActivity Enhancement)

Create `android/app/src/main/java/in/cpromptsolution/sales/MainActivity.kt`:

```kotlin
package in.cpromptsolution.sales

import android.os.Bundle
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Custom WebView configuration will be handled by Capacitor
        // For advanced customization, extend BridgeActivity and override
        // the loadApp() method to customize WebViewClient and WebChromeClient
    }
}
```

## Step 3: AndroidManifest.xml Configuration

Ensure your `android/app/src/main/AndroidManifest.xml` includes these permissions:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="in.cpromptsolution.sales">

    <!-- Required permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- Optional permissions - requested at runtime -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="false">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/AppTheme">
            
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- Deep links support -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data
                    android:scheme="https"
                    android:host="sales.cpromptsolution.in"
                    android:pathPrefix="/" />
            </intent-filter>
        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>

        <service
            android:name=".services.DownloadService"
            android:exported="false" />

    </application>

</manifest>
```

## Step 4: Configure Build Files

### app/build.gradle

Ensure you have:

```gradle
android {
    compileSdk 34
    
    defaultConfig {
        applicationId "in.cpromptsolution.sales"
        minSdk 26
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation "androidx.appcompat:appcompat:1.6.1"
    implementation "com.google.android.material:material:1.9.0"
    implementation "androidx.constraintlayout:constraintlayout:2.1.4"
}
```

## Step 5: Custom WebView Features

### File Upload Handler

To enable file picker for `<input type="file">` elements, create a custom `WebChromeClient`:

```kotlin
// In MainActivity.kt extension or separate file

override fun loadApp() {
    super.loadApp()
    
    // Get the WebView from bridge
    val webView = bridge?.webView
    webView?.webChromeClient = CustomWebChromeClient(this)
}
```

### Download Handler

Implement download notifications by setting a `DownloadListener`:

```kotlin
webView.setDownloadListener { url, userAgent, contentDisposition, mimetype, contentLength ->
    val request = DownloadManager.Request(Uri.parse(url))
    request.allowScanningByMediaScanner()
    request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
    request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, 
        URLUtil.guessFileName(url, contentDisposition, mimetype))
    
    val dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
    dm.enqueue(request)
}
```

### Network Monitoring

Monitor network status in `MainActivity`:

```kotlin
private fun setupNetworkMonitoring() {
    val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    
    val networkCallback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            // Reload WebView when network returns
            bridge?.webView?.reload()
        }
        
        override fun onLost(network: Network) {
            // Show offline screen (handled by React component)
        }
    }
    
    connectivityManager.registerNetworkCallback(
        NetworkRequest.Builder().build(),
        networkCallback
    )
}
```

## Step 6: WebView Configuration

Configure WebView settings in the bridge activity:

```kotlin
val webView = bridge?.webView
webView?.settings?.apply {
    javaScriptEnabled = true
    javaScriptCanOpenWindowsAutomatically = false
    
    // Storage settings
    domStorageEnabled = true
    databaseEnabled = true
    
    // Cache settings
    cacheMode = WebSettings.LOAD_DEFAULT
    setAppCacheEnabled(true)
    
    // Security settings
    mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
    
    // Zoom settings
    supportZoom = false
    builtInZoomControls = false
    
    // Other settings
    userAgentString = "CPromptSales/1.0"
    setGeolocationEnabled(true)
    allowFileAccess = true
    allowContentAccess = true
}
```

## Step 7: Permissions Handling

Implement runtime permission requests in `MainActivity`:

```kotlin
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

private fun requestPermission(permission: String) {
    if (ContextCompat.checkSelfPermission(this, permission)
        != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(this, arrayOf(permission), REQUEST_CODE)
    }
}

override fun onRequestPermissionsResult(
    requestCode: Int,
    permissions: Array<String>,
    grantResults: IntArray
) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    
    when (requestCode) {
        REQUEST_CODE -> {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted
            }
        }
    }
}
```

## Step 8: Build and Run

```bash
# Build the project
npm run build

# Sync with Android
npm run android:build

# Open in Android Studio
npm run cap:open

# Or build from command line
cd android
./gradlew assembleDebug  # Debug APK
./gradlew bundleRelease  # Release AAB
```

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check Android SDK version is 34+
2. Verify Gradle version compatibility
3. Run `./gradlew clean` before rebuilding
4. Check for conflicting dependencies

### WebView Issues

If WebView doesn't load:

1. Verify `capacitor.config.ts` has correct `server.url`
2. Check device has internet permission
3. Inspect logs: `adb logcat | grep chromium`
4. Test with `adb shell monkey -p in.cpromptsolution.sales -c android.intent.category.LAUNCHER 1`

### Permission Denied

If permissions aren't working:

1. Confirm they're declared in `AndroidManifest.xml`
2. For Android 6+, runtime permissions required
3. Test with: `adb shell am start -n in.cpromptsolution.sales/.MainActivity`

## Next Steps

1. Customize app icon in `res/mipmap/`
2. Update app strings in `res/values/strings.xml`
3. Create launcher shortcuts in `res/xml/shortcuts.xml`
4. Add app widget provider if needed
5. Configure Firebase for notifications (optional)

## References

- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Android WebView Guide](https://developer.android.com/guide/webapps/webview)
- [Material Design 3 for Android](https://m3.material.io/develop/android)
