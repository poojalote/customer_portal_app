export type PermissionType = 'camera' | 'location' | 'storage' | 'microphone' | 'notifications';
declare class PermissionService {
    private requestedPermissions;
    requestPermission(type: PermissionType): Promise<boolean>;
    private performRequest;
    private requestCameraPermission;
    private requestLocationPermission;
    private requestStoragePermission;
    private requestMicrophonePermission;
    private requestNotificationPermission;
    checkPermission(type: PermissionType): Promise<boolean>;
    hasRequestedPermission(type: PermissionType): boolean;
}
export declare const permissionService: PermissionService;
export {};
