import type { NetworkStatus } from '../types';
type NetworkListener = (status: NetworkStatus) => void;
declare class NetworkService {
    private listeners;
    private currentStatus;
    private initialized;
    init(): Promise<void>;
    addListener(listener: NetworkListener): () => void;
    private notifyListeners;
    getStatus(): NetworkStatus;
    isConnected(): boolean;
}
export declare const networkService: NetworkService;
export {};
