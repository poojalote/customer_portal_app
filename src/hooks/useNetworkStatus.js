import { useState, useEffect } from 'react';
import { networkService } from '../services';
export function useNetworkStatus() {
    var _a = useState({
        connected: true,
        connectionType: 'unknown',
    }), status = _a[0], setStatus = _a[1];
    useEffect(function () {
        networkService.init();
        var unsubscribe = networkService.addListener(function (newStatus) {
            setStatus(newStatus);
        });
        return function () {
            unsubscribe();
        };
    }, []);
    return status;
}
