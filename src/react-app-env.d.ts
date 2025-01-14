/// <reference types="react-scripts" />

import { Theme } from '@mui/material/styles'

declare module '@metamask/jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement
}

declare global {
  interface Window {
    ym: any
  }
}

interface Window {
  GIT_COMMIT_HASH?: string
  // walletLinkExtension is injected by the Coinbase Wallet extension
  walletLinkExtension?: any
  ethereum?: {
    // set by the Coinbase Wallet mobile dapp browser
    isCoinbaseWallet?: true
    // set by the Brave browser when using built-in wallet
    isBraveWallet?: true
    // set by the MetaMask browser extension (also set by Brave browser when using built-in wallet)
    isMetaMask?: true
    // set by the Rabby browser extension
    isRabby?: true
    // set by the Trust Wallet browser extension
    isTrust?: true
    // set by the Ledger Extension Web 3 browser extension
    isLedgerConnect?: true
    autoRefreshOnNetworkChange?: boolean
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    request: (params: any) => Promise<boolean>
  }
  // set by the Phantom Wallet browser extension
  phantom?: {
    ethereum?: {
      isPhantom?: true
    }
  }
  web3?: Record<string, unknown>
}

declare module 'content-hash' {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
  declare function toB58String(hash: Uint8Array): string
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.webm' {
  const src: string
  export default src
}

declare module '*.mov' {
  const src: string
  export default src
}

declare module '@mui/material/styles' {
  type DefaultTheme = Theme
}
