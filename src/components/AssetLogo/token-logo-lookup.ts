import React from 'react'

import { fetchTokenList } from './fetch-token-list'
import { DEFAULT_LIST_OF_LISTS } from './lists'

interface IToken {
  logo_URIs?: string[]
  symbol: string
  logoURI: string
}

export class TokenLogoLookupTable {
  private dict: { [key: string]: string[] | undefined } = {}
  private initialized = false

  constructor() {
    this.initialize()
  }

  addTokens(tokens: IToken[]) {
    tokens &&
      tokens.forEach((token) => {
        this.dict[token.symbol.toLowerCase()] = token.logoURI ? [token.logoURI] : Object.values(token.logo_URIs || {})
      })
  }

  async initialize() {
    DEFAULT_LIST_OF_LISTS.forEach(async (list) => {
      await fetchTokenList(list).then((tokenList) => {
        if (!tokenList) {
          console.error('failed', list)
        }
        if (tokenList) {
          if (Array.isArray(tokenList)) {
            this.addTokens(tokenList)
          } else {
            const list = tokenList.tokens || tokenList.assets
            this.addTokens(list)
          }
        }
      })
    })

    this.initialized = true
  }
  getIcons(symbol?: string | null) {
    if (!symbol) return undefined

    if (!this.initialized) {
      this.initialize()
    }

    return this.dict[symbol.toLowerCase()]
  }
}

export const IconsContext = React.createContext<TokenLogoLookupTable | null>(null)
