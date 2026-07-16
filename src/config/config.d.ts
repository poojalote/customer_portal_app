export interface PermissionsConfig {
    camera: boolean;
    location: boolean;
    storage: boolean;
    notification: boolean;
    microphone: boolean;
}
export interface AppConfig {
    websiteUrl: string;
    allowedDomains: string[];
    timeoutMs: number;
    appName: string;
    packageName: string;
    theme: 'light' | 'dark' | 'system';
    permissions: PermissionsConfig;
    environment: 'development' | 'staging' | 'production';
    versionCheckUrl?: string;
}
export declare const config: AppConfig;
