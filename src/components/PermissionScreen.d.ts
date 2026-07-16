import '../styles/PermissionScreen.css';
export interface PermissionItem {
    type: string;
    label: string;
    granted: boolean;
}
interface PermissionScreenProps {
    permissions: PermissionItem[];
    requesting: boolean;
    allGranted: boolean;
    onRequest: () => void;
}
export declare function PermissionScreen({ permissions, requesting, allGranted, onRequest, }: PermissionScreenProps): import("react").JSX.Element;
export {};
