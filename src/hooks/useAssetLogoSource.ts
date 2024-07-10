import xfiIcon from 'assets/icons/simpleTokens/xfi.svg'
import { IconsContext, TokenLogoLookupTable } from 'components/AssetLogo/token-logo-lookup'
import { uriToHttp } from 'components/AssetLogo/uri-to-http'
import { useCallback, useContext, useState } from 'react'

const BAD_SRCS: { [tokenAddress: string]: true } = {}

// Converts uri's into fetchable urls
function parseLogoSources(uris: string[]) {
  const urls: string[] = []
  uris.forEach((uri) => urls.push(...uriToHttp(uri)))
  return urls
}

// Parses uri's, favors non-coingecko images, and improves coingecko logo quality
function prioritizeLogoSources(uris: string[]) {
  const parsedUris = uris.map((uri) => uriToHttp(uri)).flat(1)
  const preferredUris: string[] = []

  // Consolidate duplicate coingecko urls into one fallback source
  let coingeckoUrl: string | undefined = undefined

  parsedUris.forEach((uri) => {
    if (uri.startsWith('https://assets.coingecko')) {
      if (!coingeckoUrl) {
        coingeckoUrl = uri.replace(/small|thumb/g, 'large')
      }
    } else {
      preferredUris.push(uri)
    }
  })
  // Places coingecko urls in the back of the source array
  return coingeckoUrl ? [...preferredUris, coingeckoUrl] : preferredUris
}

const getTokenUris = (iconsCtx: TokenLogoLookupTable | null, symbol: string) => {
  const uris = iconsCtx?.getIcons(symbol) ?? []

  const tokenListIcons = prioritizeLogoSources(parseLogoSources(uris))

  return tokenListIcons
}
function getInitialUrl(symbol?: string | null) {
  return `https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/${symbol}.jpg`
}

const ISLM_IMG = 'https://s2.coinmarketcap.com/static/img/coins/64x64/26220.png'

// Resolve asset symbols into identifiers used by https://github.com/cjdowner/cryptocurrency-icons
function cryptoIconSymbolResolver(symbol?: string | null) {
  return typeof symbol !== 'string'
    ? ''
    : symbol.startsWith('a2')
    ? symbol.toLowerCase().replace('a2', 'a')
    : symbol.toLowerCase().replace('$', 'dollar')
}

export function useAssetLogoSource(symbol?: string | null, svgs?: any): [string | undefined, () => void] {
  const [current, setCurrent] = useState<string | undefined>(() => {
    return getInitialUrl(cryptoIconSymbolResolver(symbol))
  })

  const [fallbackSrcs, setFallbackSrcs] = useState<string[] | undefined>()

  const iconsCtx = useContext(IconsContext)

  const nextSrc = useCallback(() => {
    if (current) {
      BAD_SRCS[current] = true
    }

    if (symbol?.toLowerCase() === 'xfi' || symbol?.toLowerCase() === 'wxfi') {
      setCurrent(xfiIcon)
      return
    }

    // Parses and stores logo sources from tokenlists if assets repo url fails
    if (!fallbackSrcs && symbol) {
      const tokenListIcons = getTokenUris(iconsCtx, symbol)

      setCurrent(tokenListIcons.find((src) => !BAD_SRCS[src]))
      setFallbackSrcs(tokenListIcons)
    } else {
      setCurrent(fallbackSrcs?.find((src) => !BAD_SRCS[src]))
    }
  }, [current, fallbackSrcs, symbol, iconsCtx])

  return [current, nextSrc]
}
