var getEnvVar = function (key, defaultValue) {
    var envValue = import.meta.env[key];
    return envValue || defaultValue;
};
export var config = {
    websiteUrl: getEnvVar('VITE_WEBSITE_URL', 'https://customer.cpromptsolution.in'),
    allowedDomains: getEnvVar('VITE_ALLOWED_DOMAINS', '')
        .split(',')
        .filter(Boolean) || ['customer.cpromptsolution.in', 'cpromptsolution.in'],
    timeoutMs: parseInt(getEnvVar('VITE_TIMEOUT_MS', '30000'), 10),
    appName: 'CPrompt customer',
    packageName: 'in.cpromptsolution.customer',
    theme: 'system',
    permissions: {
        camera: true,
        location: true,
        storage: true,
        notification: true,
        microphone: false,
    },
    environment: getEnvVar('VITE_ENV', 'production') || 'production',
    versionCheckUrl: getEnvVar('VITE_VERSION_CHECK_URL', 'https://api.cpromptsolution.in/version'),
};
