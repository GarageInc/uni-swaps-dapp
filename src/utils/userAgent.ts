import { UAParser } from 'ua-parser-js'

const parser = new UAParser(typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent)
const { type } = parser.getDevice()

export const isMobile = type === 'mobile' || type === 'tablet'
const platform = parser.getOS().name
export const isIOS = platform === 'iOS'

export const isNonIOSPhone = !isIOS && isMobile

export const isAndroid = platform === 'Android'
export const isNonSupportedDevice = !isIOS && !isAndroid && type === 'mobile'
