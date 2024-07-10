export interface IPoolItem {
  pool: {
    token1: string
    token2: string
  }
  balance?: string
  earned?: {
    token1: string
    token2: string
  }
  tvl: string
  apr: string
  rate: string
  volume24H: string
  volume7D: string
}

export interface IPoolData {
  APR: number
  TVL: number
  reserve0: bigint
  reserve1: bigint
  token0: string
  token1: string
  volume_24h: number
  volume_7d: number
}

export interface IPools {
  [address: string]: {
    data: IPoolData
  }
}
