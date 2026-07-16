import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.cpromptsolution.customer',
  appName: 'CPrompt Customer',
  webDir: 'dist',
  server: {
    allowNavigation: ['customer.cpromptsolution.in', '*.cpromptsolution.in'],
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: '#ffffff',
      showSpinner: false,
      spinnerColor: '#999999',
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#ffffff',
      overlaysWebView: false
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
