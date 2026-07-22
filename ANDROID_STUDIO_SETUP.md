# Android Studio Setup Guide

## Issue You Encountered

**Problem**: Clicking the **Run (▶)** button opens "Edit Configurations" instead of running the app.

**Cause**: Android Studio's Gradle synchronization was incomplete, so it couldn't auto-detect the Run configuration.

**Status**: ✅ **FIXED** – Project regenerated with complete Gradle structure.

---

## What to Do Now (Follow These Steps)

### Step 1: Prepare the Project

```bash
cd c:\Users\naren\OneDrive\Documents\personal\ReactNative\WebViewApplication

# Build the React app
npm run build

# Sync with Android
npx cap sync android
```

### Step 2: Open Android Studio

```bash
npx cap open android
```

This opens the project in Android Studio.

### Step 3: Wait for Gradle Sync

When Android Studio opens:

1. **Look at the bottom of the screen** for the Gradle sync progress bar
2. **Wait for it to complete** (may take 1-2 minutes on first load)
3. You should see: `Gradle sync finished` or similar message

**⚠️ Important**: Do NOT click Run until Gradle sync completes.

### Step 4: If Gradle Sync Doesn't Start

Click: **File** → **Sync Now** (or press **Ctrl+Shift+A** and type "Sync Now")

### Step 5: After Gradle Sync Completes

1. Look for the green **Run (▶)** button in the top toolbar
2. Click it
3. Select your device/emulator from the popup
4. Click **OK**

The app should launch!

---

## If Run Configuration Still Doesn't Appear

### Manual Configuration (Fallback)

1. Click **Run** → **Edit Configurations** (or click the dropdown next to Run button)
2. Click the **+** button to add a new configuration
3. Select **Android App**
4. Fill in:
   ```
   Name: app
   Module: app
   Package name: in.cpromptsolution.customer
   Activity: .MainActivity
   ```
5. Click **OK**
6. Now click the green **Run** button

### Alternative: Run from Command Line

If Android Studio still has issues:

```bash
cd android

# Build debug APK
./gradlew assembleDebug

# Install on device
adb install -r app/build/outputs/apk/debug/app-debug.apk

# Or install and run
adb shell am start -n in.cpromptsolution.customer/.MainActivity
```

---

## Gradle Sync Troubleshooting

### Gradle Sync Fails with Error

**Error**: "SDK location not found"

**Fix**:
1. Click **File** → **Project Structure**
2. Click **SDK Location** on the left
3. Under "Android SDK Location", click **...** and select your Android SDK folder
   - Usually: `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`
4. Click **OK**
5. Sync again

**Error**: "Could not find com.android.tools.build:gradle:8.2.1"

**Fix**:
1. Click **File** → **Settings** (or **Android Studio** → **Preferences** on Mac)
2. Go to **Appearance & Behavior** → **System Settings** → **Android SDK**
3. Click **SDK Tools** tab
4. Check "Show Package Details" (bottom right)
5. Scroll down and find "Android Gradle Plugin" or "Gradle"
6. Make sure it's checked/installed
7. Click **OK**
8. Sync again

**Error**: "Gradle sync timeout"

**Fix**:
1. Increase Gradle heap size:
   - **File** → **Settings** → **Build, Execution, Deployment** → **Gradle**
   - Set "VM options" to: `-Xmx4096m`
2. Click **OK**
3. Click **File** → **Sync Now** again

### Gradle Sync Takes Too Long

**Normal**: First sync takes 1-3 minutes while it downloads dependencies.

**Speed up future syncs**:
1. **File** → **Settings** → **Build, Execution, Deployment** → **Gradle**
2. Check: "Gradle offline mode" (if dependencies cached)
3. Set "Gradle VM options": `-Xmx4096m` (use more RAM)

---

## Device/Emulator Setup

### If No Device Shows Up

**Connect Physical Device**:
1. Enable Developer Mode on phone:
   - Go to **Settings** → **About Phone**
   - Tap **Build Number** 7 times
   - Go back, open **Developer Options**
   - Enable **USB Debugging**
2. Plug in phone via USB
3. Click **File** → **Run** → **Run 'app'**
4. Select your phone from the list

**Create Emulator**:
1. In Android Studio, click **Tools** → **Device Manager**
2. Click **Create Device**
3. Select a phone model (e.g., Pixel 6)
4. Click **Next**
5. Select **Android 14** (or latest available)
6. Click **Next**
7. Click **Finish**
8. Click the green play button to start the emulator
9. Close the Device Manager dialog
10. Click **Run** → **Run 'app'** and select your emulator

---

## After the App Launches

### Testing Checklist

- [ ] App starts with splash screen
- [ ] Website loads in WebView
- [ ] Progress bar visible during load
- [ ] Website content displays (responsively)
- [ ] Touch interactions work
- [ ] Back button navigates in WebView
- [ ] Pinch-zoom is disabled
- [ ] Dark mode works (if you toggle device theme)

