# Android Studio Run Configuration Guide

## What Will Happen When You Click "Run"

When you open the project in Android Studio and click the green **Run (▶)** button, here's what happens:

### 1. **Gradle Sync** (Automatic)
- Android Studio detects the `settings.gradle` file
- Recognizes the `:app` module
- Downloads Gradle 8.14.5 (if not cached)
- Compiles all dependencies
- Builds APK for debug

### 2. **Build Process**
```
Gradle Sync
    ↓
Compile TS/React (already built in dist/)
    ↓
Build Android app
    ↓
Create debug APK
    ↓
Launch APK on device/emulator
```

### 3. **Device Selection**
- Android Studio shows device picker dialog
- Choose your phone or emulator
- Click "OK"
- App installs and launches

### 4. **App Launches**
- Splash screen appears
- Website loads in WebView
- App runs with full Capacitor functionality

---

## Run Configuration Auto-Detection

Android Studio **automatically detects** your run configuration because:

✅ `settings.gradle` declares `:app` module  
✅ `app/build.gradle` is properly configured  
✅ `AndroidManifest.xml` has MainActivity with LAUNCHER intent  
✅ MainActivity.java extends BridgeActivity  

**You don't need to manually create anything** - it's automatic! ✅

---

## Manual Configuration (If Needed)

If "Edit Configurations" dialog appears instead of running:

### Step 1: Open Run Configurations
**File** → **Edit Configurations**

### Step 2: Add Android App Configuration
Click **+** button → Select **Android App**

### Step 3: Fill In Details

| Field | Value |
|-------|-------|
| **Name** | `app` (or any name) |
| **Module** | `app` |
| **Install Flags** | (leave empty) |
| **Launch Options** | (leave empty) |

### Step 4: Apply
Click **OK**

### Step 5: Run
Click green **Run (▶)** button

---

## Expected Run Configuration XML

Android Studio will create something like this automatically in `.idea/runConfigurations/app.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="app" type="AndroidRunConfigurationType">
    <option name="DEPLOY" value="true" />
    <option name="DEPLOY_APK_FROM_BUNDLE" value="false" />
    <option name="DEPLOY_AS_INSTANT" value="false" />
    <option name="DEPLOY_FROM_BUNDLE" value="true" />
    <option name="DEPLOY_MODULE_ON_DEMAND" value="true" />
    <option name="DEPLOY_OPTIMIZED_MODULE_ON_DEMAND" value="false" />
    <option name="DEPLOY_SYNC_ON_DEMAND" value="true" />
    <option name="CLEAR_APP_STORAGE" value="false" />
    <option name="DYNAMIC_FEATURES_DISABLED_LIST" />
    <option name="SHOW_LOGCAT_AUTOMATICALLY" value="true" />
    <option name="SKIP_NOOP_APK_INSTALLATIONS" value="true" />
    <option name="FORCE_STOP_RUNNING_APP" value="true" />
    <option name="INSPECTION_WITHOUT_ACTIVITY_RESTART" value="false" />
    <option name="TARGET_SELECTION_MODE" value="DEVICE_AND_SNAPSHOT_COMBO_BOX" />
    <type value="Android" />
    <deviceChooserPopupWizardStep>
      <option name="myDeviceConnectionType" value="USB_DEVICE" />
    </deviceChooserPopupWizardStep>
    <method />
  </configuration>
</component>
```

**You don't need to create this manually** - Android Studio generates it automatically! ✅

---

## What Gets Executed

### Build Process Flow

```
1. gradle clean
   └─ Clears previous builds

2. gradle build
   ├─ Compiles Java/Kotlin
   ├─ Processes resources
   ├─ Links libraries
   ├─ Creates DEX files
   └─ Packages APK

3. adb install -r app-debug.apk
   └─ Installs on selected device/emulator

4. adb shell am start -n in.cpromptsolution.customer/.MainActivity
   └─ Launches MainActivity
```

### App Startup Sequence

```
MainActivity Created
    ↓
BridgeActivity initializes
    ↓
Capacitor Bridge loads
    ↓
WebView initializes
    ↓
website loads (https://customer.cpromptsolution.in)
    ↓
Splash screen hides
    ↓
WebView displays website
    ↓
App ready for use
```

---

## Device Selection

When you click **Run**, you'll see:

```
Select Deployment Target
┌─────────────────────────────────────┐
│ Available Emulators:               │
│ ☐ Pixel_4_API_30                  │
│ ☐ Pixel_5_API_33                  │
│                                     │
│ Connected Devices:                 │
│ ☑ Samsung Galaxy S21 (USB)        │
│                                     │
│ [OK]  [Cancel]                     │
└─────────────────────────────────────┘
```

**Select one device/emulator and click OK**

---

## Logcat Output

