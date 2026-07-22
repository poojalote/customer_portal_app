# Quick Run Guide – Android Studio

## What's Configured

✅ **Module**: `app` (auto-detected from settings.gradle)
✅ **Activity**: MainActivity (in package in.cpromptsolution.customer)
✅ **Intent Filter**: LAUNCHER (in AndroidManifest.xml)
✅ **Build Type**: Debug
✅ **APK**: app-debug.apk

---

## How to Run Your App

### Step 1: Open Project
```bash
npx cap open android
```
Android Studio launches with project loaded.

### Step 2: Wait for Gradle Sync
- Bottom right shows Gradle sync progress
- Wait until you see ✅ checkmark
- Should take 1-3 minutes first time

### Step 3: Click Run Button
- **Top toolbar**: Find green play button (▶)
- **Or press**: Shift + F10

### Step 4: Select Device
- Dialog appears: "Select Deployment Target"
- Choose your phone (USB) or emulator
- Click "OK"

### Step 5: App Launches
- APK builds and installs (~30-60 sec)
- App opens automatically
- Website loads in WebView
- Done! ✅

---

## Run Configuration Details

**No manual setup needed** - Android Studio auto-detects:

```
Module: app
  ├── Activity: MainActivity
  ├── Package: in.cpromptsolution.customer
  └── Intent: LAUNCHER

Build: Debug APK
  ├── Output: app/build/outputs/apk/debug/app-debug.apk
  └── Install: adb install -r
```

---

## Build Process Behind the Scenes

```
Click Run ▶
    ↓
Gradle clean (clears old builds)
    ↓
Gradle build (compiles + packages)
    ↓
adb install (installs APK on device)
    ↓
adb shell am start (launches MainActivity)
    ↓
App running ✅
```

---

## First Run Time

| Step | Time |
|------|------|
| Gradle sync | 30-60 sec |
| Gradle build | 30-120 sec |
| Device selection | 10 sec |
| APK install | 10-30 sec |
| App launch | 5-10 sec |
| Website load | 5-15 sec |
| **Total** | **~2-5 minutes** |

**Subsequent runs**: 30-60 seconds

---

## What You'll See

### In Android Studio
```
02:15:34 Gradle build starting...
02:15:45 Gradle sync complete
02:16:02 Build successful
02:16:15 Uploading file to device
02:16:25 Installation successful
02:16:26 Launching activity
```

### In Logcat (bottom panel)
```
I/MainActivity: onCreate() called
I/BridgeActivity: Initializing Capacitor Bridge
D/WebView: Loading https://customer.cpromptsolution.in
I/WebView: Page loaded successfully
D/Bridge: Capacitor ready
```

### On Device/Emulator
```
[Splash screen for 2-3 seconds]
         ↓
[Website loads in full screen]
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| **Run** | Shift + F10 |
| **Debug** | Shift + F9 |
| **Stop** | Ctrl + F2 |
| **Rerun** | Ctrl + F5 |

---

## Troubleshooting Quick Fixes

### Issue: "Edit Configurations" Opens Instead of Running

**Fix**:
1. Go to **File** → **Edit Configurations**
2. Select `app` from list
3. Click **Run** from that dialog
4. Next time, it will remember

### Issue: Gradle Sync Takes Too Long

**Fix**:
1. Click **File** → **Invalidate Caches** → **Invalidate and Restart**
2. Wait for restart
3. Try again

### Issue: Device Not Showing in Selection Dialog

**Fix**: 
1. Enable **Developer Mode** on phone (Settings → About → tap Build Number 7x)
2. Enable **USB Debugging** (Settings → Developer Options)
3. Connect phone via USB
4. Select phone from device list

### Issue: "Build Failed"

**Fix**:
1. Run `./gradlew clean` in android/ directory
2. Click **File** → **Sync Now** in Android Studio
3. Try Run again

---

## Build Variants

**Bottom-left corner of Android Studio** shows:

```
Build Variants
┌─────────────────┐
│ app : debug     │  ← For development (current)
│     : release   │  ← For Play Store
└─────────────────┘
```

**Leave as `debug`** for development. ✅

---

## After Build Succeeds

You're done! Your app is:
✅ Built
✅ Installed on device
✅ Running
✅ Displaying website
✅ Connected to Capacitor

---

## Next Steps

1. **Test the app**: Interact with website in WebView
2. **Check logs**: Look at Logcat for errors/warnings
3. **Debug if needed**: Set breakpoints, use debugger
4. **Make changes**: Edit React/TS code, rebuild

---

## Files You Don't Need to Edit

These are auto-generated and Android Studio manages them:

❌ `.idea/runConfigurations/app.xml` (run configuration)
❌ `app/build/` (build outputs)
❌ `.gradle/` (Gradle cache)
❌ `local.properties` (SDK path)

---

## Summary

| Item | Status |
|------|--------|
| Project structure | ✅ Correct |
| settings.gradle | ✅ Correct |
| build.gradle | ✅ Correct |
| AndroidManifest.xml | ✅ Correct |
| MainActivity | ✅ Present |
| Run configuration | ✅ Auto-detected |
| Ready to run | ✅ YES |

---

## Just Click Run!

**That's it!** 🚀

1. Android Studio is open
2. Gradle sync is complete
3. Click green **Run (▶)** button
4. Select device
5. App launches

Everything else is automatic.

---

For detailed info, see: **ANDROID_STUDIO_RUN_CONFIG.md**
