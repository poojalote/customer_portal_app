import '../styles/Toast.css';
interface ToastProps {
    message: string;
    duration?: number;
    type?: 'info' | 'error' | 'warning' | 'success';
}
export declare function Toast({ message, duration, type, }: ToastProps): import("react").JSX.Element;
export {};
