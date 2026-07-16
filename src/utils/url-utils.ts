import { config } from '../config/config'

export function isExternalUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    const domain = parsedUrl.hostname

    return !config.allowedDomains.some(
      (allowed) =>
        domain === allowed || domain.endsWith('.' + allowed)
    )
  } catch {
    return false
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getUrlDomain(url: string): string | null {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}

export function isWebsiteUrl(urlString: string): boolean {
  return urlString === config.websiteUrl
}