Android Studio's **Logcat** will show:

```
02:15:34.123  D/MainActivity: onCreate
02:15:34.456  D/BridgeActivity: Initializing Capacitor Bridge
02:15:34.789  D/WebView: Loading https://customer.cpromptsolution.in
02:15:35.123  I/Choreographer: Skipped 60 frames! The application may be doing too much work on its main thread.
02:15:36.456  I/WebView: Page loaded successfully
02:15:36.789  D/Bridge: Capacitor Bridge ready
02:15:37.000  I/MainActivity: App fully initialized
```

**This is normal** - the "skipped frames" warning is harmless on first load.

---

## Run Button Location

**Top toolbar** of Android Studio:

```
┌─────────────────────────────────────────┐
│ File Edit View ... ▶[Run] |Debug| ...  │
│                            ↑            │
│                     GREEN RUN BUTTON    │
└─────────────────────────────────────────┘
```

**Keyboard Shortcut**: `Shift + F10`

---

## Debug Mode (Optional)

To debug instead of just run:

1. Click the **Debug** button (next to Run)
2. Or press **Shift + F9**
3. Android Studio will:
   - Launch app in debug mode
   - Attach debugger
   - Break on breakpoints
   - Allow step-through execution

---

## Build Variants

Android Studio shows **Build Variant** selector:

```
Bottom-left corner:
┌──────────────────┐
│ Build Variants   │
├──────────────────┤
│ app   : debug    │ ← Running debug build
│       : release  │
└──────────────────┘
```

**Default is `debug`** - this is what you want for development. ✅

For Play Store release, switch to `release` build variant.

---

## Clean & Rebuild

If something seems wrong:

1. **File** → **Invalidate Caches** → **Invalidate and Restart**
2. Android Studio restarts
3. Gradle re-syncs everything
4. Click **Run** again

---

## Troubleshooting: Run Button Opens "Edit Configurations"

**If clicking Run opens the configuration dialog instead of running:**

1. Go to **File** → **Edit Configurations**
2. Select "app" from the list (or create it if missing)
3. Click **Run** from that dialog
4. On next click, it should use the saved configuration

---

## Expected Files Generated

After first run, Android Studio creates:

```
android/
├── .idea/
│   ├── runConfigurations/
│   │   └── app.xml                ← Run configuration (auto-created)
│   ├── modules.xml
│   ├── workspace.xml
│   └── ...
├── app/build/
│   ├── outputs/apk/debug/
│   │   └── app-debug.apk          ← Debug APK (installed on device)
│   ├── intermediates/
│   └── ...
├── .gradle/                        ← Gradle cache
└── ...
```

**These are automatically generated** - you don't edit them. ✅

---

## Environment Variables

Android Studio automatically sets:

```bash
ANDROID_SDK_ROOT = C:\Users\...\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Java\jdk-21.0.2
GRADLE_HOME = .gradle/wrapper/dists/gradle-8.14.5/...
```

**You don't need to set these manually** - Android Studio detects them. ✅

---

## First Run Timeline

1. **Click Run** (0 sec)
2. Gradle sync (30-60 sec) - first time only
3. Gradle build (30-120 sec)
4. Device selection dialog (10 sec)
5. APK install (10-30 sec)
6. App launch (5-10 sec)
7. Website loads (5-15 sec)

**Total first run**: ~2-5 minutes

**Subsequent runs**: ~30-60 seconds

---

## Summary

| Aspect | What Happens |
|--------|-------------|
| **Configuration** | ✅ Auto-detected by Android Studio |
| **Module** | ✅ `app` module (already set up) |
| **Activity** | ✅ MainActivity (in manifest) |
| **Build Type** | ✅ Debug APK |
| **Target Selection** | ✅ Dialog shows devices/emulators |
| **Installation** | ✅ Automatic via adb |
| **Launch** | ✅ Automatic via adb shell am start |
| **Logcat** | ✅ Shows build & runtime logs |

---

## What to Do Now

1. **Open project**: `npx cap open android`
2. **Wait for Gradle sync** (green checkmark appears)
3. **Click Run (▶)** button
4. **Select device** from dialog
5. **App launches** on your device/emulator

✅ **Done!** Your app is running.

---

## If You Want to Customize

You CAN manually edit run configuration, but **it's optional**:

**File** → **Edit Configurations** → `app` → Advanced options

Common customizations:
- VM options: `-Xmx2048m` (more RAM for Gradle)
- Gradle options: `--stacktrace` (verbose error logging)
- After Launch: `Open Monitor` (opens system monitor)

**Most developers leave defaults** - not needed for basic development. ✅

---

**Status**: ✅ **RUN CONFIGURATION IS AUTOMATIC**

Just click the green **Run (▶)** button and your app launches! 🚀