### If App Crashes

**Check Logcat**:
1. Click **View** → **Tool Windows** → **Logcat** (or click **Logcat** tab at bottom)
2. Filter by app name: `in.cpromptsolution.customer` (top right dropdown)
3. Look for red error messages
4. Scroll up to see the full stack trace

**Common Errors**:

| Error | Solution |
|-------|----------|
| `ERR_NAME_NOT_RESOLVED` | Website URL not reachable, check network, check URL in config.ts |
| `ERR_SSL_PROTOCOL_ERROR` | HTTPS/SSL issue, check certificate, try with different domain |
| `Accessing a cross-origin frame is disallowed` | Website has security headers, may need server-side configuration |
| `MainActivity not found` | Check MainActivity.java exists, rebuild project |
| `WebView initialization failed` | Restart emulator or device, try physical device if using emulator |

---

## Android Studio Key Shortcuts

| Shortcut | Action |
|----------|--------|
| `Shift+F9` | Run |
| `Ctrl+Shift+A` | Search action |
| `Ctrl+Shift+F` | Find in all files |
| `Ctrl+/` | Comment/uncomment |
| `Alt+Enter` | Show intention actions (quick fix) |
| `F8` | Step over (debugging) |
| `F9` | Resume program (debugging) |

---

## Build Variants

By default, you build **Debug** version:
- Has logging enabled
- Can be debugged
- Slower performance
- Used for development

To build **Release** version:

1. Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - Or **Build Bundle(s) / APK(s)** → **Build Bundle(s)** for Play Store
2. Wait for build to complete
3. Find APK in `android/app/build/outputs/apk/debug/`

---

## Debugging the App

### Enable Debugging in WebView

In `android/app/src/main/java/in/cpromptsolution/customer/MainActivity.java`:

```java
package in.cpromptsolution.customer;

import com.getcapacitor.BridgeActivity;
import android.webkit.WebView;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Enable WebView debugging
        WebView.setWebContentsDebuggingEnabled(true);
    }
}
```

Then, in Chrome on your PC:
1. Open `chrome://inspect`
2. Find your device
3. Click **inspect** on the WebView
4. Use Chrome DevTools to inspect/debug

### Logcat Filtering

In Logcat, filter by:
- App name: `in.cpromptsolution.customer`
- Level: `Info` or `Verbose`
- Tag: `chromium` (for WebView logs), `Capacitor` (for app logs)

---

## Common Setup Issues

### Issue: "Gradle sync never completes"

1. Click **File** → **Sync Now** to cancel
2. Click **File** → **Invalidate Caches** → **Invalidate and Restart**
3. Android Studio restarts and re-syncs

### Issue: "Cannot find SDK"

1. **File** → **Project Structure** → **SDK Location**
2. Set "Android SDK Location": `C:\Users\naren\AppData\Local\Android\Sdk`
3. Click **OK** → **Sync Now**

### Issue: "Plugins not found"

1. Delete `android/.gradle/` folder
2. **File** → **Sync Now**
3. Wait for re-download

### Issue: "Module 'app' not found"

1. Check `android/settings.gradle` contains: `include ':app'`
2. Check `android/app/` folder exists
3. **File** → **Invalidate Caches** → **Invalidate and Restart**

---

## Performance Tips

### Speed Up Gradle Sync

Add to `gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m
org.gradle.parallel=true
org.gradle.caching=true
```

### Speed Up Emulator

- Use **Google API** emulator (not Android TV or Wear)
- Use **x86_64** architecture (not ARM, unless on ARM Mac)
- Allocate more RAM to emulator: **Device Manager** → Emulator → **...** → **Advanced Settings** → **Memory**: 4 GB

### Speed Up Build

- Use emulator instead of physical device (faster initial sync)
- Disable ProGuard minification for debug builds
- Use **Build** → **Make Project** (incremental) instead of **Rebuild Project**

---

## Next: Customize the App

Once the app runs successfully:

1. **Change Website URL**: Edit `src/config/config.ts`
2. **Customize UI**: Modify components in `src/components/`
3. **Add Features**: Create services in `src/services/`
4. **Customize Theme**: Update colors in `src/styles/`
5. **Add Permissions**: Edit `src/config/config.ts` permissions

For detailed info, see:
- **QUICKSTART.md** – Quick reference
- **DEVELOPMENT.md** – Architecture & patterns
- **ANDROID_FIX.md** – Gradle troubleshooting

---

## Still Stuck?

1. Check **ANDROID_FIX.md** for Gradle issues
2. Check Logcat for error messages
3. Try: **File** → **Invalidate Caches** → **Invalidate and Restart**
4. Try: Deleting `android/.gradle/` folder and syncing again
5. Ensure Android SDK, Gradle, and JDK are all properly installed

---

**Status**: ✅ Ready to build! Follow the steps above and the app should run.

Good luck! 🚀
