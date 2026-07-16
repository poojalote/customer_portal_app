import { config } from '../config/config';
export function isExternalUrl(url) {
    try {
        var parsedUrl = new URL(url);
        var domain_1 = parsedUrl.hostname;
        return !config.allowedDomains.some(function (allowed) {
            return domain_1 === allowed || domain_1.endsWith('.' + allowed);
        });
    }
    catch (_a) {
        return false;
    }
}
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
export function getUrlDomain(url) {
    try {
        return new URL(url).hostname;
    }
    catch (_a) {
        return null;
    }
}
export function isWebsiteUrl(urlString) {
    return urlString === config.websiteUrl;
}
