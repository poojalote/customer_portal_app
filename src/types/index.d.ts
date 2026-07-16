export interface NetworkStatus {
    connected: boolean;
    connectionType: 'wifi' | 'cellular' | 'none' | 'unknown';
}
export interface AppError {
    code: string;
    message: string;
    details?: string;
}
export interface DownloadProgress {
    fileId: string;
    progress: number;
    bytesDownloaded: number;
    totalBytes: number;
}
export interface DownloadCompleted {
    fileId: string;
    filePath: string;
    fileName: string;
}
export interface LocationCoordinates {
    latitude: number;
    longitude: number;
    accuracy?: number;
}
