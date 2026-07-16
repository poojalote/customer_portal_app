import '../styles/ErrorScreen.css';
interface ErrorScreenProps {
    errorCode?: string;
    errorMessage?: string;
    onRetry: () => void;
}
export declare function ErrorScreen({ errorCode, errorMessage, onRetry, }: ErrorScreenProps): import("react").JSX.Element;
export {};
